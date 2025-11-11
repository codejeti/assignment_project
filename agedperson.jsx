import React, { useState } from 'react';

function App() {
  const [person, setPerson] = useState({ name: 'John', age: 25 });

  const handleClick = () => {
   setPerson(prevPerson =>({...prevPerson, age: prevPerson.age +1}));
  };

  return (
    <div>
      <p>Name: {person.name}</p>
      <p>Age: {person.age}</p>
      <button onClick={handleClick}>Increase Age</button>
    </div>
  );
}

export default App;
