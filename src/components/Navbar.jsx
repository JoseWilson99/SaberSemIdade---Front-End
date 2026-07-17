import { Link, useLocation } from 'wouter'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import Button from './ui/Button'

export default function Navbar() {
  const [location, setLocation] = useLocation();
  const { usuario, logoutGlobal } = useContext(AuthContext);

  // Configuração para o modal personalizado de Logout
  const [modalLogoutAberto, setModalLogoutAberto] = useState(false);

  // Monitora a URL para abrir o modal caso o usuário venha de um logout recente
  useEffect(() => {
    if (location.includes('?logout=success')) {
      setModalLogoutAberto(true);
    }
  }, [location]);

  const dispararSair = () => {
    logoutGlobal(); // Reseta o estado global na hora
    localStorage.removeItem("usuario");
    localStorage.removeItem("usuarioId");
    
    // Redireciona imediatamente para a Home passando o parâmetro de sucesso
    setLocation("/?logout=success");
  };

  const fecharModalEIrParaHome = () => {
    setModalLogoutAberto(false);
    setLocation("/"); // Limpa a URL de forma fluida
  };

  return (
    <nav className="bg-primary text-white shadow-md sticky top-0 z-50 border-b-2 border-secondary">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/">
          <div className="flex items-center cursor-pointer">
            <img 
              src="/imagens/logo.png" 
              alt="Logo" 
              className="h-14 w-auto object-contain mr-2" 
            />
          </div>
        </Link>

        <div className="flex space-x-3 items-center">
          <Link href="/">
            <a className="text-white hover:text-secondary-light hover:bg-white/10 font-medium px-4 py-1.5 rounded-xl border border-white/40 bg-white/5 transition duration-200 text-sm md:text-base">
              Início
            </a>
          </Link>
          <Link href="/contato">
            <a className="text-white hover:text-secondary-light hover:bg-white/10 font-medium px-4 py-1.5 rounded-xl border border-white/40 bg-white/5 transition duration-200 text-sm md:text-base">
              Contato
            </a>
          </Link>

          {!usuario ? (
            <>
              <Link 
                href="/login" 
                className="text-white hover:text-secondary-light hover:bg-white/10 font-medium px-4 py-1.5 rounded-xl border border-white/40 bg-white/5 transition duration-200 text-sm md:text-base cursor-pointer">
                Login
              </Link>
              <Link href="/cadastro">
                <Button className="bg-secondary text-white hover:bg-secondary-light px-5 py-2 font-bold rounded-full text-sm md:text-base border-none shadow-sm">
                  Comece Agora
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/perfil">
                <a className="text-white hover:text-secondary-light hover:bg-white/10 font-medium px-4 py-1.5 rounded-xl border border-white/40 bg-white/5 transition duration-200 text-sm md:text-base">
                  Meu Perfil
                </a>
              </Link>
              
              <Button
                className="bg-transparent border border-red-500 text-white font-bold px-5 py-1.5 rounded-xl hover:bg-red-600 hover:border-red-600 transition text-sm md:text-base shadow-sm"
                onClick={dispararSair}
              >
                Sair
              </Button>

              <span className="text-white/30 text-xl pl-1 hidden md:inline">|</span>

              <div className="flex items-center gap-3 bg-white/10 px-4 py-1.5 rounded-full border border-white/10 shadow-inner">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 border border-white/20 shrink-0 flex items-center justify-center">
                  <svg 
                    className="w-full h-full text-gray-400 p-0.5" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <span className="text-white font-semibold font-montserrat text-base tracking-wide whitespace-nowrap">
                  Olá, <span className="capitalize text-secondary-light">{usuario.nome}</span> 👋
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* MODAL ELEGANTE CENTRALIZADO DE LOGOUT (AGORA INTEGRADO) */}
      {modalLogoutAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in select-none">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-gray-100 text-center space-y-4">
            <div className="text-3xl">🚪</div>
            <div className="text-xl font-bold font-montserrat text-[#1b4332]">
              Até logo!
            </div>
            <p className="text-gray-600 font-roboto text-sm leading-relaxed">
              Você saiu da sua conta com segurança. Esperamos ver você de volta em breve!
            </p>
            <div className="flex items-center justify-center pt-2">
              <button
                onClick={fecharModalEIrParaHome}
                className="text-white font-bold text-sm px-8 py-2.5 rounded-full shadow-md transition border-none cursor-pointer bg-[#1b4332] hover:bg-[#143225]"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}