const Person = require('./models/Person');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;



passport.use(new LocalStrategy(async (USERNAME, password, done) =>{
    try{
        console.log('Recieved credentials', USERNAME, password);
        const user = await Person.findOne({username: USERNAME});
        if(!user)
            return done(null, false, {message:'Invalid User:'});
       
        
        const isPasswordMatch = user.password === password ? true : false;
        if(isPasswordMatch){
            return done(null, user);
        }

        else{
            return done(null, false, {message:'Incorrect password'})
        }


    
    }
    catch (err){
        return done(err);
    }

}));


module.exports = passport;