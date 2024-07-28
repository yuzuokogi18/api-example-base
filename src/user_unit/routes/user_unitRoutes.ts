import { Router } from 'express';
import { getUserUnits, getUserUnitById, createUserUnit, updateUserUnit, deleteUserUnit } from '../controllers/user_unitControllers';
import { authMiddleware } from '../../shared/middlewares/auth';

const userUnitRoutes: Router = Router();

userUnitRoutes.get('/', authMiddleware, getUserUnits);
userUnitRoutes.get('/:user_unit_id', authMiddleware, getUserUnitById);
userUnitRoutes.post('/', authMiddleware, createUserUnit);
userUnitRoutes.put('/:user_unit_id', authMiddleware, updateUserUnit);
userUnitRoutes.delete('/:user_unit_id', authMiddleware, deleteUserUnit);

export default userUnitRoutes;
