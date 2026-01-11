import { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'
import Notification from './components/Notification'

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

const Persons = ({ personsToShow, onDelete }) => {
  return (
    personsToShow.map(person =>
      <p key={person.id}>
        {person.name} {person.number} <button onClick={() => onDelete(person.id)}>delete</button>
      </p>
    )
  );
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [notification, setNotification] = useState(null)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(response => setPersons(response))
  }, [])

  const addPerson = (event) => {
    event.preventDefault();
    
    const personObject = {
      name: newName,
      number: newNumber
    }

    const existingPerson = persons.find(
      person => person.name === personObject.name
    )

    if (existingPerson) {
      if (existingPerson.number !== personObject.number) {

        personService
          .update(existingPerson.id, personObject)
          .then(returnedPerson => {
            if (!window.confirm(
              personObject.name + ' is already added to phonebook, replace the old number with a new one?'
            )) return
            setPersons(
              persons.map(person => 
                person.id !== existingPerson.id ? person : returnedPerson
              )
            )
            setIsSuccess(true)
            setNotification(
              `${existingPerson.name} was updated successfully.`
            )
            setTimeout(() => {
              setNotification(null)
            }, 3000)
          })
          .catch(error => {
            setIsSuccess(false)
            setNotification(
              `Information of ${existingPerson.name} has already been removed from server`
            )
            setNewName('')
            setNewNumber('')

            setTimeout(() => setNotification(null), 3000)

            setPersons(persons.filter(p => p.id !== existingPerson.id))

          })
      } else {
        window.alert(personObject.name + ' is already added to phonebook')
      }
      return
    }


    personService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response))
        setIsSuccess(true)
        setNotification(`${personObject.name} was created successfully.`)
        setTimeout(() => {
          setNotification(null)
        }, 3000)
      })

    setNewName('');
    setNewNumber('');
  }

  const handleDelete = ( id ) => {
    const person = persons.find(p => p.id === id)
    if (!window.confirm(`Delete ${person.name}?`)) return

    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id))
        setNotification(
          `${person.name} was deleted successfully.`
        )
        setIsSuccess(false)
        setTimeout(() => {
          setNotification(null)
        }, 3000)
      })     
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
      <h1>Phonebook</h1>

      <Notification isSuccess={isSuccess} message={notification}/>

      <Filter onChange={handleFilterChange} value={filterName}/>
      
      <h3>Add a new</h3>

      <PersonForm 
        onSubmit={addPerson}
        name={{ value: newName, onChange: handleNameChange }}
        number={{ value: newNumber, onChange: handleNumberChange }}
      />
      
      <h3>Numbers</h3>

      <Persons 
        personsToShow={personsToShow}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default App