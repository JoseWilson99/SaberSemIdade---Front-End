import React, { useState } from 'react';
import { useLocation } from 'wouter';

export default function Contato() {
  const [, setLocation] = useLocation();
  
  // Estado para capturar o formulário
  const [formData, setFormData] = useState({ nome: '', email: '', mensagem: '' });
  // Estado para controlar o modal de sucesso do envio
  const [modalAberto, setModalAberto] = useState(false);

  function lidarComEnvio(e) {
    e.preventDefault();
    // Aqui você pode integrar com seu backend futuramente se desejar.
    // Por enquanto, abre o modal de sucesso direto:
    setModalAberto(true);
  }

  return (
    <main className="min-h-screen bg-[#e0F3CD] py-16 px-4 relative overflow-hidden selection:bg-secondary/20">
      
      {/* Detalhes Decorativos Flutuantes */}
      <div className="fixed top-1/3 left-8 text-7xl text-primary opacity-5 select-none pointer-events-none transform -rotate-12 hidden lg:block">🌿</div>
      <div className="fixed bottom-1/4 right-8 text-7xl text-primary opacity-5 select-none pointer-events-none transform rotate-12 hidden lg:block">🍃</div>

      <div className="container mx-auto max-w-xl relative z-10">
        
        {/* Card Principal do Formulário */}
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-creme-card space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold font-montserrat text-primary">Entre em Contato</h1>
            <p className="text-sm text-gray-500 font-roboto">
              Tem alguma dúvida ou precisa de ajuda? Escreva para nós!
            </p>
          </div>

          <form onSubmit={lidarComEnvio} className="space-y-5">
            <div className="space-y-1">
              <label className="block text-sm font-semibold font-montserrat text-gray-700 ml-1">Nome</label>
              <input 
                type="text" 
                required
                value={formData.nome}
                onChange={(e) => setFormData({...formData, nome: e.target.value})}
                placeholder="Digite seu nome completo"
                className="w-full rounded-full border-gray-200 shadow-sm px-4 py-3 border focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 text-sm font-roboto" 
              />
            </div>
            
            <div className="space-y-1">
              <label className="block text-sm font-semibold font-montserrat text-gray-700 ml-1">E-mail</label>
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="exemplo@email.com"
                className="w-full rounded-full border-gray-200 shadow-sm px-4 py-3 border focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 text-sm font-roboto" 
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-semibold font-montserrat text-gray-700 ml-1">Mensagem</label>
              <textarea 
                rows="4" 
                required
                value={formData.mensagem}
                onChange={(e) => setFormData({...formData, mensagem: e.target.value})}
                placeholder="Escreva sua mensagem aqui..."
                className="w-full rounded-2xl border-gray-200 shadow-sm px-4 py-3 border focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 text-sm font-roboto resize-none"
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="w-full bg-secondary text-white hover:bg-secondary-light font-bold py-3 px-6 rounded-full shadow-md transition duration-200 font-montserrat text-sm mt-2 cursor-pointer border-none"
            >
              Enviar Mensagem
            </button>
          </form>
        </div>

        {/* SEÇÃO INFERIOR CORRIGIDA: Sem as bolas e com imagens em tamanho ideal */}
        <div className="mt-12 pt-6 border-t border-creme-card/60 flex flex-col sm:flex-row justify-center items-center gap-12 sm:gap-20 text-gray-500">
          
          {/* Link do Telefone / WhatsApp */}
          <a 
            href="https://wa.me/5521975449224" 
            target="_blank" 
            rel="noreferrer" 
            className="flex flex-col items-center gap-2 text-center select-none"
          >
            <div className="text-4xl">
              📞
            </div>
            <span className="text-sm font-bold font-montserrat text-gray-700 tracking-wide">
              (21) 97544-9224
            </span>
          </a>

          {/* Bloco da Cidade / Localização */}
          <div className="flex flex-col items-center gap-2 text-center select-none">
            <div className="text-4xl">
              🏢
            </div>
            <span className="text-sm font-bold font-montserrat text-gray-700 tracking-wide">
              Rio de Janeiro, RJ
            </span>
          </div>

        </div>
      </div>

      {/* MODAL MODERNO DE SUCESSO DO ENVIO */}
      {modalAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-creme-card text-center space-y-4">
            <div className="text-3xl">📧</div>
            <div className="text-xl font-bold font-montserrat text-primary">
              Mensagem Enviada!
            </div>
            <p className="text-gray-600 font-roboto text-sm leading-relaxed">
              Obrigado por entrar em contato, {formData.nome || 'aluno'}. Responderemos o mais breve possível no seu e-mail!
            </p>
            <div className="flex items-center justify-center pt-2">
              <button
                onClick={() => {
                  setModalAberto(false);
                  setFormData({ nome: '', email: '', mensagem: '' }); // Limpa o form
                  setLocation("/"); // Retorna à página inicial
                }}
                className="bg-primary hover:bg-primary-light text-white font-bold text-sm px-8 py-2.5 rounded-full shadow-md transition border-none cursor-pointer"
              >
                Voltar ao Início
              </button>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}