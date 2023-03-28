const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
    {
        date: {
            type: Date,
            required: true,
        },
        number: {
            type: Number,
            required: true,
        },
        text: {
            type: String,
            default: null,
        },
        image: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

const AccountSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        tasks: {
            type: [TaskSchema],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Account", AccountSchema);
