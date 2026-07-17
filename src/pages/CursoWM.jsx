import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";

const imagensConfig = {
  aula1: [
    "/imagens/Whatsapp-4.jpg",
  ],
  aula2: [
    "/imagens/Whatsapp-16.jpg",
    "/imagens/Whatsapp-5.jpg",
  ],
  aula3: [
    "/imagens/Whatsapp-5.jpg",
    "/imagens/Whatsapp-15.jpg",
    "/imagens/Whatsapp-17.jpg"
  ],
  aula4: [
    "/imagens/Whatsapp-5.jpg",
    "/imagens/Whatsapp-6.jpg",
    "/imagens/Whatsapp-7.jpg",
    "/imagens/Whatsapp-8.jpg",
  ],
  aula5: [
    "/imagens/Whatsapp-5.jpg",
    "/imagens/Whatsapp-11.jpg",
    "/imagens/Whatsapp-12.jpg",
  ],
  aula6: [
    "/imagens/Whatsapp-5.jpg",
    "/imagens/Whatsapp-3.jpg",
  ],
  aula7: [
    "/imagens/Whatsapp-5.jpg",
    "/imagens/Whatsapp-1.jpg",
    "/imagens/Whatsapp-19.jpg",
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

export default function CursoWM() {
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
      .replace(/[✔❌➜►•▪◾◼◻◽■□◆◇★☆⭐🎯💡📞📱📩🎥📷🎤✈️💬🟢✍️☝️⏳👥👤⌨️➡️📝🎙️🗣️🖼️⚠️🏆]/g, "")
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
              src="https://blog.conectaimobi.com.br/wp-content/uploads/2017/06/pessoa-usando-whatsapp-1024x683.jpg" 
              alt="Pessoa usando o aplicativo de conversas WhatsApp" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-8">
              <h1 className="text-2xl md:text-3xl font-bold font-montserrat text-white m-0">
                📗 Módulo 2 – WhatsApp e Mensagens
              </h1>
            </div>
          </div>
          <div className="p-6 bg-primary/5 flex items-center gap-3 border-t border-gray-100">
            <span className="text-2xl">🎯</span>
            <p className="text-gray-700 font-roboto font-medium m-0">
              <strong>Objetivo:</strong> Aprender a conversar com familiares e amigos usando aplicativos de mensagem rápidos.
            </p>
          </div>
        </div>

        <div className="space-y-8">

          <CardAula numero={1} titulo="💬 Aula 1 – O que é WhatsApp?" ouvirdId="aula_wm_1" playingId={playingId} falarTexto={falarTexto} imagens={imagensConfig.aula1}>
            <p className="font-semibold text-secondary">🎯 O que vou aprender?</p>
            <p>O que é e o que podemos fazer dentro desse aplicativo de comunicação.</p>
            <p>O WhatsApp é um aplicativo feito para aproximar as pessoas por meio de conversas de texto. Com ele você pode:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-base font-semibold mt-2">
              <div className="p-3 bg-gray-50 rounded-xl text-primary border border-gray-200 shadow-soft">📩 Enviar mensagens</div>
              <div className="p-3 bg-gray-50 rounded-xl text-primary border border-gray-200 shadow-soft">📞 Fazer ligações gratuitas</div>
              <div className="p-3 bg-gray-50 rounded-xl text-primary border border-gray-200 shadow-soft">🎥 Chamadas de vídeo</div>
              <div className="p-3 bg-gray-50 rounded-xl text-primary border border-gray-200 shadow-soft">📷 Enviar fotos e vídeos</div>
              <div className="p-3 bg-gray-50 rounded-xl text-primary border border-gray-200 shadow-soft sm:col-span-2">🎤 Mandar áudios gravados</div>
            </div>
            <p className="text-sm text-gray-500 mt-4">Existem outros parecidos como o <strong>Telegram</strong> e o <strong>Messenger</strong>, todos funcionam de forma muito parecida.</p>
            <p className="text-center text-sm text-primary font-bold mt-6 m-0">⭐ Parabéns! Você concluiu esta aula. Avance nas setas laterais.</p>
          </CardAula>

          <CardAula numero={2} titulo="🟢 Aula 2 – Abrindo o WhatsApp" ouvirdId="aula_wm_2" playingId={playingId} falarTexto={falarTexto} imagens={imagensConfig.aula2}>
            <p className="font-semibold text-secondary">🎯 O que vou aprender?</p>
            <p>Como acessar com segurança sua lista de amigos e conversas.</p>
            <div className="space-y-2 bg-gray-50 p-5 rounded-2xl border border-gray-200 mt-3">
              <p className="m-0">👣 <strong>Passo 1:</strong> Procure no seu celular o ícone redondo inteiramente verde com um telefone branco dentro.</p>
              <p className="m-0">👣 <strong>Passo 2:</strong> Dê um leve toque em cima dele e espere abrir.</p>
              <p className="m-0">👣 <strong>Passo 3:</strong> Na tela principal, você verá a lista com todas as suas conversas recentes organizadas por ordem.</p>
            </div>
            <p className="text-center text-sm text-primary font-bold mt-6 m-0">⭐ Parabéns! Você concluiu esta aula. Avance nas setas laterais.</p>
          </CardAula>

          <CardAula numero={3} titulo="✍️ Aula 3 – Enviando uma mensagem" ouvirdId="aula_wm_3" playingId={playingId} falarTexto={falarTexto} imagens={imagensConfig.aula3}>
            <p className="font-semibold text-secondary">🎯 O que vou aprender?</p>
            <p>Mandar sua primeiríssima mensagem em texto.</p>
            <p>Escolha um conhecido da sua lista e dê um toque na conversa dele. Toque no espaço em branco embaixo, o teclado vai surgir. Digite as letras formando a frase: <strong>"Bom dia!"</strong> e depois aperte o botão verde com o desenho de uma setinha de avião de papel para enviar.</p>
            <div className="bg-secondary/10 p-5 rounded-2xl border border-secondary/20 mt-4">
              <p className="font-bold text-secondary mb-1">🎮 Exercício Prático:</p>
              <p className="m-0 text-gray-700">Abra o aplicativo agora e envie uma mensagem curta dizendo "Bom dia!" ou "Boa tarde!" para algum familiar.</p>
            </div>
            <p className="text-center text-sm text-primary font-bold mt-6 m-0">⭐ Parabéns! Você concluiu esta aula. Avance nas setas laterais.</p>
          </CardAula>

          <CardAula numero={4} titulo="🎙️ Aula 4 – Enviando um áudio" ouvirdId="aula_wm_4" playingId={playingId} falarTexto={falarTexto} imagens={imagensConfig.aula4}>
            <p className="font-semibold text-secondary">🎯 O que vou aprender?</p>
            <p>Como mandar mensagens por voz quando não quiser digitar.</p>
            <p>Dentro do bate-papo, você verá um desenho pequeno de um microfone verde. Toque nele e mantenha o dedo firme apertado enquanto fala normalmente o seu recado. Ao terminar de falar, afaste o dedo da tela e o áudio será enviado.</p>
            <div className="bg-secondary/10 p-5 rounded-2xl border border-secondary/20 mt-4">
              <p className="font-bold text-secondary mb-1">🎮 Exercício Prático:</p>
              <p className="m-0 text-gray-700">Grave uma pequena mensagem de áudio curta para alguém dizendo de forma clara: <em>"Olá, tudo bem?"</em>.</p>
            </div>
            <p className="text-center text-sm text-primary font-bold mt-6 m-0">⭐ Parabéns! Você concluiu esta aula. Avance nas setas laterais.</p>
          </CardAula>

          <CardAula numero={5} titulo="🖼️ Aula 5 – Enviando uma foto" ouvirdId="aula_wm_5" playingId={playingId} falarTexto={falarTexto} imagens={imagensConfig.aula5}>
            <p className="font-semibold text-secondary">🎯 O que vou aprender?</p>
            <p>Compartilhar as imagens do seu dia a dia.</p>
            <p>Na barra de mensagens do WhatsApp, dê um toque no ícone com o desenho de uma pequena <strong>Câmera</strong> fotográfica. Escolha a foto desejada da sua galeria e pressione o botão azul ou verde de Enviar.</p>
            <div className="bg-secondary/10 p-5 rounded-2xl border border-secondary/20 mt-4">
              <p className="font-bold text-secondary mb-1">🎮 Exercício Prático:</p>
              <p className="m-0 text-gray-700">Tire uma foto bem bonita da sua casa, ou de um vasinho de planta, e envie para um familiar próximo ver.</p>
            </div>
            <p className="text-center text-sm text-primary font-bold mt-6 m-0">⭐ Parabéns! Você concluiu esta aula. Avance nas setas laterais.</p>
          </CardAula>

          <CardAula numero={6} titulo="📞 Aula 6 – Fazendo ligação" ouvirdId="aula_wm_6" playingId={playingId} falarTexto={falarTexto} imagens={imagensConfig.aula6}>
            <p className="font-semibold text-secondary">🎯 O que vou aprender?</p>
            <p>Telefonar sem gastar créditos de telefone comuns.</p>
            <p>Abra o chat do seu amigo ou parente. Na parte superior da tela, procure o desenho clássico de um <strong>Telefone de gancho</strong>. Toque uma única vez nele e aguarde a chamada começar a chamar até a pessoa te atender.</p>
            <p className="text-center text-sm text-primary font-bold mt-6 m-0">⭐ Parabéns! Você concluiu esta aula. Avance nas setas laterais.</p>
          </CardAula>

          <CardAula numero={7} titulo="🎥 Aula 7 – Videochamada" ouvirdId="aula_wm_7" playingId={playingId} falarTexto={falarTexto} imagens={imagensConfig.aula7}>
            <p className="font-semibold text-secondary">🎯 O que vou aprender?</p>
            <p>Matar as saudades conversando cara a cara por vídeo.</p>
            <p>Para ver a pessoa em tempo real enquanto fala com ela, entre na conversa e toque no ícone de uma <strong>Câmera de vídeo</strong> que fica no topo da tela. Agora vocês se falarão olhando olho no olho através da tela do smartphone!</p>
            <div className="bg-error/10 p-5 rounded-2xl border border-error/20 mt-4">
              <p className="font-bold text-red-700 m-0 mb-1">❌ Cuidados Essenciais de Segurança:</p>
              <p className="m-0 text-sm text-red-800">Nunca envie por mensagens dados sensíveis como suas senhas de contas, o código numérico secreto que chega por SMS no seu chip ou seus dados do banco.</p>
            </div>
            <p className="text-center text-sm text-primary font-bold mt-6 m-0">⭐ Parabéns! Você concluiu esta aula. Avance nas setas laterais.</p>
          </CardAula>

        </div>

        <div className="card max-w-none p-8 space-y-4">
          <h2 className="text-xl font-bold font-montserrat text-primary flex items-center gap-2 border-b pb-3 border-gray-100 m-0">
            <span>🏆</span> Exercícios Finais de Fixação
          </h2>
          <p className="text-base text-gray-700 m-0">Tente realizar as tarefas abaixo de forma independente na sua rotina:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm font-semibold text-gray-700 mt-2">
            <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-center">✔ Enviar mensagem de texto</div>
            <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-center">✔ Enviar mensagem de áudio</div>
            <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-center">✔ Enviar uma foto bonita</div>
            <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-center">✔ Fazer ligação comum</div>
            <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-center sm:col-span-2 md:col-span-1">✔ Fazer videochamada</div>
          </div>
        </div>

      </div>
    </div>
  );
}
