import { useState, useEffect } from "react";
import axios from "axios";
import './layout/dashboard.css'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Pagination from "../pagination";

const Beranda =({onBlogAdded})=>{
    const[judul, setJudul]= useState('');
    const[kategori, setKategori]= useState('');
    const[paragraf, setParagraf]= useState('');
    const[gambar, setGambar]= useState(null);
    const[pesan, setPesan]= useState('');
    const[refreshKey, setRefreshKey] = useState(0);
    const[blogs, setBlogs]=useState([]);
    const[editMode, setEditMode]= useState(false);
    const[editId, setEditId]= useState(null);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages]= useState(1);
    
    const handleEdit = (blog)=>{
        setJudul(blog.judul);
        setKategori(blog.kategori);
        setParagraf(blog.paragraf);
        setGambar(blog.gambar);
        setEditId(blog.id);
        setEditMode(true);
        setPesan('');
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('judul', judul);
        formData.append('kategori', kategori);
        formData.append('paragraf', paragraf);
        if(gambar) formData.append('gambar', gambar);

        try {
            if(editMode){
                await axios.put(`https://fb4fe92e-e9e9-4a61-b83b-d78fa510d666-00-3452oz38tloip.pike.replit.dev:3000/api/auth/dashboard/${editId}`, formData, {
                    headers: {'Content-Type':'multipart/form-data'}
                });
                setPesan('blog berhasil diupdate');
            } else{
                await axios.post('https://fb4fe92e-e9e9-4a61-b83b-d78fa510d666-00-3452oz38tloip.pike.replit.dev:3000/api/auth/dashboard', formData, {
                    headers: {'Content-Type':'multipart/form-data'}
                });
                setPesan('blog berhasil ditambahkan');
            }
            setJudul('');
            setKategori('');
            setParagraf('');
            setGambar(null);
            setEditMode(false);
            setEditId(null);
            setRefreshKey(prev=>prev+1);
            fetchBlog();
        } catch (error) {
            setPesan('gagal menyimpan blog');
            console.error('error simpan blog', error);
        }
    }

    useEffect(()=>{
        fetchBlog();
    },[currentPage, refreshKey])

    const fetchBlog= async()=>{
        try {
            const response = await axios.get(`https://fb4fe92e-e9e9-4a61-b83b-d78fa510d666-00-3452oz38tloip.pike.replit.dev:3000/api/auth/dashboard?page=${currentPage}&limit=4`);
            setBlogs(response.data.data);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('error get data', error);
        }
    }

    const hapusBlog = async(id)=>{
        const konfirmasi = window.confirm('apakah anda yakin akan menghapus ini?');
        if(!konfirmasi) return;

        try {
            await axios.delete(`https://fb4fe92e-e9e9-4a61-b83b-d78fa510d666-00-3452oz38tloip.pike.replit.dev:3000/api/auth/dashboard/${id}`);
            fetchBlog();
        } catch (error) {
            console.error('error hapus blog', error);
        }
    }

    const handleLogout = ()=>{
        localStorage.removeItem("token");
        navigate('/');
    }

    return(
        <>
                <div className="container_dashboard">
                    <div className="form-input">
                        <form action="" onSubmit={handleSubmit} encType="multipart/form-data">
                            <ul>
                                <li>
                                    <label htmlFor="">Judul</label>
                                    <input type="text" name="judul" id=""
                                        value={judul}
                                        onChange={(e)=> setJudul(e.target.value)} required/>
                                </li>
                                <li>
                                    <label htmlFor="">Kategori</label>
                                    <input type="text" name="kategori" id=""
                                        value={kategori}
                                        onChange={(e)=> setKategori(e.target.value)} required/>
                                </li>
                                <li>
                                    <label htmlFor="">Paragraf</label>
                                    <textarea name="paragraf" id="" cols="30" rows="10"
                                        value={paragraf}
                                        onChange={(e)=> setParagraf(e.target.value)} required></textarea>
                                </li>
                                <li>
                                    <label htmlFor="">Gambar</label>
                                    <input type="file" name="gambar" id=""
                                        accept="image/*"
                                        onChange={(e)=> setGambar(e.target.files[0])} required/>
                                </li>
                                <li>
                                    <button type="submit">{editMode ? 'Update' : 'Post'}</button>
                                </li>
                            </ul>
                        </form>
                    {pesan && <p>{pesan}</p>}
                    </div>
                    <div className="blog-dashboard">
                        <button onClick={handleLogout}>Logout</button>
                        <table border="0px" cellPadding="10px" cellSpacing="0">
                            <thead>
                                <th>No</th>
                                <th>Gambar</th>
                                <th>Judul</th>
                                <th>Kategori</th>
                                <th colSpan="2">Sunting</th>
                            </thead>
                            {blogs.map(blog=>(
                                <tr key={blog.id}>
                                    <td>{blog.id}</td>
                                    <td className="gambar"><img src={`https://fb4fe92e-e9e9-4a61-b83b-d78fa510d666-00-3452oz38tloip.pike.replit.dev:3000/gmb/${blog.gambar}`} width="50px" height="50px" /></td>
                                    <td>{blog.judul}</td>
                                    <td>{blog.kategori}</td>
                                    <td><button onClick={()=>hapusBlog(blog.id)}>Hapus</button></td>
                                    <td><button onClick={()=>handleEdit(blog)}>Edit</button></td>
                                </tr>
                            ))}
                                <tr>
                                    <td colSpan='5'>
                                        <Pagination 
                                            currentPage={currentPage}
                                            totalPages={totalPages}
                                            onPageChange={(page)=>setCurrentPage(page)}
                                        />
                                    </td>
                                </tr>
                        </table>
                    </div>
                </div>
        </>
    )
}

export default Beranda;