/**
 * Lógica de autenticação por passport. Pacote passaport com a estratégia de passport-local
 * Author: Daniel
 * OBS:
 * Passport possui vários tipos de autenticações. Podemos escolher logar pelas mídias sociais ou por email
 * basta importar a estratégia adequada para o objetivo.
 * passport trabalha com a estratégia de middlewares
 * https://www.npmjs.com/package/passport
 */
const bcrypt = require('bcrypt-nodejs');

module.exports = function(passport, user){
    var User = user;
    var LocalStrategy = require('passport-local').Strategy;

    //Passport local-signup
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, email, password, done){

        var generateHash = function(password){
            return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
        }

        User.findOne({where:{email: email}})
        .then(function(user){
            if(user){
                return done(null, false, {
                    message: "The email is already taken"
                })
            }else{
                var userPassword = generateHash(password);
                var data = {
                    email: email,
                    password: userPassword,
                    firstName: req.body.firstname,
                    lastName: req.body.lastname,
                    username: req.body.username,
                    admin: 0,
                    active: 0,
                    role: "visitante"
                };
            
                User.create(data)
                .then(function(newUser){
                    if(!newUser){
                        return done(null, false);
                    }
                    if(newUser){
                        return done(null, newUser);
                    }
                });
            }
        });

    }));

    //Necessário serializar e deserializar
    passport.serializeUser(function(user, done){
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done){
        User.findByPk(id)
        .then(function(user){
            if(user){
                done(null, user.get);
            }else{
                done(user.errors, null);
            }
        });
    });

    passport.use('local-signin', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, email, password, done){
        var User = user;
        var isValidPassword = function(userpass, password){
            return bcrypt.compareSync(password, userpass);
        }

        //Tentar achar um email
        User.findOne({where:{email:email}})
        .then(function(user){
            if(!user){
                return done(null, false, {
                    message: 'Email does not exist!'
                });
            }

            if(!user.active){
                return done(null, false, {
                    message: 'This user is not ready!'
                })
            }

            if(!isValidPassword(user.password, password)){
                return done(null, false, {
                    message: 'Incorrect password'
                });
            }

            var userInfo = user.get();
            return done(null, userInfo);
        })
        .catch(function(erro){
            console.log(erro);
            return done(null, false, {
                message: "Something went wrong with your login"
            });
        })
    }));

}