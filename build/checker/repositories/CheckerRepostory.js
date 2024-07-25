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
exports.CheckerRepository = void 0;
const database_1 = __importDefault(require("../../shared/config/database"));
class CheckerRepository {
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                database_1.default.query('SELECT * FROM checker', (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const checkers = results;
                        resolve(checkers);
                    }
                });
            });
        });
    }
    static findById(checker_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                database_1.default.query('SELECT * FROM checker WHERE checker_id = ?', [checker_id], (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const checkers = results;
                        if (checkers.length > 0) {
                            resolve(checkers[0]);
                        }
                        else {
                            resolve(null);
                        }
                    }
                });
            });
        });
    }
    static createChecker(checker) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'INSERT INTO checker (user_id, user_unit_id, arrivaltime, departuretime, created_at, updated_at, deleted) VALUES (?, ?, ?, ?, ?, ?, ?)';
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [checker.user_id, checker.user_unit_id, checker.arrivaltime, checker.departuretime, checker.created_at, checker.updated_at, checker.deleted], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const createdCheckerId = result.insertId;
                        const createdChecker = Object.assign(Object.assign({}, checker), { checker_id: createdCheckerId });
                        resolve(createdChecker);
                    }
                });
            });
        });
    }
    static updateChecker(checker_id, checkerData) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'UPDATE checker SET user_id = ?, user_unit_id = ?, arrivaltime = ?, departuretime = ?, updated_at = ?, deleted = ? WHERE checker_id = ?';
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [checkerData.user_id, checkerData.user_unit_id, checkerData.arrivaltime, checkerData.departuretime, checkerData.updated_at, checkerData.deleted, checker_id], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (result.affectedRows > 0) {
                            const updatedChecker = Object.assign(Object.assign({}, checkerData), { checker_id: checker_id });
                            resolve(updatedChecker);
                        }
                        else {
                            resolve(null);
                        }
                    }
                });
            });
        });
    }
    static deleteChecker(checker_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'DELETE FROM checker WHERE checker_id = ?';
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [checker_id], (error, result) => {
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
exports.CheckerRepository = CheckerRepository;
