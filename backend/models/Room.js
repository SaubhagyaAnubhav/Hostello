import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
    hostel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hostel',
        required: true,
    },
    roomNumber: {
        type: String,
        required: true,
    },
    capacity: {
        type: Number,
        required: true,
        default: 1,
    },
    type: {
        type: String,
        required: true,
    },
    pricePerMonth: {
        type: Number,
        required: true,
    },
    occupants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    isAvailable: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
});


const Room = mongoose.model('Room', roomSchema);

export default Room;
