const express = require("express");

const app = express();

const PORT = 7777;

app.get("/", (req, res) => {
    res.send("Hello from the server!");
})

app.get("/bappu", (req, res) => {
    res.send("Bappu says Hello!");
});

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT} port!`);
});