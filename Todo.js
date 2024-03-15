const { v4: uuidv4 } = require('uuid');
const response = require('./response');

const list = [];

function todoList(req, res) {
  const { url, method } = req;
  let body = ''

  const GET = method === 'GET';
  const DELETE = method === 'DELETE';
  const POST = method === 'POST';
  const PATCH = method === 'PATCH';

  req.on('data', (chunk) => body += chunk)

  if (url === '/todos' && GET) {
    response.success({ res, status: 200, data: list });
  } else if (url === '/todos' && DELETE) {
    list.length = 0
    response.success({ res, status: 200, data: '刪除成功' });
  } else if (url === '/todos' && POST) {
    req.on('end', () => {
      try {
        const data = JSON.parse(body)
        if (!data.content) {
          response.fail({ res, status: 400, message: 'content 必填' });
          return
        }
        list.push({
          content: data.content,
          id: uuidv4()
        })
        response.success({ res, status: 200, data: list });
      } catch (error) {
        response.fail({ res, status: 400, message: '發生未知錯誤' });
      }
    })
  } else if (url.startsWith('/todo/') && GET) {
    const id = url.replace('/todo/', '')
    const todo = list.find(item => item.id = id)
    if(todo) {
      response.success({ res, status: 200, data: todo });
    } else {
      response.fail({ res, status: 400, message: '查無此 id' })
    }
  } else if (url.startsWith('/todo/') && PATCH) {
    const id = url.replace('/todo/', '')
    req.on('end', () => {
      try {
        const data = JSON.parse(body)
        if (!data.content) {
          response.fail({ res, status: 400, message: 'content 必填' });
          return
        }
        const todo = list.find(item => item.id = id)
        if (todo) {
          todo.content = data.content
          response.success({ res, status: 200, data: todo });
        } else {
          response.fail({ res, status: 400, message: '查無此 id' })
        }
      } catch (error) {
        response.fail({ res, status: 400, message: '發生未知錯誤' });
      }
    })
  } else if (url.startsWith('/todo/') && DELETE) {
    const id = url.replace('/todo/', '')
    const index = list.findIndex(item => item.id = id)
    if (index === -1) {
      response.fail({ res, status: 400, message: '查無此 id' })
      return
    }
    list.splice(index, 1)
    response.success({ res, status: 200, data: '刪除成功' });
  } else if (method === 'OPTIONS') {
    response.success({ res, status: 200 });
  } else {
    response.fail({ res, status: 404, message: '無此路由' });
  }
}

module.exports = {
  todoList,
};
