export default function prettifyDate(ms: number | string | Date): string {
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  };
  return new Date(typeof ms === 'object' ? ms : Number(ms)).toLocaleDateString(
    [],
    options,
  );
}
