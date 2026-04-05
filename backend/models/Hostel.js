import mongoose from 'mongoose';

const hostelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    location: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    warden: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    capacity: {
        type: Number,
        default: 0
    },
    images: [{
        type: String
    }]
}, {
    timestamps: true,
});

const Hostel = mongoose.model('Hostel', hostelSchema);

export default Hostel;
