const express = require("express");

const app = express();

app.use(express.json());
const router = require("./router.js");
app.use('/api/books', router);

const db = require("./dbconfig.js");

db.mongoose.connect(db.url).then(() => {
    console.log("Connected to the database!");
})


const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

