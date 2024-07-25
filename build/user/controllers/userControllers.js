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
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getUsers = exports.loginUser = void 0;
const userServices_1 = require("../services/userServices");
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const token = yield userServices_1.userService.login(username, password);
        if (!token) {
            res.status(401).json({ message: 'Invalid username or password' });
        }
        else {
            res.status(200).json({ token });
        }
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.loginUser = loginUser;
const getUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userServices_1.userService.getAllUsers();
        if (users) {
            res.status(200).json(users);
        }
        else {
            res.status(404).json({ message: 'No records found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getUsers = getUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userServices_1.userService.getUserById(parseInt(req.params.user_id, 10));
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getUserById = getUserById;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield userServices_1.userService.addUser(req.body);
        if (newUser) {
            res.status(201).json(newUser);
        }
        else {
            res.status(400).json({ message: 'Something went wrong' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield userServices_1.userService.modifyUser(parseInt(req.params.user_id, 10), req.body);
        if (updatedUser) {
            res.status(200).json(updatedUser);
        }
        else {
            res.status(400).json({ message: 'Something went wrong' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield userServices_1.userService.deleteUser(parseInt(req.params.user_id, 10));
        if (deleted) {
            res.status(200).json({ message: 'User deleted successfully.' });
        }
        else {
            res.status(400).json({ message: 'Something went wrong' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteUser = deleteUser;
