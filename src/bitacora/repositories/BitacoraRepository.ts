import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Bitacora } from '../models/bitacora';

export class BitacoraRepository {

  public static async findAll(): Promise<Bitacora[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM bitacora WHERE deleted = 0', (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const bitacoras: Bitacora[] = results as Bitacora[];
          resolve(bitacoras);
        }
      });
    });
  }

  public static async findById(bitacora_id: number): Promise<Bitacora | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM bitacora WHERE bitacora_id = ? AND deleted = 0', [bitacora_id], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const bitacoras: Bitacora[] = results as Bitacora[];
          if (bitacoras.length > 0) {
            resolve(bitacoras[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async createBitacora(bitacora: Bitacora): Promise<Bitacora> {
    const query = 'INSERT INTO bitacora (datatime, destino, origen, rut, created_at, created_by, updated_at, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
      connection.execute(query, [bitacora.datatime, bitacora.destino, bitacora.origen, bitacora.rut, bitacora.created_at, bitacora.created_by, bitacora.updated_at, bitacora.updated_by, bitacora.deleted], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdBitacoraId = result.insertId;
          const createdBitacora: Bitacora = { ...bitacora, bitacora_id: createdBitacoraId };
          resolve(createdBitacora);
        }
      });
    });
  }

  public static async updateBitacora(bitacora_id: number, bitacoraData: Bitacora): Promise<Bitacora | null> {
    const query = 'UPDATE bitacora SET datatime = ?, destino = ?, origen = ?, rut = ?, updated_at = ?, updated_by = ?, deleted = ? WHERE bitacora_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [bitacoraData.datatime, bitacoraData.destino, bitacoraData.origen, bitacoraData.rut, bitacoraData.updated_at, bitacoraData.updated_by, bitacoraData.deleted, bitacora_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedBitacora: Bitacora = { ...bitacoraData, bitacora_id: bitacora_id };
            resolve(updatedBitacora);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async deleteBitacora(bitacora_id: number): Promise<boolean> {
    const query = 'UPDATE bitacora SET deleted = 1 WHERE bitacora_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [bitacora_id], (error, result: ResultSetHeader) => {
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
