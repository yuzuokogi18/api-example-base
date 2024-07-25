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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeesRepository = void 0;
const database_1 = __importDefault(require("../../shared/config/database"));
class EmployeesRepository {
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                database_1.default.query('SELECT * FROM employees', (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const employees = results;
                        resolve(employees);
                    }
                });
            });
        });
    }
    static findById(employees_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                database_1.default.query('SELECT * FROM employees WHERE employees_id = ?', [employees_id], (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const employees = results;
                        if (employees.length > 0) {
                            resolve(employees[0]);
                        }
                        else {
                            resolve(null);
                        }
                    }
                });
            });
        });
    }
    static createEmployee(employee) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'INSERT INTO employees (name, position,  user_id, created_at, updated_at, deleted) VALUES ( ?, ?, ?, ?, ?, ?)';
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [employee.name, employee.position, employee.user_id, employee.created_at, employee.updated_at, employee.deleted], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const createdEmployeeId = result.insertId;
                        const createdEmployee = Object.assign(Object.assign({}, employee), { employees_id: createdEmployeeId });
                        resolve(createdEmployee);
                    }
                });
            });
        });
    }
    static updateEmployee(employees_id, employeeData) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'UPDATE employees SET name = ?, position = ?,  user_id = ?, updated_at = ?, deleted = ? WHERE employees_id = ?';
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [employeeData.name, employeeData.position, employeeData.user_id, employeeData.updated_at, employeeData.deleted, employees_id], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (result.affectedRows > 0) {
                            const updatedEmployee = Object.assign(Object.assign({}, employeeData), { employees_id: employees_id });
                            resolve(updatedEmployee);
                        }
                        else {
                            resolve(null);
                        }
                    }
                });
            });
        });
    }
    static deleteEmployee(employees_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'DELETE FROM employees WHERE employees_id = ?';
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [employees_id], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(result.affectedRows > 0);
                    }
                });
            });
        });
    }
}
exports.EmployeesRepository = EmployeesRepository;
