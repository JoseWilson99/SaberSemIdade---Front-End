import { useState } from 'react'
import { useLocation, useRoute } from 'wouter'

export default function SobreCurso() {
  const [, setLocation] = useLocation()
  const [, params] = useRoute('/sobre-curso/:id')
  const cursoId = params?.id
  const [mensagemStatus, setMensagemStatus] = useState({ exibir: false, tipo: '', texto: '' })

  const detalhesCursos = {
    1: {
      titulo: "Habilidades Digitais Básicas",
      subtitulo: "Descubra como dominar o computador e a internet sem medo e no seu ritmo.",
      imagem: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop",
      oQueSeraDitado: "Este curso foi carinhosamente planejado para quem deseja ligar o computador, navegar em sites com segurança, ler notícias e interagir nas redes sociais de forma independente.",
      modulos: ["Como ligar e organizar o computador", "Navegando na Internet de forma segura", "Criando e usando o seu E-mail", "Explorando redes sociais com privacidade"]
    },
    2: {
      titulo: "WhatsApp e Mensagens",
      subtitulo: "Conecte-se com amigos, familiares e gerencie conversas com praticidade.",
      imagem: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop",
      oQueSeraDitado: "Esqueça as travas na hora de mandar áudio! Aqui você vai aprender a salvar contatos, enviar fotos, fazer chamadas de vídeo com parentes distantes e identificar mensagens falsas.",
      modulos: ["Instalação e configuração inicial", "Enviando áudios, fotos e contatos", "Dominando chamadas de vídeo em grupo", "Dicas de ouro para não cair em golpes"]
    },
    3: {
      titulo: "Aplicativos de Banco",
      subtitulo: "Sua independência financeira digital com total segurança e clareza.",
      imagem: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop",
      oQueSeraDitado: "Chega de filas em caixas eletrônicos! Saiba como verificar seu saldo, fazer transferências ou PIX e pagar contas direto do conforto do seu sofá usando apenas o celular.",
      modulos: ["Conhecendo a interface do seu banco", "Como consultar extratos e saldos", "O que é e como usar o PIX com segurança", "Identificando comprovantes legítimos"]
    }
  }

  const idChave = (cursoId === '7' || cursoId === '1') ? 1 : (cursoId === '8' || cursoId === '2') ? 2 : 3
  const dados = detalhesCursos[idChave]
  const rotasFinais = { 1: '/curso-hdb', 2: '/curso-wm', 3: '/curso-ab' }

  // NOVA LÓGICA COM ALERTAS DE CASOS DE CADASTRO
  async function executarMatriculaComAlerta() {
    const usuarioSalvo = localStorage.getItem("usuario")
    
    if (!usuarioSalvo) {
      setMensagemStatus({
        exibir: true,
        tipo: 'erro',
        texto: '🔒 Por favor, faça login antes de se cadastrar no curso.'
      })
      setTimeout(() => setLocation("/login"), 2500)
      return
    }

    const usuario = JSON.parse(usuarioSalvo)
    
    setMensagemStatus({
      exibir: true,
      tipo: 'info',
      texto: '⏳ Processando seu cadastro...'
    })

    try {
      const resposta = await fetch("http://localhost:8080/api/matriculas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuario: { id: usuario.id },
          curso: { id: Number(cursoId) },
          status: "ATIVO"
        })
      })

      if (resposta.ok) {
        setMensagemStatus({
          exibir: true,
          tipo: 'sucesso',
          texto: '✅ Parabéns! Inscrição realizada com sucesso. Entrando na sala...'
        })
        setTimeout(() => setLocation(rotasFinais[idChave]), 2000)
      } else {
        // Se cair aqui, significa que o banco de dados barrou porque ele já está matriculado
        setMensagemStatus({
          exibir: true,
          tipo: 'aviso',
          texto: '📢 Você já está cadastrado neste curso! Redirecionando para as aulas...'
        })
        setTimeout(() => setLocation(rotasFinais[idChave]), 2500)
      }
    } catch (erro) {
      console.error(erro)
      // Fallback amigável de rede
      setLocation(rotasFinais[idChave])
    }
  }

  return (
    <div className="bg-creme min-h-screen py-12 px-4 font-roboto">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-soft border border-creme-card overflow-hidden">
        
        {/* Banner Superior */}
        <div className="bg-primary text-white p-8 md:p-12 relative">
          <button 
            onClick={() => setLocation('/')}
            className="absolute top-6 right-6 bg-white/20 hover:bg-white/30 text-white font-bold text-sm px-5 py-2 rounded-full transition shadow-sm"
          >
            ← Voltar ao Início
          </button>
          <span className="text-sm uppercase bg-secondary px-4 py-1.5 rounded-full font-bold tracking-wider">
            RESUMO INFORMATIVO
          </span>
          <h1 className="text-4xl font-bold font-montserrat mt-4 mb-2">{dados.titulo}</h1>
          <p className="text-creme-card font-light text-lg">{dados.subtitulo}</p>
        </div>

        {/* Bloco de Conteúdo */}
        <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-primary font-montserrat">O que você vai aprender?</h3>
            <p className="text-gray-600 leading-relaxed text-justify text-base">{dados.oQueSeraDitado}</p>
          </div>
          <div className="h-56 rounded-2xl overflow-hidden border border-creme-card shadow-sm">
            <img src={dados.imagem} alt={dados.titulo} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Cronograma */}
        <div className="px-8 md:px-12 pb-8">
          <div className="bg-creme/40 border border-creme-card rounded-2xl p-6">
            <h3 className="text-lg font-bold text-primary font-montserrat mb-4">📌 Conteúdo Programático Simplificado:</h3>
            <ul className="space-y-2">
              {dados.modulos.map((modulo, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-700 text-sm font-light">
                  <span className="text-secondary text-base">✔</span> {modulo}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Seção Inferior com Alerta Integrado */}
        <div className="bg-creme-card p-6 flex flex-col items-center gap-4 border-t border-creme-card">
          
          {mensagemStatus.exibir && (
            <div className={`w-full max-w-md border rounded-xl p-3 text-center transition-all ${
              mensagemStatus.tipo === 'sucesso' ? 'bg-green-50 border-green-300 text-green-800' :
              mensagemStatus.tipo === 'aviso' ? 'bg-amber-50 border-amber-300 text-amber-800' :
              mensagemStatus.tipo === 'info' ? 'bg-blue-50 border-blue-300 text-blue-800' :
              'bg-red-50 border-red-300 text-red-800'
            }`}>
              <p className="font-semibold text-sm">{mensagemStatus.texto}</p>
            </div>
          )}

          <button 
            onClick={executarMatriculaComAlerta}
            className="bg-secondary hover:bg-secondary-light text-white font-bold px-10 py-3.5 rounded-full shadow-md transition-all text-base border-none active:scale-95"
          >
            Quero me Inscrever nesse Curso
          </button>
        </div>

      </div>
    </div>
  )
}