const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Username is required!'],
        trim: true,
        minLength: [3, `Name should be atleast 3 charector!`],
        maxLength: [20, `Name should less then 20 charector!`],
    },
    dob: {
        type: Date,
        max: [new Date(), 'Invalid Date of birth!'],
        required: [true, 'Date of birth is required!'],
    },
    gender: {
        type: String,
        required: true,
        enum: {
            values: ['male', 'female', 'other'],
            message: 'Invalid gender!'
        }
    },
    mobile: {
        type: String,
        match: [
            /^(\+\d{1,3}[- ]?)?\d{10}$/,
            'Please enter a valid mobile number.'
        ]
    },
    emrg_num: {
        type: String,
        match: [
            /^(\+\d{1,3}[- ]?)?\d{10}$/,
            'Please enter a valid mobile number.'
        ]
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        validate: {
            validator: async (value) => {
                if (value) {
                    let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                    return emailReg.test(value)
                }
            },
            message: props => `Please fill a valid email address`
        },
    },
    blood_group: { type: String, default: '', trim: true },
    marital_status: { type: String, default: '', trim: true },
    occupation: { type: String, default: '', trim: true },
    religion: { type: String, default: '', trim: true },
    nationality: { type: String, default: '', trim: true },
    document: {
        document_type: { type: String, default: '', trim: true },
        document_number: { type: String, default: '', trim: true },
    },
    guardian: {
        guardian_type: { type: String, default: '', trim: true },
        guardian_name: { type: String, default: '', trim: true },
    },
    address: {
        address: { type: String, default: '', trim: true },
        city: { type: String, default: '', trim: true },
        country: { type: String, default: '', trim: true },
        pin_code: { type: String, default: '', trim: true },
        state: { type: String, default: '', trim: true },
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('customer', customerSchema)