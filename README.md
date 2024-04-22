# Projeto de CRUD com Autenticação

Este projeto é uma aplicação CRUD (Create, Read, Update, Delete) que permite a autenticação e gestão de usuários. Há dois tipos de usuários: `USER` e `ADMIN`. Os usuários comuns (`USER`) podem visualizar uma lista de usuários cadastrados e alterar sua própria senha. Usuários administradores (`ADMIN`) têm capacidade adicional para editar e excluir usuários, além de alterar sua própria senha.
Para fazer o controle dos usuários deixei salvo no localStorage, então caso queira fazer um novo teste do zero basta limpar o localStorage do navegador e dar refresh na tela.

## Tecnologias Utilizadas

- React para construção da interface do usuário.
- React Router para gestão das rotas da aplicação.
- Material-UI para o design dos componentes UI.
- React Hook Form e Yup para validação dos formulários.
- Local Storage para simulação de uma base de dados no navegador.
- Vite como empacotador e servidor de desenvolvimento.

# Instruções de Uso

Para utilizar a aplicação siga os passos abaixo:

### Instalação

Clone o repositório para sua máquina local

```
git clone
cd gen
```

Instale as dependências:

```
npm install
```

### Executando o Projeto

Inicie o servidor de desenvolvimento:

```
npm run dev
```

# Testando

Execute os testes automatizados:

```
npm run test
```

# Contas de Acesso

- ADMIN
  e-mail: camila@email.com
  senha: 123456

  e-mail: leonardo@email.com
  senha: 123456

- USER
  e-mail: fernanda@email.com
  senha: 123456
