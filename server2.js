require('dotenv').config();
const express = require('express');
const app = express();

const db = require('./db');


const Person = require('./models/Person');
const Menu = require('./models/Menu');

const passport = require('./auth');
app.use( passport.initialize());



app.use(express.json());


// MIDDLE WARE

const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request Made to: ${req.orignalUrl}`);
    next();
}

app.use(logRequest);        // for all api's


// CONFIGURE LOCAL STRATEGY

 // IN auth.js

/* ---------------- HOME ROUTE ---------------- */

const localMiddleware = passport.authenticate('local', { session: false });

app.get('/', localMiddleware, function (req, res) {
    res.send('Hi!!! How are you?? what you want???');
});



/* ================= PERSON API ================= */

/* POST PERSON */

app.post('/person', async (req,res) =>{
    try{
        const data = req.body;

        const newPerson = new Person(data);

        const response = await newPerson.save();

        console.log('Data saved');

        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
});


/* GET ALL PERSON */

app.get('/person', async (req,res)=>{
    try{

        const data = await Person.find();

        console.log('data fetched');

        res.status(200).json(data);

    }catch(err){

        console.log(err);

        res.status(500).json({error:'Internal server error'});

    }
});


/* PARAMETERISED PERSON API */

app.get('/person/:workType', async(req,res)=>{

    try{

        const workType = req.params.workType;

        if(workType == 'chef' || workType == 'waiter' || workType == 'manager' || workType == 'owner'){

            const response = await Person.find({job: workType});

            console.log('response fetched');

            res.status(200).json(response);

        }else{

            res.status(404).json({error:'Invalid Work Type'});

        }

    }catch(err){

        console.log(err);

        res.status(500).json({error:'Internal server error'});

    }

});


/* ================= MENU API ================= */


/* POST MENU */

app.post('/menu', async (req,res)=>{

    try{

        const data = req.body;

        const newMenu = new Menu(data);

        const response = await newMenu.save();

        console.log('menu data saved');

        res.status(200).json(response);

    }catch(err){

        console.log(err);

        res.status(500).json({error:'Internal server error'});

    }

});


/* GET ALL MENU */

app.get('/menu', async (req,res)=>{

    try{

        const data = await Menu.find();

        console.log('menu data fetched');

        res.status(200).json(data);

    }catch(err){

        console.log(err);

        res.status(500).json({error:'Internal server error'});

    }

});


/* PARAMETERISED MENU API */

app.get('/menu/:menutype', async(req,res)=>{

    try{

        const menuType = req.params.menutype;

        if(menuType == 'vadapav' || menuType == 'samosa' || menuType == 'pani-puri'){

            const response = await Menu.find({dish_name: menuType});

            console.log('response fetched');

            res.status(200).json(response);

        }else{

            res.status(404).json({error:'Invalid Dish'});

        }

    }catch(err){

        console.log(err);

        res.status(500).json({error:'Internal server error'});

    }

});


/* ================= SERVER ================= */

const mongoURL = process.env.PORT || 5000;



const personRoutes = require('./routes/personRoutes');
app.use('/person', personRoutes);

app.listen(5000, function(){

    console.log('Server listening on port 5000');

});