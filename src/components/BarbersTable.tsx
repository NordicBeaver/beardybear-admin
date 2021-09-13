import React, { useEffect, useState } from 'react';
import { BarberDto, getBarbers } from '../api';

export default function BarbersTable() {
  const [barbers, setBarbers] = useState<BarberDto[] | null>(null);

  useEffect(() => {
    const fetchBarbers = async () => {
      const barbersResponse = await getBarbers();
      setBarbers(barbersResponse);
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
