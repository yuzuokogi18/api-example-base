import { Router } from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser, loginUser, checkUsername } from '../controllers/userControllers';
import { authMiddleware } from '../../shared/middlewares/auth';

const userRoutes: Router = Router();

userRoutes.post('/login', loginUser);

userRoutes.get('/', getUsers);
userRoutes.get('/:user_id', authMiddleware, getUserById);
userRoutes.post('/', createUser);
userRoutes.get('/check-username', checkUsername); // Corregido
userRoutes.put('/:user_id', updateUser);
userRoutes.delete('/:user_id', deleteUser);

export default userRoutes;