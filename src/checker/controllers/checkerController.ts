import { Request, Response } from 'express';
import { CheckerService } from '../services/checkerService';

export const getCheckers = async (_req: Request, res: Response) => {
  try {
    const checkers = await CheckerService.getAllCheckers();
    if (checkers) {
      res.status(201).json(checkers);
    } else {
      res.status(404).json({ message: 'Sin registros' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getCheckerById = async (req: Request, res: Response) => {
  try {
    const checker = await CheckerService.getCheckerById(parseInt(req.params.checker_id, 10));
    if (checker) {
      res.status(201).json(checker);
    } else {
      res.status(404).json({ message: 'No se encontró el checador' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createChecker = async (req: Request, res: Response) => {
  try {
    const newChecker = await CheckerService.addChecker(req.body);
    if (newChecker) {
      res.status(201).json(newChecker);
    } else {
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateChecker = async (req: Request, res: Response) => {
  try {
    const updatedChecker = await CheckerService.modifyChecker(parseInt(req.params.checker_id, 10), req.body);
    if (updatedChecker) {
      res.status(201).json(updatedChecker);
    } else {
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteChecker = async (req: Request, res: Response) => {
  try {
    const deleted = await CheckerService.deleteChecker(parseInt(req.params.checker_id, 10));
    if (deleted) {
      res.status(201).json({ message: 'Se eliminó el checador.' });
    } else {
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
