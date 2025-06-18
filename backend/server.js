const express = require('express');
const app = express();
const port = 3000;

// middleware para processar o json
app.use(express.json())

app.get('/login', (req, res) => {
  res.send('Hello World!');
});


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});