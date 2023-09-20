import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    url: {
        type: String,
        required: true,
    },
});

export default mongoose.model("Object", userSchema);