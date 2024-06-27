// const businessService = require('../services/business.service');

// exports.createBusiness = async (req, res) => {
//     const { name, description } = req.body;
//     const business = await businessService.createBusiness(name, description, req.user.id);
//     res.status(201).json(business);
// };

// exports.updateBusiness = async (req, res) => {
//     const { id } = req.params;
//     const { name, description } = req.body;
//     const business = await businessService.updateBusiness(id, name, description);
//     res.json(business);
// };

// exports.deleteBusiness = async (req, res) => {
//     const { id } = req.params;
//     await businessService.deleteBusiness(id);
//     res.status(204).end();
// };
//TS
import { Request, Response } from 'express';
import businessService from '../services/business.service';

export const createBusiness = async (req: Request, res: Response) => {
    const { name, description } = req.body;
    const business = await businessService.createBusiness(name, description, req.user.id);
    res.status(201).json(business);
};

export const updateBusiness = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const business = await businessService.updateBusiness(id, name, description);
    res.json(business);
};

export const deleteBusiness = async (req: Request, res: Response) => {
    const { id } = req.params;
    await businessService.deleteBusiness(id);
    res.status(204).end();
};
