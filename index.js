const express = require("express");
const app = express();
const PORT = 3000;

//Middleware para interpretar JSON no body das requisições
app.use(express.json());

//Rota padrão
app.get("/", (req, res) => {
  res.send("Bem-vindo à API AgilStore!");
});


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
