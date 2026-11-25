# projeto: chat offline

Projeto de um janela única de chat em que eu consigo enviar mensangens como usuário e como robô (através de um toggle no input de mensagem)

## Aspectos Técnicos

Projeto feito em Vite + React + Typescript + Tailwind
Todos os types salvos na pasta src/types (usando type e não interface)
Todos os componentes salvos na pasta src/components
O histórico do chat deve estar em um array sem persistência


## Aspectos Visuais

A tela vai ter o fundo marrom claro
Todo o chat (incluindo histórico de mensangens e input) terão uma largura máxima (2xl), centralizado, em tela maior.
O input será em um card com fundo branco e altura ajustada conforme a mensagem
O card ficará no canto inferior o tempo inteiro.

Dentro do card do input, do lado direito:
- botão de enviar, que fica desbilitado quando não tiver mensagem digitada.

Dentro do card do input, do lado esquerdo:
- Um botão que servirá como toggle para marcar se a mensagem enviada será via usuário (e fica do lado direito do histórico) ou robô (e fica do lado esquerdo do histórico)
    - quando o toggle estiver ativado (robô) o card do input terá uma borda roxa, indicando visualmente que a mensagem enviada será enviada como robô e não usuário.

