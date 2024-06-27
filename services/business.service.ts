import Business from '../models/bussiness.model';

export const createBusiness = async (name: string, description: string, ownerId: string): Promise<any> => {
    const business = new Business({ name, description, owner: ownerId });
    await business.save();
    return business;
};

export const updateBusiness = async (id: string, name: string, description: string): Promise<any> => {
    return await Business.findByIdAndUpdate(id, { name, description }, { new: true });
};

export const deleteBusiness = async (id: string): Promise<void> => {
    await Business.findByIdAndDelete(id);
};
