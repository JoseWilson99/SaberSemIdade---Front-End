import { useState, useContext } from 'react'
import { Link, useLocation } from 'wouter'
import { AuthContext } from '../context/AuthContext' 

export default function Login() {
  const [, setLocation] = useLocation()
  const { loginGlobal } = useContext(AuthContext) 

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  
  const [modalConfig, setModalConfig] = useState({ 
    isOpen: false, 
    titulo: '', 
    mensagem: '', 
    tipo: 'sucesso', 
    onConfirm: null 
  })

  async function handleLogin(e) {
    e.preventDefault()
    
    try {
      const respuesta = await fetch(
        "http://localhost:8080/api/usuarios/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email, senha })
        }
      )

      if (!respuesta.ok) {
        setModalConfig({
          isOpen: true,
          titulo: "Ops, algo deu errado!",
          mensagem: "E-mail ou senha inválidos. Por favor, verifique seus dados.",
          tipo: "erro",
          onConfirm: () => setModalConfig(prev => ({ ...prev, isOpen: false }))
        })
        return
      }

      const usuario = await respuesta.json()

      loginGlobal(usuario)

      console.log("Usuário logado:", usuario)

      setModalConfig({
        isOpen: true,
        titulo: "🎉 Seja Bem-vindo(a)!",
        mensagem: "Login realizado com sucesso! Vamos te levar para o seu perfil.",
        tipo: "sucesso",
        onConfirm: () => {
          setModalConfig(prev => ({ ...prev, isOpen: false }))
          setLocation("/perfil")
        }
      })

    } catch (error) {
      console.error("Erro login:", error)
      setModalConfig({
        isOpen: true,
        titulo: "Erro de Conexão",
        mensagem: "Não conseguimos conectar ao servidor. Tente novamente mais tarde.",
        tipo: "erro",
        onConfirm: () => setModalConfig(prev => ({ ...prev, isOpen: false }))
      })
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#e0F3CD] px-4 py-12 relative overflow-hidden select-none">
      
      <div className="fixed top-1/2 left-4 md:left-12 text-8xl text-primary opacity-5 select-none pointer-events-none transform -translate-y-1/2 -rotate-12 hidden lg:block">
        🌿
      </div>
      <div className="fixed top-1/2 right-4 md:right-12 text-8xl text-primary opacity-5 select-none pointer-events-none transform -translate-y-1/2 rotate-12 hidden lg:block">
        🍃
      </div>

      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-gray-100 relative z-10">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#1b4332] font-montserrat">
          Entrar no Saber Sem Idade
        </h2>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block mb-2 font-semibold text-gray-700 font-montserrat text-sm ml-1">
              Seu E-mail
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="exemplo@email.com"
              className="w-full px-5 py-3 border border-gray-200 rounded-full focus:outline-none focus:border-[#1b4332] focus:ring-1 focus:ring-[#1b4332]/20 text-base transition font-roboto"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700 font-montserrat text-sm ml-1">
              Sua Senha
            </label>
            <input
              type="password"
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              className="w-full px-5 py-3 border border-gray-200 rounded-full focus:outline-none focus:border-[#1b4332] focus:ring-1 focus:ring-[#1b4332]/20 text-base transition font-roboto"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#ca8a04] hover:bg-[#b07803] text-white py-3 rounded-full font-bold text-base shadow-xl transition duration-200 font-montserrat cursor-pointer border-none mt-2"
          >
            Entrar
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600 font-roboto text-sm">
          Ainda não tem conta?
          <Link href="/cadastro">
            <span className="text-[#1b4332] font-bold ml-1 hover:underline font-montserrat cursor-pointer">
              Criar conta
            </span>
          </Link>
        </p>
      </div>

      {modalConfig.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-xl border border-gray-100 text-center space-y-4">
            <div className="text-3xl">
              {modalConfig.tipo === 'sucesso' ? '✨' : '⚠️'}
            </div>
            <div className="text-xl font-bold font-montserrat text-[#1b4332]">
              {modalConfig.titulo}
            </div>
            <p className="text-gray-600 font-roboto text-sm leading-relaxed">
              {modalConfig.mensagem}
            </p>
            <div className="flex items-center justify-center pt-2">
              <button
                onClick={modalConfig.onConfirm}
                className={`text-white font-bold text-sm px-8 py-2.5 rounded-full shadow-xl transition border-none cursor-pointer ${
                  modalConfig.tipo === 'sucesso' ? 'bg-[#1b4332] hover:bg-[#143225]' : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
