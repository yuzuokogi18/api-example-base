import { Router } from 'express';
import { getCheckers, getCheckerById, createChecker, updateChecker, deleteChecker } from '../controllers/checkerController';
import { authMiddleware } from '../../shared/middlewares/auth';

const checkerRoutes: Router = Router();

checkerRoutes.get('/', getCheckers);
checkerRoutes.get('/:checker_id', authMiddleware, getCheckerById);
checkerRoutes.post('/', createChecker);
checkerRoutes.put('/:checker_id', updateChecker);
checkerRoutes.delete('/:checker_id', deleteChecker);

export default checkerRoutes;
