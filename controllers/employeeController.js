const Employee = require("../models/employeeModel");

exports.addEmployee = async (req, res) => {
  const { firstName, lastName, email, department, salary } = req.body;
  try {
    const new_user = await Employee.create({
      firstName,
      lastName,
      email,
      department,
      salary,
    });
    return res.status(201).json({ message: "Success", new_user });
  } catch (error) {
    return res.status(404).json(error);
  }
};

exports.getEmployees = async (req, res) => {
    const { filter, sort } = req.query;

    try {
      let query = {};
  
      if (filter && ['Tech', 'Marketing', 'Operations'].includes(filter)) {
        query.department = filter;
      }
  
      let sortOption = 'salary';
      if (sort === 'Descending') {
        sortOption = '-' + sortOption;
      }
  
      const employees = await Employee.find(query).sort(sortOption);
  
      res.status(200).json(employees);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const to_delete = await Employee.findByIdAndRemove(id);
    return res.status(200).json({ message: "Deleted", to_delete });
  } catch (error) {
    return res.status(404).json(error);
  }
};

exports.updateEmployee = async (req, res) => {
  const body = req.body;
  const { id } = req.params;
  try {
    const to_delete = await Employee.findByIdAndUpdate(id, body);
    return res.status(200).json({ message: "Updated", to_delete });
  } catch (error) {
    return res.status(404).json(error);
  }
};
