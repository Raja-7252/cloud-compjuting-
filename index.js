const express = require('express')
const app = express()
const globals = require('./globals')
const port = 3000
//const bodyParser = require('body-parser')

let employee_id = globals.id
let employee_name = globals.name
let employee_department = globals.department
let employee_salary = globals.salary

app.use(express.json())// Its required for body
// Show all employees details
app.get('/employee', (req, res) => {
    let employees = []
    for (let i = 0; i < employee_id.length; i++) {
        employees.push({
            id: employee_id[i],
            name: employee_name[i],
            department: employee_department[i],
            salary: employee_salary[i]
        })
    }
    res.send(employees)
})
// Show Specified Employee Details
app.get("/employee/:id", (req, res) => {
    const id = parseInt(req.params.id)// converts string into number(/id)
    const index = employee_id.indexOf(id)// get index number
    if (index === -1) {
        return res.status(404).send("Employee not found");
    }
    res.send({
        id: employee_id[index],
        name: employee_name[index],
        department: employee_department[index],
        salary: employee_salary[index]
    })
})

// deletes an employee with the specified id
app.delete('/employee/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const index = employee_id.indexOf(id)
    if (index === -1) {
        return res.status(404).send("Employee not found");
    }
    employee_id.splice(index, 1)
    employee_name.splice(index, 1)
    employee_department.splice(index, 1)
    employee_salary.splice(index, 1)
    res.send("Employee with id " + id + " has been deleted")
})

// Add a new employee

app.post("/employee/:id", (req, res) => {
    const id = parseInt(req.params.id)
    employee_id.push(id)
    employee_name.push(req.body.name)
    employee_department.push(req.body.department)
    employee_salary.push(req.body.salary)
    res.send("Employee added successfully")
})

// Update an existing employee

app.put('/employee/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const index = employee_id.indexOf(id)
    if (index === -1) {
        return res.status(404).send({ error: 'Employee not found' });
    }
    employee_id[index] = req.body.id
    employee_name[index] = req.body.name
    employee_department[index] = req.body.department
    employee_salary[index] = req.body.salary
    res.send({ message: 'Employee updated sucessfully ' })
})
//Listening to Port
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})
