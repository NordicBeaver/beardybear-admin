import React, { useEffect, useState } from 'react';

interface BarberDto {
  id: number;
  name: string;
  description: string;
}

export default function BarbersTable() {
  const [barbers, setBarbers] = useState<BarberDto[] | null>(null);

  useEffect(() => {
    const fetchBarbers = async () => {
      const response = await fetch('http://localhost:3000/barbers');
      const content = (await response.json()) as BarberDto[];
      setBarbers(content);
    };
    fetchBarbers();
  }, []);

  return (
    <div>
      {barbers?.map((barber) => (
        <div>{barber.name}</div>
      ))}
    </div>
  );
}
