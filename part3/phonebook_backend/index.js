const express = require("express");
const morgan = require("morgan");
const app = express();

morgan.token("body", (request, response) => JSON.stringify(request.body));

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.use(express.json());

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.get("/api/info", (request, response) => {
  response.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date()}</p>
    `);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);

  if (persons.find((person) => person.id === id)) {
    persons = persons.filter((person) => person.id !== id);
    response.status(204).end();
  } else {
    response.status(404).end();
  }
});

app.post("/api/persons", (request, response) => {
  const id = Math.max(...persons.map((person) => person.id)) + 1;
  const person = { id: id, ...request.body };

  if (persons.find((person) => person.name === request.body.name)) {
    return response.status(400).json({
      error: "name must be unique",
    });
  } else if (
    !person.hasOwnProperty("name") ||
    !person.hasOwnProperty("number")
  ) {
    return response.status(400).json({
      error: "missing attributes",
    });
  } else {
    persons = persons.concat(person);
    response.json(person);
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
