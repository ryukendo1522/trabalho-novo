const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'usuario',
  password: 'senha',
  database: 'nome-do-banco'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log('Conectado ao banco de dados MySQL');
});

app.get('/gastos', function(req, res) {
  connection.query('SELECT * FROM gastos', function(err, results) {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/gastos', function(req, res) {
  const { descricao, valor, tipo, data } = req.body;
  connection.query('INSERT INTO gastos SET ?', { descricao, valor, tipo, data }, function(err, result) {
    if (err) throw err;
    res.status(201).send('Gasto adicionado com sucesso');
  });
});

app.listen(port, function() {
  console.log(`Servidor rodando na porta ${port}`);
});

export default App;
