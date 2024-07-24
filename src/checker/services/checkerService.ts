import { CheckerRepository } from '../repositories/CheckerRepostory';
import { Checker } from '../models/Checker';
import { DateUtils } from '../../shared/utils/DateUtils';

export class CheckerService {
  public static async getAllCheckers(): Promise<Checker[]> {
    try {
      return await CheckerRepository.findAll();
    } catch (error: any) {
      throw new Error(`Error al obtener checadores: ${error.message}`);
    }
  }

  public static async getCheckerById(checkerId: number): Promise<Checker | null> {
    try {
      return await CheckerRepository.findById(checkerId);
    } catch (error: any) {
      throw new Error(`Error al encontrar checador: ${error.message}`);
    }
  }

  public static async addChecker(checker: Checker): Promise<Checker> {
    try {
      checker.created_at = DateUtils.formatDate(new Date());
      checker.updated_at = DateUtils.formatDate(new Date());
      return await CheckerRepository.createChecker(checker);
    } catch (error: any) {
      throw new Error(`Error al crear checador: ${error.message}`);
    }
  }

  public static async modifyChecker(checkerId: number, checkerData: Checker): Promise<Checker | null> {
    try {
      const checkerFound = await CheckerRepository.findById(checkerId);

      if (checkerFound) {
        if (checkerData.user_id) checkerFound.user_id = checkerData.user_id;
        if (checkerData.user_unit_id) checkerFound.user_unit_id = checkerData.user_unit_id;
        if (checkerData.arrivaltime) checkerFound.arrivaltime = checkerData.arrivaltime;
        if (checkerData.departuretime) checkerFound.departuretime = checkerData.departuretime;
        if (checkerData.deleted !== undefined) checkerFound.deleted = checkerData.deleted;
        
        checkerFound.updated_at = DateUtils.formatDate(new Date());
        return await CheckerRepository.updateChecker(checkerId, checkerFound);
      } else {
        return null;
      }
    } catch (error: any) {
      throw new Error(`Error al modificar checador: ${error.message}`);
    }
  }

  public static async deleteChecker(checkerId: number): Promise<boolean> {
    try {
      return await CheckerRepository.deleteChecker(checkerId);
    } catch (error: any) {
      throw new Error(`Error al eliminar checador: ${error.message}`);
    }
  }
}
