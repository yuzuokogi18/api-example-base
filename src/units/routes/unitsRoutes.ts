import { Router } from 'express';
import { getUnits, getUnitById, createUnit, updateUnit, deleteUnit } from '../controllers/unitsController';
import { authMiddleware } from '../../shared/middlewares/auth';

const unitsRoutes: Router = Router();

unitsRoutes.get('/', getUnits);
unitsRoutes.get('/:unit_id', authMiddleware, getUnitById);
unitsRoutes.post('/', createUnit);
unitsRoutes.put('/:unit_id', updateUnit);
unitsRoutes.delete('/:unit_id', deleteUnit);

export default unitsRoutes;
