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
exports.UserUnitService = void 0;
const User_UnitRepostory_1 = require("../repositories/User_UnitRepostory");
const DateUtils_1 = require("../../shared/utils/DateUtils");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class UserUnitService {
    static getAllUserUnits() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield User_UnitRepostory_1.UserUnitRepository.findAll();
            }
            catch (error) {
                throw new Error(`Error al obtener user_units: ${error.message}`);
            }
        });
    }
    static getUserUnitById(user_unit_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield User_UnitRepostory_1.UserUnitRepository.findById(user_unit_id);
            }
            catch (error) {
                throw new Error(`Error al encontrar user_unit: ${error.message}`);
            }
        });
    }
    static addUserUnit(userUnit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                userUnit.created_at = DateUtils_1.DateUtils.formatDate(new Date());
                userUnit.updated_at = DateUtils_1.DateUtils.formatDate(new Date());
                return yield User_UnitRepostory_1.UserUnitRepository.createUserUnit(userUnit);
            }
            catch (error) {
                throw new Error(`Error al crear user_unit: ${error.message}`);
            }
        });
    }
    static modifyUserUnit(user_unit_id, userUnitData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userUnitFound = yield User_UnitRepostory_1.UserUnitRepository.findById(user_unit_id);
                if (userUnitFound) {
                    if (userUnitData.unit_id !== undefined)
                        userUnitFound.unit_id = userUnitData.unit_id;
                    if (userUnitData.user_id !== undefined)
                        userUnitFound.user_id = userUnitData.user_id;
                    if (userUnitData.deleted !== undefined)
                        userUnitFound.deleted = userUnitData.deleted;
                    userUnitFound.updated_at = DateUtils_1.DateUtils.formatDate(new Date());
                    return yield User_UnitRepostory_1.UserUnitRepository.updateUserUnit(user_unit_id, userUnitFound);
                }
                else {
                    return null;
                }
            }
            catch (error) {
                throw new Error(`Error al modificar user_unit: ${error.message}`);
            }
        });
    }
    static deleteUserUnit(user_unit_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield User_UnitRepostory_1.UserUnitRepository.deleteUserUnit(user_unit_id);
            }
            catch (error) {
                throw new Error(`Error al eliminar user_unit: ${error.message}`);
            }
        });
    }
}
exports.UserUnitService = UserUnitService;
