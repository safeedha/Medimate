export function convertTo12HourFormat(time: string): string {
  const [hourStr, minute] = time.split(':');
  let hour = parseInt(hourStr);
  const ampm = hour >= 12 ? 'PM' : 'AM';

  hour = hour % 12 || 12; 
  return `${hour}:${minute} ${ampm}`;
}