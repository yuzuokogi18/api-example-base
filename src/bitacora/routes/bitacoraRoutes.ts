import { Router } from 'express';
import { getBitacoras, getBitacoraById, createBitacora, updateBitacora, deleteBitacora } from '../controllers/bitacoraController';
import { authMiddleware } from '../../shared/middlewares/auth';

const bitacoraRoutes: Router = Router();

bitacoraRoutes.get('/', getBitacoras);
bitacoraRoutes.get('/:bitacora_id', authMiddleware, getBitacoraById);
bitacoraRoutes.post('/', createBitacora);
bitacoraRoutes.put('/:bitacora_id', updateBitacora);
bitacoraRoutes.delete('/:bitacora_id', deleteBitacora);

export default bitacoraRoutes;
