import DashboardLayout from "@/components/layouts/DashboardLayout";
import Breadcrumbs from "@/components/breadcrumbs";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form"
import axiosInstance from "@/utils/axiosInstance";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { AxiosResponse } from "axios";
import IAcademicYear from "@/interfaces/IAcademicYear";
import IUser from "@/interfaces/IUser";
import { useEffect, useState } from "react";

type Inputs = {
    name: string,
    academic_year_id: string,
}

const errorStyle = {
    fontSize: 12,
    fontStyle: 'italic'
}

const ClassCreate = () => {
    const router = useRouter();
    const [teachers, setTeachers] = useState<IUser[]>([]);
    const [students, setStudents] = useState<IUser[]>([]);
    const [years, setYears] = useState<IAcademicYear[]>([]);

    const links = [
        {url: '/classes', text: 'Class list'},
        {url: '#', text: 'Create'},
    ];

    const {
            register,
            handleSubmit,
            watch,
            formState: {
                errors
            }
    } = useForm<Inputs>();

    const create: SubmitHandler<Inputs> = async (data) => {
        try { 
            const response: AxiosResponse = await axiosInstance.post('/subjects', {
                name: data.name
            })

            Swal.fire('Success', response.data.message, 'success').then(() => {
                router.push('/subjects');
            })
        } catch (e: any) {
            const { message } = e.response.data;
            Swal.fire('Error', message, 'error');
        }
    }

    const getUsers = async (role: string) => {
        try {
            const response = await axiosInstance.get('/users', {
                params: {
                    all: 1,
                    role
                }
            });
            
            if(role === 'teacher'){
                setTeachers(response.data);
            }else{
                setStudents(response.data);
            }
        } catch (e: any) {
            console.log(e);

            Swal.fire('Error', e.response.data.message, 'error');
        }
    }

    const getYears = async () => {
        try {
            const response = await axiosInstance.get('/academic_years', {
                params: {
                    all: 1
                }
            });
            
            setYears(response.data);
        } catch (e: any) {
            console.log(e);

            Swal.fire('Error', e.response.data.message, 'error');
        }
    }

    useEffect(() => {
        getUsers('teacher');
        getUsers('student');
        getYears();
    }, [])

    return (
        <>
            <Breadcrumbs title="Create Subject" links={links} />
            <div className="bg-white p-3">
                <div className="form-group mb-3">
                    <label htmlFor="">Name</label>
                    <div className="row mb-3">
                        <div className="col-md-3 col-12">
                            <input type="text" className="form-control" {...register('name', { required: true })} />
                            {errors.name && <span className="text-danger" style={ errorStyle }>This field is required</span>}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3 col-12">
                            <label htmlFor="">Academic Year</label>
                            <select className="form-select" {...register('academic_year_id', { required: true })}>
                                {years.length > 0 && years.map(year => 
                                    <option value={year.id} key={year.id}>{year.name}</option>
                                )
                                }
                            </select>
                            {errors.academic_year_id && <span className="text-danger" style={ errorStyle }>This field is required</span>}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <label htmlFor="">Teacher</label>
                            <table className="table table-hover table-bordered">
                                <thead>
                                    <tr>
                                        <th>Main</th>
                                        <th>Name</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {teachers.length > 0 && teachers.map(teacher => 
                                        <tr key={teacher.id}>
                                            <td width={'5%'} className="text-center">
                                                <div className="form-check form-switch">
                                                    <input type="checkbox" className="form-check-input" />
                                                </div>
                                            </td>
                                            <td>
                                                <div className="form-check">
                                                    <input type="checkbox" id={`teacher_${teacher.id}`} className="form-check-input me-2" />
                                                    <label htmlFor={`teacher_${teacher.id}`}>{teacher.name}</label>
                                                </div>
                                            </td>
                                            <td></td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <hr />
                <button className="btn btn-primary me-2" onClick={handleSubmit(create)}>save</button>
                <Link href="/subjects" className="btn btn-danger">cancel</Link>
            </div>
        </>
    )
}

ClassCreate.getLayout = (page: any) => <DashboardLayout>{ page }</DashboardLayout> 

export default ClassCreate;