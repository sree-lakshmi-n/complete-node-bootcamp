const express = require('express');
const app = express();
const fs = require('fs');

// Using middleware
app.use(express.json());

// app.get('/', (req, res) => {
//   //   res.status(200).send('Hello from the server side!');
//   res
//     .status(200)
//     .json({ message: 'Hello from the server side!', app: 'Natours' });
// });
// app.post('/', (req, res) => {
//   res.end('You can post to this endpoint...');
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).send({
    status: 'success',
    results: tours.length,
    data: {
      tours,
      //  or tours:tours
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  // console.log(req.body);
  // // body is the property that is gonna be available on the request, because we used the middleware express.json()
  // res.end('Done');
  // //  we always need to send back something in order to finish the request/response cycle,

  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      // 200 - okay
      // 201 - created
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
});
app.get('/api/v1/tours/:id', (req, res) => {
  // To convert string to num, just multiply it with 1
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  // if (id > tours.length)
  if (!tour) {
    return res.status(404).json({
      status: 'Error',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});
const port = 3000;
app.listen(port, () => {
  console.log('listening to port: ', port);
});
