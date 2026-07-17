import { Link } from 'wouter'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-800 text-white py-14 relative">
      <div className="flex justify-center mb-12">
        <a 
          href="#topo" 
          className= "bg-secondary text-white hover:bg-secondary-light font-bold text-sm md:text-base px-8 py-2.5 !rounded-full border-2 border-white min-w-[200px] shadow-md transition duration-200"         
        >
           VOLTAR AO TOPO
        </a>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold font-montserrat mb-4">
              Saber Sem Idade
            </h3>
            <p className="text-gray-400">
              Plataforma de educação digital focada em habilidades essenciais para o dia a dia.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-bold font-montserrat mb-4">
              Links Rápidos
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <a className="text-gray-400 hover:text-white transition">
                    Início
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/sobre">
                  <a className="text-gray-400 hover:text-white transition">
                    Sobre Nós
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/contato">
                  <a onClick={() => window.scrollTo(0, 0)} className="text-gray-400 hover:text-white transition">
                    Contato
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold font-montserrat mb-4">
              Contato
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li>Email: contato@sabersemidade.com</li>
              <li>Telefone: (21) 97544-9224</li>
              <li>Endereço: Rio de Janeiro, RJ</li>
            </ul>
          </div>
        </div>
        
        <hr className="border-gray-700 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">
            &copy; {currentYear} Saber Sem Idade. Todos os direitos reservados.
          </p>
          <p className="text-gray-400 mt-4 md:mt-0">
            ODS 4 - Educação de Qualidade
          </p>
        </div>
      </div>
    </footer>
  )
}