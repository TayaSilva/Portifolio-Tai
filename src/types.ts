export type SectionId = 'inicio' | 'sobre' | 'projetos' | 'experiencia' | 'formacao' | 'contato'

export interface Section {
  id: SectionId
  label: string
}

export interface Project {
  slug: string
  name: string
  url: string
  category: string
  description: string
  /** Caminho da capa em /public (opcional: sem capa, o card mostra um gradiente com o nome) */
  image?: string
  /** Ajuste de enquadramento da capa (CSS object-position) */
  imagePosition?: string
  imageAlt?: string
  /** Palavras extras para a busca */
  keywords?: string
}

export interface Job {
  id: string
  company: string
  role: string
  /** AAAA-MM */
  start: string
  /** AAAA-MM ou null se for o emprego atual */
  end: string | null
  location: string
  bullets: string[]
}

export interface EducationItem {
  id: string
  institution: string
  course: string
  start: string
  end: string
  featured?: boolean
}

export interface SkillGroup {
  id: string
  name: string
  items: string[]
}

export type IconName = 'whatsapp' | 'linkedin' | 'github' | 'search' | 'copy' | 'chevron' | 'menu' | 'close' | 'arrow'

export interface SearchEntry {
  label: string
  sub: string
  target: SectionId
  keywords: string
}
