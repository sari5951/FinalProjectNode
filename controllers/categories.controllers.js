const {Router}=require('express');
const router=Router();
const listCustemers=[{
    id:1,
    name:'dovi',
    phon:'0556765951',
    email:'s0777@gmail.com'
},
];

router.get('/',(req,res)=>{
    res.send(listCustemers);
});


router.post('/', (req, res) => {
    const customer = req.body;
    listCustemers.push(customer);
    res.send('Customer added successfully');
  });

  router.put('/:id', (req, res) => {
    const customerId = parseInt(req.params.id);
    const updatedCustomer = req.body;
  
    const customer = listCustemers.find(customer => customer.id === customerId);
  
    if (customer) {
      Object.assign(customer, updatedCustomer);
      res.send('Customer updated successfully');
    } else {
      res.status(404).send('Customer not found');
    }
  });
  

  router.delete('/:id',(req,res)=>{
    const {id}=req.params;
    const index=listCustemers.findIndex(c=>c.id===parseInt(id));
    listCustemers.splice(index,1);
    res.send()
  });



module.exports=router;