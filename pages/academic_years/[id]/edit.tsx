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

type Inputs = {
    name: string,
}

const errorStyle = {
    fontSize: 12,
    fontStyle: 'italic'
}

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
        if(router.isReady){
            setLoadingActive(true);

            axiosInstance.get(`/academic_years/${id}`)
            .then(response => {
                setValue('name', response.data.name);
            })
            .catch(e => {
                Swal.fire('Error', e.response.data?.message, 'error');
            })
            .finally(() => {
                setLoadingActive(false);
            });
        }
    }, [router.isReady]);

    const update: SubmitHandler<Inputs> = async (data) => {
        try { 
            setLoadingActive(true);

            const response: AxiosResponse = await axiosInstance.put(`/academic_years/${id}`, {
                name: data.name
            })

            Swal.fire('Success', response.data.message, 'success').then(() => {
                router.push('/academic_years');
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
            <Breadcrumbs title="Edit User" links={links} />
            <div className="bg-white p-3">
                <div className="form-group mb-3">
                    <label htmlFor="">Year</label>
                    <div className="row">
                        <div className="col-md-3 col-12">
                            <input type="text" className="form-control" {...register('name', { required: true })} />
                            {errors.name && <span className="text-danger" style={ errorStyle }>This field is required</span>}
                        </div>
                    </div>
                </div>
                <hr />
                <button className="btn btn-primary me-2" onClick={handleSubmit(update)}>save</button>
                <Link href="/users" className="btn btn-danger">cancel</Link>
            </div>
        </>
    )
}

UserEdit.getLayout = (page: any) => <DashboardLayout>{ page }</DashboardLayout> 

export default UserEdit;