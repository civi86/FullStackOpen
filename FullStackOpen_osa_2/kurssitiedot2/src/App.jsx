const Course = ({ course }) => {
  return (
    <div>
      <h1>{course.name}</h1>
      <ul>
        {course.parts.map((part) => (
          <Part key={part.id} part={part} />
        ))}
      </ul>
    </div>
  );
};

const Part = ({ part }) => {
  return (
    <li>
      {part.name} {part.exercises}
    </li>
  );
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App