import type { EducationItem, Job, SkillGroup } from '@/types'

export const jobs: Job[] = [
  {
    id: 'pathbit',
    company: 'Pathbit',
    role: 'Desenvolvedora Trainee',
    start: '2024-07',
    end: null,
    location: 'São Paulo',
    bullets: [
      'Projeto 1: desenvolvimento com React e Gluestack, com Git e GitHub.',
      'Projeto 2: aplicações mobile com React Native, Expo Go e Gluestack, usando o Android Studio como emulador.',
      'Projeto atual: Next.js e Tailwind, boas práticas com ESLint, versionamento em Git e GitLab.',
      'Integração com backend e consumo de APIs, com testes no Insomnia.',
      'Consultas e ajustes de banco de dados no DBeaver.',
      'Metodologias ágeis, com boards, Figma e Miro para organização e design.',
    ],
  },
  {
    id: 'uol',
    company: 'UOL',
    role: 'Analista de Suporte de TI',
    start: '2022-03',
    end: '2024-07',
    location: 'São Paulo',
    bullets: [
      'Solução de problemas em ferramentas da empresa, com foco em proxy e VPN.',
      'Adição e alteração de IPs e instalação de programas.',
      'Gerenciamento de chamados com SLA no Jira.',
      'Administração de usuários no AD e suporte via Prompt.',
      'Suporte remoto em Linux, macOS e Windows pelo AnyDesk.',
    ],
  },
  {
    id: 'stefanini',
    company: 'Stefanini Brasil',
    role: 'Analista de Suporte de TI',
    start: '2021-08',
    end: '2022-03',
    location: 'São Paulo',
    bullets: [
      'Atendimento ao usuário interno, com suporte a sistemas e programas.',
      'Instalação de softwares em máquinas Windows.',
      'Correção de erros de VPN (Pulse e Cisco).',
      'Atendimento de chamados por Jira, Teams e e-mail.',
      'Suporte técnico remoto e resolução de dúvidas.',
    ],
  },
]

export const education: EducationItem[] = [
  {
    id: 'infnet',
    institution: 'Instituto Infnet',
    course: 'MBA em UX Design, Arquitetura da Informação e Usabilidade',
    start: '2025-04',
    end: '2026-04',
    featured: true,
  },
  {
    id: 'libano',
    institution: 'Faculdade Líbano',
    course: 'Pós-graduação em Desenvolvimento Full Stack',
    start: '2025-02',
    end: '2025-09',
  },
  {
    id: 'fam',
    institution: 'FAM',
    course: 'Análise e Desenvolvimento de Sistemas',
    start: '2022-02',
    end: '2024-07',
  },
  {
    id: 'etec',
    institution: 'ETEC',
    course: 'Técnico em Administração',
    start: '2019-02',
    end: '2020-07',
  },
]

export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    name: 'Front-end',
    items: ['React', 'Next.js', 'Vue', 'Vite', 'TypeScript', 'JavaScript', 'Tailwind', 'Gluestack'],
  },
  { id: 'mobile', name: 'Mobile', items: ['React Native', 'Expo Go', 'Android Studio'] },
  { id: 'data', name: 'Integração e dados', items: ['APIs', 'Insomnia', 'DBeaver'] },
  {
    id: 'quality',
    name: 'Qualidade, testes e versionamento',
    items: ['Git', 'GitHub', 'GitLab', 'Bitbucket', 'ESLint', 'Playwright'],
  },
  {
    id: 'ux',
    name: 'UX e colaboração',
    items: ['UX Design', 'Arquitetura da Informação', 'Usabilidade', 'Figma', 'Miro', 'Metodologias ágeis', 'Jira'],
  },
]
