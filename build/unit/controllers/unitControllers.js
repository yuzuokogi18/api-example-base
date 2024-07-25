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
exports.deleteUnit = exports.updateUnit = exports.createUnit = exports.getUnitById = exports.getUnits = void 0;
const unitServices_1 = require("../services/unitServices");
const getUnits = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const units = yield unitServices_1.UnitService.getAllUnits();
        if (units) {
            res.status(201).json(units);
        }
        else {
            res.status(404).json({ message: 'Sin registros' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getUnits = getUnits;
const getUnitById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const unit = yield unitServices_1.UnitService.getUnitById(parseInt(req.params.unit_id, 10));
        if (unit) {
            res.status(201).json(unit);
        }
        else {
            res.status(404).json({ message: 'No se encontró la unidad' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getUnitById = getUnitById;
const createUnit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUnit = yield unitServices_1.UnitService.addUnit(req.body);
        if (newUnit) {
            res.status(201).json(newUnit);
        }
        else {
            res.status(404).json({ message: 'Algo salio mal' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createUnit = createUnit;
const updateUnit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUnit = yield unitServices_1.UnitService.modifyUnit(parseInt(req.params.unit_id, 10), req.body);
        if (updatedUnit) {
            res.status(201).json(updatedUnit);
        }
        else {
            res.status(404).json({ message: 'Algo salio mal' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updateUnit = updateUnit;
const deleteUnit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield unitServices_1.UnitService.deleteUnit(parseInt(req.params.unit_id, 10));
        if (deleted) {
            res.status(201).json({ message: 'Se eliminó la unidad.' });
        }
        else {
            res.status(404).json({ message: 'Algo salio mal' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteUnit = deleteUnit;
