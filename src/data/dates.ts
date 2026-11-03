const MONTHS = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']

const parse = (ym: string) => {
  const [y, m] = ym.split('-').map(Number)
  return { y, m }
}

export const formatMonth = (ym: string) => {
  const { y, m } = parse(ym)
  return `${MONTHS[m - 1]} ${y}`
}

export const formatRange = (start: string, end: string | null) =>
  `${formatMonth(start)} – ${end ? formatMonth(end) : 'hoje'}`

/** Duração calculada pela data de hoje, contando o mês inicial e o final (igual ao LinkedIn) */
export function formatDuration(start: string, end: string | null, now = new Date()) {
  const a = parse(start)
  const b = end ? parse(end) : { y: now.getFullYear(), m: now.getMonth() + 1 }
  const total = Math.max(1, (b.y - a.y) * 12 + (b.m - a.m) + 1)
  const years = Math.floor(total / 12)
  const months = total % 12
  const parts: string[] = []
  if (years) parts.push(`${years} ${years === 1 ? 'ano' : 'anos'}`)
  if (months) parts.push(`${months} ${months === 1 ? 'mês' : 'meses'}`)
  return parts.join(' e ')
}

export const isInProgress = (end: string, now = new Date()) => {
  const { y, m } = parse(end)
  return now < new Date(y, m, 1)
}
