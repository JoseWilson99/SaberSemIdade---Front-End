import { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null)

  // Carrega o usuário do localStorage assim que o app inicia
  useEffect(() => {
    const usuarioSalvo = localStorage.getItem("usuario")
    if (usuarioSalvo) {
      setUsuario(JSON.parse(usuarioSalvo))
    }
  }, [])

  // Função para fazer login global
  const loginGlobal = (dadosUsuario) => {
    localStorage.setItem("usuario", JSON.stringify(dadosUsuario))
    localStorage.setItem("usuarioId", dadosUsuario.id)
    setUsuario(dadosUsuario) // Atualiza o estado e avisa todos os componentes
  }

  // Função para fazer logout global
  const logoutGlobal = () => {
    localStorage.removeItem("usuario")
    localStorage.removeItem("usuarioId")
    setUsuario(null) // Reseta o estado instantaneamente
  }

  return (
    <AuthContext.Provider value={{ usuario, loginGlobal, logoutGlobal }}>
      {children}
    </AuthContext.Provider>
  )
}