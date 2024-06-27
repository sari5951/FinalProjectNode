import mongoose, { Schema, Document, Model, Types } from 'mongoose';

interface IMeeting extends Document {
  title: string;
  date: Date;
  location: string;
  description: string;
  attendees: Types.ObjectId[] | IUser['_id'][];
}

const meetingSchema: Schema<IMeeting> = new Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  attendees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
});

const Meeting: Model<IMeeting> = mongoose.model<IMeeting>('Meeting', meetingSchema);

export default Meeting;
