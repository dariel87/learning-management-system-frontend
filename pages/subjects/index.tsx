import DashboardLayout from "@/components/layouts/DashboardLayout";
import Breadcrumbs from "@/components/breadcrumbs";
import ISubject from "@/interfaces/ISubject";
import Link from "next/link";
import IonIcon from '@reacticons/ionicons';
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import Loading from "@/components/loading";
import Swal from "sweetalert2";
import { AxiosResponse } from "axios";
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/bootstrap.css';

const SubjectIndex = () => {
    const [rows, setRows] = useState<ISubject[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [active, setLoadingActive] = useState(false);

    const links = [
        { url: "#", text: "Subject list" }
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
                    const response = await axiosInstance.delete(`/subjects/${id}`)

                    Swal.fire('Success', response.data.message, 'success');
                    getData(currentPage);
                } catch (e: any) {
                    Swal.fire('Error', e.response.data.message, 'error');
                }

                setLoadingActive(false);
            }
        });
    }

    const getData = async (page: number) => {
        setLoadingActive(true);

        try {
            const response: AxiosResponse = await axiosInstance.get('/subjects', {
                params: {
                    page
                }
            });

            setRows(response.data.rows);
            setTotalPage(response.data.total_pages);
        } catch (e: any) {
            Swal.fire('Error', 'failed to fetch data from server', 'error')
        }
        
        setLoadingActive(false);
    }

    useEffect(() => {
        getData(currentPage);
    }, [currentPage]);

    return (
        <>
            <Loading is_active={active} />
            <Breadcrumbs title="Subject" links={links} />
            <div className="bg-white p-3">
                <Link href="/subjects/create" className="btn btn-sm btn-primary float-end">
                    <IonIcon name="add-outline" />
                    Create subject
                </Link>
                <div className="clearfix"></div>
                <br />
                <table className="table table-xs">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Type</th>
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
                                        <td>{row.type}</td>
                                        <td width={'10%'}>
                                            <Link href={`/subjects/${row.id}/edit`} className="btn btn-sm btn-success me-2"><IonIcon name="pencil-outline" /></Link>
                                            <a href="" className="btn btn-sm btn-danger" onClick={e => destroy(e, row.id)}><IonIcon name="trash-outline" /></a>
                                        </td>
                                    </tr>
                                )
                            )
                            :
                            (
                                <tr>
                                    <td colSpan={4}>Cannot find any rows. try add one</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                <ResponsivePagination
                    previousLabel="previous"
                    nextLabel="next"
                    extraClassName="justify-content-start"
                    current={currentPage}
                    total={totalPage}
                    onPageChange={ setCurrentPage }
                    />
            </div>
        </>
    )
}

SubjectIndex.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>

export default SubjectIndex;