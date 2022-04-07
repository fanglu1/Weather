const http = require("http");
const express = require("express");
const morgan = require('morgan')
const app = express();

// app.use(morgan('tiny'))
morgan.token('body', function (req, res) { 
  return [
      JSON.stringify(req.body)
  ] 
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


let pBook = [
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

const Moment = require("moment");
const numPeople = pBook.length;
const a = new Moment().format("LLLL");

// console.log(a.format("h:mm:ss a"));

//3.1
app.get("/api/persons/", (request, response) => {
  response.end(JSON.stringify(pBook));
});

// const Data = http.createServer((request, response) => {
//   response.writeHead(200, { "Content-Type": "text/plain" });
//   response.end(JSON.stringify(data));
// });

//3.2
app.get("/info", (request, response) => {
  response.end(
    "Phonebook has info for " + JSON.stringify(numPeople) + " people \r\n\n" + a
  );
});

// const info = http.createServer((request, response) => {
//     response.writeHead(200, { "Content-Type": "text/plain" });
//     response.write(JSON.stringify('Phonebook has info for ' + numPeople + ' people'));
//     response.write('\n');
//     response.end(JSON.stringify(a))
//   });

//3.3

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const pers = pBook.find((person) => person.id === 5);
  if (!pers) {
    response.write(JSON.stringify("No entry"));
  }
  response.end(JSON.stringify(pers));
});
// })
// const id = http.createServer((request, response) => {
//     response.writeHead(200, { "Content-Type": "text/plain" });
//     if(!pers){
//         response.write(JSON.stringify("No entry"))
//     }
//         response.end(JSON.stringify(pers));
// });

//3.4
app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  pBook = pBook.filter((person) => person.id !== id);

  response.status(204).end();
});

//3.5 & 3.6
const generatePersonId = () => {
  const maxId = pBook.length > 0 ? Math.max(...pBook.map((n) => n.id)) : 0;
  return maxId + 1;
};
app.use(express.json());

app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (!body.number) {
    return response.status(400).json({
      error: "Need a number",
    });
  }
  if (!body.name) {
    return response.status(400).json({
      error: "Need a name",
    });
  }

  const peopleNames = pBook.map((person) => person.name);

  if (peopleNames.includes(body.name)) {
    return response.status(400).json({
      error: "Name must be unique",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generatePersonId(),
  };

  pBook = pBook.concat(person);

  response.json(person);
});

// 3.7

// app.use(morgan('tiny'))

// 3.8
// morgan.token('body', function (req, res) { 
//   return [
//       JSON.stringify(req.body)
//   ] 
// })
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const PORT = 3001;
app.listen(PORT);

// const PORT2 = 3002;
// info.listen(PORT2);

// const PORT3 = 3003
// id.listen(PORT3);
