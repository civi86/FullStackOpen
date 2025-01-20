const baseUrl = 'http://localhost:3001/persons';

export const getAllPersons = async () => {
  const response = await fetch(baseUrl);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const addPerson = async (newPerson) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPerson),
  });

  if (!response.ok) {
    throw new Error('Failed to add person');
  }
  return response.json();
};
