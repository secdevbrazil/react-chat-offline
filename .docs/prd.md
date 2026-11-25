# PRD — Chat offline

Janela única de chat em que a mesma pessoa escreve como usuário ou como robô. O histórico vive só na memória da aba: recarregar a página zera a conversa.

Vite, React, TypeScript e Tailwind já estão configurados. Este PRD cobre só a implementação da interface e do estado em memória.

## Objetivo

Permitir montar uma conversa fictícia, alternando o autor de cada mensagem por um toggle no campo de texto, e ver o histórico alinhado como um chat: usuário à direita, robô à esquerda.

## Escopo

Entra nesta entrega:

- Uma tela com título, histórico rolável e campo de mensagem preso embaixo.
- Envio de texto puro, com quebras de linha.
- Toggle de autor (usuário ou robô) que permanece depois do envio.
- Lista de mensagens em um array no estado do React, sem persistência.

Fica de fora:

- Backend, login, tempo real e várias conversas.
- `localStorage`, banco ou qualquer gravação entre recargas.
- Edição, exclusão, reações, anexos, markdown e horário nas mensagens.
- Bibliotecas novas de ícone ou de estado. Ícones são SVG no próprio componente.

## Decisões de produto

| Tema | Decisão |
| --- | --- |
| Bolha | Avatar, rótulo e texto. Sem horário. |
| Cores das bolhas | Usuário: fundo branco. Robô: fundo roxo claro. |
| Toggle | Botão com ícone (pessoa ou robô) e nome acessível. |
| Depois de enviar | O modo do toggle permanece. |
| Teclado | Enter quebra linha. O envio é só pelo botão. |
| Lista vazia | Texto central: “Nenhuma mensagem ainda”. |
| Altura do campo | Cresce com o texto até cerca de 6 linhas; depois rola dentro do campo. |
| Cabeçalho | Título “Chat” no topo da coluna. |

## Regras de comportamento

1. O histórico começa vazio.
2. O modo inicial do toggle é usuário.
3. O botão enviar fica desabilitado quando o texto, depois de `trim`, está vazio. Espaços e quebras de linha sozinhos não contam como mensagem.
4. Ao enviar, a mensagem entra no fim do array com o autor do toggle naquele momento, o campo é limpo e a altura do campo volta ao mínimo. O toggle não muda.
5. Quebras de linha digitadas aparecem na bolha.
6. A lista rola até a última mensagem sempre que uma nova entra.
7. Recarregar a página descarta o histórico, o rascunho e volta o toggle para usuário.

## Layout

A página ocupa a altura da janela (`min-h-dvh`) com fundo marrom claro (`bg-amber-100`).

Uma coluna `max-w-2xl`, centralizada, com padding horizontal, ocupa a altura da janela e contém, de cima para baixo:

1. Título “Chat”.
2. Área do histórico, flexível, com scroll próprio.
3. Card do input, sempre visível no fim da coluna.

Em telas estreitas a coluna usa a largura disponível, com o mesmo padding. O `max-w-2xl` só limita em telas maiores.

### Cabeçalho

Texto “Chat”, alinhado à esquerda da coluna, em destaque moderado. Sem ações.

### Histórico

- Com mensagens: lista vertical com espaçamento entre bolhas.
- Sem mensagens: “Nenhuma mensagem ainda” centralizado na área rolável.
- Cada bolha ocupa no máximo cerca de 80% da largura da coluna.

**Usuário** (à direita): avatar circular à direita da bolha, rótulo “Você”, fundo branco, texto escuro.

**Robô** (à esquerda): avatar circular à esquerda da bolha, rótulo “Robô”, fundo `bg-violet-100`, texto escuro.

Avatares são círculos com ícone simples (pessoa ou robô), na mesma família de cor da bolha. Sem imagem externa.

### Card do input

Card branco, largura total da coluna, cantos arredondados, borda visível.

- Modo usuário: borda neutra (`border-stone-300`).
- Modo robô: borda roxa (`border-violet-500`), grossa o bastante para ler o modo sem olhar o ícone.

Dentro do card, em uma linha:

- Esquerda: botão toggle. Ícone de pessoa no modo usuário e ícone de robô no modo robô. `aria-pressed` reflete o modo robô. Nome acessível: “Enviar como robô” ou “Enviar como usuário”, conforme o próximo envio.
- Centro: `textarea` sem borda própria, placeholder “Escreva uma mensagem”, uma linha no mínimo, crescendo até cerca de 6 linhas (`max-h` em torno de `9rem`) e com scroll interno depois disso.
- Direita: botão “Enviar”. Desabilitado e com aparência apagada quando não há texto útil.

Enter e Shift+Enter apenas inserem quebra de linha. Não há atalho de envio.

## Modelo de dados

Tipos em `src/types`, com `type` (não `interface`).

```ts
type Author = "user" | "robot"

type Message = {
  id: string
  author: Author
  text: string
}
```

Estado no `App` (ou no componente de tela, se o `App` só montar a tela):

- `messages: Message[]`, início `[]`
- `draft: string`, início `""`
- `author: Author`, início `"user"`

`id` vem de `crypto.randomUUID()`. O texto guardado é o valor do campo sem alterar as quebras internas; a validação de vazio usa `trim` só para habilitar o envio e para decidir se a mensagem entra na lista.

## Componentes

Tudo em `src/components`. O `App` só compõe a tela.

| Componente | Responsabilidade |
| --- | --- |
| `ChatScreen` | Coluna, título, distribuição vertical e estado (`messages`, `draft`, `author`). |
| `MessageList` | Scroll, estado vazio e render da lista. |
| `MessageBubble` | Avatar, rótulo, alinhamento e cor conforme `author`. |
| `Composer` | Card, textarea crescente, botão enviar e o toggle. |
| `AuthorToggle` | Botão de ícone, `aria-pressed` e rótulo acessível. |

Props descem do `ChatScreen`. Sem contexto e sem store.

## Critérios de aceite

- Fundo âmbar claro, coluna central `max-w-2xl`, título “Chat”, histórico acima e card branco preso embaixo.
- Lista vazia mostra “Nenhuma mensagem ainda”.
- Enviar como usuário coloca bolha branca à direita, com avatar e rótulo “Você”.
- Enviar como robô coloca bolha roxa clara à esquerda, com avatar e rótulo “Robô”, e o card do input fica com borda roxa enquanto o toggle estiver nesse modo.
- O botão enviar não dispara com campo vazio ou só com espaços.
- Enter não envia; só quebra linha.
- Várias linhas no campo aparecem na bolha e o campo não passa de cerca de 6 linhas visíveis.
- Depois do envio o campo esvazia, o modo do toggle continua o mesmo e a lista mostra a mensagem nova no fim, já visível.
- Recarregar limpa a conversa.

## Tarefas

Ordem de implementação. Cada tarefa deixa a tela utilizável um passo além da anterior.

### 1. Tipos da mensagem — feito

Criar `src/types/message.ts` com `Author` e `Message`, usando `type`.

### 2. Estado e casca da tela — feito

Criar `ChatScreen` com `messages`, `draft` e `author`. Montar a página em altura cheia, fundo `bg-amber-100`, coluna `max-w-2xl` centralizada, título “Chat”, região flexível do histórico e um espaço reservado ao card embaixo. O `App` passa a renderizar só essa tela.

### 3. Lista e bolha — feito

Criar `MessageBubble` e `MessageList`. Sem mensagens, mostrar “Nenhuma mensagem ainda”. Com mensagens, renderizar avatar, rótulo e texto: usuário à direita em branco, robô à esquerda em `bg-violet-100`. Preservar quebras de linha. Para ver a lista antes do envio existir, dá para popular o estado com duas mensagens fixas e removê-las na tarefa 6.

### 4. Card do input — feito

Criar `Composer`: card branco, `textarea` que cresce até cerca de 6 linhas e depois rola, placeholder “Escreva uma mensagem”. Enter só insere quebra de linha. Botão “Enviar” à direita, desabilitado quando `draft.trim()` está vazio. Ligar o valor do campo a `draft`.

### 5. Toggle de autor — feito

Criar `AuthorToggle` no lado esquerdo do card. Ícone de pessoa ou robô, `aria-pressed` e nome acessível. Alternar `author` entre `"user"` e `"robot"`. No modo robô, o card usa borda `border-violet-500`; no modo usuário, borda `border-stone-300`.

### 6. Envio — feito

No clique de “Enviar”, se houver texto útil, acrescentar `{ id, author, text }` ao fim de `messages`, limpar `draft` e manter `author`. Tirar mensagens fixas da tarefa 3, se ainda estiverem no estado inicial. A lista rola até a última mensagem após o envio.

### 7. Revisão visual da coluna — feito

Conferir em janela larga e estreita: coluna centralizada, card sempre no fim da área visível, histórico rolando por cima dele, bolhas até cerca de 80% da coluna, estado vazio centralizado e botão enviar apagado quando desabilitado.
