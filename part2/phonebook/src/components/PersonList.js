import Person from './Person'

const PersonList = ({persons, filter, deleteHandler}) => {
    if(filter === '') {
        return persons.map(person => <Person key={person.id} person={person} deleteHandler={deleteHandler}/>)
    } else {
        const filteredPersons = persons.filter(person => person.name.includes(filter))
        return filteredPersons.map(person => <Person key={person.id} person={person} deleteHandler={deleteHandler}/>)
    }

}

export default PersonList