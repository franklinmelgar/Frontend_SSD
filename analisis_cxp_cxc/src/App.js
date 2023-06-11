import Header from './Components/Header'
import Asside from './Components/Asside'
import DashboardAP from './Components/DashboardAP'
import DashboardAR from './Components/DashboardAR'
import TipoLibreta from './Components/TipoLibreta'
import CargaMasiva from './Components/CargaMasiva'
import CargaMasivaVentas from './Components/CargaMsivasVentas'
import CategoriaLibreta from './Components/CategoriaLibreta'
import Footer from './Components/Footer'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default function App() {

  return (
    <div>
      <Header />

      <BrowserRouter>
        <Asside />

        <Routes>

            <Route path='/' element={<DashboardAP />}></Route>
            <Route path='/DashboardAR' element={<DashboardAR />}></Route>
            <Route path='/TipoLibreta' element={<TipoLibreta />}></Route>
            <Route path='/CategoriaLibreta' element={<CategoriaLibreta />}></Route>
            <Route path='/CargaMasiva' element={<CargaMasiva />}></Route>
            <Route path='/CargaMasivaVentas' element={<CargaMasivaVentas />}></Route>

        </Routes>

      </BrowserRouter>

      <Footer />
    </div>
  )
}
