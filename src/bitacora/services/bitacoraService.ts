import { BitacoraRepository } from "../repositories/BitacoraRepository";
import { Bitacora } from "../models/bitacora";
import { DateUtils } from "../../shared/utils/DateUtils";
import dotenv from 'dotenv';

dotenv.config();

export class BitacoraService {
    public static async getAllBitacoras(): Promise<Bitacora[]> {
        try {
            return await BitacoraRepository.findAll();
        } catch (error: any) {
            throw new Error(`Error al obtener bitácoras: ${error.message}`);
        }
    }

    public static async getBitacoraById(bitacoraId: number): Promise<Bitacora | null> {
        try {
            return await BitacoraRepository.findById(bitacoraId);
        } catch (error: any) {
            throw new Error(`Error al encontrar bitácora: ${error.message}`);
        }
    }

    public static async addBitacora(bitacora: Bitacora) {
        try {
            bitacora.created_at = DateUtils.formatDate(new Date());
            bitacora.updated_at = DateUtils.formatDate(new Date());
            bitacora.deleted = 0;
            return await BitacoraRepository.createBitacora(bitacora);
        } catch (error: any) {
            throw new Error(`Error al crear bitácora: ${error.message}`);
        }
    }

    public static async modifyBitacora(bitacoraId: number, bitacoraData: Bitacora) {
        try {
            const bitacoraFound = await BitacoraRepository.findById(bitacoraId);

            if (bitacoraFound) {
                if (bitacoraData.datatime) {
                    bitacoraFound.datatime = bitacoraData.datatime;
                }
                if (bitacoraData.destino) {
                    bitacoraFound.destino = bitacoraData.destino;
                }
                if (bitacoraData.origen) {
                    bitacoraFound.origen = bitacoraData.origen;
                }
                if (bitacoraData.rut) {
                    bitacoraFound.rut = bitacoraData.rut;
                }
                if (bitacoraData.deleted !== undefined) {
                    bitacoraFound.deleted = bitacoraData.deleted;
                }
            } else {
                return null;
            }

            bitacoraFound.updated_by = bitacoraData.updated_by;
            bitacoraFound.updated_at = DateUtils.formatDate(new Date());

            return await BitacoraRepository.updateBitacora(bitacoraId, bitacoraFound);
        } catch (error: any) {
            throw new Error(`Error al modificar bitácora: ${error.message}`);
        }
    }

    public static async deleteBitacora(bitacoraId: number): Promise<boolean> {
        try {
            return await BitacoraRepository.deleteBitacora(bitacoraId);
        } catch (error: any) {
            throw new Error(`Error al eliminar bitácora: ${error.message}`);
        }
    }
}
