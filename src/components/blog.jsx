import { useState, useEffect } from "react";
import axios from "axios";
import {Link} from 'react-router-dom'
import Pagination from "./pagination";

const Blog =({ className, refreshKey })=>{
    const [blogs, setBlogs] = useState([]);
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(()=>{
        fetchBlog();
    },[refreshKey, currentPage]);

    useEffect(()=>{
        fetchItem();
    },[currentPage])
    
    const fetchBlog = async()=>{
        try {
            const response = await axios.get(`https://fb4fe92e-e9e9-4a61-b83b-d78fa510d666-00-3452oz38tloip.pike.replit.dev:3000/api/auth/dashboard?page=${currentPage}&limit=4`);
            setBlogs(response.data.data);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('error mengambil data', error);
        }
    }

    const fetchItem = async()=>{
        try {
            const ressponse = await axios.get(`https://fb4fe92e-e9e9-4a61-b83b-d78fa510d666-00-3452oz38tloip.pike.replit.dev:3000/api/auth/dashboard?page=${currentPage}&limit=4`);
            setItems(ressponse.data.data);
        } catch (error) {
            console.error('error menampilkan item', error);
        }
    }

    return (
        <>  
            <div className={ `container_blog ${className || ''} ` }>
                <ul className="blog-utama">
                    {items.map((item)=>(
                        <li key={item.id}>
                            <Link to={`/detail/${item.slug}`}>
                                <img src={`https://fb4fe92e-e9e9-4a61-b83b-d78fa510d666-00-3452oz38tloip.pike.replit.dev:3000/gmb/${item.gambar}`} alt="" width='200px' height="200px" />
                                <div className="deskripsi">
                                    <h3>{item.judul}</h3>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="box">
                    <ul className="daftar-blog">
                        {blogs.map((blog)=>(
                            <li key={blog.id}>
                                <Link to={`/detail/${blog.slug}`}>
                                    <img src={`https://fb4fe92e-e9e9-4a61-b83b-d78fa510d666-00-3452oz38tloip.pike.replit.dev:3000/gmb/${blog.gambar}`} width='200px' height='200px'/>
                                    <div className="deskripsi">
                                        <h3>{blog.judul}</h3>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <Pagination 
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(page)=>setCurrentPage(page)}
                    />
                </div>
            </div>
        </>
    )
}

export default Blog;