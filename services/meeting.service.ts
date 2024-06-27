// const fs = require('fs/promises');
// const uuid = require('uuid');
// const uuidv4 = uuid.v4;


// const getData = async () => fs.readFile('./data/meetings.json').then(data => JSON.parse(data));
// const updateData = async (data) => fs.writeFile('./data/meetings.json', JSON.stringify(data));


// const addMeeting = async (serviceType, dateTime, note, customereName, telephone) => {
//     // const addMeeting = async (serviceType, dateTime) => {


//     const id = uuidv4();
//     let meeting = {};
//   meeting.id = id;
//     const meetings = await getData() || [];
//     meeting.serviceType = serviceType;
//     meeting.dateTime = dateTime;
//     meeting.note = note;
//     meeting.customereName = customereName;
//     meeting.telephone = telephone;
//     meetings.push(meeting);
//     console.log('succfuly!');
//     await updateData(meetings);
//     return meeting;
// }


// // const addMeeting = async(businessId, startTime, duration, meeting) => {

// //     const id = uuidv4();
// //     meeting.id = id;
// //     const meetings = await getData() || [];
// //     const startM = new Date(startTime);
// //     const endM = new Date(startTime).setMinutes(startM.getMinutes() + duration);
// //     const exists = meetings.find(m => {
// //         if (m.businessId === businessId) {
// //             const start = new Date(m.startTime);
// //             const end = new Date(m.startTime).setMinutes(start.getMinutes() + start.duration);

// //             if (start >= startM && start <= endM) {
// //                 return true;
// //             }
// //             if (startM >= start && startM <= end) {
// //                 return true;
// //             }            
// //         }
// //         return false;
// //     })
// //     if (exists) {
// //         throw new Error('meetings already exists during this time');
// //     }
// //     meeting.startTime = startTime;
// //     meeting.duration = duration;
// //     meeting.businessId = businessId;
// //     meetings.push(meeting);
// //     await updateData(meetings);
// //     return meeting;
// // }

// const updateMeeting = async (id, meeting) => {
//     const meetings = await getData();
//     const _meeting = await meetings.find(m => m.id === id);
//     Object.assign(_meeting, meeting);
//     await updateData(meetings);
//     return _meeting;
// }

// const getMeeting = async (id) => {
//     const meetings = await getData();
//     const _meeting = await meetings.find(m => m.id === id);
//     return _meeting;
// }

// // const getMeetings = async (businessId) => {
// //     const meetings = await getData();
// //     const _meetings = await meetings.filter(m => m.businessId === businessId);
// //     return _meetings;
// // }

// const getMeetings = async () => {
//     const meetings = await getData();
//     console.log('getmeeting')
//     return meetings;
// }


// const deleteMeeting = async (id) => {
//     const meetings = await getData();
//     const index = await meetings.findIndex(m => m.id === id);
//     meetings.splice(index, 1);
//     await updateData(meetings);
//     console.log('deleted!');
// }
// module.exports = {
//     addMeeting,
//     deleteMeeting,
//     updateMeeting,
//     getMeeting,
//     getMeetings,
// }



//של הפרויקט נוד החדש!
import Meeting from '../models/meeting.model';

export const getMeetings = async (): Promise<any> => {
  try {
    const meetings = await Meeting.find();
    return meetings;
  } catch (err) {
    throw new Error(`Failed to fetch meetings: ${err.message}`);
  }
};

export const getMeetingById = async (id: string): Promise<any> => {
  try {
    const meeting = await Meeting.findById(id);
    if (!meeting) {
      throw new Error('Meeting not found');
    }
    return meeting;
  } catch (err) {
    throw new Error(`Failed to fetch meeting: ${err.message}`);
  }
};

export const createMeeting = async (meetingData: any): Promise<any> => {
  try {
    const meeting = new Meeting(meetingData);
    const newMeeting = await meeting.save();
    return newMeeting;
  } catch (err) {
    throw new Error(`Failed to create meeting: ${err.message}`);
  }
};

export const updateMeeting = async (id: string, meetingData: any): Promise<any> => {
  try {
    const updatedMeeting = await Meeting.findByIdAndUpdate(id, meetingData, { new: true });
    if (!updatedMeeting) {
      throw new Error('Meeting not found');
    }
    return updatedMeeting;
  } catch (err) {
    throw new Error(`Failed to update meeting: ${err.message}`);
  }
};

export const deleteMeeting = async (id: string): Promise<any> => {
  try {
    const result = await Meeting.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      throw new Error('Meeting not found');
    }
    return { message: 'Meeting deleted' };
  } catch (err) {
    throw new Error(`Failed to delete meeting: ${err.message}`);
  }
};
