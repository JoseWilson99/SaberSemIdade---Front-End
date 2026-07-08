# 🎓 Saber Sem Idade - Frontend React

Plataforma de educação digital focada em habilidades essenciais para o dia a dia (ODS 4 - Educação de Qualidade).

## 📋 Sobre o Projeto

**Saber Sem Idade** é uma plataforma educacional que oferece cursos sobre:
- Habilidades digitais básicas (computador, internet, redes sociais)
- Uso de WhatsApp e aplicativos de mensagem
- Educação financeira (caixas eletrônicos, aplicativos de banco)
- Níveis: Básico, Médio e Avançado

## 🚀 Como Começar

### Pré-requisitos
- Node.js v18+ instalado
- npm ou yarn
- VS Code (recomendado)

### Instalação

1. **Clone ou extraia o projeto**
```bash
cd saber-sem-idade-frontend-completo
```

2. **Instale as dependências**
```bash
npm install
```

3. **Instale Tailwind CSS**
```bash
npm install -D tailwindcss postcss autoprefixer
```

4. **Instale dependências adicionais**
```bash
npm install wouter axios clsx tailwind-merge
```

5. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

6. **Acesse a aplicação**
Abra http://localhost:5173/ no navegador

## 📁 Estrutura de Pastas

```
saber-sem-idade-frontend-completo/
├── src/
│   ├── pages/
│   │   ├── Home.jsx          # Página inicial
│   │   └── NotFound.jsx      # Página 404
│   ├── components/
│   │   ├── Navbar.jsx        # Barra de navegação
│   │   ├── Footer.jsx        # Rodapé
│   │   ├── CourseCard.jsx    # Card de curso
│   │   └── ui/
│   │       ├── Button.jsx    # Componente Button
│   │       └── Card.jsx      # Componente Card
│   ├── hooks/
│   │   └── useFetch.js       # Hook para requisições
│   ├── services/
│   │   └── api.js            # Configuração Axios
│   ├── App.jsx               # Componente raiz
│   ├── App.css               # Estilos adicionais
│   ├── index.css             # Estilos globais
│   └── main.jsx              # Entrada React
├── public/
│   └── favicon.ico
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── .gitignore
```

## 🎨 Componentes Principais

### Páginas
- **Home.jsx** - Página inicial com hero section, cards de cursos e CTA
- **NotFound.jsx** - Página 404 com links de navegação

### Componentes
- **Navbar.jsx** - Barra de navegação com logo e links
- **Footer.jsx** - Rodapé com informações e links
- **CourseCard.jsx** - Card reutilizável para exibir cursos
- **Button.jsx** - Botão customizável com variantes (primary, secondary, outline, danger)
- **Card.jsx** - Card genérico reutilizável

### Hooks
- **useFetch.js** - Hook para fazer requisições HTTP com gerenciamento de estado

### Serviços
- **api.js** - Instância Axios configurada com interceptors para autenticação

## 🔧 Scripts Disponíveis

```bash
# Inicia servidor de desenvolvimento
npm run dev

# Cria build de produção
npm run build

# Visualiza build localmente
npm run preview

# Executa linter
npm run lint
```

## 🔗 Conectar com Backend

Edite o arquivo `src/services/api.js` e altere a URL da API:

```javascript
const API_BASE_URL = 'http://localhost:8080/api'
```

Certifique-se de que o backend está rodando em `http://localhost:8080`

## 📦 Dependências Principais

- **React** - Biblioteca de UI
- **Wouter** - Roteamento leve
- **Axios** - Cliente HTTP
- **Tailwind CSS** - Framework CSS
- **Vite** - Build tool

## 🎯 Funcionalidades

- ✅ Página inicial responsiva
- ✅ Listagem de cursos
- ✅ Cards de cursos reutilizáveis
- ✅ Navegação com Wouter
- ✅ Requisições HTTP com Axios
- ✅ Design com Tailwind CSS
- ✅ Componentes reutilizáveis
- ✅ Página 404

## 🌐 Responsividade

A aplicação é totalmente responsiva e funciona em:
- Desktop (1920px+)
- Tablet (768px - 1024px)
- Mobile (320px - 767px)

## 🐛 Troubleshooting

### Erro: "Cannot find module 'react'"
```bash
npm install
```

### Erro: "Port 5173 is already in use"
```bash
npm run dev -- --port 3000
```

### Tailwind CSS não funciona
- Verifique se `@tailwind` está em `src/index.css`
- Reinicie o servidor: `npm run dev`

### Erro ao conectar com backend
- Verifique se backend está rodando em `http://localhost:8080`
- Verifique a URL em `src/services/api.js`

## 📚 Extensões VS Code Recomendadas

- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint
- Tailwind CSS IntelliSense
- PostCSS Language Support

## 🚀 Deploy

Para fazer deploy em produção:

```bash
# Build
npm run build

# Isso cria uma pasta 'dist' com os arquivos prontos para deploy
```

## 📞 Suporte

Para mais informações, consulte:
- [React Documentation](https://react.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [Vite Docs](https://vitejs.dev/)

## 📄 Licença

Este projeto está sob a licença MIT.

---

**Desenvolvido com ❤️ para educação digital**
