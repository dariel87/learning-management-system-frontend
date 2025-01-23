import DashboardLayout from "@/components/layouts/DashboardLayout";
import Breadcrumbs from "@/components/breadcrumbs";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form"
import axiosInstance from "@/utils/axiosInstance";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { AxiosResponse } from "axios";

type Inputs = {
    name: string,
}

const errorStyle = {
    fontSize: 12,
    fontStyle: 'italic'
}

const AcademicYearCreate = () => {
    const router = useRouter();

    const links = [
        {url: '/academic_years', text: 'Academic year list'},
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

    const createUser: SubmitHandler<Inputs> = async (data) => {
        try { 
            const response: AxiosResponse = await axiosInstance.post('/academic_years', {
                name: data.name,
            })

            Swal.fire('Success', response.data.message, 'success').then(() => {
                router.push('/academic_years');
            })
        } catch (e: any) {
            const { message } = e.response.data;
            Swal.fire('Error', message, 'error');
        }
    }

    return (
        <>
            <Breadcrumbs title="Create Academic Year" links={links} />
            <div className="bg-white p-3">
                <div className="form-group mb-3">
                    <label htmlFor="">Year</label>
                    <div className="row">
                        <div className="col-md-2 col-12">
                            <input type="text" className="form-control" {...register('name', { required: true })} />
                            {errors.name && <span className="text-danger" style={ errorStyle }>This field is required</span>}
                        </div>
                    </div>
                </div>
                <hr />
                <button className="btn btn-primary me-2" onClick={handleSubmit(createUser)}>save</button>
                <Link href="/academic_years" className="btn btn-danger">cancel</Link>
            </div>
        </>
    )
}

AcademicYearCreate.getLayout = (page: any) => <DashboardLayout>{ page }</DashboardLayout> 

export default AcademicYearCreate;