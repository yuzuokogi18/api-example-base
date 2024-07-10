import { Request, Response } from 'express';
import { unitsService } from '../services/unitsService';

export const getUnits = async (_req: Request, res: Response) => {
  try {
    const units = await unitsService.getAllUnits();
    if (units.length > 0) {
      res.status(200).json(units);
    } else {
      res.status(404).json({ message: 'Sin registros' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getUnitById = async (req: Request, res: Response) => {
  try {
    const unit = await unitsService.getUnitById(parseInt(req.params.unit_id, 10));
    if (unit) {
      res.status(200).json(unit);
    } else {
      res.status(404).json({ message: 'No se encontró la unidad' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createUnit = async (req: Request, res: Response) => {
  try {
    const newUnit = await unitsService.addUnit(req.body);
    res.status(201).json(newUnit);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUnit = async (req: Request, res: Response) => {
  try {
    const updatedUnit = await unitsService.modifyUnit(parseInt(req.params.unit_id, 10), req.body);
    if (updatedUnit) {
      res.status(200).json(updatedUnit);
    } else {
      res.status(404).json({ message: 'No se encontró la unidad' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUnit = async (req: Request, res: Response) => {
  try {
    const deleted = await unitsService.deleteUnit(parseInt(req.params.unit_id, 10));
    if (deleted) {
      res.status(200).json({ message: 'Se eliminó la unidad.' });
    } else {
      res.status(404).json({ message: 'No se encontró la unidad' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
