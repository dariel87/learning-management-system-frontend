import DashboardLayout from "@/components/layouts/DashboardLayout";
import Breadcrumbs from "@/components/breadcrumbs";
import IAcademicYear from "@/interfaces/IAcademicYear";
import Link from "next/link";
import IonIcon from '@reacticons/ionicons';
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import Loading from "@/components/loading";
import Swal from "sweetalert2";

const AcademicYearIndex = () => {
    const [rows, setRows] = useState<IAcademicYear[]>([]);
    const [active, setLoadingActive] = useState(false);

    const links = [
        { url: "#", text: "Academic year list" }
    ];

    const destroy = (event: React.MouseEvent<HTMLElement, MouseEvent>, id: string) => {
        event.preventDefault();

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                setLoadingActive(true);

                try {
                    const response = await axiosInstance.delete(`/academic_years/${id}`)

                    Swal.fire('Success', response.data.message, 'success');
                    getData();
                } catch (e: any) {
                    Swal.fire('Error', e.response.data.message, 'error');
                }

                setLoadingActive(false);
            }
        });
    }

    const getData = async () => {
        setLoadingActive(true);

        try {
            const response = await axiosInstance.get('/academic_years');
            setRows(response.data);
        } catch (e: any) {
            Swal.fire('Error', 'failed to fetch data from server', 'error')
        }
        
        setLoadingActive(false);
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <Loading is_active={active} />
            <Breadcrumbs title="Academic Year" links={links} />
            <div className="bg-white p-3">
                <Link href="/academic_years/create" className="btn btn-sm btn-primary float-end">
                    <IonIcon name="add-outline" />
                    Create academic year
                </Link>
                <div className="clearfix"></div>
                <br />
                <table className="table table-xs">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Year</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.length > 0 ?
                            (
                                rows.map(row =>
                                    <tr key={row.id}>
                                        <td width={'5%'}>{row.id}</td>
                                        <td>{row.name}</td>
                                        <td width={'10%'}>
                                            <Link href={`/academic_years/${row.id}/edit`} className="btn btn-sm btn-success me-2"><IonIcon name="pencil-outline" /></Link>
                                            <a href="" className="btn btn-sm btn-danger" onClick={e => destroy(e, row.id)}><IonIcon name="trash-outline" /></a>
                                        </td>
                                    </tr>
                                )
                            )
                            :
                            (
                                <tr>
                                    <td colSpan={5}>Cannot find any rows. try add one</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

AcademicYearIndex.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>

export default AcademicYearIndex;