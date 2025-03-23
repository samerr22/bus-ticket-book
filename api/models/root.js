import mongoose from 'mongoose';

const rootSchema = new mongoose.Schema(
  {
     root: {
      type: String,
      required: true,
   
    },
   
    
  },
  { timestamps: true }
);

const root = mongoose.model('root', rootSchema);

export default root;