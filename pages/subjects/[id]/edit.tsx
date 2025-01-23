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

enum SubjectType{
    regular = 'regular',
    extracurricular = 'extracurricular',
    break = 'break'
}

type Inputs = {
    name: string,
    type: SubjectType
}

const errorStyle = {
    fontSize: 12,
    fontStyle: 'italic'
}

const SubjectEdit = () => {
    const router = useRouter();
    const [active, setLoadingActive] = useState(false);
    const { id } = router.query;

    const links = [
        {url: '/subjects', text: 'Subject list'},
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

            axiosInstance.get(`/subjects/${id}`)
            .then(response => {
                setValue('name', response.data.name);
                setValue('type', response.data.type);
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

            const response: AxiosResponse = await axiosInstance.put(`/subjects/${id}`, {
                name: data.name,
                type: data.type
            })

            Swal.fire('Success', response.data.message, 'success').then(() => {
                router.push('/subjects');
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
            <Breadcrumbs title="Edit Subject" links={links} />
            <div className="bg-white p-3">
                <div className="form-group mb-3">
                    <label htmlFor="">Name</label>
                    <div className="row mb-3">
                        <div className="col-md-3 col-12">
                            <input type="text" className="form-control" {...register('name', { required: true })} />
                            {errors.name && <span className="text-danger" style={ errorStyle }>This field is required</span>}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3 col-12">
                            <label htmlFor="">Type</label>
                            <select className="form-select" {...register('type', { required: true })}>
                                <option value="regular">Regular</option>
                                <option value="extracurricular">Extracurricular</option>
                                <option value="break">Break</option>
                            </select>
                            {errors.type && <span className="text-danger" style={ errorStyle }>This field is required</span>}
                        </div>
                    </div>
                </div>
                <hr />
                <button className="btn btn-primary me-2" onClick={handleSubmit(update)}>save</button>
                <Link href="/subjects" className="btn btn-danger">cancel</Link>
            </div>
        </>
    )
}

SubjectEdit.getLayout = (page: any) => <DashboardLayout>{ page }</DashboardLayout> 

export default SubjectEdit;