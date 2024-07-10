import { UnitRepository } from "../repositories/UnitsRepository";
import { Unit } from "../models/Units";
import { DateUtils } from "../../shared/utils/DateUtils";
import dotenv from 'dotenv';

dotenv.config();

export class unitsService {
    public static async getAllUnits(): Promise<Unit[]> {
        try {
            return await UnitRepository.findAll();
        } catch (error: any) {
            throw new Error(`Error al obtener unidades: ${error.message}`);
        }
    }

    public static async getUnitById(unitId: number): Promise<Unit | null> {
        try {
            return await UnitRepository.findById(unitId);
        } catch (error: any) {
            throw new Error(`Error al encontrar unidad: ${error.message}`);
        }
    }

    public static async getUnitBySeries(series: string): Promise<Unit | null> {
        try {
            return await UnitRepository.findBySeries(series);
        } catch (error: any) {
            throw new Error(`Error al encontrar unidad: ${error.message}`);
        }
    }

    public static async addUnit(unit: Unit) {
        try {
            unit.created_at = DateUtils.formatDate(new Date());
            unit.updated_at = DateUtils.formatDate(new Date());

            return await UnitRepository.createUnit(unit);
        } catch (error: any) {
            throw new Error(`Error al crear unidad: ${error.message}`);
        }
    }

    public static async modifyUnit(unitId: number, unitData: Unit) {
        try {
            const unitFound = await UnitRepository.findById(unitId);

            if (unitFound) {
                if (unitData.series) {
                    unitFound.series = unitData.series;
                }

                if (unitData.employee_id !== undefined) {
                    unitFound.employee_id = unitData.employee_id;
                }

                if (unitData.deleted !== undefined) {
                    unitFound.deleted = unitData.deleted;
                }
            } else {
                return null;
            }

            unitFound.updated_by = unitData.updated_by;
            unitFound.updated_at = DateUtils.formatDate(new Date());

            return await UnitRepository.updateUnit(unitId, unitFound);
        } catch (error: any) {
            throw new Error(`Error al modificar unidad: ${error.message}`);
        }
    }

    public static async deleteUnit(unitId: number): Promise<boolean> {
        try {
            return await UnitRepository.deleteUnit(unitId);
        } catch (error: any) {
            throw new Error(`Error al eliminar unidad: ${error.message}`);
        }
    }
}
