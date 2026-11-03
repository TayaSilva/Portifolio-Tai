import type { SearchEntry } from '@/types'
import { education, jobs, skillGroups } from './career'
import { projects } from './projects'

/** Tira acento e deixa minúsculo ("Formação" → "formacao") */
export const normalize = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()

const fmtRange = (start: string, end: string | null) => `${start.slice(0, 4)} – ${end ? end.slice(0, 4) : 'hoje'}`

/**
 * Índice da busca, montado a partir dos dados do site
 * (adicionou um projeto? ele já aparece aqui).
 */
export const searchIndex: SearchEntry[] = [
  { label: 'Sobre', sub: 'Estação 02', target: 'sobre', keywords: 'sobre bio perfil quem e taiane' },
  { label: 'Projetos', sub: 'Estação 03', target: 'projetos', keywords: 'projetos portfolio sites trabalhos' },
  ...projects.map<SearchEntry>((p) => ({
    label: p.name,
    sub: `Projeto · ${p.category}`,
    target: 'projetos',
    keywords: `${p.description} ${p.keywords ?? ''}`,
  })),
  ...jobs.map<SearchEntry>((j) => ({
    label: j.company,
    sub: `${j.role} · ${fmtRange(j.start, j.end)}`,
    target: 'experiencia',
    keywords: `${j.bullets.join(' ')} curriculo trabalho emprego carreira experiencia`,
  })),
  ...education.map<SearchEntry>((e) => ({
    label: e.course,
    sub: e.institution,
    target: 'formacao',
    keywords: 'faculdade estudo curso formacao pos graduacao fullstack',
  })),
  {
    label: 'Competências',
    sub: skillGroups.flatMap((g) => g.items).slice(0, 4).join(', ') + '…',
    target: 'formacao',
    keywords: `competencias habilidades tecnologias stack testes e2e ${skillGroups.flatMap((g) => g.items).join(' ')}`,
  },
  {
    label: 'WhatsApp',
    sub: 'Conversar no WhatsApp',
    target: 'contato',
    keywords: 'whatsapp zap whats telefone celular falar contratar contato',
  },
  { label: 'E-mail', sub: 'taianens99@gmail.com', target: 'contato', keywords: 'email e-mail gmail contato' },
  { label: 'LinkedIn e GitHub', sub: 'Contato', target: 'contato', keywords: 'linkedin github redes contato' },
]

export function findBest(query: string): SearchEntry | null {
  const q = normalize(query.trim())
  if (q.length < 2) return null
  return searchIndex.find((it) => normalize(`${it.label} ${it.sub} ${it.keywords}`).includes(q)) ?? null
}
