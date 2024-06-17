const { Router } = require('express');
const messageService = require('../services/message.service');

const router = Router();
router.post('/', async (req, res) => {
    const  message  = req.body;
    console.log(message)
    try {
        if (!message) {
            res.status(400).send('not provided message ');
        }
        else{
            const _message = await messageService.addMessage(message);
            res.send(_message);
    
        }
        
    } catch (err) {
        console.error(`error in create service ${err.message}`)
        res.status(500).send(err.message);
    }

});


router.get('/', async (req, res) => {
    try {
        // const { business_id } = req.query;
        // if (!business_id) {
        //     res.status(400).send('no business_id provided as query param');
        // }
        // const meetings = await MeetingsService.getMeetings(business_id);
        const messages = await messageService.getMessages();
        console.log(messages)
        res.send(messages);
    } catch (error) {
        console.error(`error in fetching meeting list ${error.message}`);
        res.status(500).send(`error in fetching meeting list ${error.message}`);
    }  
});
module.exports = router;