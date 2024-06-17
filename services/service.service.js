const fs = require('fs/promises');
const uuid = require('uuid');
const uuidv4 = uuid.v4;


const getData = async () => fs.readFile('./data/services.json').then(data => JSON.parse(data));
const updateData = async (data) => fs.writeFile('./data/services.json', JSON.stringify(data));


const addService = async(businessId, name, service) => {

    const id = uuidv4();
    service.id = id;
    const services = await getData() || [];
    const exists = services.find(s => s.businessId === businessId && s.name === name);
    if (exists) {
        throw new Error('service already exists');
    }
    service.name = name;
    service.businessId = businessId;
    services.push(service);
    await updateData(services);
    return service;
}

const updateService = async (id, service) => {
    const services = await getData();
    const _service = await services.find(s => s.id === id);
    Object.assign(_service, service);
    await updateData(services);
    return _service;
}

const getService = async (id) => {
    const services = await getData();
    const _service = await services.find(s => s.id === id);
    return _service;
}

const getServices = async (businessId) => {
    const services = await getData();
    const _services = await services.filter(s => s.businessId === businessId);
    return _services;
}

const deleteService = async (id) => {
    const services = await getData();
    const index = await services.findIndex(s => s.id === id);
    services.splice(index, 1);
    await updateData(services);
}
module.exports = {
    addService,
    deleteService,
    updateService,
    getService,
    getServices,
}