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
exports.deleteChecker = exports.updateChecker = exports.createChecker = exports.getCheckerById = exports.getCheckers = void 0;
const checkerService_1 = require("../services/checkerService");
const getCheckers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkers = yield checkerService_1.CheckerService.getAllCheckers();
        res.status(200).json(checkers);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getCheckers = getCheckers;
const getCheckerById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checker = yield checkerService_1.CheckerService.getCheckerById(parseInt(req.params.checker_id, 10));
        if (checker) {
            res.status(200).json(checker);
        }
        else {
            res.status(404).json({ message: 'No se encontró el checador' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getCheckerById = getCheckerById;
const createChecker = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newChecker = yield checkerService_1.CheckerService.addChecker(req.body);
        res.status(201).json(newChecker);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createChecker = createChecker;
const updateChecker = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedChecker = yield checkerService_1.CheckerService.modifyChecker(parseInt(req.params.checker_id, 10), req.body);
        if (updatedChecker) {
            res.status(200).json(updatedChecker);
        }
        else {
            res.status(404).json({ message: 'Algo salió mal' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updateChecker = updateChecker;
const deleteChecker = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield checkerService_1.CheckerService.deleteChecker(parseInt(req.params.checker_id, 10));
        if (deleted) {
            res.status(200).json({ message: 'Se eliminó el checador.' });
        }
        else {
            res.status(404).json({ message: 'Algo salió mal' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteChecker = deleteChecker;
