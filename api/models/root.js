import mongoose from 'mongoose';

const RootSchema = new mongoose.Schema(
  {
     root: {
      type: String,
      required: true,
   
    },
   
    
  },
  { timestamps: true }
);

const Root = mongoose.model('Root', RootSchema);

export default Root;