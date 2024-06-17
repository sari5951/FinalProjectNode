const fs = require('fs/promises');
const uuid = require('uuid');
const uuidv4 = uuid.v4;
const getData = async () => fs.readFile('./data/customer.json').then(data => JSON.parse(data));
const updateData = async (data) => fs.writeFile('./data/customer.json', JSON.stringify(data));

const addCustomer =async (name,email,phone)=>{
    const id = uuidv4();
    let customer={};
    const customers = await getData() || [];
    customer.id=id;
    customer.name=name;
    customer.email=email;
    customer.phone=phone;
    customers.push(customer);
    console.log("הלקוח התווסף בהצלחה");
    await updateData(customers);
    return  customer;


};
const getCustomers=async()=>{
    const customers= await getData();
    console.log('customers')
    return customers; 
};
const getId=async(id)=>{
    const custemerId = await getData();
    console.log(custemerId);
    console.log("id"+id);
    const _customer = await custemerId.find(c => c.id === id);
    console.log('dfdds');
    console.log(_customer);

    return _customer;
};
module.exports={
    addCustomer,
    getCustomers,
    getId
}

