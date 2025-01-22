import DashboardLayout from "@/components/layouts/DashboardLayout";
import Breadcrumbs from "@/components/breadcrumbs";
import IUser from "@/interfaces/IUser";
import Link from "next/link";
import IonIcon from '@reacticons/ionicons';
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import Loading from "@/components/loading";
import Swal from "sweetalert2";

const UserIndex = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [active, setActive] = useState(false);

    const links = [
        {url: "#", text: "User list"}
    ];

    useEffect(() => {
        setActive(true);
        axiosInstance.get('/users')
        .then(response => {
            setUsers(response.data);
        })
        .catch(e => {
            Swal.fire('Error', 'failed to fetch data from server', 'error')
        })
        .finally(() => {
            setActive(false);
        })
    }, [])

    return (
        <>
        <Loading is_active={active} />
        <Breadcrumbs links={links} />
        <div className="bg-white p-3">
            <Link href="/users/create" className="btn btn-sm btn-primary float-end">
                <IonIcon name="add-outline" />
                Create user
            </Link>
            <div className="clearfix"></div>
            <br />
            <table className="table table-xs">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>email</th>
                        <th>Role</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {users.length > 0  ?
                (
                    users.map(user => 
                        <tr>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <Link href={`/users/${user.id}/edit`} className="btn btn-sm btn-success me-2"><IonIcon name="pencil-outline" /></Link>
                                <a href="" className="btn btn-sm btn-danger"><IonIcon name="trash-outline" /></a>
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

UserIndex.getLayout = (page: any) => <DashboardLayout>{ page }</DashboardLayout> 

export default UserIndex;