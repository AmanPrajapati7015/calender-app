const express = require('express');
const router = express.Router();
const { addUser, getEvents, addEvent,  removeEvent, updateEvent} = require('./database/pool')

// get all event of a user
router.get('/', async (req, res, next) => {
    try {
        const email = req.user.email;
        await addUser(email);
        const events = await getEvents(email);
        res.json(events);
        
    }
    catch (error) {
        next(error)
    }
})

// add a new event
router.post('/', async(req, res, next)=>{
    try{
        const email = req.user.email;
        const formData = req.body;
        await addEvent(email, formData);
        console.log(email, formData);
        res.status(200).send('ok');
    }
    catch (error) {
        next(error)
    }
})

// remove a element by event_id
router.delete('/:event_id', async(req,res,next)=>{
    try{
        const email = req.user.email;
        const event_id = req.params.event_id;

        const isDeleted = await removeEvent(email, event_id);
        if(isDeleted)
            res.status(200).send('ok');
        else{
            const err = new Error('unauthorized deletion request');
            err.status = 420;
            next(err);
        }
    }
    catch (error) {
        next(error)
    }
})

// update an existing event 
router.put('/:event_id', async(req,res,next)=>{
    try{
        const email = req.user.email;
        const event_id = req.params.event_id;
        const formData = req.body;
        const isUpdated = await updateEvent(formData, event_id, email);
        if(isUpdated)
            res.status(200).send('ok');
        else{
            const err = new Error('unauthorized update request');
            err.status = 420;
            next(err);
        }
    }
    catch (error) {
        next(error)
    }
})




module.exports = router;