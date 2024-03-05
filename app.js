const express = require("express");
const cors = require("cors"); 
const contactsRouter = require("./app/routes/contact.route");
const ApiError = require("./app/api-error");//

const app = express();
// Danh sach cac url co san
const validPaths = ['/', '/api/contacts'];///

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.json({ message: "Welcome to contact book application" });
});
app.use("/api/contacts", contactsRouter);
//
app.use((req, res, next) => {
    // Kiem tra url co trung voi url co an khong
    if(!validPaths.includes(req.url))///
        return next(new ApiError(404, "Resource not found"));
});
app.use((err, req, res, next) => {
    return res.json({
        status: err.statusCode || 500,
        message: err.message || "Internal Server Error",
    });
});
//

module.exports = app;