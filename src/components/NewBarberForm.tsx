import React, { useState } from 'react';
import { useCreateBarberMutation } from '../queries';

export default function NewBarberForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const createBarberMutation = useCreateBarberMutation();

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    createBarberMutation.mutate({
      name: name,
      description: description,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
      </div>
      <div>
        <label>Description</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}></input>
      </div>
      <input type="submit" value="New Barber"></input>
    </form>
  );
}
