
// const { Router } = require('express');
// const router = Router();
// const OrderService = require('../services/order.servies')


// //להוספת הזמנה 
// router.post('/AddOrder', async (req, res) => {
//     try {
//         const { name, email, phone, kindEvent } = req.body;
//         if (!name || !email || !phone || !kindEvent) {
//             console.error('error in post user, no user provided');
//             return res.status(400).send('error in post user, no user provided');
//         }
//         const newOrder = await OrderService.addNewOrder(name, email, phone, kindEvent);
//         res.send(newOrder).send('sucseffuly!');
//     } catch (error) {
//         console.error(error.message)
//         res.status(500).send(error.message);
//     }

// });
// // לקבל מערך ההזמנות של הלקוחות 
// router.get('/', async (req, res) => {
//     try {
//         const { order_id } = req.query;
//         if (!order_id) {
//             res.status(400).send('no business_id provided as query param');
//         }
//         const ordering = await OrderService.getOrders(order_id);
//         res.send(ordering);
//     } catch (error) {
//         console.error(`error in fetching meeting list ${error.message}`);

//     }
// });
// module.exports = router;







//של הפרויקט נוד החדש!
import { Request, Response } from 'express';
import * as productService from '../services/service.service';

export const createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, price, business } = req.body;
        const product = await productService.createProduct(name, price, business);
        res.status(201).json(product);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { name, price } = req.body;
        const product = await productService.updateProduct(id, name, price);
        res.json(product);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        await productService.deleteProduct(id);
        res.status(204).end();
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
