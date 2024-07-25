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
exports.UserUnitRepository = void 0;
const database_1 = __importDefault(require("../../shared/config/database"));
class UserUnitRepository {
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                database_1.default.query('SELECT * FROM user_unit', (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const userUnits = results;
                        resolve(userUnits);
                    }
                });
            });
        });
    }
    static findById(user_unit_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                database_1.default.query('SELECT * FROM user_unit WHERE user_unit_id = ?', [user_unit_id], (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const userUnits = results;
                        if (userUnits.length > 0) {
                            resolve(userUnits[0]);
                        }
                        else {
                            resolve(null);
                        }
                    }
                });
            });
        });
    }
    static createUserUnit(userUnit) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'INSERT INTO user_unit (unit_id, user_id, created_at, updated_at, deleted) VALUES (?, ?, ?, ?, ?)';
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [userUnit.unit_id, userUnit.user_id, userUnit.created_at, userUnit.updated_at, userUnit.deleted], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const createdUserUnitId = result.insertId;
                        const createdUserUnit = Object.assign(Object.assign({}, userUnit), { user_unit_id: createdUserUnitId });
                        resolve(createdUserUnit);
                    }
                });
            });
        });
    }
    static updateUserUnit(user_unit_id, userUnitData) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'UPDATE user_unit SET unit_id = ?, user_id = ?, updated_at = ?, deleted = ? WHERE user_unit_id = ?';
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [userUnitData.unit_id, userUnitData.user_id, userUnitData.updated_at, userUnitData.deleted, user_unit_id], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (result.affectedRows > 0) {
                            const updatedUserUnit = Object.assign(Object.assign({}, userUnitData), { user_unit_id: user_unit_id });
                            resolve(updatedUserUnit);
                        }
                        else {
                            resolve(null);
                        }
                    }
                });
            });
        });
    }
    static deleteUserUnit(user_unit_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'DELETE FROM user_unit WHERE user_unit_id = ?';
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [user_unit_id], (error, result) => {
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
exports.UserUnitRepository = UserUnitRepository;
