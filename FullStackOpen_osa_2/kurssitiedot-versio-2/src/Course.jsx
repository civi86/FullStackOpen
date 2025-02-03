import React from 'react';

const Part = ({ part }) => {
  return (
    <li>
      {part.name} {part.exercises}
    </li>
  );
};

const Sum = ({ sum }) => {
  return (
    <p>
      Total of {sum} exercises
    </p>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <h1>{course.name}</h1>
      <ul>
        {course.parts.map((part) => (
          <Part key={part.id} part={part} />
        ))}
      </ul>
      <Sum sum={course.parts.reduce((sum, part) => sum + part.exercises, 0)} />
    </div>
  );
};

export default Course;
