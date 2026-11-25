# Chat Offline

Aplicação de chat em janela única onde a mesma pessoa pode montar uma conversa fictícia alternando entre enviar mensagens como **usuário** ou como **robô**. Todo o histórico vive apenas na memória da aba: ao recarregar a página, a conversa, o rascunho e o modo do seletor são reiniciados.

A especificação completa do projeto está documentada em [`.docs/prd.md`](.docs/prd.md).

## Funcionalidades

- **Alternância de autor**: botão toggle no campo de entrada para alternar entre usuário (`Você`) e robô (`Robô`), com `aria-pressed` e nome acessível dinâmico.
- **Feedback visual de modo**: no modo usuário, o card de entrada exibe borda neutra; no modo robô, exibe borda roxa (`border-violet-500`).
- **Histórico estilo chat**:
  - Mensagens do usuário alinhadas à direita, com fundo branco e rótulo **Você**.
  - Mensagens do robô alinhadas à esquerda, com fundo roxo claro (`bg-violet-100`) e rótulo **Robô**.
  - Estado vazio centralizado com o texto *"Nenhuma mensagem ainda"*.
  - Rolagem automática até a última mensagem ao enviar.
- **Campo de mensagem**:
  - Suporte a texto puro com quebras de linha (`Enter` e `Shift+Enter` inserem quebra de linha; o envio é feito apenas pelo botão **Enviar**).
  - Altura ajustável automaticamente até cerca de 6 linhas, com scroll interno após esse limite.
  - Botão **Enviar** desabilitado quando o texto (após `trim`) está vazio.
- **Persistência**: não utiliza backend, `localStorage` ou banco de dados — o estado permanece exclusivamente em memória durante a sessão da aba.

## Tecnologias

- **React** `^19.3.1`
- **TypeScript** `~7.0.2`
- **Vite** `^8.3.6`
- **Tailwind CSS** `^4.3.5` (`@tailwindcss/vite`)
- **Oxlint** `^1.90.0`

## Estrutura do projeto

```text
├── .docs/
│   └── prd.md                 # Documento de requisitos do produto (PRD)
├── src/
│   ├── components/
│   │   ├── AuthorIcons.tsx    # Ícones SVG de usuário e robô
│   │   ├── AuthorToggle.tsx   # Botão toggle de autor com acessibilidade
│   │   ├── ChatScreen.tsx     # Tela principal e estado em memória (messages, draft, author)
│   │   ├── Composer.tsx       # Card de entrada, textarea expansível e botão Enviar
│   │   ├── MessageBubble.tsx  # Bolha de mensagem com avatar, rótulo e alinhamento
│   │   └── MessageList.tsx    # Lista rolável, estado vazio e scroll automático
│   ├── types/
│   │   └── message.ts         # Tipos Author e Message
│   ├── App.tsx                # Componente raiz que renderiza ChatScreen
│   ├── index.css              # Configuração do Tailwind CSS
│   └── main.tsx               # Ponto de entrada da aplicação
└── package.json
```

## Como executar

Instale as dependências:

```bash
npm install
```

Scripts disponíveis:

- `npm run dev` — inicia o servidor de desenvolvimento com Vite.
- `npm run build` — executa a verificação de tipos (`tsc -b`) e gera o build de produção.
- `npm run lint` — executa o linter (`oxlint`).
- `npm run preview` — visualiza localmente o build gerado.
