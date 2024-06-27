import { Request, Response, Router } from 'express';
import Meeting, { IMeeting } from '../models/meeting.model';
import * as meetingService from '../services/meeting.service';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const meetings = await Meeting.find();
    res.json(meetings);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const meeting = await Meeting.findById(id);
    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }
    res.json(meeting);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/addMeeting', async (req: Request, res: Response) => {
  const { title, date, location, description, attendees } = req.body;
  const meeting = new Meeting({
    title,
    date,
    location,
    description,
    attendees,
  });

  try {
    const newMeeting = await meeting.save();
    res.status(201).json(newMeeting);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
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
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await meetingService.deleteMeeting(id);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
