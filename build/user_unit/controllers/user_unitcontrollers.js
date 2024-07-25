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
exports.deleteUserUnit = exports.updateUserUnit = exports.createUserUnit = exports.getUserUnitById = exports.getUserUnits = void 0;
const user_unitServices_1 = require("../services/user_unitServices");
const getUserUnits = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userUnits = yield user_unitServices_1.UserUnitService.getAllUserUnits();
        if (userUnits) {
            res.status(200).json(userUnits);
        }
        else {
            res.status(404).json({ message: 'Sin registros' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getUserUnits = getUserUnits;
const getUserUnitById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userUnit = yield user_unitServices_1.UserUnitService.getUserUnitById(parseInt(req.params.user_unit_id, 10));
        if (userUnit) {
            res.status(200).json(userUnit);
        }
        else {
            res.status(404).json({ message: 'No se encontró la user_unit' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getUserUnitById = getUserUnitById;
const createUserUnit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUserUnit = yield user_unitServices_1.UserUnitService.addUserUnit(req.body);
        if (newUserUnit) {
            res.status(201).json(newUserUnit);
        }
        else {
            res.status(404).json({ message: 'Algo salio mal' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createUserUnit = createUserUnit;
const updateUserUnit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUserUnit = yield user_unitServices_1.UserUnitService.modifyUserUnit(parseInt(req.params.user_unit_id, 10), req.body);
        if (updatedUserUnit) {
            res.status(200).json(updatedUserUnit);
        }
        else {
            res.status(404).json({ message: 'Algo salio mal' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updateUserUnit = updateUserUnit;
const deleteUserUnit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield user_unitServices_1.UserUnitService.deleteUserUnit(parseInt(req.params.user_unit_id, 10));
        if (deleted) {
            res.status(200).json({ message: 'Se eliminó la user_unit.' });
        }
        else {
            res.status(404).json({ message: 'Algo salio mal' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteUserUnit = deleteUserUnit;
