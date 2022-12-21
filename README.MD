# Single-spa - Keycloak - Lerna

Poc de monorepo com Single-spa + Keycloak

- Single-spa
- Keycloak
- Lerna
- Shared styled-components
- Typescript
- React-router-dom

## Como rodar o projeto?

> Primeiro é preciso ter o Keycloak rodando e, para isso, [siga esse tutorial](https://www.keycloak.org/getting-started/getting-started-docker). Também será preciso criar duas roles de realm (`app-a-view` e `app-b-view`) e atribuir ao usuário.

- Clone o projeto
- Instale as dependências `yarn install`
- Na raiz do projeto execute o bootstrap `yarn bootstrap`. Isso irá instalar as dependências de cada package
- Agora execute `yarn start` e o projeto root estará rodando na porta [http://localhost:9090]([http://localhost:9090]).
- E execute `yarn watch` em uma outra aba de terminal. Esse comando executa o typescript em modo watch para que as alterações nos pacotes `commons`, `ui` e `auth` sejam refletidas paras os microfrontends que os utilizam como dependências

## TODO

- [ ] Configurar Jest
- [ ] Configurar CI/CD
