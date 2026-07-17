import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";

const imagensConfig = {
  aula1: ["/imagens/pc.jpg"],
  aula2: ["/imagens/botao-power.png"],
  aula3: ["/imagens/mouse.jpg"],
  aula4: ["/imagens/teclado.jpg"],
  aula5: ["/imagens/internet.png"],
  aula6: ["/imagens/navegador.png"],
  aula7: ["/imagens/redes-sociais.jpg"],
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-4 mb-6">
        <span className="text-sm font-bold bg-primary/10 text-primary px-4 py-1.5 rounded-full">
          Aula {numero} de 7 {telaAtual === "imagens" && `• Imagem ${imagemAtual + 1}`}
        </span>
        <button 
          className={`font-bold font-montserrat px-6 py-2.5 rounded-full shadow-sm ${
            playingId === ouvirdId 
              ? 'bg-error text-white hover:bg-error/90 animate-pulse' 
              : 'bg-secondary text-white hover:bg-secondary-light'
          }`}
          onClick={() => falarTexto(ouvirdId)}
        >
          {playingId === ouvirdId ? '⏹️ Parar Leitura' : '🔊 Ouvir Aula'}
        </button>
      </div>

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

export default function CursoHDB() {
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
      .replace(/[✔❌➜►•▪◾◼◻◽■□◆◇★☆⭐🎯💡📞📱📩🎥📷🎤✈️💬🟢✍️☝️⏳👥👤⌨️➡️📝🎙️🗣️🖼️⚠️🏆💻🖱️🖥️⏻]/g, "")
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

        <div className="bg-white rounded-3xl shadow-medium border border-gray-100 overflow-hidden">
          <div className="w-full h-60 md:h-64 overflow-hidden relative">
            <img 
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80" 
              alt="Pessoa aprendendo informática básica" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-8">
              <h1 className="text-2xl md:text-3xl font-bold font-montserrat text-white m-0">
                📘 Módulo 1 – Habilidades Digitais Básicas
              </h1>
            </div>
          </div>
          <div className="p-6 bg-primary/5 flex items-center gap-3 border-t border-gray-100">
            <span className="text-2xl">🎯</span>
            <p className="text-gray-700 font-roboto font-medium m-0">
              <strong>Objetivo:</strong> Aprender a usar o computador, o celular e a internet com segurança para facilitar o dia a dia.
            </p>
          </div>
        </div>

        <div className="space-y-8">

          <CardAula numero={1} titulo="🖥️ Aula 1 – Conhecendo os aparelhos" ouvirdId="aula_hdb_1" playingId={playingId} falarTexto={falarTexto} imagens={imagensConfig.aula1}>
            <p className="font-semibold text-secondary">🎯 O que vou aprender?</p>
            <p>Vamos entender o que é o computador e o celular de um jeito simples e prático.</p>
            <p className="font-bold text-primary mt-3 mb-1">O que é um computador?</p>
            <p>O computador é uma máquina que ajuda as pessoas a estudar, trabalhar, conversar e encontrar informações. Ele possui partes principais:</p>
            <ul className="space-y-2 list-none pl-0 mt-2">
              <li>🖥️ <strong>Tela (monitor):</strong> mostra tudo o que acontece.</li>
              <li>⌨️ <strong>Teclado:</strong> serve para escrever.</li>
              <li>🖱️ <strong>Mouse:</strong> serve para clicar e escolher opções.</li>
            </ul>
            <p className="font-bold text-primary mt-4 mb-1">O que é um celular?</p>
            <p>O celular é um aparelho de bolso que serve para fazer ligações, enviar mensagens, tirar fotos, assistir vídeos e conversar com familiares. Hoje quase tudo pode ser feito por ele!</p>
            <p className="text-center text-sm text-primary font-bold mt-6 m-0">⭐ Parabéns! Você concluiu esta aula. Avance nas setas laterais.</p>
          </CardAula>

          <CardAula numero={2} titulo="🟢 Aula 2 – Ligando o computador" ouvirdId="aula_hdb_2" playingId={playingId} falarTexto={falarTexto} imagens={imagensConfig.aula2}>
            <p className="font-semibold text-secondary">🎯 O que vou aprender?</p>
            <p>O passo a passo correto para ligar a sua máquina sem medo.</p>
            <div className="space-y-2 bg-gray-50 p-5 rounded-2xl border border-gray-200 mt-3">
              <p className="m-0">👣 <strong>Passo 1:</strong> Encontre o botão de ligar. Normalmente ele possui este símbolo: <strong>⏻</strong>. Pressione apenas uma vez.</p>
              <p className="m-0">👣 <strong>Passo 2:</strong> Espere alguns segundos. A tela irá acender naturalmente. Não aperte vários botões seguidos.</p>
              <p className="m-0">👣 <strong>Passo 3:</strong> Quando aparecer a tela inicial (chamada área de trabalho), o computador está totalmente pronto para você usar.</p>
            </div>
            <p className="text-center text-sm text-primary font-bold mt-6 m-0">⭐ Parabéns! Você concluiu esta aula. Avance nas setas laterais.</p>
          </CardAula>

          <CardAula numero={3} titulo="🖱️ Aula 3 – O mouse" ouvirdId="aula_hdb_3" playingId={playingId} falarTexto={falarTexto} imagens={imagensConfig.aula3}>
            <p className="font-semibold text-secondary">🎯 O que vou aprender?</p>
            <p>Como guiar a sua mão virtual pela tela.</p>
            <p>O mouse funciona como a nossa mão dentro do computador. Ele possui o <strong>Botão esquerdo</strong>, o <strong>Botão direito</strong> e a <strong>Rodinha</strong> no meio.</p>
            <p className="font-bold text-primary mt-3 mb-1">Para que serve?</p>
            <p>✔ Clicar, abrir programas, escolher opções e arrastar objetos pela tela.</p>
            <div className="bg-secondary/10 p-5 rounded-2xl border border-secondary/20 mt-4">
              <p className="font-bold text-secondary mb-1">🎮 Exercício Prático:</p>
              <p className="m-0 text-gray-700">Procure um ícone na sua área de trabalho e clique duas vezes seguidas nele. Depois, clique no "X" vermelho no canto superior para fechar a janela aberta.</p>
            </div>
            <p className="text-center text-sm text-primary font-bold mt-6 m-0">⭐ Parabéns! Você concluiu esta aula. Avance nas setas laterais.</p>
          </CardAula>

          <CardAula numero={4} titulo="⌨️ Aula 4 – O teclado" ouvirdId="aula_hdb_4" playingId={playingId} falarTexto={falarTexto} imagens={imagensConfig.aula4}>
            <p className="font-semibold text-secondary">🎯 O que vou aprender?</p>
            <p>Como escrever palavras, números e seus dados básicos.</p>
            <p>O teclado serve fundamentalmente para escrever. Com ele você digita seu nome, endereço, telefone e pesquisas.</p>
            <div className="bg-secondary/10 p-5 rounded-2xl border border-secondary/20 mt-4">
              <p className="font-bold text-secondary mb-1">🎮 Exercício Prático:</p>
              <p className="m-0 text-gray-700">Abra qualquer editor de texto simples no seu computador eifique praticando a frase: <em>"Meu nome é _________"</em> colocando o seu próprio nome.</p>
            </div>
            <p className="text-center text-sm text-primary font-bold mt-6 m-0">⭐ Parabéns! Você concluiu esta aula. Avance nas setas laterais.</p>
          </CardAula>

          <CardAula numero={5} titulo="🌐 Aula 5 – O que é Internet?" ouvirdId="aula_hdb_5" playingId={playingId} falarTexto={falarTexto} imagens={imagensConfig.aula5}>
            <p className="font-semibold text-secondary">🎯 O que vou aprender?</p>
            <p>Entender a rede mundial que conecta todas as informações.</p>
            <p>A internet é como uma enorme biblioteca pública digital viva. Dentro dela, conseguimos encontrar facilmente:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-base font-semibold mt-2">
              <div className="p-3 bg-gray-50 rounded-xl text-primary border border-gray-200 shadow-soft">📖 Notícias atualizadas</div>
              <div className="p-3 bg-gray-50 rounded-xl text-primary border border-gray-200 shadow-soft">🎥 Vídeos explicativos</div>
              <div className="p-3 bg-gray-50 rounded-xl text-primary border border-gray-200 shadow-soft">🎵 Suas músicas favoritas</div>
              <div className="p-3 bg-gray-50 rounded-xl text-primary border border-gray-200 shadow-soft">🍲 Receitas deliciosas</div>
              <div className="p-3 bg-gray-50 rounded-xl text-primary border border-gray-200 shadow-soft">🚍 Rotas de transporte</div>
              <div className="p-3 bg-gray-50 rounded-xl text-primary border border-gray-200 shadow-soft">🏥 Informações de saúde</div>
            </div>
            <p className="text-center text-sm text-primary font-bold mt-6 m-0">⭐ Parabéns! Você concluiu esta aula. Avance nas setas laterais.</p>
          </CardAula>

          <CardAula numero={6} titulo="🧭 Aula 6 – O navegador" ouvirdId="aula_hdb_6" playingId={playingId} falarTexto={falarTexto} imagens={imagensConfig.aula6}>
            <p className="font-semibold text-secondary">🎯 O que vou aprender?</p>
            <p>Os programas que usamos para "viajar" pela internet.</p>
            <p>Para entrar na internet usamos um aplicativo chamado navegador. Exemplos comuns: <strong>Google Chrome</strong>, <strong>Microsoft Edge</strong> e <strong>Firefox</strong>.</p>
            <p>No topo ou meio do navegador existe uma barra de pesquisa onde você digita o que quer encontrar (ex: <em>"Receita de bolo"</em> ou <em>"Previsão do tempo"</em>).</p>
            <div className="bg-secondary/10 p-5 rounded-2xl border border-secondary/20 mt-4">
              <p className="font-bold text-secondary mb-1">🎮 Exercício Prático:</p>
              <p className="m-0 text-gray-700">Abra seu navegador, vá na barra de pesquisas, digite exatamente <strong>"Receita de arroz"</strong> e aperte enter para ver os resultados.</p>
            </div>
            <p className="text-center text-sm text-primary font-bold mt-6 m-0">⭐ Parabéns! Você concluiu esta aula. Avance nas setas laterais.</p>
          </CardAula>

          <CardAula numero={7} titulo="👥 Aula 7 – Redes sociais" ouvirdId="aula_hdb_7" playingId={playingId} falarTexto={falarTexto} imagens={imagensConfig.aula7}>
            <p className="font-semibold text-secondary">🎯 O que vou aprender?</p>
            <p>Como rever amigos e se aproximar da comunidade online.</p>
            <p>As redes sociais (como <strong>Facebook</strong>, <strong>Instagram</strong> e <strong>TikTok</strong>) servem para conversar com conhecidos, ver fotos bonitas, assistir vídeos engraçados e compartilhar momentos.</p>
            <div className="bg-error/10 p-5 rounded-2xl border border-error/20 mt-4">
              <p className="font-bold text-red-700 m-0 mb-1 flex items-center gap-2">⚠️💡 Cuidados Importantes:</p>
              <p className="m-0 text-sm text-red-800">Nunca compartilhe com desconhecidos nas redes: suas senhas pessoais, fotos de seus documentos ou seus dados bancários.</p>
            </div>
            <p className="text-center text-sm text-primary font-bold mt-6 m-0">⭐ Parabéns! Você concluiu esta aula. Avance nas setas laterais.</p>
          </CardAula>

        </div>

        <div className="card max-w-none p-8 space-y-4">
          <h2 className="text-xl font-bold font-montserrat text-primary flex items-center gap-2 border-b pb-3 border-gray-100 m-0">
            <span>🏆</span> Exercícios Finais de Fixação
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-roboto text-base text-gray-700">
            <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200"><strong>1.</strong> Ligue o seu computador completamente.</div>
            <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200"><strong>2.</strong> Abra o navegador de internet disponível.</div>
            <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200"><strong>3.</strong> Pesquise o termo: <em>"Praia de Copacabana"</em>.</div>
            <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200"><strong>4.</strong> Encontre uma linda imagem nos resultados.</div>
            <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 md:col-span-2"><strong>5.</strong> Feche com segurança o seu navegador.</div>
          </div>
        </div>

      </div>
    </div>
  );
}
