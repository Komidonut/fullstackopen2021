import React, { useState, useEffect } from "react";
import callServer from "./Requests";

const Button = ({ handleClick, text }) => {
  return (
    <button type="submit" onClick={handleClick}>
      {text}
    </button>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  const handleNameChange = (event) => setNewName(event.target.value);

  const handleNumberChange = (event) => setNewNumber(event.target.value);

  const handleFilter = (event) => setNewFilter(event.target.value);

  //parse notes data from json server
  useEffect(() => {
    callServer
      .getBase()
      .then(phoneBook => {
        console.log(phoneBook);
        setPersons(phoneBook)
      })
  }, [])

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
      const newPerson = {
        name: newName,
        id: persons.length + 1,
        number: newNumber 
      }
      //render updated phonebook
      callServer
      .addRecord(newPerson)
      .then(returnedPersons => {
        setPersons(persons.concat(returnedPersons));
        reset();
      })
  };

  const deletePerson = (person) => {
    const message = `Do you really want to delete ${person.name}:${person.id} from your phonebook?`
    if (window.confirm(message)) {

      callServer
        .deleteRecord(person.id)
        .then(response => {
          setPersons(() => {
            const newPersons = persons.filter(item => item.id !== person.id)
            return newPersons
          });
          reset();
        })
    }
  }


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
          {person.name} 
          {person.number}
          <Button 
            handleClick={() => deletePerson(person)}
            text = "delete"
          />
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
