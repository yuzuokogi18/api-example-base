import { Router } from 'express';
import { getUserUnits, getUserUnitById, createUserUnit, updateUserUnit, deleteUserUnit } from '../controllers/user_unitcontrollers';

const userUnitRoutes: Router = Router();

userUnitRoutes.get('/', getUserUnits);
userUnitRoutes.get('/:user_unit_id', getUserUnitById);
userUnitRoutes.post('/', createUserUnit);
userUnitRoutes.put('/:user_unit_id', updateUserUnit);
userUnitRoutes.delete('/:user_unit_id', deleteUserUnit);

export default userUnitRoutes;
