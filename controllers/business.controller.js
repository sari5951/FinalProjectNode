const { Router } = require('express');
const BusinessService = require('../services/business.service');

const router = Router();

router.get('/:userId', async (req, res) => {
    try {
        const id = req.params.userId;
        const business = await BusinessService.getBusinessOfUser(id);
        res.send(business);
    } catch (error) {
        console.error(`error in fetch business ${error.message}`);
        res.status(500).send(`error in fetch business ${error.message}`);
    }  
});

router.get('/', async (req, res) => {
    try {
        const { business_id } = req.query
        if (business_id) {
            const business = await BusinessService.getBusinessById(business_id);
            res.send(business);
        } else {
            const businesses = await BusinessService.getBusinesses();
            res.send(businesses);
        }
        
    } catch (error) {
        console.error(`error in fetch business ${error.message}`);
        res.status(500).send(`error in fetch business ${error.message}`);
    }  
});

router.post('/', async(req, res) => {
    try {
        const userId = req.body.userId;
        const business = req.body.business;
        if (!business || !userId) {
            console.error('missing business or user id');
            return res.status(500).send('missing business or userId');
        }
        const newBusiness = await BusinessService.createBusiness(business, userId);
        res.send(newBusiness);
    } catch (error) {
        console.error(`error in create business ${error.message}`);
        res.status(500).send(`error in create business ${error.message}`);
    }    
});

router.put('/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const business = req.body.business;
        if (!id || !business) {
            console.error('missing business or id');
            return res.status(400).send('missing business or id');
        }
        const updatedBusiness = await BusinessService.updateBusiness(id, business);
        res.send(updatedBusiness);
    } catch (error) {
        console.error(`error in update business ${error.message}`);
        res.status(500).send(`error in update business ${error.message}`);
    }
    
})

module.exports = router;
