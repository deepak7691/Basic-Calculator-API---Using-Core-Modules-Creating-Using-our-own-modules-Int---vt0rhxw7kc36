const express = require("express");
const app = express();

// To Read The Contents of the Body
app.use(express.json());

const port = 3000;

// Function to check if a number is underflow
function isUnderflow(parameter) {
  if (parameter < -1000000) {
    return true;
  }
  return false;
}

// Function to check if a number is overflow
function isOverflow(parameter) {
  if (parameter > 1000000) {
    return true;
  }
  return false;
}

// Function to validate the request data
function validateRequest(num1, num2, result) {
  if (typeof num1 === "string" || typeof num2 === "string") {
    return {
      status: "error",
      message: "Invalid data types",
    };
  } else if (isOverflow(num1) || isOverflow(num2) || isOverflow(result)) {
    return {
      status: "error",
      message: "Overflow",
    };
  } else if (isUnderflow(num1) || isUnderflow(num2) || isUnderflow(result)) {
    return {
      status: "error",
      message: "Underflow",
    };
  } else {
    return null;
  }
}

// Route for handling root endpoint
app.get("/", function (req, res) {
  res.send("Hello world!");
});

// Route for handling addition operation
app.post("/add", function (req, res) {
  // Read the request body data
  const { num1, num2 } = req.body;
  const sum = num1 + num2;
  const requestNotValidated = validateRequest(num1, num2, sum);
  if (requestNotValidated) {
    res.send(requestNotValidated);
  } else {
    // Create a response
    const response = {
      status: "success",
      message: `The sum of the given two numbers`,
      sum: sum,
    };
    res.send(response);
  }
});

// Route for handling subtraction operation
app.post("/sub", function (req, res) {
  // Read the request body data
  const { num1, num2 } = req.body;
  const difference = num1 - num2;
  const requestNotValidated = validateRequest(num1, num2, difference);
  if (requestNotValidated) {
    res.send(requestNotValidated);
  } else {
    // Create a response
    const response = {
      status: "success",
      message: `The difference of the given two numbers`,
      difference: difference,
    };
    res.send(response);
  }
});

// Route for handling multiplication operation
app.post("/multiply", function (req, res) {
  // Read the request body data
  const { num1, num2 } = req.body;
  const result = num1 * num2;
  const requestNotValidated = validateRequest(num1, num2, result);
  if (requestNotValidated) {
    res.send(requestNotValidated);
  } else {
    // Create a response
    const response = {
      status: "success",
      message: `The product of the given numbers`,
      result: result,
    };
    res.send(response);
  }
});

// Route for handling division operation
app.post("/divide", function (req, res) {
  // Read the request body data
  const { num1, num2 } = req.body;
  const result = num1 / num2;
  const requestNotValidated = validateRequest(num1, num2, result);

  if (num2 === 0) {
    res.send({
      status: "error",
      message: "Cannot divide by zero",
    });
  } else if (requestNotValidated) {
    res.send(requestNotValidated);
  } else {
    //Create A Response
    const response = {
      status: "success",
      message: `The division of given numbers`,
      result: result,
    };
    //3. Send the Response
    res.send(response);
  }
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
