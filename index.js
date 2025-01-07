const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use(express.json());

function lerProdutos() {
  return new Promise((resolve, reject) => {
    fs.readFile("products.json", "utf8", (err, data) => {
      if (err) {
        reject("Erro ao acessar o banco de dados.");
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

function salvarProdutos(produtos) {
  return new Promise((resolve, reject) => {
    fs.writeFile("products.json", JSON.stringify(produtos, null, 2), (err) => {
      if (err) {
        reject("Erro ao salvar os dados.");
      } else {
        resolve();
      }
    });
  });
}

app.get("/", (req, res) => {
  res.send("Bem-vindo à API AgilStore!");
});

app.post("/produtos", async (req, res) => {
  const { nome, preco, categoria } = req.body;

  if (!nome || !preco || !categoria) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
  }

  try {
    const produtos = await lerProdutos();
    const novoProduto = {
      id: produtos.length + 1,
      nome,
      preco,
      categoria,
    };

    produtos.push(novoProduto);
    await salvarProdutos(produtos);

    res.status(201).json(novoProduto);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.get("/produtos", async (req, res) => {
  try {
    let produtos = await lerProdutos();
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

    res.json(produtos);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.put("/produtos/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, preco, categoria, quantidade } = req.body;

  try {
    const produtos = await lerProdutos();
    const index = produtos.findIndex((produto) => produto.id === parseInt(id));

    if (index === -1) {
      return res.status(404).json({ error: "Produto não encontrado." });
    }

    if (nome) produtos[index].nome = nome;
    if (preco) produtos[index].preco = preco;
    if (categoria) produtos[index].categoria = categoria;
    if (quantidade) produtos[index].quantidade = quantidade;

    await salvarProdutos(produtos);

    res.json(produtos[index]);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.delete("/produtos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const produtos = await lerProdutos();
    const index = produtos.findIndex((produto) => produto.id === parseInt(id));

    if (index === -1) {
      return res.status(404).json({ error: "Produto não encontrado." });
    }

    const produtoExcluido = produtos.splice(index, 1);
    await salvarProdutos(produtos);

    res.json({
      message: "Produto excluído com sucesso.",
      produto: produtoExcluido[0],
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.get("/produtos/busca", async (req, res) => {
  const { id, nome } = req.query;

  try {
    const produtos = await lerProdutos();

    if (id) {
      const produto = produtos.find((produto) => produto.id === parseInt(id));
      if (!produto) {
        return res.status(404).json({ error: "Produto não encontrado." });
      }
      return res.json(produto);
    }

    if (nome) {
      const resultados = produtos.filter((produto) =>
        produto.nome.toLowerCase().includes(nome.toLowerCase())
      );
      if (resultados.length === 0) {
        return res.status(404).json({ error: "Nenhum produto encontrado." });
      }
      return res.json(resultados);
    }

    res.status(400).json({ error: "Por favor, forneça um ID ou Nome para busca." });
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
