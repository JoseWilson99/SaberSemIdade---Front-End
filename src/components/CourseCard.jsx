import { useState } from 'react'
import { useLocation } from 'wouter'
import Button from './ui/Button'

export default function CourseCard({ curso, onEnroll }) {
  const [, setLocation] = useLocation()
  const [mensagemStatus, setMensagemStatus] = useState({ exibir: false, tipo: '', texto: '' })

  const imagens = {
    1: '/imagens/habilidades-digitais.jpg',
    7: '/imagens/habilidades-digitais.jpg',
    2: '/imagens/whatsapp.jpg',
    8: '/imagens/whatsapp.jpg',
    3: '/imagens/aplicativos-banco.jpg',
    9: '/imagens/aplicativos-banco.jpg'
  }

  const rotas = {
    1: '/curso-hdb',
    7: '/curso-hdb',
    2: '/curso-wm',
    8: '/curso-wm',
    3: '/curso-ab',
    9: '/curso-ab'
  }

  const imagemCurso = imagens[curso.id] || '/imagens/logo.png'
  const rotaDestino = rotas[curso.id]

  async function matricularCurso(cursoId, usuarioId) {
    try {
      const resposta = await fetch("http://localhost:8080/api/matriculas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          usuario: { id: usuarioId },
          curso: { id: cursoId },
          status: "ATIVO"
        })
      })

      if (resposta.ok) {
        return { sucesso: true, mensagem: "Matrícula realizada com sucesso!" }
      }

      return { sucesso: true, jáMatriculado: true, mensagem: "Carregando suas aulas..." }

    } catch (erro) {
      console.error("Erro conexão matrícula:", erro)
      if (rotaDestino) {
        return { sucesso: true, jáMatriculado: true, mensagem: "Entrando no ambiente do curso..." }
      }
      return { sucesso: false, mensagem: "Não foi possível conectar ao servidor." }
    }
  }

  const handleEnroll = async () => {
    const usuarioSalvo = localStorage.getItem("usuario")

    if (!usuarioSalvo) {
      setMensagemStatus({
        exibir: true,
        tipo: 'erro',
        texto: '🔒 Por favor, faça login antes de acessar o curso.'
      })
      setTimeout(() => setLocation("/login"), 2500)
      return
    }

    const usuario = JSON.parse(usuarioSalvo)
    
    setMensagemStatus({
      exibir: true,
      tipo: 'info',
      texto: '⏳ Verificando sua inscrição...'
    })

    const resultado = await matricularCurso(curso.id, usuario.id)

    if (resultado.sucesso) {
      if (onEnroll) onEnroll(curso.id)

      setMensagemStatus({
        exibir: true,
        tipo: 'sucesso',
        texto: resultado.jáMatriculado ? `👋 Bem-vindo de volta! ${resultado.mensagem}` : `✅ ${resultado.mensagem}`
      })

      if (rotaDestino) {
        setTimeout(() => {
          setLocation(rotaDestino)
        }, 2000)
      }
    } else {
      setMensagemStatus({
        exibir: true,
        tipo: 'erro',
        texto: `❌ ${resultado.mensagem}`
      })
      setTimeout(() => setMensagemStatus({ exibir: false, tipo: '', texto: '' }), 4000)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden border border-creme-card flex flex-col justify-between">
      
      <div>

        <div className="h-48 overflow-hidden relative">
          <img
            src={imagemCurso}
            alt={curso.titulo}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute top-3 left-3 bg-primary bg-opacity-90 text-white text-xs font-semibold px-2.5 py-1 rounded-md">
            Curso Prático
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 text-primary font-montserrat">
            {curso.titulo}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            {curso.descricao}
          </p>
        </div>
      </div>

      <div className="px-6 pb-6 mt-auto space-y-3">
        {mensagemStatus.exibir && (
          <div className={`mb-2 border rounded-xl p-3 text-center transition-all ${
            mensagemStatus.tipo === 'sucesso' ? 'bg-green-50 border-green-300 text-green-800' :
            mensagemStatus.tipo === 'info' ? 'bg-amber-50 border-amber-300 text-amber-800' :
            'bg-red-50 border-red-300 text-red-800'
          }`}>
            <p className="font-semibold text-sm">{mensagemStatus.texto}</p>
          </div>
        )}

        <button 
          onClick={() => setLocation(`/sobre-curso/${curso.id}`)}
          className="w-full bg-secondary hover:bg-secondary-light text-white font-bold py-2.5 rounded-full text-sm transition-colors border-none shadow-md flex items-center justify-center gap-1 cursor-pointer"
        >
          📖 Sobre o Curso
        </button>

        <button 
          onClick={handleEnroll}
          className="w-full bg-secondary hover:bg-secondary-light text-white font-bold py-2.5 rounded-full text-sm transition-colors border-none shadow-md flex items-center justify-center gap-1 cursor-pointer"
        >
          Matricule-se / Acesse
        </button>
      </div>
    </div>
  )
}
