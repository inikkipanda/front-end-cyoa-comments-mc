const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const socketio = require('socket.io');

const DataAccessObject = require('./dataAccessObject');
const Comment = require('./comment');

const app = express();
const port = process.env.PORT || 3001;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const dataAccessObject = new DataAccessObject('./database.sqlite3');
const comment = new Comment(dataAccessObject);

const server = app.listen(port, () => console.log(`Listening on port ${port}`));
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
  }
});

io.on("connection", (socket) => {
  console.log(`${socket.id} user just connected!`);
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

comment.createTable().catch(error => {
  console.log(`Error: ${JSON.stringify(error)}`);
});

app.post('/createComment', async function(request, response) {
  const { body } = request;
  const createComment = await comment.createComment(body);
  const getComment = await comment.getComment(createComment.id);
  io.emit("new-comment", getComment);
  response.send(getComment);
});

app.get('/getComment', function(request, response) {
  const { body } = request;
  const { id } = body;
  comment.getComment(id).then(result => {
    response.send(result);
  });
});

app.get('/getComments', function(request, response) {
  comment.getComments().then(result => {
    response.send(result);
  });
});

app.delete('/deleteComments', function(request, response) {
  comment.deleteComments().then(result => {
    io.emit("delete-comments");
    response.send(result);
  });
});


app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  const rootDir = __dirname.replace('/server', '');
  response.sendFile(`${rootDir}/src/index.html`);
});
