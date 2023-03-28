require("dotenv").config();
const express = require("express");
const cors = require("cors");
const accountRoutes = require("./routes/account.routes");
const connectDB = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.status(200).json({
        status: "OK",
    });
});

app.use("/api", accountRoutes);

const PORT = process.env.PORT || 5000;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT} 🚀`);
        });
    })
    .catch((err) => {
        console.log(err?.toString());
    });
