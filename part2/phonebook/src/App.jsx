import { useState } from 'react'

const Filter = ({ onChange, value}) => {
  return (
    <p>filter shown with <input onChange={onChange} value={value} /></p>
  )
}

const PersonForm = ({ onSubmit, name, number }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input onChange={name.onChange} value={name.value} />
      </div>
      <div>
        number: <input onChange={number.onChange} value={number.value} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ personsToShow }) => {
  return (
    personsToShow.map(person =>
      <p key={person.name}>{person.name} {person.number}</p>
    )
  );
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.some(person => person.name === personObject.name)) {
      window.alert(personObject.name + ' is already added t phonebook');
      return;
    }
    if (persons.some(person => person.number === personObject.number)) {
      window.alert(personObject.number + ' is already added t phonebook');
      return;
    }

    setPersons(persons.concat(personObject));
    setNewName('');
    setNewNumber('');
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setFilterName(event.target.value);
  }

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  }

  const personsToShow = filterName === '' 
    ? persons 
    : persons.filter(person => person.name.toLowerCase().startsWith(filterName.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter onChange={handleFilterChange} value={filterName}/>
      
      <h3>Add a new</h3>

      <PersonForm 
        onSubmit={addPerson}
        name={{ value: newName, onChange: handleNameChange }}
        number={{ value: newNumber, onChange: handleNumberChange }}
      />
      
      <h3>Numbers</h3>

      <Persons personsToShow={personsToShow}/>
    </div>
  )
}

export default App