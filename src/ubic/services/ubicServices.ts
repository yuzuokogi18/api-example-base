import { UbicRepository } from "../repositories/UbicRepositories";
import { Ubic } from "../models/Ubic";
import { DateUtils } from "../../shared/utils/DateUtils";
import dotenv from 'dotenv';

dotenv.config();

export class UbicService {
    public static async getAllUbics(): Promise<Ubic[]> {
        try {
            return await UbicRepository.findAll();
        } catch (error: any) {
            throw new Error(`Error al obtener ubicaciones: ${error.message}`);
        }
    }

    public static async getUbicById(ubicId: number): Promise<Ubic | null> {
        try {
            return await UbicRepository.findById(ubicId);
        } catch (error: any) {
            throw new Error(`Error al encontrar ubicación: ${error.message}`);
        }
    }

    public static async addUbic(ubic: Ubic) {
        try {
            ubic.created_at = DateUtils.formatDate(new Date());
            ubic.updated_at = DateUtils.formatDate(new Date());
            ubic.deleted = 0;
            return await UbicRepository.createUbic(ubic);
        } catch (error: any) {
            throw new Error(`Error al crear ubicación: ${error.message}`);
        }
    }

    public static async modifyUbic(ubicId: number, ubicData: Ubic) {
        try {
            const ubicFound = await UbicRepository.findById(ubicId);

            if (ubicFound) {
                if (ubicData.unit_id) {
                    ubicFound.unit_id = ubicData.unit_id;
                }
                if (ubicData.datetime) {
                    ubicFound.datetime = ubicData.datetime;
                }
                if (ubicData.longitud) {
                    ubicFound.longitud = ubicData.longitud;
                }
                if (ubicData.latitud) {
                    ubicFound.latitud = ubicData.latitud;
                }
                if (ubicData.deleted !== undefined) {
                    ubicFound.deleted = ubicData.deleted;
                }
            } else {
                return null;
            }

            ubicFound.updated_by = ubicData.updated_by;
            ubicFound.updated_at = DateUtils.formatDate(new Date());

            return await UbicRepository.updateUbic(ubicId, ubicFound);
        } catch (error: any) {
            throw new Error(`Error al modificar ubicación: ${error.message}`);
        }
    }

    public static async deleteUbic(ubicId: number): Promise<boolean> {
        try {
            return await UbicRepository.deleteUbic(ubicId);
        } catch (error: any) {
            throw new Error(`Error al eliminar ubicación: ${error.message}`);
        }
    }
}
