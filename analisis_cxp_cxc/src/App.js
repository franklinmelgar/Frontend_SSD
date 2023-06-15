import Header from './Components/Header'
import Asside from './Components/Asside'
import DashboardAP from './Components/DashboardAP'
import TipoLibreta from './Components/TipoLibreta'
import TerminoCredito from './Components/TerminoCredito'
import TipoDocumento from './Components/TipoDocumento'
import Documentos from './Components/Documentos'
import CuentasPorCobrar from './Components/CuentasPorCobrar'
import CuentasPorPagar from './Components/CuentasPorPagar'
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
            <Route path='/TipoLibreta' element={<TipoLibreta />}></Route>
            <Route path='/CategoriaLibreta' element={<CategoriaLibreta />}></Route>
            <Route path='/CuentasPorCobrar' element={<CuentasPorCobrar />}></Route>
            <Route path='/CuentasPorPagar' element={<CuentasPorPagar />}></Route>
            <Route path='/TerminoCredito' element={<TerminoCredito />}></Route>
            <Route path='/TipoDocumento' element={<TipoDocumento />}></Route>
            <Route path='/Documentos' element={<Documentos />}></Route>

        </Routes>

      </BrowserRouter>

      <Footer />
    </div>
  )
}
