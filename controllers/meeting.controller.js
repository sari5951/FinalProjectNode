// const { Router } = require('express');
// const MeetingsService = require('../services/meeting.service');

// const router = Router();


// router.post('/addMeeting', async (req, res) => {
//     const { serviceType, dateTime, note, customereName, telephone } = req.body;
    
//         // const { serviceType, dateTime} = req.body;
//         console.log(serviceType);
//         console.log(dateTime);
    
   
//     console.log(note);
//     console.log(customereName);
//     console.log(telephone);
//     if (!serviceType|| !dateTime|| !note||!customereName|| !telephone) {
//         // if (!serviceType|| !dateTime) {
//         return res.status(400).send('on of ths following properties missing from the body: business_id / start_time / duration / meeting')
//     }
//   try {
//         const _meeting = await MeetingsService.addMeeting(serviceType, dateTime, note, customereName, telephone);
//         // const _meeting = await MeetingsService.addMeeting(serviceType, dateTime);

//         res.send(_meeting);
//     } catch (err) {
//         console.error(`error in creating meeting ${err.message}`);
//         res.status(500).send(err.message);
//     }
    
    
// });



// router.get('/', async (req, res) => {
//     try {
//         // const { business_id } = req.query;
//         // if (!business_id) {
//         //     res.status(400).send('no business_id provided as query param');
//         // }
//         // const meetings = await MeetingsService.getMeetings(business_id);
//         const meetings = await MeetingsService.getMeetings();
//         console.log(meetings)
//         res.send(meetings);
//     } catch (error) {
//         console.error(`error in fetching meeting list ${error.message}`);
//         res.status(500).send(`error in fetching meeting list ${error.message}`);
//     }  
// });

// router.get('/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const meeting = await MeetingsService.getMeeting(id);
//         res.send(meeting);
//     } catch (error) {
//         console.error(`error in fetching meeting ${error.message}`);
//         res.status(500).send(`error in fetching meeting ${error.message}`);
//     }   
// });

// router.put('/:id', async (req, res) => {
//     try {
//         const { meeting } = req.body;
//         console.log("updat");
//         console.log(meeting);
//         const { id } = req.params;
//         if (!id || !meeting) {
//             return res.status(400).send('no meeting or no id provided');
//         }
//         const _meeting = await MeetingsService.updateMeeting(id, meeting);
//         return res.send(_meeting);
//     } catch (error) {
//         console.error(`error in updating meeting ${error.message}`);
//         res.status(500).send(`error in updating meeting ${error.message}`);
//     }
// })

// router.delete('/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         await MeetingsService.deleteMeeting(id);
//             res.send('deleted');
//             console.log('deleted!!!!');
        
       
//     } catch (error) {
//         console.error(`error in deleting meeting ${error.message}`);
//         res.status(500).send(`error in deleting meeting ${error.message}`);
//     }
// })


// module.exports = router;




// של הפרויקט נוד החדש!!
const Meeting = require('../models/meeting.model');
const meetingService = require('../services/meeting.service');

exports.getMeetings = async(req, res) =>{
  try {
    const meetings = await Meeting.find();
    res.json(meetings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMeetingById =async(req, res)=> {
  res.json(res.meeting);
};

exports.createMeeting= async(req, res)=> {
  const meeting = new Meeting({
    title: req.body.title,
    date: req.body.date,
    location: req.body.location,
    description: req.body.description,
    attendees: req.body.attendees,
  });

  try {
    const newMeeting = await meeting.save();
    res.status(201).json(newMeeting);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateMeeting = async (req, res) => {
    const { id } = req.params;
  
    try {
      const meeting = await Meeting.findById(id);
      if (!meeting) {
        return res.status(404).json({ message: 'Meeting not found' });
      }
  
      if (req.body.title !== undefined) {
        meeting.title = req.body.title;
      }
      if (req.body.date !== undefined) {
        meeting.date = req.body.date;
      }
      if (req.body.location !== undefined) {
        meeting.location = req.body.location;
      }
      if (req.body.description !== undefined) {
        meeting.description = req.body.description;
      }
      if (req.body.attendees !== undefined) {
        meeting.attendees = req.body.attendees;
      }
  
      const updatedMeeting = await meeting.save();
      res.json(updatedMeeting);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };


  
  exports.deleteMeeting = async (req, res) => {
    const { id } = req.params;
    
    try {
      const result = await meetingService.deleteMeeting(id);
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  