# Saber Sem Idade - Front-end React

Plataforma de educação digital focada em habilidades essenciais para o dia a dia (ODS 4 - Educação de Qualidade).

## Sobre o Projeto

Saber Sem Idade é uma plataforma educacional que oferece cursos sobre:
- Habilidades digitais básicas (computador, internet, redes sociais)
- Uso de WhatsApp e aplicativos de mensagem
- Educação financeira (caixas eletrônicos, aplicativos de banco)
- Níveis: Básico, Médio e Avançado

## Como Começar

### Pré-requisitos
- Node.js v18+ instalado
- npm ou yarn
- VS Code (recomendado)

---

##  Estrutura de Arquivos do Projeto

Abaixo está o mapeamento completo do diretório do sistema conforme a arquitetura implementada:

text
saber-sem-idade-frontend-completo/
├── 📁 node_modules/          # Dependências instaladas do projeto
├── 📁 public/
│   └── 📁 imagens/           # Ativos físicos (Logos e placeholders locais)
├── 📁 src/
│   ├── 📁 components/        # Componentes globais estruturais
│   │   ├── 📁 ui/            # Componentes atômicos reutilizáveis de interface
│   │   │   ├── Button.jsx
│   │   │   └── Card.jsx
│   │   ├── CourseCard.jsx
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   └── ScrollToTop.jsx
│   ├── 📁 context/           # Estados globais compartilhados
│   │   └── AuthContext.jsx   # Contexto global de autenticação
│   ├── 📁 hooks/             # Custom Hooks reutilizáveis
│   │   └── useFetch.js       # Abstração de requisições HTTP
│   ├── 📁 pages/             # Telas e views da plataforma
│   │   ├── Cadastro.jsx
│   │   ├── Contato.jsx
│   │   ├── CursoAB.jsx
│   │   ├── CursoHDB.jsx
│   │   ├── CursoWM.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Perfil.jsx
│   │   ├── SobreCurso.jsx
│   │   └── SobreNos.jsx
│   ├── 📁 services/          # Configuração de clientes de API
│   │   └── api.js            # Instância centralizada do Axios/Fetch
│   ├── App.css               # Estilizações globais complementares
│   ├── App.jsx               # Roteador central e distribuidor do Context
│   ├── index.css             # Importação e diretivas do Tailwind CSS
│   └── main.jsx              # Ponto de entrada do React (DOM Renderer)
├── .gitignore                # Arquivo de descarte de arquivos para o Git
├── index.html                # Estrutura HTML primária da Single Page Application
├── package-lock.json         # Histórico de versões exatas das dependências
├── package.json              # Manifesto do projeto e scripts de execução
├── postcss.config.js         # Pré-processador de estilos do CSS
├── README.md                 # Documentação oficial do repositório
├── tailwind.config.js        # Configurações de cores e fontes customizadas do Tailwind
└── vite.config.js            # Configurações do empacotador Vite

---

## Mapa de Consumo por Página

Abaixo está a relação de quais telas disparam requisições HTTP, seus respectivos métodos, payloads e finalidades na regra de negócio.

### 1. Vitrine e Catálogo (`Home.jsx`)
* **`GET /cursos`**
  * **Ação:** Disparada automaticamente na montagem do componente via hook.
  * **Retorno esperado:** Lista de objetos contendo os cursos cadastrados no banco.
  * **Tratamento de Falha:** Possui um mecanismo de *fallback* baseado em dados estáticos locais. Se o backend estiver offline, a aplicação continua renderizando os cards perfeitamente.

### 2. Fluxo de Autenticação (`Login.jsx` & `Cadastro.jsx`)
* **`POST /api/usuarios/login`**
  * **Payload enviado:** ```json
    { "email": "usuario@email.com", "senha": "saborosatransmissao" }
    ```
  * **Ação:** Valida as credenciais. Se o status for `200 OK`, o JSON com os dados do usuário é injetado no estado do `AuthContext` e armazenado no `localStorage`.
  * **Erros tratados:** Retornos como `401 Unauthorized` ou falhas de rede acionam um modal customizado de erro impedindo o avanço para a rota `/perfil`.

* **`POST /api/usuarios`**
  * **Payload enviado:** Dados cadastrais do formulário do aluno (Nome, e-mail, senha).
  * **Ação:** Registra um novo usuário no banco de dados.

### 3. Matrícula e Validação (`SobreCurso.jsx`)
* **`POST /api/matriculas`**
  * **Payload enviado:**
    ```json
    {
      "usuario": { "id": 1 },
      "curso": { "id": 2 },
      "status": "ATIVO"
    }
    ```
  * **Ação:** Inscreve o aluno logado na trilha de aprendizado correspondente.
  * **Regra de Negócio Amortecida:** Se o backend rejeitar a requisição por duplicidade (aluno já matriculado), o frontend intercepta o erro, exibe uma notificação amigável de aviso e redireciona o aluno direto para a sala de aula correspondente (`CursoHDB`, `CursoWM` ou `CursoAB`).

### 4. Painel de Controle do Aluno (`Perfil.jsx`)
* **`GET /api/matriculas/usuario/{id}`**
  * **Parâmetro de URL:** `id` do usuário logado recuperado da sessão.
  * **Ação:** Busca dinamicamente todas as inscrições ativas do usuário para montar a listagem de cards "Minhas Matrículas".

* **`DELETE /api/matriculas/{matriculaId}`**
  * **Parâmetro de URL:** `id` único da matrícula gerado pelo banco.
  * **Ação:** Cancela o vínculo do aluno com o curso.
  * **Comportamento da Interface:** Em caso de sucesso (`200 OK`), o frontend realiza uma filtragem reativa (`.filter()`) no estado local, sumindo com o card da tela instantaneamente sem dar *reload* na página.

* **`DELETE /api/usuarios/{usuarioId}`**
  * **Parâmetro de URL:** `id` do usuário logado.
  * **Ação:** Remove permanentemente o cadastro do usuário do banco de dados.
  * **Pós-execução:** Dispara a função `logoutGlobal()`, limpa os tokens do `localStorage` e despacha o usuário de volta à página inicial.

---

## 🛠️ Resumo Técnico dos Contratos (Endpoints)

| Método | Endpoint | Origem (Página) | Payload / Parâmetro | Objetivo na Aplicação |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/cursos` | `Home.jsx` | Nenhum | Carregar os cursos da vitrine principal. |
| **POST** | `/api/usuarios/login` | `Login.jsx` | `{ email, senha }` | Autenticar usuário e gerar estado global de sessão. |
| **POST** | `/api/usuarios` | `Cadastro.jsx` | `{ nome, email, senha }` | Criar nova conta de aluno na plataforma. |
| **POST** | `/api/matriculas` | `SobreCurso.jsx` | `{ usuario, curso, status }` | Registrar o aluno em um curso específico. |
| **GET** | `/api/matriculas/usuario/{id}` | `Perfil.jsx` | ID do Usuário na URL | Listar as matrículas ativas no painel do aluno. |
| **DELETE**| `/api/matriculas/{id}` | `Perfil.jsx` | ID da Matrícula na URL | Cancelar inscrição do curso em tempo real. |
| **DELETE**| `/api/usuarios/{id}` | `Perfil.jsx` | ID do Usuário na URL | Excluir a conta e limpar dados locais de login. |

---

##  Camada de Segurança e Resiliência do Cliente
1. **Instância Centralizada:** Toda a configuração base de caminhos e cabeçalhos padrão é gerenciada em `src/services/api.js`.
2. **Gerenciamento de Estado Síncrono:** As respostas bem-sucedidas dos endpoints de autenticação disparam atualizações no `AuthContext`, garantindo que componentes distantes (como a `Navbar`) saibam imediatamente quando ocultar os botões de "Entrar" e exibir o menu do "Perfil".


##  Conectar com Backend

Edite o arquivo `src/services/api.js` e altere a URL da API:

javascript
const API_BASE_URL = 'http://localhost:8080/api'

Certifique-se de que o backend está rodando em `http://localhost:8080`

## Dependências Principais

- **React** - Biblioteca de UI
- **Wouter** - Roteamento leve
- **Axios** - Cliente HTTP
- **Tailwind CSS** - Framework CSS
- **Vite** - Build tool

## Funcionalidades

- ✅ Página inicial responsiva
- ✅ Listagem de cursos
- ✅ Cards de cursos reutilizáveis
- ✅ Navegação com Wouter
- ✅ Requisições HTTP com Axios
- ✅ Design com Tailwind CSS
- ✅ Componentes reutilizáveis


