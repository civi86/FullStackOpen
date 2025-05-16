import { useState, useEffect } from 'react';
import { getAllPersons, addPerson, deletePerson } from '../palvelinCommunication.jsx';
import { Filter } from '../Filter.jsx';
import { AddPerson } from '../AddPerson.jsx';
import { PersonsList } from '../PersonsList.jsx';
import { Notification } from '../Notification.jsx';

export const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getAllPersons()
      .then(data => {
        console.log('Fetched persons:', data);
        setPersons(data);
      })
      .catch(error => {
        setErrorMessage('Failed to fetch persons.');
        console.error(error);
      });
  }, []);

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleSearchChange = (event) => setSearchQuery(event.target.value);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!newName || !newNumber) {
      alert('Fields cannot be empty!');
      return;
    }
    if (newName.length <= 3) {
      alert('Name too short! Minimum letters: 3');
      return;
    }

    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to the phonebook!`);
      return;
    }

    const newPerson = { name: newName, number: newNumber };

    addPerson(newPerson)
      .then(data => {
        setPersons(prevPersons => [...prevPersons, data]);
        setNewName('');
        setNewNumber('');
        setSuccessMessage(`Added ${newPerson.name} to the phonebook`);
        setTimeout(() => setSuccessMessage(''), 3000); 
      })
      .catch(error => {
        setErrorMessage('Failed to add person.');
        console.error(error);
      });
  };
  const handleDelete = (_id) => {
    const person = persons.find(p => p._id === _id);
    if (window.confirm(`Delete ${person.name}?`)) {
      deletePerson(_id)
        .then(() => {
          setPersons(prevPersons => prevPersons.filter(person => person._id !== _id));
        })
        .catch(error => {
          setErrorMessage('Failed to delete person.');
          console.error(error);
        });
    }
  };

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchQuery={searchQuery} handleSearchChange={handleSearchChange} />
      <h2>Add a New</h2>
      <Notification message={successMessage} />
      <AddPerson
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleFormSubmit={handleFormSubmit}
      />
      <h2>Numbers</h2>
      <PersonsList persons={filteredPersons} onDelete={handleDelete} />
    </div>
  );
};
