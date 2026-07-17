import { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null)

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem("usuario")
    if (usuarioSalvo) {
      setUsuario(JSON.parse(usuarioSalvo))
    }
  }, [])

  const loginGlobal = (dadosUsuario) => {
    localStorage.setItem("usuario", JSON.stringify(dadosUsuario))
    localStorage.setItem("usuarioId", dadosUsuario.id)
    setUsuario(dadosUsuario) 
  }

  const logoutGlobal = () => {
    localStorage.removeItem("usuario")
    localStorage.removeItem("usuarioId")
    setUsuario(null) 
  }

  return (
    <AuthContext.Provider value={{ usuario, loginGlobal, logoutGlobal }}>
      {children}
    </AuthContext.Provider>
  )
}
