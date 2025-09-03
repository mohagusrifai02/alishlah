import {Link} from 'react-router-dom'
import imgTitle from '../assets/logo.jpeg'
import './layout/component.css'
import { useState } from 'react'

const Nav = ()=>{
    const[isOpen, setIsOpen] = useState(false);

    const openMenu =()=>{
        setIsOpen(!isOpen);
    }
    const closeMenu =()=>{
        setIsOpen(false);
    }
    return(
        <>
            <nav>
                <div className="judul">
                    <div className="icon">
                        <img src={imgTitle} alt="" />
                        <h4>Yayasan Al-Ishlah</h4>
                    </div>
                    <i className={`fas ${isOpen ? 'fa-times':'fa-bars'}`} onClick={openMenu}></i>
                </div>
                <ul className={`list ${isOpen ? 'open': ''}`} onClick={closeMenu}>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/about'>About</Link></li>
                    <li><Link to='/program'>Program</Link></li>
                    <li><Link to='/laporan'>Laporan</Link></li>
                    <li><Link to='/blog'>Blog</Link></li>
                    <li><Link to='/kontak'>Kontak</Link></li>
                </ul>
            </nav>
        </>
    )
}

export default Nav;