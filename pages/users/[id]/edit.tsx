import DashboardLayout from "@/components/layouts/DashboardLayout";
import Breadcrumbs from "@/components/breadcrumbs";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form"
import axiosInstance from "@/utils/axiosInstance";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import Loading from "@/components/loading";

enum Role {
    teacher = "teacher",
    student = "student",
    administrator = "administrator"
}

type Inputs = {
    username: string,
    role: Role,
    email: string,
    name: string,
    password: string,
    confirm_password: string
}

const errorStyle = {
    fontSize: 12,
    fontStyle: 'italic'
}

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const UserEdit = () => {
    const router = useRouter();
    const [active, setLoadingActive] = useState(false);
    const { id } = router.query;

    const links = [
        {url: '/users', text: 'User list'},
        {url: '#', text: 'Edit'},
    ];

    const {
            register,
            handleSubmit,
            setValue,
            formState: {
                errors
            }
    } = useForm<Inputs>();

    useEffect(() => {
        setLoadingActive(true);

        axiosInstance.get(`/users/${id}`)
        .then(response => {
            setValue('username', response.data.username);
            setValue('name', response.data.name);
            setValue('email', response.data.email);
            setValue('role', response.data.role);
        })
        .finally(() => {
            setLoadingActive(false);
        });
    }, []);

    const createUser: SubmitHandler<Inputs> = async (data) => {
        try { 
            setLoadingActive(true);

            const response: AxiosResponse = await axiosInstance.put(`/users/${id}`, {
                role: data.role,
                name: data.name,
                email: data.email
            })

            Swal.fire('Success', response.data.message, 'success').then(() => {
                router.push('/users');
            })
        } catch (e: any) {
            const { message } = e.response.data;
            Swal.fire('Error', message, 'error');
        }

        setLoadingActive(false);
    }

    return (
        <>
            <Loading is_active={active} />
            <Breadcrumbs links={links} />
            <div className="bg-white p-3">
                <div className="form-group mb-3">
                    <label htmlFor="">Username</label>
                    <div className="row">
                        <div className="col-md-3 col-12">
                            <input type="text" disabled className="form-control" {...register('username', { required: true })} />
                        </div>
                    </div>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="">Role</label>
                    <div className="row">
                        <div className="col-md-3 col-12">
                            <select className="form-select" {...register('role', { required: true })}>
                                <option value="administrator">Administrator</option>
                                <option value="teacher">Teacher</option>
                                <option value="student">Student</option>
                            </select>
                            {errors.role && <span className="text-danger" style={ errorStyle }>This field is required</span>}
                        </div>
                    </div>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="">Name</label>
                    <div className="row">
                        <div className="col-md-6 col-12">
                            <input type="text" className="form-control" {...register('name', { required: true })} />
                            {errors.name && <span className="text-danger" style={ errorStyle }>This field is required</span>}
                        </div>
                    </div>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="">Email</label>
                    <div className="row">
                        <div className="col-md-6 col-12">
                            <input type="text" className="form-control" {...register('email', { pattern: emailRegex })} />
                            {errors.email && <span className="text-danger" style={ errorStyle }>This not a valid email address</span>}
                        </div>
                    </div>
                </div>
                <hr />
                <button className="btn btn-primary me-2" onClick={handleSubmit(createUser)}>save</button>
                <Link href="/users" className="btn btn-danger">cancel</Link>
            </div>
        </>
    )
}

UserEdit.getLayout = (page: any) => <DashboardLayout>{ page }</DashboardLayout> 

export default UserEdit;