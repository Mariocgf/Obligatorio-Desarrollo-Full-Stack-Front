import { Provider } from 'react-redux'
import './App.css'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import HomeContainer from './container/HomeContainer'
import { store } from './store/store'
import CompeticionContainer from './container/CompeticionContainer'
import { BrowserRouter, Route, Routes } from 'react-router'
import EquipoContainer from './container/EquipoContainer'
import DeportistaContainer from './container/DeportistaContainer'
import EventoContainer from './container/EventoContainer'
import AuthContainer from './container/AuthContainer'
import UsuarioContainer from './container/UsuarioContainer'
import AuthenticatedContainer from './container/AuthenticatedContainer'
import ProtectedContainer from './container/ProtectedContainer'
import { Toaster } from 'react-hot-toast';
import UpdateImgContainer from './container/UpdateImgContainer'

function App() {
  return (
    <div className=''>
      <Provider store={store}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path='/' element={<AuthenticatedContainer />}>
              <Route path='/' element={<HomeContainer />} />
              <Route path='/eventos' element={<EventoContainer />} />
              <Route path='/competicion' element={<CompeticionContainer />} />
              <Route path='/deportista' element={<DeportistaContainer />} />
              <Route path='/equipo' element={<EquipoContainer />} />
              <Route path='/auth' element={<AuthContainer />} />
              <Route path='/usuario' element={<ProtectedContainer />} >
                <Route path='/usuario' element={<UsuarioContainer />} />
                <Route path='/usuario/updateImg' element={<UpdateImgContainer />} />
              </Route>
            </Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </Provider>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  )
}

export default App
