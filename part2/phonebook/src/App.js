import { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import PersonList from "./components/PersonList";
import FilterForm from "./components/FilterForm";
import contacts from "./services/contacts";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [operationMessage, setOperationMessage] = useState(undefined);
  const [isError, setIsError] = useState(false);

  const handleNewName = (event) => setNewName(event.target.value);
  const handleNewNumber = (event) => setNewNumber(event.target.value);
  const handleNewFilter = (event) => setNewFilter(event.target.value);

  useEffect(() => {
    contacts.getAll().then((personList) => {
      setPersons(personList);
    });
  }, []);

  const addDetails = (event) => {
    event.preventDefault();
    setNewName("");
    setNewNumber("");
    if (!persons.find((person) => person.name === newName)) {
      contacts
        .create({ name: newName, number: newNumber })
        .then((returnedNumber) => {
          setPersons(persons.concat(returnedNumber));
          setOperationMessage(`Added ${returnedNumber.name}`);
          window.setTimeout(() => setOperationMessage(undefined), 3000);
        });
    } else {
      if (
        window.confirm(
          `${newName} is already added to phonebook, would you like to update the contacts number?`
        )
      ) {
        const oldPerson = persons.find((person) => person.name === newName);
        const updatedPerson = { ...oldPerson, number: newNumber };
        contacts
          .update(updatedPerson)
          .then(response => {
            setPersons(
              persons.map((person) =>
                person.id !== oldPerson.id ? person : updatedPerson
              )
            );
            setOperationMessage(`Updated ${updatedPerson.name}'s contact`);
            window.setTimeout(() => setOperationMessage(undefined), 3000);
          })
          .catch(error => {
            setIsError(true);
            setOperationMessage(
              `Information of ${updatedPerson.name} has already been removed from server`
            );
            window.setTimeout(() => {
              setOperationMessage(undefined)
              setIsError(false)
            }, 3000);
          });
      }
    }
  };

  const removePerson = (id) => {
    contacts.deleteContact(id).then((response) => {
      setPersons(persons.filter((person) => person.id !== id));
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={operationMessage}
        messageType={isError ? "errorMessage" : "operationMessage"}
      />
      <FilterForm filterChangeHandler={handleNewFilter} filter={newFilter} />
      <h2>Add new Person</h2>
      <PersonForm
        submitHandler={addDetails}
        nameHandler={handleNewName}
        numberHandler={handleNewNumber}
        newNameState={newName}
        newNumberState={newNumber}
      />
      <h2>Numbers</h2>
      <PersonList
        persons={persons}
        filter={newFilter}
        deleteHandler={removePerson}
      />
    </div>
  );
};

export default App;
