const host = 'http://localhost:3000';

export interface BarberDto {
  id: number;
  name: string;
  description: string;
}

export async function getBarbers() {
  const response = await fetch(`${host}/barbers`);
  const content = (await response.json()) as BarberDto[];
  return content;
}
