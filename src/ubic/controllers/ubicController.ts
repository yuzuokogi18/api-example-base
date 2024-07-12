import { Request, Response } from 'express';
import { UbicService } from '../services/ubicServices';

export const getUbics = async (_req: Request, res: Response) => {
  try {
    const ubics = await UbicService.getAllUbics();
    if (ubics) {
      res.status(201).json(ubics);
    } else {
      res.status(404).json({ message: 'Sin registros' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getUbicById = async (req: Request, res: Response) => {
  try {
    const ubic = await UbicService.getUbicById(parseInt(req.params.ubic_id, 10));
    if (ubic) {
      res.status(201).json(ubic);
    } else {
      res.status(404).json({ message: 'No se encontró la ubicación' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createUbic = async (req: Request, res: Response) => {
  try {
    const newUbic = await UbicService.addUbic(req.body);
    if (newUbic) {
      res.status(201).json(newUbic);
    } else {
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUbic = async (req: Request, res: Response) => {
  try {
    const updatedUbic = await UbicService.modifyUbic(parseInt(req.params.ubic_id, 10), req.body);
    if (updatedUbic) {
      res.status(201).json(updatedUbic);
    } else {
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUbic = async (req: Request, res: Response) => {
  try {
    const deleted = await UbicService.deleteUbic(parseInt(req.params.ubic_id, 10));
    if (deleted) {
      res.status(201).json({ message: 'Se eliminó la ubicación.' });
    } else {
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
