const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('Anna salasana');
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://villewaronen:${password}@civi86.zgmjv.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
} else if (process.argv.length === 5) {
  const name = process.argv[3];
  const number = process.argv[4];

  const person = new Person({
    name,
    number,
  });

  person.save().then(() => {
    console.log(`added ${person.name} ${person.number} to the phonebook`)
    mongoose.connection.close();
  });
} else {
  console.log('Virhe');
  process.exit(1);
}
