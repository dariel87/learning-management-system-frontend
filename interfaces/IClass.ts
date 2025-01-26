import IAcademicYear from "./IAcademicYear";
import IUser from "./IUser";

export default interface ISubject {
    id: string,
    academic_year: IAcademicYear,
    teachers: IUser[],
    name: string,
    is_active: boolean,
    created_at?: string,
    updated_at?: string
}