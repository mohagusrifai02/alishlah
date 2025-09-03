import Hafiz from '../assets/hafiz.png'
import About from './about';
import Program from './program';
import Blog from './blog';
import Kontak from './kontak';
import { motion } from 'framer-motion';

const Home =()=>{
    return (
        <>
           <div className="container_home">
            <motion.div 
                className="gambar"
                initial={{ opacity:0, y:50 }}
                whileInView={{ opacity:1, y:0 }}
                transition={{ duration:0.6 }}
                viewport={{ amount: 0.4, once:false }}
            >
                <div className="lingkaran"></div>
                <img src={Hafiz} alt="" />
            </motion.div>
            <motion.div 
                className="deskripsi"
                initial={{ opacity:0, x:-50 }}
                whileInView={{ opacity:1, x:0 }}
                transition={{ duration:0.6 }}
                viewport={{ amount:0.4, once:false }}
            >
                <div className="title">
                    <h1>Yayasan Al-Ishlah</h1>
                    <h3>Hidayatullah Kabupaten Tegal</h3>
                </div>
                <h3>Membangun Generasi Berkarakter, Mengubah Masa Depan Bangsa.</h3>
            </motion.div>
           </div>
           <About />
           <Program />
           <Blog />
           <Kontak />
        </>
    )
}

export default Home;