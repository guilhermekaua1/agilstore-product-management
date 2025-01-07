const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

// Middleware para interpretar JSON no body das requisições
app.use(express.json());

// Rota padrão
app.get("/", (req, res) => {
  res.send("Bem-vindo à API AgilStore!");
});

// Endpoint: Adicionar Produto
app.post("/produtos", (req, res) => {
  const { nome, preco, categoria } = req.body;

  // Validação simples
  if (!nome || !preco || !categoria) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
  }

  // Ler os produtos do arquivo JSON
  fs.readFile("products.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao acessar o banco de dados." });
    }

    // Parse do arquivo JSON
    const produtos = JSON.parse(data);

    // Novo produto
    const novoProduto = {
      id: produtos.length + 1,
      nome,
      preco,
      categoria,
    };

    // Adicionar o novo produto à lista
    produtos.push(novoProduto);

    // Salvar a lista atualizada no arquivo JSON
    fs.writeFile("products.json", JSON.stringify(produtos, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: "Erro ao salvar o produto." });
      }

      res.status(201).json(novoProduto);
    });
  });
});

// Endpoint: Listar Produtos
app.get("/produtos", (req, res) => {
    // Ler os produtos do arquivo JSON
    fs.readFile("products.json", "utf8", (err, data) => {
      if (err) {
        return res.status(500).json({ error: "Erro ao acessar o banco de dados." });
      }

      let produtos = JSON.parse(data);

      // Aplicar filtros (se fornecidos)
      const { categoria, ordenacao } = req.query;

      if (categoria) {
        produtos = produtos.filter((produto) => produto.categoria === categoria);
      }

      if (ordenacao) {
        if (ordenacao === "nome") {
          produtos.sort((a, b) => a.nome.localeCompare(b.nome));
        } else if (ordenacao === "preco") {
          produtos.sort((a, b) => a.preco - b.preco);
        } else if (ordenacao === "quantidade") {
          produtos.sort((a, b) => a.quantidade - b.quantidade);
        }
      }

      // Retornar os produtos filtrados e/ou ordenados
      res.json(produtos);
    });
  });


// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
