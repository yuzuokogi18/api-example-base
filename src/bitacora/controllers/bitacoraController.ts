import { Request, Response } from 'express';
import { BitacoraService } from '../services/bitacoraService';

export const getBitacoras = async (_req: Request, res: Response) => {
  try {
    const bitacoras = await BitacoraService.getAllBitacoras();
    if (bitacoras) {
      res.status(201).json(bitacoras);
    } else {
      res.status(404).json({ message: 'Sin registros' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getBitacoraById = async (req: Request, res: Response) => {
  try {
    const bitacora = await BitacoraService.getBitacoraById(parseInt(req.params.bitacora_id, 10));
    if (bitacora) {
      res.status(201).json(bitacora);
    } else {
      res.status(404).json({ message: 'No se encontró la bitácora' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createBitacora = async (req: Request, res: Response) => {
  try {
    const newBitacora = await BitacoraService.addBitacora(req.body);
    if (newBitacora) {
      res.status(201).json(newBitacora);
    } else {
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateBitacora = async (req: Request, res: Response) => {
  try {
    const updatedBitacora = await BitacoraService.modifyBitacora(parseInt(req.params.bitacora_id, 10), req.body);
    if (updatedBitacora) {
      res.status(201).json(updatedBitacora);
    } else {
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteBitacora = async (req: Request, res: Response) => {
  try {
    const deleted = await BitacoraService.deleteBitacora(parseInt(req.params.bitacora_id, 10));
    if (deleted) {
      res.status(201).json({ message: 'Se eliminó la bitácora.' });
    } else {
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
