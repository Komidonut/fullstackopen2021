import React, { useState } from "react";

const Button = ({ handleClick, text }) => {
  return (
    <button type="submit" onClick={handleClick}>
      {text}
    </button>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  const handleNameChange = (event) => setNewName(event.target.value);

  const handleNumberChange = (event) => setNewNumber(event.target.value);

  const handleFilter = (event) => setNewFilter(event.target.value);

  // reset input
  const reset = () => {
    setNewName("");
    setNewNumber("");
  };

  // add new person to phonebook
  const addPerson = (event) => {
    event.preventDefault();
    // check for name duplicates
    if (newName && persons.some((i) => i.name === newName)) {
      return alert(newName, "is already added to phonebook");
    }
    // check for number duplicates
    if (newNumber && persons.some((i) => i.number === newNumber)) {
      return alert(
        `${newNumber} is already assigned to ${
          persons.find((obj) => {
            return obj.number === newNumber;
          }).name
        }`
      );
    }
    //set updated phonebook
    const newPersons = [
      ...persons,
      { name: newName, id: persons.length + 1, number: newNumber },
    ];
    //render updated phonebook
    setPersons(newPersons);
    reset();
  };


  return (
    <div>
      <h2>Filter</h2>
      <form>
        <div>
          filter:
          <input value={newFilter} onChange={handleFilter}></input>
        </div>
      </form>
      <h2>Add person</h2>
      <form>
        <div>
          name:
          <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number:
          <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <Button handleClick={addPerson} text="add" />
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase())).map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
        </p>
      ))}
      <div>
        <p>
          debug name: {newName} {typeof newName}
        </p>
        <p>
          debug number: {newNumber} {typeof newNumber}
        </p>
      </div>
    </div>
  );
};

export default App;
