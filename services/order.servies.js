const fs = require('fs/promises');
const uuid = require('uuid');
const uuidv4 = uuid.v4;

const getData = async () => fs.readFile('./data/order.json').then(data => JSON.parse(data));
const updateData = async (data) => fs.writeFile('./data/users.json', JSON.stringify(data));

const addNewOrder = async (name, email, phone, kindEvent,order) => {
    const id = uuidv4();
    order.id = id;
    // let order = {};
    const orders = getData() || []
    order.name = name;
    order.email = email;
    order.phone = phone;
    order.kindEvent = kindEvent;
    orders.push(order);
    await updateData(orders);
    return order;
}
const getOrders = async () => {
    const useorders = await getData();
    const _orders = await useorders.find(u => u.id === id);
    return _orders;
}
module.exports = {
    addNewOrder,
    getOrders
}