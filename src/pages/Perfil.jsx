import { useEffect, useState, useContext } from 'react'
import { useLocation } from 'wouter'
import { AuthContext } from '../context/AuthContext'
import Button from '../components/ui/Button'

export default function Perfil(){
  const [, setLocation] = useLocation()
  const { logoutGlobal } = useContext(AuthContext)
  const [usuario, setUsuario] = useState(null)
  const [matriculas, setMatriculas] = useState([])

  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    titulo: '',
    mensagem: '',
    onConfirm: null,
    isAlertOnly: false
  })

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem("usuario")

    if (!usuarioSalvo) {
      setLocation("/login")
      return
    }

    const usuarioAtual = JSON.parse(usuarioSalvo)
    setUsuario(usuarioAtual)
    buscarCursos(usuarioAtual.id)
  }, [])

  async function buscarCursos(id) {
    try {
      const resposta = await fetch(`http://localhost:8080/api/matriculas/usuario/${id}`)
      const dados = await resposta.json()
      setMatriculas(dados)
    } catch (error) {
      console.error("Erro buscando cursos:", error)
    }
  }

  function mostrarModal(titulo, mensagem, onConfirm, isAlertOnly = false) {
    setModalConfig({
      isOpen: true,
      titulo,
      mensagem,
      onConfirm: () => {
        if (onConfirm) onConfirm();
        fecharModal();
      },
      isAlertOnly
    })
  }

  function fecharModal() {
    setModalConfig(prev => ({ ...prev, isOpen: false }))
  }

  async function deletarMatricula(matriculaId) {
    mostrarModal(
      "Cancelar Matrícula",
      "Deseja realmente cancelar sua matrícula neste curso?",
      async () => {
        try {
          const resposta = await fetch(`http://localhost:8080/api/matriculas/${matriculaId}`, {
            method: "DELETE"
          })

          if (resposta.ok) {
            mostrarModal("Sucesso", "Matrícula cancelada com sucesso.", null, true)
            setMatriculas(matriculas.filter(m => m.id !== matriculaId))
          } else {
            mostrarModal("Erro", "Erro ao cancelar matrícula. Tente novamente.", null, true)
          }
        } catch (error) {
          console.error("Erro ao deletar matrícula:", error)
          mostrarModal("Erro", "Erro ao conectar com o servidor.", null, true)
        }
      }
    )
  }

  function sair() {
    logoutGlobal(); 
    localStorage.removeItem("usuario")
    localStorage.removeItem("usuarioId")
    
    setLocation("/?logout=success")
  }

  async function excluirConta() {
    mostrarModal(
      "Excluir Conta",
      "Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.",
      async () => {
        try {
          const resposta = await fetch(`http://localhost:8080/api/usuarios/${usuario.id}`, {
            method: "DELETE"
          })

          if (resposta.ok) {
            logoutGlobal();
            localStorage.removeItem("usuario")
            localStorage.removeItem("usuarioId")
            setLocation("/")
          }
        } catch (error) {
          console.error(error)
          mostrarModal("Erro", "Erro ao excluir conta.", null, true)
        }
      }
    )
  }

  if (!usuario) {
    return null
  }

  const inicialNome = usuario.nome ? usuario.nome.charAt(0).toUpperCase() : 'A'

  return (
    <div className="min-h-screen bg-[#e0F3CD] py-12 px-4 relative overflow-hidden selection:bg-secondary/20">
      
      <div className="fixed top-1/2 left-4 md:left-12 text-8xl text-primary opacity-5 select-none pointer-events-none transform -translate-y-1/2 -rotate-12 hidden lg:block">
        🌿
      </div>
      <div className="fixed top-1/2 right-4 md:right-12 text-8xl text-primary opacity-5 select-none pointer-events-none transform -translate-y-1/2 rotate-12 hidden lg:block">
        🍃
      </div>

      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-creme-card flex flex-col md:flex-row items-center gap-6">
          <div className="w-20 h-20 bg-secondary text-white rounded-full flex items-center justify-center text-3xl font-bold font-montserrat shadow-md shrink-0">
            {inicialNome}
          </div>

          <div className="flex-1 text-center md:text-left space-y-1">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <h1 className="text-3xl font-bold font-montserrat text-primary">{usuario.nome}</h1>
              <span className="text-xl">🌱</span>
            </div>
            <p className="text-gray-500 font-roboto text-sm md:text-base">{usuario.email}</p>
            <div className="inline-block bg-primary/10 text-primary font-medium text-xs px-3 py-1 rounded-full mt-1">
              Aluno Verificado
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2 w-full md:w-auto shrink-0">
            <button
              onClick={sair}
              className="bg-creme-card text-gray-700 hover:bg-gray-200 transition font-medium text-sm px-6 py-2.5 rounded-full shadow-xl"
            >
              Sair da Conta
            </button>
            <button
              onClick={excluirConta}
              className="bg-creme-card text-gray-700 hover:bg-gray-200 transition font-medium text-sm px-6 py-2.5 rounded-full shadow-xl"
            >
              Excluir Conta
            </button>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl border border-creme-card">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 border-b border-creme-card pb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📚</span>
              <h2 className="text-2xl font-bold font-montserrat text-primary">
                Minhas Matrículas
              </h2>
            </div>
            
            <Button 
              onClick={() => {
                setLocation("/"); 
                setTimeout(() => {
                  const secaoCursos = document.getElementById("nossos-cursos");
                  if (secaoCursos) {
                    secaoCursos.scrollIntoView({ behavior: "smooth" });
                  }
                }, 100);
              }}
              className="bg-secondary text-white hover:bg-secondary-light font-bold text-sm px-5 py-2 rounded-full w-full sm:w-auto text-center shadow-xl border-none cursor-pointer">
              Conhecer Cursos
            </Button>
          </div>

          {matriculas.length === 0 ? (
            <div className="text-center py-16 bg-creme/50 rounded-2xl border border-dashed border-creme-card px-4">
              <p className="text-lg md:text-xl font-medium font-montserrat text-gray-700">
                Você ainda não possui cursos matriculados.
              </p>
              <p className="text-sm text-gray-500 font-roboto mt-2">
                Clique no botão acima para explorar nossas opções disponíveis!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {matriculas.map((matricula) => {
                const professoresDoCurso = {
                  1: "Fernanda Lima",   7: "Fernanda Lima",
                  2: "Carlos Alberto",  8: "Carlos Alberto",
                  3: "Mariana Costa",   9: "Mariana Costa"
                };

                const nomeProfessor = matricula.curso.instrutor?.nome || professoresDoCurso[matricula.curso.id] || "Fernanda Lima";

                return (
                  <div
                    key={matricula.id}
                    className="bg-creme/30 border border-creme-card p-5 rounded-2xl hover:shadow-soft transition-all duration-200 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <h3 className="text-lg font-bold font-montserrat text-primary leading-snug">
                          {matricula.curso.titulo}
                        </h3>
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${
                          matricula.status === 'ATIVO' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {matricula.status || 'ATIVO'}
                        </span>
                      </div>

                      <p className="text-xs text-gray-500 mb-1">
                        📁 <strong>Categoria:</strong> {matricula.curso.categoria ? matricula.curso.categoria.nome : "Digital"}
                      </p>
                      <p className="text-xs text-gray-500">
                        👨‍🏫 <strong>Professor(a):</strong> {nomeProfessor}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-creme-card/60 flex items-center justify-end gap-2">
                      <Button 
                        onClick={() => {
                          const rotas = {
                            1: '/curso-hdb', 7: '/curso-hdb',
                            2: '/curso-wm',  8: '/curso-wm',
                            3: '/curso-ab',  9: '/curso-ab'
                          }
                          const rota = rotas[matricula.curso.id];
                          if (rota) setLocation(rota);
                        }}
                        className="bg-primary text-white hover:bg-primary-light text-xs font-bold px-5 py-2.5 rounded-full border-none shadow-xl flex-1 text-center"
                      >
                        Estudar Agora &gt;
                      </Button>

                      <button 
                        onClick={() => deletarMatricula(matricula.id)}
                        title="Remover curso das minhas matrículas"
                        className="bg-red-50 hover:bg-red-100 text-red-600 p-2.5 rounded-full border border-red-200 transition-colors flex items-center justify-center shrink-0 shadow-xl"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {modalConfig.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-xl border border-creme-card text-center space-y-4">
            <div className="text-xl font-bold font-montserrat text-primary">
              {modalConfig.titulo}
            </div>
            <p className="text-gray-600 font-roboto text-sm leading-relaxed">
              {modalConfig.mensagem}
            </p>
            <div className="flex items-center justify-center gap-2 pt-2">
              {!modalConfig.isAlertOnly && (
                <button
                  onClick={fecharModal}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-sm px-5 py-2 rounded-full transition"
                >
                  Cancelar
                </button>
              )}
              <button
                onClick={modalConfig.onConfirm}
                className="bg-primary hover:bg-primary-light text-white font-bold text-sm px-6 py-2 rounded-full shadow-md transition"
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
