import React, { useState } from 'react';

export default function NewBarberForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  return (
    <form>
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
