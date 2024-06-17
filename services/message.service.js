const fs = require('fs/promises');
const uuid = require('uuid');
const uuidv4 = uuid.v4;





const getData = async () => fs.readFile('./data/message.json').then(data => JSON.parse(data));
const updateData = async (data) => fs.writeFile('./data/message.json', JSON.stringify(data));

const addMessage = async (message) => {


    const id = uuidv4();
    let massage = {};
    massage.id = id;
    const messages = await getData() || [];
    massage.message = message;
    messages.push(massage);
    console.log('succfuly message!');
    await updateData(messages);
    return massage;
};
const  getMessages = async () => {
    const messages= await getData();
    console.log('getmessages')
    return messages;
}


module.exports = {
    addMessage,
    getMessages
}