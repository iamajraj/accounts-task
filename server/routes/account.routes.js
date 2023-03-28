const express = require("express");
const Account = require("../models/Account.model");

const router = express();

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

    try {
        const account = await Account.findById(id);

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

router.post("/accounts/tasks", async (req, res) => {
    const { date, number, text, account_id } = req.body;

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

        account.tasks.push({
            date,
            number,
            text,
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
