const express = require('express');
// const bodyParser = require('body-parser');
const Joi = require('joi');

const app = express();

app.use(express.json());

const courses = [
  { id: 1, name: 'course 1' },
  { id: 2, name: 'course 2' },
  { id: 3, name: 'course 3' }
];

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/courses', (req, res) => {
  res.send(courses);
});

app.get('/api/courses/:id', async (req, res) => {
  const course = await courses.find(item => item.id === Number(req.params.id));

  if (!course) {
    return res.status(404).json({ succes: false });
  }

  res.json(course);
});

app.post('/api/courses', (req, res) => {

  const schema = {
    name: Joi.string().min(3).required()
  };

  const result = Joi.validate(req.body, schema);

  const course = { name: req.body.name, id: courses.length + 1 };

  if (result.error) {
    res.status(400).json(result.error.details[0].message);
    return;
  }

  courses.push(course);
  res.json({ succes: true });
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`server running on port ${port}...`));

// app.get('/api/courses/:id/:userId', (req, res) => {
//   res.json(req.query)
// example: http://localhost:2203/hello/world?cool=true
// cool=true  is query
// you will get {cool: true}
// })
