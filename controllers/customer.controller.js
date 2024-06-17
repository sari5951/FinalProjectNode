const { Router } = require('express');
const CustomerService = require('../services/customere.service');
const router = Router();

router.post('/',async(req,res)=>{
const {Name,Email,Phone}=req.body;
try{
    if(!Name|| ! Email||!Phone){
       res.status(400).send("not provided Name,Email,Phone ");

    }
    const _customere= await CustomerService.addCustomer(Name,Email,Phone);
    res.send(_customere);
}
catch (err) {
    console.error(`error in creating meeting ${err.message}`);
    res.status(500).send(err.message);
}


});
router.get('/',async(req,res)=>{
    try{
        const getCustomers=await CustomerService.getCustomers();
        res.send(getCustomers);
        
    }
    catch (error) {
        console.error(`error in fetching meeting list ${error.message}`);
        res.status(500).send(`error in fetching meeting list ${error.message}`);
    };

});
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params; 
        console.log(id); 
        const getCustId = await CustomerService.getId(id); 
        console.log(getCustId);
        res.send(getCustId);
    } catch (error) {
        console.error(`error in fetch service ${error.message}`);
        res.status(500).send(`error in fetch service ${error.message}`);
    }
});

module.exports = router;

