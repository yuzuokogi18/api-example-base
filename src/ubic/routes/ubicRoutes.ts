import { Router } from 'express';
import { getUbics, getUbicById, createUbic, updateUbic, deleteUbic } from '../controllers/ubicController';
import { authMiddleware } from '../../shared/middlewares/auth';

const ubicRoutes: Router = Router();

ubicRoutes.get('/', getUbics);
ubicRoutes.get('/:ubic_id', authMiddleware, getUbicById);
ubicRoutes.post('/', createUbic);
ubicRoutes.put('/:ubic_id', updateUbic);
ubicRoutes.delete('/:ubic_id', deleteUbic);

export default ubicRoutes;
