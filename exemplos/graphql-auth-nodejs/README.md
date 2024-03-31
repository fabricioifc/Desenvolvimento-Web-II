# GraphQL API com NodeJS, Express e JWT

Este é um simples projeto de exemplo para demonstrar como criar uma API GraphQL com NodeJS, Express e JWT.

## Mutações

### Register

```graphql
mutation {
  register(username: "admin", email:"admin@admin.com", password: "123456") {
    token,
    user {
      id
      username
      email
    }
  }
}
```

### Login

```graphql
mutation {
  login(username: "admin", password: "123456") {
    token,
    user {
      id
      username
      email
    }
  }
}
```

### Create Beer

```graphql
mutation {
  addBeer(name: "Heineken", style: "Pilsen") {
    id
    name
    style
  }
}
```