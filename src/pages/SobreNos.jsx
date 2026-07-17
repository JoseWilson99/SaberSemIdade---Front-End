import React from 'react';

function SobreNos() {
  const estiloParagrafo = {
    fontSize: "22px",
    lineHeight: "38px",
  };

  const lerPagina = () => {
    speechSynthesis.cancel();

    const texto = `
    Nossa História.
    Vivemos em uma época em que a tecnologia está presente em praticamente todos os momentos do nosso dia a dia. Fazer uma ligação, enviar uma mensagem, marcar uma consulta ou realizar um pagamento pelo celular tornou-se algo comum. No entanto, para grande parte da população mais velha, essas tarefas cotidianas ainda representam um grande desafio.

    O Saber Sem Idade nasceu justamente da observação dessa realidade. Percebemos, dentro das nossas próprias famílias, as dificuldades em enviar um áudio no WhatsApp, identificar o ícone correto de uma função ou acessar um aplicativo com total segurança e confiança.

    Foi pensando nessas situações que desenvolvemos este projeto. Nosso objetivo é oferecer um ambiente de aprendizado simples, intuitivo e acolhedor, respeitando o ritmo único de cada pessoa.

    Acreditamos genuinamente que aprender não tem idade. Com conteúdos práticos, linguagem clara e exemplos reais, buscamos promover a inclusão digital, fortalecer a autonomia e proporcionar mais confiança para que nossos alunos utilizem a tecnologia como uma ferramenta que facilite suas vidas.

    Afinal, nunca é tarde para aprender!
    `;

    const voz = new SpeechSynthesisUtterance(texto);
    voz.lang = "pt-BR";
    voz.rate = 0.9;
    voz.pitch = 1;

    speechSynthesis.speak(voz);
  };

  const pararLeitura = () => {
    speechSynthesis.cancel();
  };

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
    <div className="bg-creme min-h-screen font-roboto selection:bg-secondary/20">

      <section className="bg-primary text-white py-12 md:py-14 relative overflow-hidden">
        <div className="absolute right-10 bottom-0 text-9xl opacity-10 select-none pointer-events-none transform rotate-12">🌿</div>
        
        <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-center gap-y-8 gap-x-16">

          <div className="text-left space-y-4 max-w-2xl -mt-2 md:-mt-4">
            <h1 className="text-5xl font-black font-montserrat tracking-tight">
              Sobre Nós
            </h1>
            <div className="w-24 h-1.5 bg-secondary rounded-full"></div>
            <p className="leading-relaxed font-light text-creme-card text-2xl md:text-3xl tracking-wide pt-1">
              Aprender não tem idade. Nosso propósito é tornar a tecnologia simples, acessível e útil para todos.
            </p>
          </div>
          <div className="flex justify-center shrink-0">
            <LogoOficialProjeto />
          </div>
        </div>
      </section>

      <section className="w-[94%] max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl shadow-soft border border-creme-card p-8 lg:p-12">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-creme-card pb-6">
            <h2 className="text-4xl font-bold font-montserrat text-primary">
              Nossa História
            </h2>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={lerPagina}
                className="bg-secondary hover:bg-secondary-light text-white text-base font-semibold px-6 py-2.5 rounded-full shadow-sm transition-colors flex items-center gap-2 border-none cursor-pointer"
              >
                <span>🔊</span> Ouvir Conteúdo
              </button>
              <button
                onClick={pararLeitura}
                className="bg-red-600 hover:bg-red-700 text-white text-base font-semibold px-5 py-2.5 rounded-full shadow-sm transition-colors flex items-center gap-2 border-none cursor-pointer"
              >
                <span>⏹️</span> Parar
              </button>
            </div>
          </div>

          <div className="space-y-16 text-gray-700">
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <p style={estiloParagrafo} className="text-justify font-light">
                  Vivemos em uma época em que a tecnologia está presente em praticamente todos os momentos. Fazer uma ligação, enviar uma mensagem, marcar uma consulta ou realizar um pagamento tornou-se algo comum. No entanto, para grande parte da população mais velha, essas tarefas ainda representam um grande desafio.
                </p>
              </div>
              <div className="h-64 bg-creme/50 rounded-2xl overflow-hidden border border-creme-card flex items-center justify-center shadow-sm">
                <img 
                  src="/imagens/celular-cotidiano.jpg" 
                  alt="Pessoa idosa utilizando o celular com dúvidas" 
                  className="w-full h-full object-cover opacity-90"
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop" }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="h-64 bg-creme/50 rounded-2xl overflow-hidden border border-creme-card flex items-center justify-center shadow-sm lg:order-last">
                <img 
                  src="/imagens/ajuda-familiar.jpg" 
                  alt="Família ensinando tecnologia com paciência" 
                  className="w-full h-full object-cover opacity-90"
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop" }}
                />
              </div>
              <div className="space-y-4">
                <p style={estiloParagrafo} className="text-justify font-light">
                  O <strong className="text-secondary font-bold">Saber Sem Idade</strong> nasceu justamente da observação dessa realidade dentro de nossas próprias famílias. Percebemos que muitas pessoas conhecem os aparelhos, mas enfrentam barreiras simples no dia a dia, como enviar um áudio no WhatsApp ou navegar em um aplicativo de banco com segurança.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <p style={estiloParagrafo} className="text-justify font-light">
                  Foi pensando nisso que estruturamos este ambiente. Nosso objetivo principal é promover a verdadeira inclusão digital, fortalecendo a autonomia e proporcionando mais confiança para que nossos alunos usem a tecnologia como uma ferramenta aliada, respeitando sempre o tempo e o ritmo de cada um.
                </p>
                <p style={estiloParagrafo} className="text-justify font-bold text-primary">
                  🌱 Afinal, nunca é tarde para aprender!
                </p>
              </div>
              <div className="h-64 bg-creme/50 rounded-2xl overflow-hidden border border-creme-card flex items-center justify-center shadow-sm">
                <img 
                  src="/imagens/instrutora-ajudando-senhor.jpg" 
                  alt="Profissional ensinando tecnologia de forma acolhedora para um senhor no notebook" 
                  className="w-full h-full object-cover opacity-90"
                  onError={(e) => { e.target.src = "https://brasilpaisdigital.com.br/wp-content/uploads/2022/01/Idoso-usando-computador.jpg" }}
                />
              </div>
            </div>

          </div>

        </div>
      </section>

      <section className="bg-primary py-12 md:py-14 relative overflow-hidden border-t-4 border-secondary">
        <div className="absolute left-6 top-6 text-7xl opacity-5 select-none pointer-events-none">🍃</div>
        
        <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-center gap-y-8 gap-x-16">
          
          <div className="text-left space-y-4 text-white max-w-2xl -mt-2 md:-mt-4">
            <h2 className="text-4xl font-black font-montserrat tracking-tight leading-tight">
              Tecnologia para todos, <br className="hidden md:inline"/>no seu tempo.
            </h2>
            <div className="w-20 h-1.5 bg-secondary rounded-full"></div>
            <p className="text-creme-card font-light text-xl md:text-2xl leading-relaxed tracking-wide pt-1">
              Nosso compromisso é tornar o conhecimento digital acessível, simples e imensamente acolhedor, para que cada pessoa possa caminhar com autonomia, segurança e total tranquilidade.
            </p>
          </div>

          <div className="flex justify-center shrink-0">
            <LogoOficialProjeto />
          </div>

        </div>
      </section>

    </div>
  );
}

export default SobreNos;
