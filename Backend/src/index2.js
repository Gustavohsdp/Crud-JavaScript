const express = require('express');

const app = express();

app.use(express.json())

/**
 * Tipos de parametros
 * 
 * Query Params: Filtros e paginção
 * Route Params: Identificar recursos (Atualizar/Deletar)
 * Rquest body: Conteúdo na hora de enviar ou editar um recurso (JSON)
 */

/**
 * Middleware:
 * 
 * Interceptador de requisições que interromper totalmente a requisição ou alterar dados da requisição
 */

const projects = [];

function logRequest(req, res, next) {
  const { method, url} = req;

  const logLabel = `[${method.toUpperCase()} ${url}]`;

  console.log(logLabel);
}

app.use(logRequest);
//Buscar informações no backend
app.get('/projects', (req, res) => {

  const { title, owner } = req.query;

  console.log(title);
  console.log(owner);


  //json sepre retorna {} ou []
  return res.json({
    name: 'Gustavo Henrique',
    company: 'Valenet',
    tech: ['ReactJs', 'ReactNative','Nodejs']
  });
})

//Criar uma informação
app.post('/projects', (req, res) => {
  const { title, owner } = req.body;

  console.log(title);
  console.log(owner);
  //json sepre retorna {} ou []
  return res.json({
    name: 'Gustavo Henrique',
    company: 'Valenet',
    tech: ['ReactJs', 'ReactNative','Nodejs', 'react-native']
  });
})

//Atualizar um informação
app.put('/projects/:id', (req, res) => {
  const {id} = req.params;

  console.log(id);

  //json sepre retorna {} ou []
  return res.json({
    name: 'Gustavo Henrique',
    company: 'Valenet conectado',
    tech: ['ReactJs', 'ReactNative','Nodejs', 'react-native']
  });
})

//deletar uma informação
app.delete('/projects/:id', (req, res) => {
  //json sepre retorna {} ou []
  return res.json({
    name: 'Gustavo Henrique',
    company: 'Valenet',
  });
})



app.listen(3333, () => {
  console.log('👩‍💻 Back-end started!')
});