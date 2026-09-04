# Checklist do Google — correções fora do código

Este documento cobre o que **não dá para resolver programando**: são ajustes nas
contas do Google da GVM. É aqui que está o maior ganho de visibilidade, e o
custo é zero.

Contexto: ao pesquisar "gvm digital" num aparelho sem histórico, aparecem outras
empresas antes da GVM. A causa principal está no item 1.

---

## 1. 🔴 Corrigir o site no Google Meu Negócio — faça isto primeiro

**O problema.** O perfil "GVM Digital — Agência de marketing digital", com o
telefone (92) 98421-4298, está com **`gvmdigital.com`** no campo de site.

Esse domínio **não é da GVM**. Pertence a uma agência americana de mídia paga,
de Gerrit Mora, que por coincidência tem o mesmo nome. O resultado é duplo:

- quem clica em "Site" no perfil da GVM vai parar no site do homônimo americano;
- o Google entende que a empresa "GVM Digital" é aquele site em inglês, e é ele
  que aparece em primeiro lugar na busca.

**Como corrigir.**

1. Entre em <https://business.google.com> com a conta que administra o perfil.
2. Selecione o perfil **GVM Digital**.
3. Vá em **Editar perfil → Informações comerciais → Contato**.
4. No campo **Site**, apague `gvmdigital.com` e coloque a URL correta:
   `https://gvmdigital.vercel.app`
5. Salve. A alteração costuma passar por revisão e sai do ar em algumas horas
   ou poucos dias.

> Se o campo estiver bloqueado ou a alteração for recusada, é sinal de que o
> perfil não está verificado no nome de vocês. Nesse caso, faça primeiro o
> item 6.

**Como conferir depois.** Pesquise "gvm digital" numa janela anônima. O botão
"Site" no painel à direita deve levar ao site da GVM.

---

## 2. Completar o perfil do Google Meu Negócio

Um perfil completo ranqueia melhor que um perfil pela metade. No mesmo painel:

- **Categoria principal:** `Agência de marketing digital`.
  Categorias adicionais úteis: `Designer de sites`, `Serviço de marketing na internet`.
- **Descrição:** use um texto próximo ao do site, citando Manaus e os serviços.
  Sugestão pronta:
  > Agência de marketing digital em Manaus. Criamos sites, landing pages,
  > identidade visual, automações e estratégias digitais para empresas que
  > querem fortalecer a presença online e vender mais. Atendimento online para
  > todo o Brasil.
- **Serviços:** cadastre um a um, com os mesmos nomes usados no site — Criação
  de Sites, Landing Pages, Identidade Visual, Automações, Prospecção Digital,
  Consultoria Estratégica.
- **Área de atendimento:** Manaus e região; marque que o atendimento é remoto.
- **Horário:** confira se "Aberto 24 horas" corresponde à realidade. Esse valor
  também está declarado no site (`src/data/seo.js`); se mudar aqui, avise para
  atualizarmos lá — os dois precisam bater.
- **Fotos:** adicione o logotipo, a imagem de capa e fotos da equipe ou dos
  trabalhos. Perfis com fotos recebem consideravelmente mais cliques.
- **Link do Instagram:** <https://www.instagram.com/gvmdigital_/>

---

## 3. Google Search Console

O Search Console é o canal direto com o Google. Já existe um arquivo de
verificação no projeto (`public/googlea7897cab3743eec6.html`), então parte do
caminho está feita.

1. Entre em <https://search.google.com/search-console>.
2. Confirme que a propriedade cadastrada é **`https://gvmdigital.vercel.app`**
   (prefixo de URL). Se não existir, crie: **Adicionar propriedade → Prefixo do
   URL**, e mantenha o método de verificação por arquivo HTML, que já está no ar.
3. Em **Sitemaps**, envie: `sitemap.xml`
4. Em **Inspeção de URL**, cole cada endereço abaixo e clique em
   **Solicitar indexação**:
   - `https://gvmdigital.vercel.app/`
   - `https://gvmdigital.vercel.app/sobre`
   - `https://gvmdigital.vercel.app/servicos`
   - `https://gvmdigital.vercel.app/portfolio`
   - `https://gvmdigital.vercel.app/contato`

Faça isso **depois** que o deploy com as mudanças deste projeto estiver no ar,
para o Google já ler as páginas com o conteúdo pré-renderizado.

**Vale acompanhar** em Desempenho, depois de 2 a 4 semanas: a posição média para
a busca "gvm digital" deve subir.

---

## 4. Manter nome, telefone e endereço idênticos em todo lugar

O Google usa a repetição exata desses dados para decidir que o site, o perfil e
as redes sociais são a **mesma empresa** — e para separá-la das homônimas. Basta
uma variação para o sinal enfraquecer.

Os valores oficiais, já usados no site (`src/data/seo.js`):

| Campo     | Valor exato                                  |
| --------- | -------------------------------------------- |
| Nome      | `GVM Digital`                                |
| Telefone  | `(92) 98421-4298`                            |
| E-mail    | `contato.gvmdigital@gmail.com`               |
| Cidade    | `Manaus`, `AM`, Brasil                       |
| Site      | `https://gvmdigital.vercel.app`              |
| Instagram | `https://www.instagram.com/gvmdigital_/`     |

Confira se batem exatamente no Google Meu Negócio, na bio do Instagram e em
qualquer outro cadastro da empresa.

---

## 5. Pedir avaliações de clientes

O perfil da GVM não mostra nota. Concorrentes que aparecem na mesma busca já têm
4,8 com dezenas de avaliações — isso pesa tanto no ranqueamento local quanto na
decisão de quem está escolhendo.

- Pegue o link direto de avaliação no painel (**Peça avaliações**) e mande para
  clientes atendidos.
- Meta inicial: 10 avaliações. É o suficiente para a nota aparecer no painel.
- Responda todas, inclusive as críticas. O Google considera isso sinal de perfil
  ativo.

---

## 6. Reivindicar o perfil, se ainda não for de vocês

Se no item 1 o campo estiver bloqueado:

1. Pesquise "GVM Digital" no Google e abra o painel da empresa.
2. Clique em **É o proprietário desta empresa?** ou **Reivindicar empresa**.
3. Escolha a verificação (telefone, e-mail ou vídeo) e conclua.
4. Só depois disso será possível editar o campo do site.

---

## 7. Registrar um domínio próprio (recomendado)

Hoje o site vive em `gvmdigital.vercel.app`. Um subdomínio compartilhado da
Vercel tem teto de autoridade menor que um domínio próprio, e passa uma imagem
menos profissional para quem vê o endereço.

`gvmdigital.com` está ocupado pela agência americana. As alternativas naturais
são **`gvmdigital.com.br`** ou **`gvm.digital`**.

**Como migrar sem perder posições:**

1. Registre o domínio (no `registro.br`, para `.com.br`).
2. Na Vercel: **Settings → Domains → Add**, e siga as instruções de DNS.
3. Marque o domínio novo como **Primary**, para a Vercel redirecionar o endereço
   antigo (redirecionamento 301, que transfere a autoridade acumulada).
4. Peça para atualizarmos `SITE_URL` em `src/data/seo.js`. É **uma única linha**:
   canonical, sitemap, dados estruturados e llms.txt são todos derivados dela.
5. Adicione o domínio novo como propriedade no Search Console e reenvie o
   sitemap.
6. Atualize o campo Site no Google Meu Negócio e a bio do Instagram.

Não apague o endereço antigo: o redirecionamento precisa continuar funcionando.

---

## O que já foi feito no código

Para referência, estas partes já estão resolvidas e sobem no próximo deploy:

- As páginas passaram a ser **pré-renderizadas**: o HTML entregue já contém todo
  o texto, sem depender de JavaScript. Antes chegava vazio para os robôs — e a
  maioria dos robôs de LLM não executa JavaScript.
- **Dados estruturados** completos em todas as páginas (empresa, telefone,
  e-mail, fundadores, catálogo de serviços, trilha de navegação e FAQ).
- **Títulos e descrições** alinhados ao termo "agência de marketing digital em
  Manaus".
- **`robots.txt`** liberando explicitamente ChatGPT, Claude, Perplexity e Gemini.
- **`sitemap.xml`** gerado automaticamente no build.
- **`/llms.txt`** e **`/llms-full.txt`** para modelos de linguagem entenderem e
  recomendarem os serviços da GVM.

---

## Expectativa realista

- **Item 1** tem efeito em dias e resolve boa parte do problema.
- As mudanças de código levam de 2 a 8 semanas para refletir, no ritmo em que o
  Google rastreia o site de novo.
- Para a busca genérica **"gvm"** não há o que fazer: a sigla é disputada por GVM
  Solutions, GVM Sistemas, GVM Motors e até um termo de física. Os alvos
  realistas são **"gvm digital"**, **"gvm digital manaus"** e **"agência de
  marketing digital manaus"**.
