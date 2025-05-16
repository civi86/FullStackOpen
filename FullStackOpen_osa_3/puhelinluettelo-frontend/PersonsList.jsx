export const PersonsList = ({ persons, onDelete }) => {
  return (
    <ul>
      {persons.map((person) => (
        <li key={person._id} className="note">
          {person.name} {person.number}{" "}
          <button onClick={() => onDelete(person._id)} id={`delete-${person._id}`}>
            delete
          </button>
        </li>
      ))}
    </ul>
  );
};