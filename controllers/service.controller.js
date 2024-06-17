const { Router } = require('express');
const ServicesService = require('../services/service.service');

const router = Router();

router.get('/', async (req, res) => {
    
    try {
        const { business_id } = req.query;
        if (!business_id) {
            return res.status(400).send('missing business id as query parameter');
        }
        const services = await ServicesService.getServices(business_id);
        res.send(services);
    } catch (error) {
        console.error(`error in fetch services ${error.message}`);
        res.status(500).send(`error in fetch services ${error.message}`);
    }  
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const service = await ServicesService.getService(id);
        res.send(service);
    } catch (error) {
        console.error(`error in fetch service ${error.message}`);
        res.status(500).send(`error in fetch service ${error.message}`);
    }  
});

router.put('/:id', async (req, res) => {
    try {
        const { service } = req.body;
        const { id } = req.params;
        if (!id || !service) {
            return res.status(400).send('no id or no service data provided');
        }
        const _service = await ServicesService.updateService(id, service);
        return res.send(_service);
    } catch (error) {
        console.error(`error in update service ${error.message}`);
        res.status(500).send(`error in update service ${error.message}`);
    }  
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await ServicesService.deleteService(id);
        res.send('deleted');
    } catch (error) {
        console.error(`error in delete service ${error.message}`);
        res.status(500).send(`error in delete service ${error.message}`);
    }  
})

router.post('/', async (req, res) => {
    const { business_id, name, service } = req.body;
    try {
        if (!business_id || !name || !service) {
            return res.status(400).send('business_id, name & service must be provided');
        }
        const _service = await ServicesService.addService(business_id, name, service);
        res.send(_service);
    } catch (err) {
        console.error(`error in create service ${err.message}`)
        res.status(500).send(err.message);
    }
    

})

module.exports = router;
