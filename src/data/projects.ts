import type { Project } from '@/types'

/**
 * Quer adicionar um projeto? É só colocar mais um item aqui.
 * O card, o contador e a busca se atualizam sozinhos.
 * A capa vai em /public/projects/<slug>.webp (se não tiver, aparece um gradiente com o nome).
 */
export const projects: Project[] = [
  {
    slug: 'cantinho',
    name: 'Cantinho',
    url: 'https://www.cantinho.dev.br/',
    category: 'Memórias',
    description: 'Um espaço virtual personalizado para guardar fotos, vídeos, cartas, músicas e memórias especiais.',
    image: '/projects/cantinho.webp',
    imageAlt: 'Tela inicial do Cantinho: uma casinha em pixel art e o título “Um cantinho especial para você”',
    keywords: 'memorias fotos videos cartas musica',
  },
  {
    slug: 'kate-nascimento',
    name: 'Kate Nascimento',
    url: 'https://kate-nascimento.vercel.app/',
    category: 'Saúde mental',
    description: 'Site de psicóloga clínica, com foco em acolhimento, saúde mental e subjetividade negra.',
    image: '/projects/kate-nascimento.webp',
    imagePosition: 'left center',
    imageAlt: 'Tela inicial do site Kate Nascimento com o título “Cuidado psicológico com escuta, acolhimento e respeito à sua história”',
    keywords: 'psicologia terapia saude mental',
  },
  {
    slug: 'we-school',
    name: 'We School',
    url: 'https://we-school-88ka.vercel.app/',
    category: 'Educação',
    description: 'Site de escola bilíngue, com os ciclos de ensino e convite para agendar uma visita.',
    image: '/projects/we-school.webp',
    imagePosition: 'left center',
    imageAlt: 'Tela inicial do site We School com o título “Ambientes pensados para aprender, explorar e crescer”',
    keywords: 'escola bilingue educacao',
  },
  {
    slug: 'teclando-juntos',
    name: 'Teclando Juntos',
    url: 'https://teclando-junto.vercel.app/',
    category: 'Acessibilidade',
    description:
      'Curso de informática para pessoas com 60 anos ou mais, com lições simples, imagens, narração em português e prática segura.',
    image: '/projects/teclando-juntos.webp',
    imagePosition: '30% center',
    imageAlt: 'Tela inicial do Teclando Juntos com o título “Aprenda a usar o computador no seu ritmo”',
    keywords: 'idosos terceira idade 60+ informatica acessibilidade',
  },
  {
    slug: 'pathbit',
    name: 'Pathbit',
    url: 'https://re-pathbit-5hod.vercel.app/',
    category: 'Tecnologia',
    description: 'Site de empresa de tecnologia, com soluções digitais, inteligência artificial e squads sob medida.',
    keywords: 'ia inteligencia artificial empresa tecnologia squads',
  },
]
