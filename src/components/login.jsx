import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './layout/component.css'

const Login= ()=>{

    const [form, setForm]= useState({email:'', password:''});
    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            const res = await axios.post('https://fb4fe92e-e9e9-4a61-b83b-d78fa510d666-00-3452oz38tloip.pike.replit.dev:3000/api/auth/login', form);
            alert('login berhasil');
            console.log("token",res.data.token);

            localStorage.setItem("token", res.data.token);
            navigate('/beranda');
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.error) || 'terjadi kesalahan';
        }
        
    }

    return(
        <>
            <div className="container_login">
                <form action="" onSubmit={handleSubmit}>
                    <ul>
                        <li>
                            <label htmlFor="">Email</label>
                            <input type="email" name="" id="" onChange={e=> setForm({...form, email:e.target.value})} />
                        </li>
                        <li>
                            <label htmlFor="">Password</label>
                            <input type="password" name="" id="" onChange={e=> setForm({...form, password:e.target.value})}/>
                        </li>
                        <li>
                            <button type="submit">Login</button>
                        </li>
                    </ul>
                </form>
            </div>
        </>
    )
}

export default Login;