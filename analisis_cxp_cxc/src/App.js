import Header from './Components/Header'
import Asside from './Components/Asside'
import DashboardAP from './Components/DashboardAP'
import DashboardAR from './Components/DashboardAR'
import TipoLibreta from './Components/TipoLibreta'
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

        </Routes>

      </BrowserRouter>
      <Footer />
    </div>
  )
}
