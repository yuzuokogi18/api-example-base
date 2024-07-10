import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Unit } from '../models/Units';

export class UnitRepository {

  public static async findAll(): Promise<Unit[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT unit_id, series, brand, plate_number, employee_id, created_at, created_by, updated_at, updated_by, deleted FROM units', (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const units: Unit[] = results as Unit[];
          resolve(units);
        }
      });
    });
  }

  public static async findById(unit_id: number): Promise<Unit | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM units WHERE unit_id = ?', [unit_id], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const units: Unit[] = results as Unit[];
          if (units.length > 0) {
            resolve(units[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async findBySeries(series: string): Promise<Unit | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM units WHERE series = ?', [series], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const units: Unit[] = results as Unit[];
          if (units.length > 0) {
            resolve(units[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async createUnit(unit: Unit): Promise<Unit> {
    const query = 'INSERT INTO units (series, brand, plate_number, employee_id, created_at, created_by, updated_at, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
      connection.execute(query, [unit.series, unit.brand, unit.plate_number, unit.employee_id, unit.created_at, unit.created_by, unit.updated_at, unit.updated_by, unit.deleted], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdUnitId = result.insertId;
          const createdUnit: Unit = { ...unit, unit_id: createdUnitId };
          resolve(createdUnit);
        }
      });
    });
  }

  public static async updateUnit(unit_id: number, unitData: Unit): Promise<Unit | null> {
    const query = 'UPDATE units SET series = ?, brand = ?, plate_number = ?, employee_id = ?, updated_at = ?, updated_by = ?, deleted = ? WHERE unit_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [unitData.series, unitData.brand, unitData.plate_number, unitData.employee_id, unitData.updated_at, unitData.updated_by, unitData.deleted, unit_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedUnit: Unit = { ...unitData, unit_id: unit_id };
            resolve(updatedUnit);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async deleteUnit(unit_id: number): Promise<boolean> {
    const query = 'DELETE FROM units WHERE unit_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [unit_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            resolve(true); // Eliminación exitosa
          } else {
            resolve(false); // Si no se encontró la unidad a eliminar
          }
        }
      });
    });
  }
}
