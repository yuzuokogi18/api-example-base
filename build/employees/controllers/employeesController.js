"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployee = exports.updateEmployee = exports.createEmployee = exports.getEmployeeById = exports.getEmployees = void 0;
const employeesServices_1 = require("../services/employeesServices");
const getEmployees = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employees = yield employeesServices_1.EmployeesService.getAllEmployees();
        if (employees) {
            res.status(201).json(employees);
        }
        else {
            res.status(404).json({ message: 'Sin registros' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getEmployees = getEmployees;
const getEmployeeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employee = yield employeesServices_1.EmployeesService.getEmployeeById(parseInt(req.params.employees_id, 10));
        if (employee) {
            res.status(201).json(employee);
        }
        else {
            res.status(404).json({ message: 'No se encontró el empleado' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getEmployeeById = getEmployeeById;
const createEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newEmployee = yield employeesServices_1.EmployeesService.addEmployee(req.body);
        if (newEmployee) {
            res.status(201).json(newEmployee);
        }
        else {
            res.status(404).json({ message: 'Algo salio mal' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createEmployee = createEmployee;
const updateEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedEmployee = yield employeesServices_1.EmployeesService.modifyEmployee(parseInt(req.params.employees_id, 10), req.body);
        if (updatedEmployee) {
            res.status(201).json(updatedEmployee);
        }
        else {
            res.status(404).json({ message: 'Algo salio mal' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updateEmployee = updateEmployee;
const deleteEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield employeesServices_1.EmployeesService.deleteEmployee(parseInt(req.params.employees_id, 10));
        if (deleted) {
            res.status(201).json({ message: 'Se eliminó el empleado.' });
        }
        else {
            res.status(404).json({ message: 'Algo salio mal' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteEmployee = deleteEmployee;
