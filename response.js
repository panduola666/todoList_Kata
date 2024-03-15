/**
 Access-Control-Allow-Headers：指定允許的 HTTP 請求携帶的表頭。
 Access-Control-Allow-Origin：指定哪些來源可以訪問資源，它可以是單個網域名稱或 *（代表任何網域）
 Access-Control-Allow-Methods：指定允許的 HTTP 方法。
*/

const headers = {
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
 'Content-Type': 'application/json'
};

function success({ res, status, data }) {
  res.writeHead(status, headers);
  if (data) {
    res.write(JSON.stringify({
      status: 'success',
      data
    }));
  }
  res.end();
}

function fail({ res, status, message }) {
  res.writeHead(status, headers);
  res.write(JSON.stringify({
    status: 'error',
    message
  }));
  res.end();
}

module.exports = {
  success,
  fail,
};
