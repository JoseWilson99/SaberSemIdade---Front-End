import { Router, Route } from 'wouter'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Contato from './pages/Contato'
import ScrollToTop from './components/ScrollToTop'
import Perfil from './pages/Perfil'

import SobreNos from './pages/SobreNos'
import SobreCurso from './pages/SobreCurso'
import CursoHDB from './pages/CursoHDB'
import CursoWM from './pages/CursoWM'
import CursoAB from './pages/CursoAB'

import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <div id="topo" className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        
        <main className="flex-grow">
          <ScrollToTop /> 

          <Router>
            <Route path="/" component={Home} />
            <Route path="/sobre" component={SobreNos} />
            <Route path="/curso-hdb" component={CursoHDB}/>
            <Route path="/curso-wm" component={CursoWM}/>
            <Route path="/curso-ab" component={CursoAB}/>
            <Route path="/contato" component={Contato}/>
            <Route path="/perfil" component={Perfil} />
            <Route path="/login" component={Login}/>
            <Route path="/cadastro" component={Cadastro}/>            
            <Route path="/sobre-curso/:id" component={SobreCurso}/> 
          </Router>
        </main>
        
        <Footer />
      </div>
    </AuthProvider>
  )
}

export default App
