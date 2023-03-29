const express = require("express");
const Account = require("../models/account.model");
const formidable = require("express-formidable");
const cloudinary = require("../config/cloudinary");

const router = express.Router();

router.get("/accounts", async (req, res) => {
    try {
        const accounts = await Account.find({});

        res.status(200).json({
            accounts,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong.",
        });
    }
});

router.get("/accounts/:id", async (req, res) => {
    const { id } = req.params;

    const account = await Account.findById(id);
    try {
        if (!account)
            return res.status(404).json({
                message: "Account doesn't exists",
            });

        res.status(200).json({
            account,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong.",
        });
    }
});

router.post("/accounts", async (req, res) => {
    const { name } = req.body;

    if (!name)
        return res.status(400).json({
            message: "Please provide the account name",
        });

    try {
        const account = new Account({
            name: name,
        });

        await account.save();

        res.status(201).json({
            account,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong.",
        });
    }
});

router.post("/accounts/tasks", formidable(), async (req, res) => {
    const { date, number, text, account_id } = req.fields;

    if (!account_id)
        return res.status(400).json({
            message: "Please provide the account id!",
        });

    if (!date || !number)
        return res.status(400).json({
            message: "Date and Number fields are mandatory",
        });

    try {
        const account = await Account.findById(account_id);

        if (!account)
            return res.status(404).json({
                message: "Account doesn't exists",
            });

        let url;
        if (req.files?.image) {
            let path = req.files.image.path;
            const res = await cloudinary.uploader.upload(path, {
                public_id: account.tasks.length + 1 + "-" + account.name,
            });
            url = res.secure_url;
        }

        account.tasks.push({
            date,
            number,
            text,
            image: url,
        });

        await account.save();

        res.status(200).json({
            message: "Task has been added",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong.",
        });
    }
});

router.delete("/accounts/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const account = await Account.findById(id);

        if (!account)
            return res.status(404).json({
                message: "Account doesn't exists",
            });

        account.tasks.forEach(async (_, i) => {
            let path = i + 1 + "-" + account.name;
            await cloudinary.uploader.destroy(path);
        });

        await Account.findByIdAndDelete(id);

        res.status(200).json({
            message: "Account has been deleted",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong.",
        });
    }
});

module.exports = router;
