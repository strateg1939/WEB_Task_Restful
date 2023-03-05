const db = require("../dbconfig.js")

module.exports = db.mongoose.model(
    "book",
    db.mongoose.Schema(
    {
        title: String,
        description: String,
        author: String,
        publishedDate: Date
    },
    { timestamps: false }
    )
);