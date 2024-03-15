const http = require('http')
const Todo = require('./Todo')

const server = http.createServer(Todo.todoList)
server.listen(process.env.PORT || 3000)