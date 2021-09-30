const http = require('http');
const port = 8081;
const host = '0.0.0.0';

const employees = [
  {name: "John", surname: "Doe", role: "QA"},
  {name: "Bob", surname: "Dylan", role: "DevOps"},
]


function listener(req, res) {
  res.setHeader("Content-Type", "application/json");
  res.writeHead(200);
  res.end(JSON.stringify(employees));
}

const server = http.createServer(listener);
server.listen(port, host, () => {console.log(`Server listening on ${host}:${port}`)});
