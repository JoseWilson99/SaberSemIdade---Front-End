import React, { useState } from "react";
import { Link, useLocation } from "wouter";

export default function Cadastro() {
  const [, setLocation] = useLocation()
  
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [modalConfig, setModalConfig] = useState({ 
    isOpen: false, 
    titulo: '', 
    mensagem: '', 
    tipo: 'sucesso', 
    onConfirm: null 
  })

  async function criarUsuario(e) {
    e.preventDefault();

    const usuario = { nome, email, senha };

    try {
      const respuesta = await fetch("http://localhost:8080/api/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
      });

      if (!respuesta.ok) {
        throw new Error("Erro ao cadastrar");
      }

      setModalConfig({
        isOpen: true,
        titulo: "✨ Cadastro Concluído!",
        mensagem: "Sua conta foi criada perfeitamente. Vamos fazer seu primeiro login?",
        tipo: "sucesso",
        onConfirm: () => {
          
          setModalConfig(prev => ({ ...prev, isOpen: false }));

          setLocation("/login");
        }
      })

      setNome("");
      setEmail("");
      setSenha("");

    } catch (erro) {
      console.error(erro);
      setModalConfig({
        isOpen: true,
        titulo: "Ops! Não deu certo",
        mensagem: "Não conseguimos efetuar seu cadastro. Tente usar outro e-mail ou verifique a conexão.",
        tipo: "erro",
        onConfirm: () => setModalConfig({ ...modalConfig, isOpen: false })
      })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f7f4] px-4 py-12 select-none">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
        
        <h2 className="text-3xl font-bold font-montserrat text-center text-[#1b4332] mb-8">
          Criar Nova Conta
        </h2>

        <form onSubmit={criarUsuario} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 font-montserrat ml-1">
              Seu Nome Completo
            </label>
            <input 
              type="text"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Como quer ser chamado?"
              className="w-full px-5 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-[#1b4332] focus:ring-1 focus:ring-[#1b4332]/20 text-base transition font-roboto"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  document.getElementById('input-email').focus();
                }
              }}                
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 font-montserrat ml-1">
              Seu Melhor E-mail
            </label>
            <input 
              id="input-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="exemplo@email.com"
              className="w-full px-5 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-[#1b4332] focus:ring-1 focus:ring-[#1b4332]/20 text-base transition font-roboto"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  document.getElementById('input-senha').focus();
                }
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 font-montserrat ml-1">
              Crie uma Senha
            </label>
            <input 
              id="input-senha"             
              type="password"
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Escolha uma senha segura"
              className="w-full px-5 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-[#1b4332] focus:ring-1 focus:ring-[#1b4332]/20 text-base transition font-roboto"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-[#1b4332] text-white py-3 px-4 rounded-full font-bold text-base hover:bg-[#143225] transition duration-200 shadow-md font-montserrat border-none cursor-pointer mt-2"
          >
            Cadastrar e Começar 
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600 font-roboto text-sm">
          Já tem uma conta?{' '}
          <Link href="/login">
            <span className="text-[#ca8a04] font-bold hover:underline font-montserrat cursor-pointer">
              Fazer Login
            </span>
          </Link>
        </p>

      </div>

      {modalConfig.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-xl border border-gray-100 text-center space-y-4">
            <div className="text-3xl">
              {modalConfig.tipo === 'sucesso' ? '🎉' : '❌'}
            </div>
            <div className="text-xl font-bold font-montserrat text-[#1b4332]">
              {modalConfig.titulo}
            </div>
            <p className="text-gray-600 font-roboto text-sm leading-relaxed">
              {modalConfig.mensagem}
            </p>
            <div className="flex items-center justify-center pt-2">
              <button
                onClick={modalConfig.onConfirm}
                className={`text-white font-bold text-sm px-8 py-2.5 rounded-full shadow-md transition border-none cursor-pointer ${
                  modalConfig.tipo === 'sucesso' ? 'bg-[#ca8a04] hover:bg-[#b07803]' : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {modalConfig.tipo === 'sucesso' ? 'Ir para Login' : 'Entendido'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
