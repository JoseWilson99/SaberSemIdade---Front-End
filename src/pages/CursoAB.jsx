import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";

// --- CONFIGURAÇÃO DE IMAGENS LOCAIS (PASTA PUBLIC) ---
const imagensConfig = {
  aula1: [
    "/imagens/Aplicativo-1.jpg",
    "/imagens/Aplicativo-2.jpg",
  ],
  aula2: [
    "/imagens/Aplicativo-10.jpg",
  ],
  aula3: [
    "/imagens/saldo.jpg",
  ],
  aula4: [
    "/imagens/Aplicativo-8.jpg",
    "/imagens/Aplicativo-9.jpg",
    "/imagens/Aplicativo-4.jpg",
    "/imagens/Aplicativo-3.jpg",
    "/imagens/Aplicativo-5.jpg",
    "/imagens/Aplicativo-6.jpg",
    "/imagens/Aplicativo-7.jpg",
  ],
  aula5: [
    "/imagens/pagando-1.jpg",
    "/imagens/pagando-2.jpg",
  ],
  aula6: [
    "/imagens/extrato.banco.jpg",
  ],
  aula7: [
    "/imagens/alerta.jpg",
  ],
};

function CardAula({ numero, titulo, ouvirdId, playingId, falarTexto, children, imagens }) {
  const [telaAtual, setTelaAtual] = useState("texto");
  const [imagemAtual, setImagemAtual] = useState(0);

  const listaImagens = imagens && imagens.length > 0 
    ? imagens 
    : ["/imagens/logo.png"];

  const avançar = () => {
    if (telaAtual === "texto") {
      setTelaAtual("imagens");
      setImagemAtual(0);
    } else if (imagemAtual < listaImagens.length - 1) {
      setImagemAtual(prev => prev + 1);
    }
  };

  const voltar = () => {
    if (telaAtual === "imagens" && imagemAtual > 0) {
      setImagemAtual(prev => prev - 1);
    } else if (telaAtual === "imagens" && imagemAtual === 0) {
      setTelaAtual("texto");
    }
  };

  return (
    <div className="card max-w-none p-8" id={ouvirdId}>
      {/* Cabeçalho do Card */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-4 mb-6">
        <span className="text-sm font-bold bg-primary/10 text-primary px-4 py-1.5 rounded-full">
          Aula {numero} de 7 {telaAtual === "imagens" && `• Imagem ${imagemAtual + 1}`}
        </span>
        <button 
          className={`font-bold font-montserrat px-6 py-2.5 rounded-full shadow-sm ${
            playingId === ouvirdId 
              ? 'bg-error text-white hover:bg-error/90' 
              : 'bg-secondary text-white hover:bg-secondary-light'
          }`}
          onClick={() => falarTexto(ouvirdId)}
        >
          {playingId === ouvirdId ? '⏹️ Parar Leitura' : '🔊 Ouvir Aula'}
        </button>
      </div>

      {/* Área de Conteúdo */}
      <div className="flex items-center justify-between gap-4">
        <button 
          onClick={voltar}
          disabled={telaAtual === "texto"}
          className={`p-3.5 rounded-full border border-gray-200 shadow-soft font-bold text-xl ${
            telaAtual === "texto" 
              ? 'opacity-25 cursor-not-allowed bg-gray-100' 
              : 'bg-white hover:bg-gray-50 text-primary'
          }`}
        >
          ←
        </button>

        <div className="flex-1 min-h-[320px] font-roboto text-gray-700 text-lg leading-relaxed">
          {telaAtual === "texto" ? (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-2xl font-bold text-primary font-montserrat">{titulo}</h3>
              {children}
            </div>
          ) : (
            <div className="space-y-4 flex flex-col items-center justify-center w-full overflow-hidden bg-white animate-fade-in">
              <p className="text-xs font-bold text-gray-400 font-montserrat uppercase tracking-wider text-center w-full">
                Passo a Passo Visual (Imagem {imagemAtual + 1} de {listaImagens.length})
              </p>
              
              <div className="w-full max-w-md h-auto block overflow-hidden rounded-xl border border-gray-200 shadow-soft">
                <img
                  src={listaImagens[imagemAtual]}
                  alt={`Exemplo visual ${imagemAtual + 1}`}
                  className="w-full h-auto block object-contain bg-white" 
                />
              </div>

              <div className="flex justify-center gap-1 mt-2">
                {listaImagens.map((_, idx) => (
                  <span
                    key={idx}
                    className={`h-1.5 rounded-full transition-all ${
                      imagemAtual === idx ? "bg-primary w-3" : "bg-gray-200 w-1.5"
                    }`}
                  ></span>
                ))}
              </div>
            </div>
          )}
        </div>

        <button 
          onClick={avançar}
          disabled={telaAtual === "imagens" && imagemAtual === listaImagens.length - 1}
          className={`p-3.5 rounded-full border border-gray-200 shadow-soft font-bold text-xl ${
            telaAtual === "imagens" && imagemAtual === listaImagens.length - 1 
              ? 'opacity-25 cursor-not-allowed bg-gray-100' 
              : 'bg-white hover:bg-gray-50 text-primary'
          }`}
        >
          →
        </button>
      </div>
    </div>
  );
}

export default function CursoAB() {
  const [, setLocation] = useLocation();
  const [playingId, setPlayingId] = useState(null);

  useEffect(() => {
    return () => window.speechSynthesis.cancel();
  }, []);

  const falarTexto = (idConteudo) => {
    if (playingId === idConteudo) {
      window.speechSynthesis.cancel();
      setPlayingId(null);
      return;
    }
    window.speechSynthesis.cancel();
    const elemento = document.getElementById(idConteudo);
    if (!elemento) return;

    const clone = elemento.cloneNode(true);
    clone.querySelectorAll("button").forEach((btn) => btn.remove());
    
    let texto = clone.innerText
      .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, "")
      .replace(/[✔❌➜►•▪◾◼◻◽■□◆◇★☆⭐🎯💡📞📱📩🎥📷🎤✈️💬🟢✍️☝️⏳👥👤⌨️➡️📝🎙️🗣️🖼️⚠️🏆💰🏦🔒💵]/g, "")
      .replace(/\./g, ". ")
      .replace(/:/g, ": ")
      .trim();

    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = "pt-BR";
    utterance.rate = 0.75;
    utterance.onend = () => setPlayingId(null);
    utterance.onerror = () => setPlayingId(null);

    setPlayingId(idConteudo);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 selection:bg-secondary/20">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <button
          onClick={() => {
            setLocation("/");
            setTimeout(() => {
              const secao = document.getElementById("nossos-cursos");
              if (secao) secao.scrollIntoView({ behavior: "smooth" });
            }, 100);
          }}
          className="flex items-center gap-2 text-primary hover:text-primary-light font-bold font-montserrat transition-all group bg-white px-6 py-3 rounded-full shadow-soft border border-gray-100 w-fit border-none"
        >
          <span className="transform group-hover:-translate-x-1 transition-transform">←</span> 
          Voltar para Nossos Cursos
        </button>

        {/* Banner do Módulo */}
        <div className="bg-white rounded-3xl shadow-medium border border-gray-100 overflow-hidden">
          <div className="w-full h-60 md:h-64 overflow-hidden relative">
            <img 
              src="https://cdn.bb.com.br/blog/wp-content/uploads/2021/07/avo-e-netos.png" 
              alt="Mão manuseando aplicativo bancário com segurança máxima" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-8">
              <h1 className="text-2xl md:text-3xl font-bold font-montserrat text-white">
                📙 Módulo 3 – Aplicativos de Banco
              </h1>
            </div>
          </div>
          <div className="p-6 bg-primary/5 flex items-center gap-3 border-t border-gray-100">
            <span className="text-2xl">🎯</span>
            <p className="text-gray-700 font-roboto font-medium m-0">
              <strong>Objetivo:</strong> Aprender a usar o aplicativo oficial do seu banco com total controle e segurança contra fraudes.
            </p>
          </div>
        </div>

        {/* LISTA DAS AULAS */}
        <div className="space-y-8">

          <CardAula numero={1} titulo="🏦 Aula 1 – O que é um aplicativo de banco?" ouvirdId="aula_ab_1" playingId={playingId} falarTexto={falarTexto} imagens={imagensConfig.aula1}>
            <p className="font-semibold text-secondary">🎯 O que vou aprender?</p>
            <p>O conceito básico dessa agência que funciona dentro do seu smartphone.</p>
            <p>É um programa seguro desenvolvido pela sua instituição financeira para permitir que você faça transações domésticas sem ir fisicamente ao caixa de rua. Nele você pode:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-base font-semibold mt-2">
              <div className="p-3 bg-gray-50 rounded-xl text-primary border border-gray-200 shadow-soft">💰 Ver saldos atuais</div>
              <div className="p-3 bg-gray-50 rounded-xl text-primary border border-gray-200 shadow-soft">💸 Fazer envios por PIX</div>
              <div className="p-3 bg-gray-50 rounded-xl text-primary border border-gray-200 shadow-soft">📄 Pagar contas domésticas</div>
              <div className="p-3 bg-gray-50 rounded-xl text-primary border border-gray-200 shadow-soft">📊 Consultar seus extratos</div>
            </div>
            <p className="text-center text-sm text-primary font-bold mt-6 m-0">⭐ Parabéns! Você concluiu esta aula. Avance nas setas laterais.</p>
          </CardAula>

          <CardAula numero={2} titulo="🔑 Aula 2 – Entrando no aplicativo" ouvirdId="aula_ab_2" playingId={playingId} falarTexto={falarTexto} imagens={imagensConfig.aula2}>
            <p className="font-semibold text-secondary">🎯 O que vou aprender?</p>
            <p>Como acessar seu painel bancário com suas senhas oficiais.</p>
            <div className="space-y-2 bg-gray-50 p-5 rounded-2xl border border-gray-200">
              <p className="m-0">👣 <strong>Passo 1:</strong> Dê um toque no aplicativo oficial instalado do seu respectivo banco.</p>
              <p className="m-0">👣 <strong>Passo 2:</strong> Digite pausadamente os números do seu <strong>CPF</strong> na tela.</p>
              <p className="m-0">👣 <strong>Passo 3:</strong> Insira a sua <strong>Senha eletrônica secreta</strong> de acesso e clique em Entrar.</p>
            </div>
            <p className="text-center text-sm text-primary font-bold mt-6 m-0">⭐ Parabéns! Você concluiu esta aula. Avance nas setas laterais.</p>
          </CardAula>

          <CardAula numero={3} titulo="💰 Aula 3 – Consultando saldo" ouvirdId="aula_ab_3" playingId={playingId} falarTexto={falarTexto} imagens={imagensConfig.aula3}>
            <p className="font-semibold text-secondary">🎯 O que vou aprender?</p>
            <p>Como verificar o dinheiro disponível em tempo real.</p>
            <p>Após entrar no app, procure na parte de cima um botão com a palavra <strong>"Saldo"</strong> ou o desenho de um pequeno olho. Toque nele para revelar na tela o valor de dinheiro guardado atualizado.</p>
            <div className="bg-secondary/10 p-5 rounded-2xl border border-secondary/20 mt-4">
              <p className="font-bold text-secondary mb-1">🎮 Exercício Prático:</p>
              <p className="m-0 text-gray-700">Abra o seu aplicativo bancário pessoal em casa hoje mesmo e pratique visualizando o seu extrato ou saldo.</p>
            </div>
            <p className="text-center text-sm text-primary font-bold mt-6 m-0">⭐ Parabéns! Você concluiu esta aula. Avance nas setas laterais.</p>
          </CardAula>

          <CardAula numero={4} titulo="💸 Aula 4 – Fazendo um PIX" ouvirdId="aula_ab_4" playingId={playingId} falarTexto={falarTexto} imagens={imagensConfig.aula4}>
            <p className="font-semibold text-secondary">🎯 O que vou aprender?</p>
            <p>Mandar dinheiro de forma instantânea e gratuita para outras pessoas.</p>
            <p>Toque no menu escrito <strong>PIX</strong>. Digite os dados da pessoa (a chave PIX, que pode ser o telefone ou CPF) e insira o valor desejado. Confira tudo minuciosamente.</p>
            <div className="bg-warning/10 p-5 rounded-2xl border border-warning/30 mt-4">
              <p className="font-bold text-warning-message font-montserrat m-0 mb-1 flex items-center gap-1 text-amber-800">⚠️ Atenção Redobrada:</p>
              <p className="m-0 text-amber-900">Confira sempre o nome completo da pessoa que vai receber o dinheiro antes de colocar a sua senha de confirmação final!</p>
            </div>
            <p className="text-center text-sm text-primary font-bold mt-6 m-0">⭐ Parabéns! Você concluiu esta aula. Avance nas setas laterais.</p>
          </CardAula>

          <CardAula numero={5} titulo="📄 Aula 5 – Pagando uma conta" ouvirdId="aula_ab_5" playingId={playingId} falarTexto={falarTexto} imagens={imagensConfig.aula5}>
            <p className="font-semibold text-secondary">🎯 O que vou aprender?</p>
            <p>Quitar contas de luz, água ou boletos sem pegar filas.</p>
            <p>Escolha a opção chamada <strong>"Pagar conta"</strong>. O aplicativo abrirá a câmera do seu celular: aponte ela para as linhas pretas (código de barras) do papel da conta. Verifique o valor total e o nome da empresa antes de confirmar o pagamento com sua senha.</p>
            <p className="text-center text-sm text-primary font-bold mt-6 m-0">⭐ Parabéns! Você concluiu esta aula. Avance nas setas laterais.</p>
          </CardAula>

          <CardAula numero={6} titulo="📊 Aula 6 – Consultando extrato" ouvirdId="aula_ab_6" playingId={playingId} falarTexto={falarTexto} imagens={imagensConfig.aula6}>
            <p className="font-semibold text-secondary">🎯 O que vou aprender?</p>
            <p>Ver o histórico de tudo o que saiu ou entrou de dinheiro na conta.</p>
            <p>Dê um toque no menu <strong>Extrato</strong>. O aplicativo mostrará uma lista organizada por dias com todas as compras feitas, pagamentos e depósitos que caíram para você controlar suas contas.</p>
            <p className="text-center text-sm text-primary font-bold mt-6 m-0">⭐ Parabéns! Você concluiu esta aula. Avance nas setas laterais.</p>
          </CardAula>

          <CardAula numero={7} titulo="🛡️ Aula 7 – Segurança" ouvirdId="aula_ab_7" playingId={playingId} falarTexto={falarTexto} imagens={imagensConfig.aula7}>
            <p className="font-semibold text-secondary">🎯 O que vou aprender?</p>
            <p>A blindagem definitiva contra golpes na internet.</p>
            <p><strong>Nunca e sob nenhuma circunstância informe:</strong> suas senhas, códigos recebidos de surpresa por SMS ou chaves chamadas Token.</p>
            <div className="bg-error/10 p-5 rounded-2xl border border-error/20 mt-4">
              <p className="font-bold text-red-700 m-0 mb-1">💡 Regra Inquebrável:</p>
              <p className="m-0 text-sm text-red-800">Os bancos verdadeiros jamais telefonam ou enviam mensagens pelo WhatsApp pedindo senhas ou dados confidenciais para os clientes.</p>
            </div>
            <p className="text-center text-sm text-primary font-bold mt-6 m-0">⭐ Parabéns! Você concluiu esta aula. Avance nas setas laterais.</p>
          </CardAula>

        </div>

        {/* Exercícios de fixação */}
        <div className="card max-w-none p-8 space-y-4">
          <h2 className="text-xl font-bold font-montserrat text-primary flex items-center gap-2 border-b pb-3 border-gray-100 m-0">
            <span>🏆</span> Exercícios de Treino (Sem Movimentar Dinheiro)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-roboto text-base text-gray-700">
            <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200"><strong>Exercício 1:</strong> Entrar no aplicativo com o CPF e Senha.</div>
            <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200"><strong>Exercício 2:</strong> Consultar seu saldo na página inicial.</div>
            <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200"><strong>Exercício 3:</strong> Encontrar a área do PIX (sem enviar dinheiro).</div>
            <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200"><strong>Exercício 4:</strong> Encontrar a opção "Pagar Conta" (sem confirmar).</div>
            <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 md:col-span-2"><strong>Exercício 5:</strong> Consultar os lançamentos do seu extrato.</div>
          </div>
        </div>

      </div>
    </div>
  );
}