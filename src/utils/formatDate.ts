/** '2026-03-12' -> '12 March 2026' (UTC so the day never shifts with the time zone) */
export function formatDate(date?: string) {
  if (!date) return ''
  const d = new Date(date)
  if (Number.isNaN(d.getTime())) return date
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}
