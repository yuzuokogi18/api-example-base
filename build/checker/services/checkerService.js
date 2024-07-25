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
exports.CheckerService = void 0;
const CheckerRepostory_1 = require("../repositories/CheckerRepostory");
const DateUtils_1 = require("../../shared/utils/DateUtils");
class CheckerService {
    static getAllCheckers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield CheckerRepostory_1.CheckerRepository.findAll();
            }
            catch (error) {
                throw new Error(`Error al obtener checadores: ${error.message}`);
            }
        });
    }
    static getCheckerById(checkerId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield CheckerRepostory_1.CheckerRepository.findById(checkerId);
            }
            catch (error) {
                throw new Error(`Error al encontrar checador: ${error.message}`);
            }
        });
    }
    static addChecker(checker) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                checker.created_at = DateUtils_1.DateUtils.formatDate(new Date());
                checker.updated_at = DateUtils_1.DateUtils.formatDate(new Date());
                return yield CheckerRepostory_1.CheckerRepository.createChecker(checker);
            }
            catch (error) {
                throw new Error(`Error al crear checador: ${error.message}`);
            }
        });
    }
    static modifyChecker(checkerId, checkerData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const checkerFound = yield CheckerRepostory_1.CheckerRepository.findById(checkerId);
                if (checkerFound) {
                    if (checkerData.user_id)
                        checkerFound.user_id = checkerData.user_id;
                    if (checkerData.user_unit_id)
                        checkerFound.user_unit_id = checkerData.user_unit_id;
                    if (checkerData.arrivaltime)
                        checkerFound.arrivaltime = checkerData.arrivaltime;
                    if (checkerData.departuretime)
                        checkerFound.departuretime = checkerData.departuretime;
                    if (checkerData.deleted !== undefined)
                        checkerFound.deleted = checkerData.deleted;
                    checkerFound.updated_at = DateUtils_1.DateUtils.formatDate(new Date());
                    return yield CheckerRepostory_1.CheckerRepository.updateChecker(checkerId, checkerFound);
                }
                else {
                    return null;
                }
            }
            catch (error) {
                throw new Error(`Error al modificar checador: ${error.message}`);
            }
        });
    }
    static deleteChecker(checkerId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield CheckerRepostory_1.CheckerRepository.deleteChecker(checkerId);
            }
            catch (error) {
                throw new Error(`Error al eliminar checador: ${error.message}`);
            }
        });
    }
}
exports.CheckerService = CheckerService;
