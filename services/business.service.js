const Business = require('../models/bussiness.model');

exports.createBusiness = async (name, description, ownerId) => {
    const business = new Business({ name, description, owner: ownerId });
    await business.save();
    return business;
};

exports.updateBusiness = async (id, name, description) => {
    return await Business.findByIdAndUpdate(id, { name, description }, { new: true });
};

exports.deleteBusiness = async (id) => {
    await Business.findByIdAndDelete(id);
};