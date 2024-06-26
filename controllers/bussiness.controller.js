const businessService = require('../services/business.service');

exports.createBusiness = async (req, res) => {
    const { name, description } = req.body;
    const business = await businessService.createBusiness(name, description, req.user.id);
    res.status(201).json(business);
};

exports.updateBusiness = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const business = await businessService.updateBusiness(id, name, description);
    res.json(business);
};

exports.deleteBusiness = async (req, res) => {
    const { id } = req.params;
    await businessService.deleteBusiness(id);
    res.status(204).end();
};