const baseUrl = 'https://puhelinluettelo-backend-3pv8.onrender.com/api/persons';

export const getAllPersons = async () => {
  const response = await fetch(baseUrl);
  const data = await response.json();
  return data;
};

export const addPerson = async (newPerson) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPerson),
  });
  return response.json();
};

export const deletePerson = async (id) => {
  await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
  });
};
