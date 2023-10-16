const { addEmployee, getEmployees, deleteEmployee, updateEmployee } = require("../controllers/employeeController");
const verifyToken = require("../middlewares/verifyToken");

const employeeRoutes = require("express").Router();

employeeRoutes.post("/employees", verifyToken, addEmployee);
employeeRoutes.get("/employees", verifyToken, getEmployees);
employeeRoutes.delete("/employees/:id", verifyToken, deleteEmployee);
employeeRoutes.put("/employees/:id", verifyToken, updateEmployee);

module.exports = employeeRoutes;