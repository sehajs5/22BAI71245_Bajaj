// qG8Ekp3UENEbRcq2

// sehajinsan07

const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema({
    is_success: {
        type: Boolean,
        default: false
    },
    user_id: {
        type: String, 
        required: true,
        default: "john_doe_17091999",
        validate: {
            validator: function(v) {
                return /^[a-zA-Z_]+\d{8}$/.test(v); 
            },
            message: props => `${props.value}invalid format (expected: fullname_ddmmyyyy).`
    },
},
    email: {
        type: String,
        default: "john@xyz.com"
    },
    roll_number: {
        type: String,
        default: "ABCD123"
    },
    numbers: [String],
    alphabets: [String],
    highest_alphabets: [String],
})

const getHighestAlphabet = (alphabets) => {
    if (!alphabets || alphabets.length === 0) return [];
    const highest = alphabets.map(a).sort().pop(); 
    return [highest]; 
};

dataSchema.pre("save", function (next) {
    this.highest_alphabet = getHighestAlphabet(this.alphabets);
    next();
});

const formatResponse = (data) => {
    return {
        is_success: data.is_success,
        user_id: data.user_id,
        email: data.email,
        roll_number: data.roll_number,
        numbers: data.numbers,
        alphabets: data.alphabets,
        highest_alphabet: data.highest_alphabet
    };
};


const DataModel = mongoose.model('Data', dataSchema)
module.exports =  { DataModel, formatResponse, getHighestAlphabet };