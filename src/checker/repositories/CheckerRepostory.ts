import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Checker } from '../models/Checker';

export class CheckerRepository {
  
  public static async findAll(): Promise<Checker[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM checker', (error, results) => {
        if (error) {
          reject(error);
        } else {
          const checkers: Checker[] = results as Checker[];
          resolve(checkers);
        }
      });
    });
  }

  public static async findById(checker_id: number): Promise<Checker | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM checker WHERE checker_id = ?', [checker_id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          const checkers: Checker[] = results as Checker[];
          if (checkers.length > 0) {
            resolve(checkers[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async createChecker(checker: Checker): Promise<Checker> {
    const query = 'INSERT INTO checker (user_id, user_unit_id, arrivaltime, departuretime, created_at, updated_at, deleted) VALUES (?, ?, ?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
      connection.execute(query, [checker.user_id, checker.user_unit_id, checker.arrivaltime, checker.departuretime, checker.created_at, checker.updated_at, checker.deleted], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdCheckerId = result.insertId;
          const createdChecker: Checker = { ...checker, checker_id: createdCheckerId };
          resolve(createdChecker);
        }
      });
    });
  }

  public static async updateChecker(checker_id: number, checkerData: Checker): Promise<Checker | null> {
    const query = 'UPDATE checker SET user_id = ?, user_unit_id = ?, arrivaltime = ?, departuretime = ?, updated_at = ?, deleted = ? WHERE checker_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [checkerData.user_id, checkerData.user_unit_id, checkerData.arrivaltime, checkerData.departuretime, checkerData.updated_at, checkerData.deleted, checker_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedChecker: Checker = { ...checkerData, checker_id: checker_id };
            resolve(updatedChecker);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async deleteChecker(checker_id: number): Promise<boolean> {
    const query = 'DELETE FROM checker WHERE checker_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [checker_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.affectedRows > 0);
        }
      });
    });
  }
}
