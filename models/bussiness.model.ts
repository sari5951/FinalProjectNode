// const mongoose = require('mongoose');

// const businessSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     description: { type: String, required: true },
//     owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
// });

// module.exports = mongoose.model('Business', businessSchema);
// business.model.ts

import mongoose from 'mongoose';

interface Business {
  name: string;
  description: string;
  owner: string; // Assuming 'owner' is of type string
}

const BusinessModel = mongoose.model<Business>('Business', new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  owner: { type: String, required: true },
}));

export default BusinessModel;
