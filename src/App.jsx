import { Provider } from 'react-redux'
import './App.css'
import NavBar from './components/NavBar'
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

function App() {
  return (
    <div className=''>
      <Provider store={store}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path='/' element={<HomeContainer />} />
            <Route path='/eventos' element={<EventoContainer />} />
            <Route path='/competicion' element={<CompeticionContainer />} />
            <Route path='/deportista' element={<DeportistaContainer />} />
            <Route path='/equipo' element={<EquipoContainer />} />
            <Route path='/auth' element={<AuthContainer />} />
            <Route path='/usuario' element={<AuthenticatedContainer />}>
              <Route path='/usuario' element={<UsuarioContainer />} />
            </Route>
          </Routes>
        </BrowserRouter>

      </Provider>
      <footer>
        <div className="bg-gray-900 text-white text-center p-5">
          <p>&copy; 2024 Sportify. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
