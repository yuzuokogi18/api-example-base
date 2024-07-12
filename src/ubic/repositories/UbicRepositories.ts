import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Ubic } from '../models/Ubic';

export class UbicRepository {

  public static async findAll(): Promise<Ubic[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM ubic WHERE deleted = 0', (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const ubics: Ubic[] = results as Ubic[];
          resolve(ubics);
        }
      });
    });
  }

  public static async findById(ubic_id: number): Promise<Ubic | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM ubic WHERE ubic_id = ? AND deleted = 0', [ubic_id], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const ubics: Ubic[] = results as Ubic[];
          if (ubics.length > 0) {
            resolve(ubics[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async createUbic(ubic: Ubic): Promise<Ubic> {
    const query = 'INSERT INTO ubic (unit_id, datetime, longitud, latitud, created_at, created_by, updated_at, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
      connection.execute(query, [ubic.unit_id, ubic.datetime, ubic.longitud, ubic.latitud, ubic.created_at, ubic.created_by, ubic.updated_at, ubic.updated_by, ubic.deleted], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdUbicId = result.insertId;
          const createdUbic: Ubic = { ...ubic, ubic_id: createdUbicId };
          resolve(createdUbic);
        }
      });
    });
  }

  public static async updateUbic(ubic_id: number, ubicData: Ubic): Promise<Ubic | null> {
    const query = 'UPDATE ubic SET unit_id = ?, datetime = ?, longitud = ?, latitud = ?, updated_at = ?, updated_by = ?, deleted = ? WHERE ubic_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [ubicData.unit_id, ubicData.datetime, ubicData.longitud, ubicData.latitud, ubicData.updated_at, ubicData.updated_by, ubicData.deleted, ubic_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedUbic: Ubic = { ...ubicData, ubic_id: ubic_id };
            resolve(updatedUbic);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async deleteUbic(ubic_id: number): Promise<boolean> {
    const query = 'UPDATE ubic SET deleted = 1 WHERE ubic_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [ubic_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            resolve(true); // Eliminación exitosa
          } else {
            resolve(false); // Si no se encontró el registro a eliminar
          }
        }
      });
    });
  }
}
