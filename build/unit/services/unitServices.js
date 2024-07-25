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
exports.UnitService = void 0;
const UnitRepository_1 = require("../repositories/UnitRepository");
const DateUtils_1 = require("../../shared/utils/DateUtils");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class UnitService {
    static getAllUnits() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield UnitRepository_1.UnitRepository.findAll();
            }
            catch (error) {
                throw new Error(`Error al obtener unidades: ${error.message}`);
            }
        });
    }
    static getUnitById(unitId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield UnitRepository_1.UnitRepository.findById(unitId);
            }
            catch (error) {
                throw new Error(`Error al encontrar unidad: ${error.message}`);
            }
        });
    }
    static addUnit(unit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                unit.created_at = DateUtils_1.DateUtils.formatDate(new Date());
                unit.updated_at = DateUtils_1.DateUtils.formatDate(new Date());
                return yield UnitRepository_1.UnitRepository.createUnit(unit);
            }
            catch (error) {
                throw new Error(`Error al crear unidad: ${error.message}`);
            }
        });
    }
    static modifyUnit(unitId, unitData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const unitFound = yield UnitRepository_1.UnitRepository.findById(unitId);
                if (unitFound) {
                    if (unitData.name)
                        unitFound.name = unitData.name;
                    if (unitData.series)
                        unitFound.series = unitData.series;
                    if (unitData.marca !== undefined)
                        unitFound.marca = unitData.marca;
                    if (unitData.placa !== undefined)
                        unitFound.placa = unitData.placa;
                    if (unitData.deleted !== undefined)
                        unitFound.deleted = unitData.deleted;
                    unitFound.updated_at = DateUtils_1.DateUtils.formatDate(new Date());
                    return yield UnitRepository_1.UnitRepository.updateUnit(unitId, unitFound);
                }
                else {
                    return null;
                }
            }
            catch (error) {
                throw new Error(`Error al modificar unidad: ${error.message}`);
            }
        });
    }
    static deleteUnit(unitId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield UnitRepository_1.UnitRepository.deleteUnit(unitId);
            }
            catch (error) {
                throw new Error(`Error al eliminar unidad: ${error.message}`);
            }
        });
    }
}
exports.UnitService = UnitService;
