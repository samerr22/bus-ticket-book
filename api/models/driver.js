import mongoose from 'mongoose';

const drivSchema = new mongoose.Schema(
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
      required: false,
    },
    seat: {
      type: String,
      required: true,
    },
     userrole: {
      type: String,
      
    },
    name: {
      type: String,
      required: true,
     
    },
    tel: {
      type: String,
      required: true,
    },
    nic: {
      type: String,
      required: true,
    },
    
    
    email: {
      type: String,
      required: true,
      
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

const driver = mongoose.model('driv', drivSchema);

export default driver;