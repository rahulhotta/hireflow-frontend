export function formatDate(value: string | number | Date): string {
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(
    new Date(value),
  )
}
