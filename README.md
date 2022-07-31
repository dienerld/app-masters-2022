# Desafio Estágio JavaScrip AppMasters

## Objetivo 1ª Fase do Desafio

Desenvolver um backend que retorna apenas um objeto JSON contento `{alive: true}`

Site [AppMasters](https://www.appmasters.io/)

## Objetivo 2ª Fase do Desafio

Criar rota para receber um usuário que esteja cadastrando dispositivos para doação. Deve realizar verificações dos dados recebidos e retornar um objeto JSON contendo o status da requisição.

### Rota

> POST /donation

- Dados via JSON

```JSON
{
  "name": string,
  "phone": string,
  "zip": string,
  "email"?: string,
  "city": string,
  "state": string,
  "number": number,
  "neighborhood": string,
  "streetAddress": string,
  "complement"?: string,
  "deviceCount": number,
  "devices": [
    {
      "type": string,
      "condition": string
    }
  ]
}
```

Link para testes: [app heroku](https://doar-computador.herokuapp.com/)
