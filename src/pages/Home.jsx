import { useEffect, useState } from 'react'
import { Link } from 'wouter'
import CourseCard from '../components/CourseCard'
import Button from '../components/ui/Button'
import api from '../services/api'

export default function Home() {
  const [cursos, setCursos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        setLoading(true)
        const response = await api.get('/cursos')
        setCursos(response.data.slice(0, 6))
        setError(null)
      } catch (err) {
        setError("Erro ao carregar cursos.");
        setCursos([
          {
            id: 1,
            titulo: 'Habilidades Digitais Básicas',
            descricao: 'Aprenda o essencial para usar o computador e a internet com confiança e autonomia.',
          },
          {
            id: 2,
            titulo: 'WhatsApp e Mensagens',
            descricao: 'Envie mensagens, fotos, áudios e faça chamadas de vídeo para ficar mais perto de quem você ama.',
          },
          {
            id: 3,
            titulo: 'Aplicativos de Banco',
            descricao: 'Descubra como usar o aplicativo do seu banco com segurança para facilitar sua vida financeira.',
          }
        ]);
      } finally {
        loading && setLoading(false)
      }
    }
    fetchCursos()
  }, [])

  const LogoOficialProjeto = () => (
    <div className="w-44 h-44 bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-secondary/30 overflow-hidden mx-auto lg:mx-0 shrink-0">
      <img 
        src="/imagens/logo-saber-sem-idade.png" 
        alt="Logo Oficial Saber Sem Idade" 
        className="w-full h-full object-cover"
        onError={(e) => { e.target.src = "https://i.ibb.co/6wX88Y4/logo-placeholder.png" }}
      />
    </div>
  );

  return (
    <div className="w-full bg-creme">
      
      <section className="bg-primary text-white py-12 md:py-14 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-center gap-y-8 gap-x-16 relative z-10">
          
          <div className="text-center lg:text-left space-y-4 max-w-2xl -mt-2 md:-mt-4">
            <h1 className="text-5xl font-bold font-montserrat text-white tracking-tight">
              Saber Sem Idade 
            </h1>
            <div className="w-24 h-1.5 bg-secondary rounded-full mx-auto lg:mx-0"></div>
            <p className="text-xl max-w-xl mx-auto lg:mx-0 opacity-90 text-creme-card leading-relaxed">
              Cursos práticos e acessíveis para facilitar o seu dia a dia.
            </p>
            
            <div className="flex justify-center lg:justify-start gap-4 flex-wrap pt-2">
              <a href="/#nossos-cursos">
                <Button 
                  onClick={() => {
                    document.getElementById("nossos-cursos")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="bg-secondary text-white hover:bg-secondary-light font-bold text-sm md:text-base px-8 py-2.5 !rounded-full border-2 border-white min-w-[200px] shadow-xl transition duration-200"
                >
                  Explorar Cursos
                </Button>
              </a>
              <Link href="/sobre">
                <Button className="bg-secondary text-white hover:bg-secondary-light font-bold text-sm md:text-base px-8 py-2.5 !rounded-full border-2 border-white min-w-[200px] shadow-xl transition duration-200">
                  Sobre Nós
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex justify-center shrink-0">
            <LogoOficialProjeto />
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-[#e0F3CD]">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold font-montserrat text-center mb-12 text-primary">
            Por Que Saber Sem Idade?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-xl hover:shadow-medium transition text-center transform hover:-translate-y-1 duration-300 border border-creme-card">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-2xl font-bold font-montserrat mb-4 text-primary">Habilidades Digitais</h3>
              <p className="text-gray-600">Aprenda a usar tecnologia no dia a dia com explicações passo a passo.</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-xl hover:shadow-medium transition text-center transform hover:-translate-y-1 duration-300 border border-creme-card">
              <div className="text-4xl mb-4">🏦</div>
              <h3 className="text-2xl font-bold font-montserrat mb-4 text-primary">Segurança Digital</h3>
              <p className="text-gray-600">Entenda como usar a internet de maneira protegida contra golpes e fraudes.</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-xl hover:shadow-medium transition text-center transform hover:-translate-y-1 duration-300 border border-creme-card">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-2xl font-bold font-montserrat mb-4 text-primary">No Seu Ritmo</h3>
              <p className="text-gray-600">Sem pressa ou complicações. Cada lição foi pensada para o seu aprendizado.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="nossos-cursos" className="py-16 px-4 bg-[#e0F3CD] border-t border-creme-card">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold font-montserrat text-center mb-2 text-primary">
            Nossos Cursos
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Cursos práticos e acessíveis para facilitar o seu dia a dia.
          </p>

          {loading && (
            <div className="text-center py-12">
              <div className="spinner inline-block"></div>
              <p className="mt-4 text-gray-600">Carregando cursos...</p>
            </div>
          )}

          {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cursos.map(curso => (
                <CourseCard key={curso.id} curso={curso} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-primary text-white py-12 md:py-14 relative overflow-hidden border-t-4 border-secondary">
        <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-center gap-y-8 gap-x-16">
          
          <div className="text-center lg:text-left space-y-4 max-w-2xl -mt-2 md:-mt-4">
            <h2 className="text-4xl font-bold font-montserrat text-white tracking-tight">
              Nunca é tarde para aprender.
            </h2>
            <div className="w-20 h-1.5 bg-secondary rounded-full mx-auto lg:mx-0"></div>
            <p className="text-xl opacity-90 text-creme-card leading-relaxed">
              Aqui, cada passo é um novo começo. Cadastre-se gratuitamente.
            </p>
            
            <div className="flex justify-center lg:justify-start pt-2">
              <Link href="/cadastro">
                <Button className="bg-secondary text-white hover:bg-secondary-light font-bold text-sm md:text-base px-8 py-2.5 !rounded-full border-2 border-white min-w-[200px] shadow-xl transition duration-200">
                  Cadastrar 
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex justify-center shrink-0">
            <LogoOficialProjeto />
          </div>

        </div>
      </section>
    </div>
  )
}
