import { useState } from "react";
import axios from "axios";

const Register= ()=>{
    const[form, setForm]= useState({username:'',email:'',password:''});

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            await axios.post('https://fb4fe92e-e9e9-4a61-b83b-d78fa510d666-00-3452oz38tloip.pike.replit.dev:3000/api/auth/register', form);
            alert('register berhasil');
        } catch (err) {
            alert(err.response?.data?.error) || 'terjadi kesalahan';
        }
    }

    return(
        <>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="" id="" 
                    placeholder="Username"
                    onChange={e=>setForm({...form, username: e.target.value})}
                />
                <input type="email" name="" id="" 
                    placeholder="Email"
                    onChange={e=>setForm({...form, email:e.target.value})}
                />
                <input type="password" name="" id="" 
                    placeholder="Password"
                    onChange={e=>setForm({...form, password:e.target.value})}
                />
                <button type="submit">Register</button>
            </form>
        </>
    )
}

export default Register;