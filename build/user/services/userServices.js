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
exports.userService = void 0;
const UserRepository_1 = require("../repositories/UserRepository");
const DateUtils_1 = require("../../shared/utils/DateUtils");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secretKey = process.env.SECRET || "";
const saltRounds = 10;
class userService {
    static login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.getUserByUsername(username);
                if (!user) {
                    return null;
                }
                const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
                if (!passwordMatch) {
                    return null;
                }
                const payload = {
                    user_id: user.user_id,
                    role_id: user.role_id,
                    username: user.username
                };
                return yield jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: '5m' });
            }
            catch (error) {
                throw new Error(`Error logging in: ${error.message}`);
            }
        });
    }
    static getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield UserRepository_1.UserRepository.findAll();
            }
            catch (error) {
                throw new Error(`Error getting users: ${error.message}`);
            }
        });
    }
    static getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield UserRepository_1.UserRepository.findById(userId);
            }
            catch (error) {
                throw new Error(`Error finding user: ${error.message}`);
            }
        });
    }
    static getUserByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield UserRepository_1.UserRepository.findByUsername(username);
            }
            catch (error) {
                throw new Error(`Error finding user: ${error.message}`);
            }
        });
    }
    static addUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const salt = yield bcrypt_1.default.genSalt(saltRounds);
                user.created_at = DateUtils_1.DateUtils.formatDate(new Date());
                user.updated_at = DateUtils_1.DateUtils.formatDate(new Date());
                user.password = yield bcrypt_1.default.hash(user.password, salt);
                return yield UserRepository_1.UserRepository.createUser(user);
            }
            catch (error) {
                throw new Error(`Error creating user: ${error.message}`);
            }
        });
    }
    static modifyUser(userId, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userFound = yield UserRepository_1.UserRepository.findById(userId);
                const salt = yield bcrypt_1.default.genSalt(saltRounds);
                if (userFound) {
                    if (userData.name) {
                        userFound.name = userData.name;
                    }
                    if (userData.password) {
                        userFound.password = yield bcrypt_1.default.hash(userData.password, salt);
                    }
                    if (userData.role_id) {
                        userFound.role_id = userData.role_id;
                    }
                    if (userData.deleted !== undefined) {
                        userFound.deleted = userData.deleted;
                    }
                }
                else {
                    return null;
                }
                userFound.updated_at = DateUtils_1.DateUtils.formatDate(new Date());
                return yield UserRepository_1.UserRepository.updateUser(userId, userFound);
            }
            catch (error) {
                throw new Error(`Error updating user: ${error.message}`);
            }
        });
    }
    static deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield UserRepository_1.UserRepository.deleteUser(userId);
            }
            catch (error) {
                throw new Error(`Error deleting user: ${error.message}`);
            }
        });
    }
}
exports.userService = userService;
