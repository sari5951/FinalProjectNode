const fs = require('fs/promises');
const uuid = require('uuid');
const uuidv4 = uuid.v4;





const getData = async () => fs.readFile("./data/users.json").then(data => JSON.parse(data));
const updateData = async (data) => fs.writeFile("./data/users.json", JSON.stringify(data));


const getUserByUsername = async (username, password) => {
    const users = await getData();
    const _user = await users.find(u => u.username === username && u.password === password);
    return _user;


}





const AddCustomer = async (customer) => {
    if (!customer.name || !customer.email || !customer.phone) {
        throw new Error("customer must include name, email, and phone");
    }
    const id = uuidv4();
    customer.id = id;
    const customers = await getData() || [];
    const exists = customers.find(c => c.email === customer.email);
    if (exists) {
        throw new Error("customer with email already exists");
    }
    customers.push(customer);
    await updateData(customers);
    return customer;
};




const updateUser = async (id, user) => {
    const users = await getData();
    const _user = await users.find(u => u.id === id);
    Object.assign(_user, user);
    await updateData(users);
    return _user;
}



const getUsers = async () => {
    const users = await getData();
    const _user = await users.find(u => u.id === id);
    return _user;
}


const getUser = async (id) => {
    const users = await getData();
    const _user = await users.find(u => u.id === id);
    return _user;
}



module.exports = {
    AddCustomer,
    updateUser,
    getUserByUsername,
    getUser,
    getUsers
}