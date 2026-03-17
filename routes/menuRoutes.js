const express = require('express');
const router = express.Router();
const Menu = require('../models/Menu');
//HI
router.post('/', async (req,res ) =>{
    try{
    const data = req.body
    const newMenu = new Menu(data);
    const response = await newMenu.save();
    console.log('data saved');
    res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Error'});

    }
} )


router.get('/',async (req,res) =>{
    try {
        const data = await Menu.find();
        console.log('data saved');
        res.status(200).json(data);
 
    } catch(err){
        console.log(err);
        res.status(500).json({error:'Internal error'});
    }
    
})

router.get('/:menutype', async(req,res) =>{
    try {
        const menuType = req.params.menutype;
        if(menuType == 'vadapav' || menuType == 'samosa' || menuType == 'pani-puri' || menuType == 'dahi-puri'){

            const response = await Menu.find({dish_name : menuType});

            console.log('response fetched');
            res.status(200).json(response);
        } else{
            res.status(404).json({error: 'Invalid Dish'});
        }
        } catch(err){
            console.log(err);
            res.status(500).json({error: 'Internal server error'});
        
    }
})

module.exports = router;