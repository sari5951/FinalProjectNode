const fs = require('fs/promises');
const uuid = require('uuid');
const uuidv4 = uuid.v4;


const getData = async () => fs.readFile('./data/meetings.json').then(data => JSON.parse(data));
const updateData = async (data) => fs.writeFile('./data/meetings.json', JSON.stringify(data));


const addMeeting = async (serviceType, dateTime, note, customereName, telephone) => {
    // const addMeeting = async (serviceType, dateTime) => {


    const id = uuidv4();
    let meeting = {};
  meeting.id = id;
    const meetings = await getData() || [];
    meeting.serviceType = serviceType;
    meeting.dateTime = dateTime;
    meeting.note = note;
    meeting.customereName = customereName;
    meeting.telephone = telephone;
    meetings.push(meeting);
    console.log('succfuly!');
    await updateData(meetings);
    return meeting;
}


// const addMeeting = async(businessId, startTime, duration, meeting) => {

//     const id = uuidv4();
//     meeting.id = id;
//     const meetings = await getData() || [];
//     const startM = new Date(startTime);
//     const endM = new Date(startTime).setMinutes(startM.getMinutes() + duration);
//     const exists = meetings.find(m => {
//         if (m.businessId === businessId) {
//             const start = new Date(m.startTime);
//             const end = new Date(m.startTime).setMinutes(start.getMinutes() + start.duration);

//             if (start >= startM && start <= endM) {
//                 return true;
//             }
//             if (startM >= start && startM <= end) {
//                 return true;
//             }            
//         }
//         return false;
//     })
//     if (exists) {
//         throw new Error('meetings already exists during this time');
//     }
//     meeting.startTime = startTime;
//     meeting.duration = duration;
//     meeting.businessId = businessId;
//     meetings.push(meeting);
//     await updateData(meetings);
//     return meeting;
// }

const updateMeeting = async (id, meeting) => {
    const meetings = await getData();
    const _meeting = await meetings.find(m => m.id === id);
    Object.assign(_meeting, meeting);
    await updateData(meetings);
    return _meeting;
}

const getMeeting = async (id) => {
    const meetings = await getData();
    const _meeting = await meetings.find(m => m.id === id);
    return _meeting;
}

// const getMeetings = async (businessId) => {
//     const meetings = await getData();
//     const _meetings = await meetings.filter(m => m.businessId === businessId);
//     return _meetings;
// }

const getMeetings = async () => {
    const meetings = await getData();
    console.log('getmeeting')
    return meetings;
}


const deleteMeeting = async (id) => {
    const meetings = await getData();
    const index = await meetings.findIndex(m => m.id === id);
    meetings.splice(index, 1);
    await updateData(meetings);
    console.log('deleted!');
}
module.exports = {
    addMeeting,
    deleteMeeting,
    updateMeeting,
    getMeeting,
    getMeetings,
}