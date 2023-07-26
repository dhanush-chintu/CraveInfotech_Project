const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const multer = require("multer");
const upload = multer();

let cars = require("./cars.json");
const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

// Setting path for public directory
const static_path = path.join(__dirname, "public");
app.use(express.static(static_path));
app.use(express.static("public/js"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/js/index.html");
});

// Handling GET request

app.get("/cars", (req, res) => {
  res.json(cars);
});

// Handling POST request

app.post("/cars", upload.none(), (req, res) => {
  console.log(req.body);
  let obj = {
    id: req.body.id,
    model: req.body.model,
    color: req.body.color,
    price: req.body.price,
  };
  cars.push(obj);
  const jsonString = JSON.stringify(cars);
  fs.writeFile("./cars.json", jsonString, (err) => {
    if (err) {
      console.log("Error writing file", err);
    } else {
      console.log("Successfully wrote file");
    }
  });
  res.json(obj);
});

// Handling DELETE request

app.post("/cars/delete", (req, res) => {
  let id = req.body.id;
  let obj = cars.find((o) => o.id == id);
  let index = cars.indexOf(obj);
  cars.splice(index, 1);
  const jsonString = JSON.stringify(cars);
  fs.writeFile("./cars.json", jsonString, (err) => {
    if (err) {
      console.log("Error writing file", err);
    } else {
      console.log("Successfully wrote file");
    }
  });
});
app.delete("/cars/:id", (req, res) => {
  let id = req.params.id;
  let obj = cars.find((o) => o.id == id);
  let index = cars.indexOf(obj);
  cars.splice(index, 1);
  const jsonString = JSON.stringify(cars);
  fs.writeFile("./cars.json", jsonString, (err) => {
    if (err) {
      console.log("Error writing file", err);
    } else {
      console.log("Successfully wrote file");
    }
  });
  res.json(obj);
});

// Handling PUT request
app.post("/cars/update", (req, res) => {
  let obj = {
    id: req.body.id,
    model: req.body.model,
    color: req.body.color,
    price: req.body.price,
  };
  let id = req.body.id;
  let changable = cars.find((o) => o.id == id);
  changable.id = obj.id;
  changable.model = obj.model;
  changable.color = obj.color;
  changable.price = obj.price;
  const jsonString = JSON.stringify(cars);
  fs.writeFile("./cars.json", jsonString, (err) => {
    if (err) {
      console.log("Error writing file", err);
    } else {
      console.log("Successfully wrote file");
    }
  });
});

app.put("/cars/update/:id", upload.none(), (req, res) => {
  let obj = {
    id: req.body.id,
    model: req.body.model,
    color: req.body.color,
    price: req.body.price,
  };
  let id = req.params.id;
  let changable = cars.find((o) => o.id == id);
  changable.model = obj.model;
  changable.color = obj.color;
  changable.price = obj.price;
  const jsonString = JSON.stringify(cars);
  fs.writeFile("./cars.json", jsonString, (err) => {
    if (err) {
      console.log("Error writing file", err);
    } else {
      console.log("Successfully wrote file");
    }
  });
  res.json(obj);
});

// Server Setup
app.listen(port, () => {
  console.log(`server is running at ${port}`);
});
