const express = require('express');
const router = express.Router();
const Person = require('../models/Person');


//  PERSON DATA GET AND POST
router.post('/', async (req, res) => {
    try {
        const data = req.body
        const newPerson = new Person(data);
        
        const response = await newPerson.save();
        console.log('Data saved');
        res.status(200).json(response);
    }

    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal error'});
    }
});


router.get('/', async (req, res) => {
    try{
        const data = await Person.find();
        console.log('data saved');
        res.status(200).json(data);    
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

// PARAMETRISED API CALL

router.get('/:workType', async(req,res) =>{
    try {
        const workType = req.params.workType;
        if(workType == 'chef' || workType == 'waiter' || workType == 'manager' || workType == 'owner'){

            const response = await Person.find({job : workType});

            console.log('response fetched');
            res.status(200).json(response);
        } else{
            res.status(404).json({error: 'Invalid Work'});
        }
        } catch(err){
            console.log(err);
            res.status(500).json({error: 'Internal server error'});
        }
});






router.put('/:id', async(req,res) =>{
    try{
        const personId = req.params.id; // Extract the id
        const updatedPersonData = req.body;

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData,{
            new: true,
            runValidators: true

        });

        if (!response) {
            return res.status(404).json({error:'Person not found'});
        }
        console.log('Data Updated');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
    })




router.delete('/:id', async (req,res)=>{
    try{
    const personId = req.params.id;


    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
        return res.status(404).json({error: 'Person not found'});
        }

        console.log('data delete');
        res.status(200).json({message: 'person Deleted Succesfully'});
    } catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }

});

    
module.exports = router;