import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import '../layout/component.css';
import { Link } from "react-router-dom";
import Pagination from "../pagination";

const Detail = ()=>{
    const {slug} = useParams();
    const [blog,setBlog]= useState(null);
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage]= useState(1);
    const [totalPages, setTotalPages]= useState(1);

    useEffect(()=>{
        fetchBlog();
    },[slug]);

    useEffect(()=>{
        fetchBlogs();
    },[currentPage]);

    const fetchBlog = async()=>{
        try {
            const response = await axios.get(`https://fb4fe92e-e9e9-4a61-b83b-d78fa510d666-00-3452oz38tloip.pike.replit.dev:3000/api/auth/dashboard/${slug}`);
            setBlog(response.data);
        } catch (error) {
            console.error('error det data', error);
        }
    }

    const fetchBlogs = async()=>{
        try {
            const response = await axios.get(`https://fb4fe92e-e9e9-4a61-b83b-d78fa510d666-00-3452oz38tloip.pike.replit.dev:3000/api/auth/dashboard?page=${currentPage}&limit=4`);
            setBlogs(response.data.data);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('error get blogs', error);
        }
    }

    if(!blog) return <p>Loading...</p>

    return(
        <>
            <div className="container_detail">
                <ul className="blog-single">
                    <li>
                        <img src={`https://fb4fe92e-e9e9-4a61-b83b-d78fa510d666-00-3452oz38tloip.pike.replit.dev:3000/gmb/${blog.gambar}`} alt="" width='200px' height='200px'/>
                    </li>
                    <li>
                        <h2>{ blog.judul }</h2>
                    </li>
                    <li>
                        <div className="sub-deskripsi">
                            <h4>{ blog.kategori }</h4>
                            <h4>Penulis</h4>
                        </div>
                    </li>
                    <li>
                        <p>{ blog.paragraf }</p>
                    </li>
                </ul>
                <div className="blog-detail">
                    <ul className="daftar-blog">
                        {blogs.map(blog=>(
                            <li key={blog.id}>
                                <Link to={`/detail/${blog.slug}`}>
                                    <img src={`https://fb4fe92e-e9e9-4a61-b83b-d78fa510d666-00-3452oz38tloip.pike.replit.dev:3000/gmb/${blog.gambar}`} alt="" width='200px' height='200px' />
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

export default Detail;