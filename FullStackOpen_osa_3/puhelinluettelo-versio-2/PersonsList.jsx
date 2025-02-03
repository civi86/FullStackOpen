export const PersonsList = ({ persons, onDelete }) => {
  return (
    <ul>
      {persons.map((person) => (
        <li key={person.id} className="note">
          {person.name} {person.number}{" "}
          <button onClick={() => onDelete(person.id)} id={`delete-${person.id}`}>
            delete
          </button>
        </li>
      ))}
    </ul>
  );
};