import mongoose from 'mongoose';

const driverSchema = new mongoose.Schema(
  {
     number: {
      type: String,
      required: true,
   
    },
    rate: {
      type: String,
      required: true,
   
    },
    licences: {
      type: String,
      required: true,
    },
    seat: {
      type: String,
      required: true,
    },
     userrole: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    tel: {
      type: String,
      required: true,
    },
    nic: {
      type: String,
      required: true,
    },
    licenses: {
      type: String,
      required: true,
    },
    
    email: {
      type: String,
      required: true,
      unique: true,
    },
   
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    },
    
  },
  { timestamps: true }
);

const driver = mongoose.model('driver', driverSchema);

export default driver;