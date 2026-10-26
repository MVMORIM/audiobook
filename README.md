# ReadEra Pro — Leitor & Audiobook

Leitor de livros **PDF e EPUB** que roda direto no navegador, em um único arquivo HTML, com **narração por voz sintetizada** (audiobook), marcadores, destaques e anotações. Não precisa de servidor nem de conta: tudo fica salvo no seu dispositivo.

> O nome é provisório. Veja as sugestões de renomeação na seção [Renomear o projeto](#renomear-o-projeto).

## Arquivos

| Arquivo | Para que serve |
|---|---|
| `readera-pro.html` | O aplicativo completo (HTML + CSS + JS) |
| `ícone-cineário-32.png` | Favicon 32×32 |
| `ícone-cineário-48.png` | Favicon 48×48 |
| `ícone-cineário-180.png` | Ícone para tela inicial do iPhone/iPad (apple-touch-icon) |
| `README.md` | Este arquivo |

Mantenha os ícones **na mesma pasta** do HTML; ele os referencia por caminho relativo.

## Como usar

1. Abra `readera-pro.html` no navegador (duplo clique, ou hospede em qualquer site estático).
2. Toque no botão **+** e escolha um ou mais arquivos `.pdf` ou `.epub`.
3. Toque no livro para abrir o leitor.
4. Toque em **▶** para ouvir. A leitura segue de página em página sozinha e o progresso é salvo.

É preciso **internet na primeira abertura** para carregar as bibliotecas `pdf.js` e `JSZip` (via CDN da Cloudflare) e a fonte do Google Fonts.

## Recursos

**Biblioteca**
- Capas extraídas automaticamente (primeira página do PDF ou capa do EPUB)
- Abas **Biblioteca**, **Lendo Agora** e **Favoritos**, com busca por título
- Progresso em %, número de páginas e tempo restante estimado
- Exclusão com confirmação

**Leitor e audiobook**
- Narração frase a frase em `pt-BR`, com a frase atual destacada
- Controle de velocidade (0,5× a 2×), frase anterior/próxima, página anterior/próxima e salto direto para uma página
- Avança sozinho para a próxima página e pula páginas sem texto
- Continua tocando com a tela bloqueada e aceita os controles de mídia do sistema (play, pausa, próximo, anterior)
- Retoma exatamente de onde parou, inclusive após recarregar a página
- Filtro que ignora trechos de propaganda e links (Telegram, Pix, redes sociais, URLs) na leitura em voz alta

**Marcadores e anotações**
- 🔖 Marcar página
- 🖍️ Destaques em quatro cores (selecione o texto)
- ✏️ Anotações vinculadas a um trecho
- Painel lateral com filtros por tipo e atalho para ir à página

**Offline e backup**
- 📥 **Salvar offline**: guarda uma cópia do livro no cache do navegador
- Aba **Backup**: exporta e restaura título, progresso, marcadores, anotações e capas em um `.json`
- O backup **não inclui os arquivos** PDF/EPUB. Depois de restaurar, cada livro mostra o botão **📎 Anexar** para você escolher o arquivo de novo

**Aparência**
- Tema claro e escuro (botão 🌙/☀️), com paleta quente pensada para leitura longa

## Onde os dados ficam

| Dado | Local |
|---|---|
| Arquivos PDF/EPUB | IndexedDB (`readeraBooksDB`) |
| Título, progresso, marcadores | `localStorage` (`readera_books_v3`) |
| Capas | `localStorage` (`readera_books_covers_v3`) |
| Estado do player | `localStorage` (`readera_books_player`) |
| Cópia offline | Cache Storage (`readera-books-v3`) |

Limpar os dados do site apaga a biblioteca. Faça o backup da aba **Backup** de vez em quando e guarde também os arquivos originais.

### Migração da versão anterior

Se você usava a versão antiga (livros em base64 no `localStorage`, chave `readera_books_v2`), a migração é automática na primeira abertura: os livros vão para o IndexedDB com página, favoritos e progresso preservados, e a chave antiga é removida.

## Limitações conhecidas

- **PDFs escaneados** (só imagem) não têm texto; não há OCR, então não há o que narrar.
- A **voz depende do sistema**. Se não houver voz `pt-BR` instalada, o navegador usa outra e a pronúncia pode ficar estranha. Instale uma voz em português nas configurações do dispositivo.
- Alguns navegadores móveis podem interromper a fala em segundo plano. O app mantém um áudio silencioso para reduzir isso, mas o comportamento varia entre dispositivos.
- Destaques e anotações são localizados pelo texto; em páginas de EPUB com formatação complexa o destaque pode não reaparecer visualmente, embora continue na lista de marcadores.
- Livros grandes ocupam espaço do navegador; cada navegador define seu próprio limite de armazenamento.

## Compatibilidade

Testado em Chromium. Deve funcionar nos navegadores atuais que suportam `IndexedDB`, `SpeechSynthesis` e `Cache Storage` (Chrome, Edge, Safari, Firefox). Os controles de tela bloqueada dependem da `Media Session API`.

## Renomear o projeto

O nome aparece em poucos lugares:

1. `<title>` no HTML
2. Texto do logotipo na barra superior (`.topbar-logo`)
3. Metadados de mídia (`artist`) e nome do arquivo de backup, no script

Os ícones não contêm texto, então servem para qualquer nome. Se renomear, ajuste também os nomes dos arquivos `ícone-cineário-*.png` e as três linhas `<link rel="icon">` / `apple-touch-icon` no `<head>`.

### Sugestões de nome

O nome atual, *ReadEra*, é o mesmo de um aplicativo de leitura já existente; trocar evita confusão. Opções:

- **Leitário**: na linha de *Cineário* (cine + ário), curto e fácil de falar. Minha sugestão.
- **Ouvilivro**: ouvir + livro, deixa claro que é audiobook.
- **Folheio**: lembra folhear páginas; soa como marca.
- **Narrário**: narrar + ário, foca na voz.
- **Páginas em Voz**: descritivo, bom para loja ou site.
- **Lerouvir**: junta ler e ouvir, mostra os dois modos.
- **Voz & Prosa**: elegante, com tom literário.

Antes de adotar um nome, vale pesquisar se já existe app ou marca com ele e se o domínio está livre.

## Tecnologias

HTML, CSS e JavaScript puros, mais [pdf.js](https://mozilla.github.io/pdf.js/) 3.4.120 (PDF) e [JSZip](https://stuk.github.io/jszip/) 3.10.1 (EPUB). Narração pela Web Speech API do navegador.
