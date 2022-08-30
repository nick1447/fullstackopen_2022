import contacts from "../services/contacts";

const Person = ({ person, deleteHandler }) => {
    return (
    <p>
        {person.name} {person.number} <button onClick={() => deleteHandler(person.id)}>delete</button>
    </p>
    )
}



export default Person;
