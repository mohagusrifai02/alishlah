import { BrowserRouter, Routes, Route } from "react-router-dom"
import Nav from "./components/navbar"
import About from "./components/about"
import Home from "./components/home"
import Program from "./components/program"
import Laporan from "./components/laporan"
import Blog from "./components/blog"
import Kontak from "./components/kontak"
import Register from "./components/register"
import Login from "./components/login"
import Beranda from "./components/dashboard/beranda"
import Detail from "./components/dashboard/detail"
import ProtextedRoute from "./components/protectedroute"

function App() {

  return (
   <>
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/program" element={<Program />}/>
        <Route path="/laporan" element={<Laporan />}/>
        <Route path="/blog" element={<Blog />}/>
        <Route path="/kontak" element={<Kontak />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />} />
        <Route 
          path="/beranda" 
          element={
          <ProtextedRoute>
            <Beranda />
          </ProtextedRoute>
          } 
          />
        <Route path="detail/:slug" element={<Detail />}/>
      </Routes>
    </BrowserRouter>
   </>
  )
}

export default App
