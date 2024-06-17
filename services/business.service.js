const fs = require('fs/promises');
const uuid = require('uuid');
const uuidv4 = uuid.v4;


const getData = async () => fs.readFile('./data/businesses.json').then(data => JSON.parse(data));
const updateData = async (data) => fs.writeFile('./data/businesses.json', JSON.stringify(data));

const getBusinessOfUser = async (user) => {
    const data = await getData();
    return data.find(b => b.userId === user);
}

const getBusinessById = async (id) => {
    const data = await getData();
    return data.find(b => b.id === id);
}

const getBusinesses = async () => {
    return await getData();
}

const createBusiness = async(business, userId) => {
    business.userId = userId;
    const id = uuidv4();
    business.id = id;
    const businesses = await getData() || [];
    businesses.push(business);
    await updateData(businesses);
    return business;
}

const updateBusiness = async (id, business) => {
    const businesses = await getData();
    console.error(JSON.stringify(business), id);
    const _business = await businesses.find(b => b.id === id);
    if (_business) {
        Object.assign(_business, business);
        await updateData(businesses);
        return _business;
    }
    return 'no business';
}
    

module.exports = {
    getBusinessOfUser,
    createBusiness,
    updateBusiness,
    getBusinessById,
    getBusinesses,
}