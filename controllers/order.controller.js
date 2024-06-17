
const { Router } = require('express');
const router = Router();
const OrderService = require('../services/order.servies')


//להוספת הזמנה 
router.post('/AddOrder', async (req, res) => {
    try {
        const { name, email, phone, kindEvent } = req.body;
        if (!name || !email || !phone || !kindEvent) {
            console.error('error in post user, no user provided');
            return res.status(400).send('error in post user, no user provided');
        }
        const newOrder = await OrderService.addNewOrder(name, email, phone, kindEvent);
        res.send(newOrder).send('sucseffuly!');
    } catch (error) {
        console.error(error.message)
        res.status(500).send(error.message);
    }

});
// לקבל מערך ההזמנות של הלקוחות 
router.get('/', async (req, res) => {
    try {
        const { order_id } = req.query;
        if (!order_id) {
            res.status(400).send('no business_id provided as query param');
        }
        const ordering = await OrderService.getOrders(order_id);
        res.send(ordering);
    } catch (error) {
        console.error(`error in fetching meeting list ${error.message}`);

    }
});
module.exports = router;