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
exports.UnitRepository = void 0;
const database_1 = __importDefault(require("../../shared/config/database"));
class UnitRepository {
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                database_1.default.query('SELECT * FROM unit', (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const units = results;
                        resolve(units);
                    }
                });
            });
        });
    }
    static findById(unit_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                database_1.default.query('SELECT * FROM unit WHERE unit_id = ?', [unit_id], (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const units = results;
                        if (units.length > 0) {
                            resolve(units[0]);
                        }
                        else {
                            resolve(null);
                        }
                    }
                });
            });
        });
    }
    static createUnit(unit) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'INSERT INTO unit (name, series,  marca, placa, created_at, updated_at, deleted) VALUES ( ?, ?, ?, ?, ?, ?, ?)';
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [unit.name, unit.series, unit.marca, unit.placa, unit.created_at, unit.updated_at, unit.deleted], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const createdUnitId = result.insertId;
                        const createdUnit = Object.assign(Object.assign({}, unit), { unit_id: createdUnitId });
                        resolve(createdUnit);
                    }
                });
            });
        });
    }
    static updateUnit(unit_id, unitData) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'UPDATE unit SET name = ?, series = ?,  marca = ?, placa = ?, updated_at = ?, deleted = ? WHERE unit_id = ?';
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [unitData.name, unitData.series, unitData.marca, unitData.placa, unitData.updated_at, unitData.deleted, unit_id], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (result.affectedRows > 0) {
                            const updatedUnit = Object.assign(Object.assign({}, unitData), { unit_id: unit_id });
                            resolve(updatedUnit);
                        }
                        else {
                            resolve(null);
                        }
                    }
                });
            });
        });
    }
    static deleteUnit(unit_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'DELETE FROM unit WHERE unit_id = ?';
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [unit_id], (error, result) => {
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
exports.UnitRepository = UnitRepository;
