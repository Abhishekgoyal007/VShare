import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
    path:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    cloudinaryId:{
        type: String,
        required: false // Optional for backward compatibility
    }
});

const fileModel = mongoose.model('files', fileSchema);

export default fileModel;