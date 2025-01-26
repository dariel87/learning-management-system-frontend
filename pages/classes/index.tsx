import DashboardLayout from "@/components/layouts/DashboardLayout";
import Breadcrumbs from "@/components/breadcrumbs";
import IClass from "@/interfaces/IClass";
import Link from "next/link";
import IonIcon from '@reacticons/ionicons';
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import Loading from "@/components/loading";
import Swal from "sweetalert2";

const ClassIndex = () => {
    const [rows, setRows] = useState<IClass[]>([]);
    const [active, setLoadingActive] = useState(false);

    const links = [
        {url: "#", text: "Class list"}
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
                    const response = await axiosInstance.delete(`/classes/${id}`)

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
            const response = await axiosInstance.get('/classes');
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
        <Breadcrumbs title="User List" links={links} />
        <div className="bg-white p-3">
            <Link href="/classes/create" className="btn btn-sm btn-primary float-end">
                <IonIcon name="add-outline" />
                Create class
            </Link>
            <div className="clearfix"></div>
            <br />
            <table className="table table-xs">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Academic Year</th>
                        <th>Active</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {rows.length > 0  ?
                (
                    rows.map(row => 
                        <tr key={row.id}>
                            <td width={'5%'}>{row.id}</td>
                            <td>{row.name}</td>
                            <td>{row.academic_year?.name}</td>
                            <td>{row.is_active ? <span className="badge bg-success">Active</span>:<span className="badge bg-danger">Inactive</span>}</td>
                            <td width={'8%'}>
                                <Link href={`/classes/${row.id}/edit`} className="btn btn-sm btn-success me-2"><IonIcon name="pencil-outline" /></Link>
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

ClassIndex.getLayout = (page: any) => <DashboardLayout>{ page }</DashboardLayout> 

export default ClassIndex;