import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { User } from '../models/User';

export class UserRepository {

  public static async findAll(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT user_id, role_id, name, address, phone_number, age, username, password, created_at, updated_at, deleted FROM user', (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const user: User[] = results as User[];
          resolve(user);
        }
      });
    });
  }

  public static async findById(user_id: number): Promise<User | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM user WHERE user_id = ?', [user_id], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const user: User[] = results as User[];
          if (user.length > 0) {
            resolve(user[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async findByUsername(username: string): Promise<User | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM user WHERE username = ?', [username], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const user: User[] = results as User[];
          if (user.length > 0) {
            resolve(user[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async createUser(user: User): Promise<User> {
    const query = 'INSERT INTO user (name, address, phone_number, age, role_id, username, password, created_at, updated_at, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
      connection.execute(query, [user.name, user.address, user.phone_number, user.age, user.role_id, user.username, user.password, user.created_at, user.updated_at, user.deleted], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdUserId = result.insertId;
          const createdUser: User = { ...user, user_id: createdUserId };
          resolve(createdUser);
        }
      });
    });
  }

  public static async updateUser(user_id: number, userData: User): Promise<User | null> {
    const query = 'UPDATE user SET name = ?, address = ?, phone_number = ?, age = ?, role_id = ?, username = ?, password = ?, updated_at = ?, deleted = ? WHERE user_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [userData.name, userData.address, userData.phone_number, userData.age, userData.role_id, userData.username, userData.password, userData.updated_at, userData.deleted, user_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedUser: User = { ...userData, user_id: user_id };
            resolve(updatedUser);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async deleteUser(user_id: number): Promise<boolean> {
    const query = 'DELETE FROM user WHERE user_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [user_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            resolve(true); // Eliminación exitosa
          } else {
            resolve(false); // Si no se encontró el usuario a eliminar
          }
        }
      });
    });
  }

}