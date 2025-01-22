import LoginLayout from "@/components/layouts/LoginLayout";
import IonIcon from "@reacticons/ionicons";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import Swal from 'sweetalert2'

type Inputs = {
    username: string,
    password: string
}

const Home = () => {
    const router = useRouter();

    const { 
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<Inputs>()

    const login: SubmitHandler<Inputs> = (data) => {
        console.log(data);
        axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/login`, {
            username: data.username,
            password: data.password
        })
        .then(response => {
            localStorage.setItem('token', response.data.token);
            router.push('/dashboard');
        })
        .catch(e => {
            const { message } = e.response.data;
            Swal.fire('Error', message, 'error');
        })
    }


    return (
        <form method="post" onSubmit={handleSubmit(login)}>
            <h4 className="text-center">LMS</h4>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" {...register('username', { required: true }) } />
                <label htmlFor="">Username</label>
            </div>
            <div className="form-floating mb-3">
                <input type="password" className="form-control" {...register('password', { required: true }) } />
                <label htmlFor="">Password</label>
            </div>
            <button className="btn btn-primary"><IonIcon name="log-in-outline" className="me-2" />Login</button>
        </form>
    );
}

Home.getLayout = (page: any) => <LoginLayout>{page}</LoginLayout>

export default Home;
