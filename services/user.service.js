// const fs = require('fs/promises');
// const uuid = require('uuid');
// const uuidv4 = uuid.v4;






// const getData = async () => fs.readFile("./data/users.json").then(data => JSON.parse(data));
// const updateData = async (data) => fs.writeFile("./data/users.json", JSON.stringify(data));


// const getUserByUsername = async (username, password) => {
//     const users = await getData();
//     const _user = await users.find(u => u.username === username && u.password === password);
//     return _user;


// }





// const AddCustomer = async (customer) => {
//     if (!customer.name || !customer.email || !customer.phone) {
//         throw new Error("customer must include name, email, and phone");
//     }
//     const id = uuidv4();
//     customer.id = id;
//     const customers = await getData() || [];
//     const exists = customers.find(c => c.email === customer.email);
//     if (exists) {
//         throw new Error("customer with email already exists");
//     }
//     customers.push(customer);
//     await updateData(customers);
//     return customer;
// };




// const updateUser = async (id, user) => {
//     const users = await getData();
//     const _user = await users.find(u => u.id === id);
//     Object.assign(_user, user);
//     await updateData(users);
//     return _user;
// }



// const getUsers = async () => {
//     const users = await getData();
//     const _user = await users.find(u => u.id === id);
//     return _user;
// }


// const getUser = async (id) => {
//     const users = await getData();
//     const _user = await users.find(u => u.id === id);
//     return _user;
// }



// module.exports = {
//     AddCustomer,
//     updateUser,
//     getUserByUsername,
//     getUser,
//     getUsers
// }
// //MONGOdb
// const User = require('../models/user.model'); // Assuming you have a Mongoose User model defined

// const getUserByUsername = async (username, password) => {
//     try {
//         const user = await User.findOne({ username, password }).exec();
//         return user;
//     } catch (error) {
//         throw new Error(`Error finding user by username and password: ${error.message}`);
//     }
// };

// const AddCustomer = async (customer) => {
//     try {
//         if (!customer.name || !customer.email || !customer.phone) {
//             throw new Error("Customer must include name, email, and phone");
//         }

//         // Assuming you have a Customer model defined in Mongoose
//         const newCustomer = await customer.create(customer);
//         return newCustomer;
//     } catch (error) {
//         throw new Error(`Error adding customer: ${error.message}`);
//     }
// };

// const updateUser = async (id, user) => {
//     try {
//         const updatedUser = await User.findByIdAndUpdate(id, user, { new: true }).exec();
//         return updatedUser;
//     } catch (error) {
//         throw new Error(`Error updating user: ${error.message}`);
//     }
// };

// const getUser = async (id) => {
//     try {
//         const user = await User.findById(id).exec();
//         return user;
//     } catch (error) {
//         throw new Error(`Error finding user by ID: ${error.message}`);
//     }
// };

// const getUsers = async () => {
//     try {
//         const users = await User.find({}).exec();
//         return users;
//     } catch (error) {
//         throw new Error(`Error fetching users: ${error.message}`);
//     }
// };

// module.exports = {
//     AddCustomer,
//     updateUser,
//     getUserByUsername,
//     getUser,
//     getUsers
// };
// services/user.service.js

const User = require('../models/user.model');

const getUserByUsername = async (username, password) => {
    try {
        const user = await User.findOne({ username, password }).exec();
        return user;
    } catch (error) {
        throw new Error(`Error finding user by username and password: ${error.message}`);
    }
};

const AddCustomer = async (customerData) => {
    try {
        // Assuming Customer model is defined similarly to User model
        const newCustomer = new Customer(customerData);
        await newCustomer.save();
        return newCustomer;
    } catch (error) {
        throw new Error(`Error adding customer: ${error.message}`);
    }
};

const updateUser = async (id, userData) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(id, userData, { new: true }).exec();
        return updatedUser;
    } catch (error) {
        throw new Error(`Error updating user: ${error.message}`);
    }
};

const getUserById = async (id) => {
    try {
        const user = await User.findById(id).exec();
        return user;
    } catch (error) {
        throw new Error(`Error finding user by ID: ${error.message}`);
    }
};

const getUsers = async () => {
    try {
        const users = await User.find({}).exec();
        return users;
    } catch (error) {
        throw new Error(`Error fetching users: ${error.message}`);
    }
};

module.exports = {
    getUserByUsername,
    AddCustomer,
    updateUser,
    getUserById,
    getUsers
};
