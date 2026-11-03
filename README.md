# ✦ Portfólio da Taiane Silva

Oi! 👋 Este é o meu portfólio, uma viagem orbital em tons de rosa, lilás e pérola, com planetinhas, estrelas e bastante movimento (mas sem bagunçar a leitura, prometo).

Feito com **Vue 3 + Vite + TypeScript + Tailwind CSS v4**.

---

## 🚀 Rodando na sua máquina

Você vai precisar do **Node 20** (ou mais novo). Aí é só:

```bash
npm install      # instala tudo
npm run dev      # abre em http://localhost:5173
```

Outros comandos úteis:

```bash
npm run build      # checa os tipos e gera a versão final em /dist
npm run preview    # mostra a versão final localmente, pra conferir antes de publicar
npm run typecheck  # só checa o TypeScript
```



---

## 🗂️ Como o projeto tá organizado

```
src/
├── App.vue                  # monta a página: header, seções e efeitos
├── main.ts                  # ponto de entrada
├── types.ts                 # tipos compartilhados (Project, Job, SkillGroup...)
├── styles/main.css          # Tailwind + tokens de cor (claro/escuro) + utilitários
│
├── data/                    # 💡 TODO o conteúdo do site fica aqui
│   ├── profile.ts           #   nome, frase, "sobre", contatos, seções
│   ├── projects.ts          #   projetos
│   ├── career.ts            #   experiência, formação e competências
│   ├── search.ts            #   índice da busca (montado a partir dos dados acima)
│   └── dates.ts             #   formata datas e calcula a duração dos empregos
│
├── composables/             # lógica reaproveitável
│   ├── useTheme.ts          #   tema claro/escuro (com troca em círculo)
│   ├── useNavigation.ts     #   ir até uma seção (+ transição cósmica do menu)
│   └── useScrollSpy.ts      #   descobre em qual seção você está
│
└── components/
    ├── layout/              # peças fixas da página
    │   ├── TheHeader.vue        logo, menu, busca, tema e menu do celular
    │   ├── HeaderSearch.vue     lupa que vira barra de busca
    │   ├── ThemeToggle.vue      planetinha que ganha/perde o anel
    │   ├── TheIntro.vue         intro com a estrela e o nome
    │   ├── WarpTransition.vue   transição em tela cheia ao clicar no menu
    │   ├── SectionDots.vue      bolinha da direita que acompanha a rolagem
    │   ├── SocialRail.vue       ícones de LinkedIn, GitHub e WhatsApp à esquerda
    │   ├── WhatsAppFab.vue      botão flutuante de metal rosa
    │   └── CosmicBackground.vue auroras e estrelinhas do fundo
    ├── sections/            # uma seção = um componente
    │   ├── HeroSection.vue      01 · Início
    │   ├── AboutSection.vue     02 · Sobre
    │   ├── ProjectsSection.vue  03 · Projetos
    │   ├── ExperienceSection.vue 04 · Experiência
    │   ├── EducationSection.vue 05 · Formação e competências
    │   └── ContactSection.vue   06 · Contato (céu noturno ✨)
    └── ui/                  # pecinhas reutilizáveis
        ├── BrandLogo.vue, PlanetSvg.vue, StarIcon.vue, BaseIcon.vue
        ├── SectionHeader.vue, StationLabel.vue
        └── ProjectCard.vue, SkillAccordion.vue
```

Cada componente tem o próprio CSS (`<style scoped>`), então se você quiser mexer no visual de um card, por exemplo, tá tudo no arquivo dele. O Tailwind entra nos ajustes rápidos de layout (flex, gap, margens) e as cores do projeto também viram classes: `text-muted`, `text-accent`, `bg-surface`...

---

## ✍️ Editando o conteúdo

Você **não precisa mexer nos componentes** pra trocar textos. É tudo em `src/data/`:

- **Frase do topo, "Sobre", contatos:** `data/profile.ts`
- **Empregos, cursos e competências:** `data/career.ts`
- **Projetos:** `data/projects.ts`

As durações dos empregos ("2 anos e 5 meses") e a etiqueta "Em andamento" do MBA são calculadas pela data de hoje, então nunca ficam desatualizadas. 😉



1. Coloca a capa em `public/projects/meu-projeto.webp` (opcional, de preferência 1440px de largura).
2. Adiciona um item no array de `src/data/projects.ts`:

```ts
{
  slug: 'meu-projeto',
  name: 'Meu Projeto',
  url: 'https://meu-projeto.vercel.app/',
  category: 'Categoria',
  description: 'Uma frase contando o que é.',
  image: '/projects/meu-projeto.webp',
  imageAlt: 'O que aparece na imagem',
  keywords: 'palavras extras pra busca',
},
```

Pronto: o card, o contador "01 / 06" e a busca já incluem o projeto. Sem capa? Aparece um gradiente bonitinho com o nome.

---

## ✨ Os efeitos (e onde encontrar cada um)

| Efeito | Onde |
| --- | --- |
| Intro com estrela + nome letra a letra (1x por sessão) | `TheIntro.vue` |
| "TAIANE SILVA" gigante no fundo que se completa com a rolagem | `HeroSection.vue` |
| Lupa que se estica até o logo e vira busca (Enter leva até a seção) | `HeaderSearch.vue` |
| Transição com planetas e estrelas ao clicar no menu | `WarpTransition.vue` + `useNavigation.ts` |
| Bolinha da direita descendo junto com a rolagem | `SectionDots.vue` + `useScrollSpy.ts` |
| Cards com máscara em paralelogramo que abre no hover | `ProjectCard.vue` |
| Linha do tempo que se desenha com a rolagem | `ExperienceSection.vue` |
| Planetinha que aparece nos cards de formação + dropdown das competências | `EducationSection.vue`, `SkillAccordion.vue` |
| Fundo que escurece até o céu noturno com estrelas cadentes | `EducationSection.vue`, `ContactSection.vue` |
| Planeta orbitado por uma estrela conforme a rolagem | `ContactSection.vue` |

Os efeitos ligados à rolagem usam **CSS scroll-driven animations** (`animation-timeline`), sem biblioteca nenhuma. Em navegadores que ainda não suportam (alguns Safari/Firefox), o conteúdo aparece normal, só sem a animação.

---

## 📱 Celular

- Menu vira um botão ☰ com a lista das seções.
- A busca ocupa o header inteiro quando abre.
- O planeta do topo vai pra trás do texto, os cards de projeto deslizam pro lado e a grade de formação vira uma coluna só.
- Todos os botões têm pelo menos 44px (dedo agradece) e o input tem 16px de fonte pro iPhone não dar zoom.
- O botão do WhatsApp respeita a área segura do iPhone (`safe-area-inset`).

## 🔎 SEO

- `title`, `description` e `canonical` no `index.html`.
- **Open Graph + Twitter Card** com a imagem `public/og-image.png` (1200×630), pra ficar bonito quando alguém compartilha o link.
- **Dados estruturados (JSON-LD `Person`)**: o Google entende quem você é, onde trabalha e onde estudou.
- `robots.txt`, `sitemap.xml` e `site.webmanifest` em `public/`.
- HTML semântico: um `h1`, um `h2` por seção, `nav`, `main`, `footer`, `alt` nas imagens e `lang="pt-BR"`.
- Imagens com `loading="lazy"` e tamanho definido (nada de layout pulando).

> Dica: se um dia quiser ir além, o [vite-ssg](https://github.com/antfu-collective/vite-ssg) gera o HTML pronto no build (pré-renderização). O Google já lê o site normalmente, mas fica ainda mais redondo.

## ♿ Acessibilidade

- Link "Pular para o conteúdo", foco sempre visível e navegação toda por teclado (Esc fecha busca, menu e intro).
- Contraste AA nos dois temas.
- Com **movimento reduzido** ligado no sistema, tudo fica parado: sem intro, sem transição, sem estrelas piscando.

---

Feito com 💜 (e muitas estrelinhas de quatro pontas) por **Taiane Silva**.
[LinkedIn](https://www.linkedin.com/in/taianesilva99/) · [GitHub](https://github.com/TayaSilva)
