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
exports.EmployeesService = void 0;
const EmployeesRepository_1 = require("../repositories/EmployeesRepository");
const DateUtils_1 = require("../../shared/utils/DateUtils");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class EmployeesService {
    static getAllEmployees() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield EmployeesRepository_1.EmployeesRepository.findAll();
            }
            catch (error) {
                throw new Error(`Error al obtener empleados: ${error.message}`);
            }
        });
    }
    static getEmployeeById(employeesId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield EmployeesRepository_1.EmployeesRepository.findById(employeesId);
            }
            catch (error) {
                throw new Error(`Error al encontrar empleado: ${error.message}`);
            }
        });
    }
    static addEmployee(employee) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                employee.created_at = DateUtils_1.DateUtils.formatDate(new Date());
                employee.updated_at = DateUtils_1.DateUtils.formatDate(new Date());
                return yield EmployeesRepository_1.EmployeesRepository.createEmployee(employee);
            }
            catch (error) {
                throw new Error(`Error al crear empleado: ${error.message}`);
            }
        });
    }
    static modifyEmployee(employeesId, employeeData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const employeeFound = yield EmployeesRepository_1.EmployeesRepository.findById(employeesId);
                if (employeeFound) {
                    if (employeeData.name)
                        employeeFound.name = employeeData.name;
                    if (employeeData.position)
                        employeeFound.position = employeeData.position;
                    if (employeeData.user_id !== undefined)
                        employeeFound.user_id = employeeData.user_id;
                    if (employeeData.deleted !== undefined)
                        employeeFound.deleted = employeeData.deleted;
                    employeeFound.updated_at = DateUtils_1.DateUtils.formatDate(new Date());
                    return yield EmployeesRepository_1.EmployeesRepository.updateEmployee(employeesId, employeeFound);
                }
                else {
                    return null;
                }
            }
            catch (error) {
                throw new Error(`Error al modificar empleado: ${error.message}`);
            }
        });
    }
    static deleteEmployee(employeesId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield EmployeesRepository_1.EmployeesRepository.deleteEmployee(employeesId);
            }
            catch (error) {
                throw new Error(`Error al eliminar empleado: ${error.message}`);
            }
        });
    }
}
exports.EmployeesService = EmployeesService;
