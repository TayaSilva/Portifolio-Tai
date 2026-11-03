import type { Section } from '@/types'

export const profile = {
  name: 'Taiane Silva',
  firstName: 'Taiane',
  lastName: 'Silva',
  roles: ['Desenvolvedora Front-End', 'Estudante de UX Design'],
  tagline: 'Transformo ideias em experiências digitais, unindo tecnologia, design e uma dose de imaginação.',
  location: 'São Paulo, Brasil',
  about: [
    'Sou formada em Análise e Desenvolvimento de Sistemas e pós-graduada em Desenvolvimento Full Stack. Comecei em suporte técnico, na Stefanini e na UOL, atendendo usuários e resolvendo problemas de redes, VPN e sistemas corporativos.',
    'Hoje sou Desenvolvedora Trainee na Pathbit, onde crio projetos com React, Next.js, React Native, TypeScript, JavaScript, Gluestack, Tailwind e Expo Go. Também consumo APIs, integro com o backend, manipulo bancos de dados no DBeaver e colaboro com o time usando Git, GitHub, Figma, Miro e metodologias ágeis.',
    'Agora curso um MBA em UX Design, Arquitetura da Informação e Usabilidade para unir código e experiência do usuário. Meu objetivo é consolidar minha carreira em Desenvolvimento Front-End ou Full Stack. Sou comprometida, aprendo novas tecnologias com facilidade e gosto de projetos desafiadores.',
  ],
  /** Palavras que ganham destaque no texto "Sobre" */
  highlights: ['Front-End', 'UX'],
}

export const contact = {
  whatsappNumber: '5511939529261',
  whatsappMessage: 'Olá, Taiane! Vi seu portfólio e gostaria de conversar.',
  email: 'taianens99@gmail.com',
  linkedin: 'https://www.linkedin.com/in/taianesilva99/',
  github: 'https://github.com/TayaSilva',
}

export const whatsappHref = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(contact.whatsappMessage)}`

export const sections: Section[] = [
  { id: 'inicio', label: 'Início' },
  { id: 'sobre', label: 'Sobre' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'experiencia', label: 'Experiência' },
  { id: 'formacao', label: 'Formação' },
  { id: 'contato', label: 'Contato' },
]
