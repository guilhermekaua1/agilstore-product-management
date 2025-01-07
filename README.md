# Gerenciamento de Produtos - AgilStore

## Descrição
Esta é uma API para o gerenciamento de produtos da loja **AgilStore**, permitindo operações como adicionar, listar, atualizar, excluir e buscar produtos. O projeto foi desenvolvido com **Node.js** e utiliza um arquivo JSON para persistência de dados.

---

## Funcionalidades
- **Adicionar Produto**: Permite adicionar novos produtos ao inventário.
- **Listar Produtos**: Exibe todos os produtos cadastrados, com opções de filtragem e ordenação.
- **Atualizar Produto**: Atualiza as informações de um produto existente pelo ID.
- **Excluir Produto**: Remove um produto do inventário pelo ID.
- **Buscar Produto**: Busca produtos pelo ID ou pelo nome (ou parte do nome).

---

## Requisitos
### Tecnologias Utilizadas
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)

### Dependências do Projeto
- **express**: Framework para criação da API.
- **fs (nativo)**: Para manipulação de arquivos JSON.

### Instalação
1. Clone este repositório:
   ```bash
   git clone https://github.com/guilhermekaua1/agilstore-product-management.git
   ```
2. Acesse o diretório do projeto:
   ```bash
   cd agilstore-product-management
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```

---

## Como Usar
### Inicie o Servidor
Execute o seguinte comando para iniciar a API:
```bash
node index.js
```
A API estará disponível em: `http://localhost:3000`

### Endpoints Disponíveis
#### 1. **Rota Padrão**
- **GET /**
  - Retorna uma mensagem de boas-vindas.
  - **Exemplo de Resposta**:
    ```text
    Bem-vindo à API AgilStore!
    ```

#### 2. **Adicionar Produto**
- **POST /produtos**
  - Adiciona um novo produto ao inventário.
  - **Body**:
    ```json
    {
      "nome": "Notebook",
      "preco": 2500,
      "categoria": "Eletrônicos"
    }
    ```
  - **Exemplo de Resposta**:
    ```json
    {
      "id": 1,
      "nome": "Notebook",
      "preco": 2500,
      "categoria": "Eletrônicos"
    }
    ```

#### 3. **Listar Produtos**
- **GET /produtos**
  - Lista todos os produtos cadastrados.
  - **Query Params Opcionais**:
    - `categoria`: Filtra produtos por categoria.
    - `ordenacao`: Ordena os produtos por `nome`, `preco` ou `quantidade`.
  - **Exemplo de Resposta**:
    ```json
    [
      {
        "id": 1,
        "nome": "Notebook",
        "preco": 2500,
        "categoria": "Eletrônicos"
      }
    ]
    ```

#### 4. **Atualizar Produto**
- **PUT /produtos/:id**
  - Atualiza as informações de um produto existente pelo ID.
  - **Body** (os campos são opcionais):
    ```json
    {
      "nome": "Notebook Gamer",
      "preco": 3000
    }
    ```
  - **Exemplo de Resposta**:
    ```json
    {
      "id": 1,
      "nome": "Notebook Gamer",
      "preco": 3000,
      "categoria": "Eletrônicos"
    }
    ```

#### 5. **Excluir Produto**
- **DELETE /produtos/:id**
  - Remove um produto do inventário pelo ID.
  - **Exemplo de Resposta**:
    ```json
    {
      "message": "Produto excluído com sucesso.",
      "produto": {
        "id": 1,
        "nome": "Notebook Gamer",
        "preco": 3000,
        "categoria": "Eletrônicos"
      }
    }
    ```

#### 6. **Buscar Produto**
- **GET /produtos/busca**
  - Busca produtos pelo ID ou pelo nome.
  - **Query Params**:
    - `id`: Busca por ID.
    - `nome`: Busca pelo nome (ou parte do nome).
  - **Exemplo de Resposta (por ID)**:
    ```json
    {
      "id": 1,
      "nome": "Notebook",
      "preco": 2500,
      "categoria": "Eletrônicos"
    }
    ```
  - **Exemplo de Resposta (por Nome)**:
    ```json
    [
      {
        "id": 1,
        "nome": "Notebook",
        "preco": 2500,
        "categoria": "Eletrônicos"
      }
    ]
    ```

---

## Estrutura do Projeto
```
agilstore-product-management/
├── index.js          # Arquivo principal da aplicação
├── package.json      # Dependências e scripts do projeto
├── package-lock.json # Informações de bloqueio de dependências
├── products.json     # Arquivo para persistência de dados
```

---

## Contribuição
1. Fork este repositório.
2. Crie uma branch para sua feature: `git checkout -b minha-feature`.
3. Faça commit de suas alterações: `git commit -m 'feat: Minha nova feature'`.
4. Envie suas alterações: `git push origin minha-feature`.
5. Abra um Pull Request.

---

## Autor
Desenvolvido por **Guilherme Kauã** como parte de um desafio de programação.

---

## Licença
Este projeto está licenciado sob a [MIT License](https://opensource.org/licenses/MIT).

