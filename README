# API Reference

In this section, you will find the API's endpoints and their respective descriptions, along with the request and response examples. All data is sent and received as JSON.

<!-- Routes -->

## Routes

### [Cards](#cards) _`/cards`_

- [Create a card](#---create-a-card)
- [Activate a card](#---activate-a-card)
- [Get Balance and transactions](#---get-balance-and-transactions)
- [Block a card](#---block-a-card)
- [Unblock a card](#---unblock-a-card)
- [Create a virtual card](#---create-a-virtual-card)

### [Payments](#payments) _`/payment`_

- [New payment](#---new-payment)

### [Recharges](#recharges) _`/recharge`_

- [New recharge](#---new-recharge)

## Cards

### &nbsp; ‣ &nbsp; Create a card

### Create a card

```http
POST https://valex-t6.herokuapp.com/cards
```

### &nbsp; ☰ &nbsp; Request

###### Body

```json
{
  "employeeId": "1",
  "cardType": "restaurant"
}
```

###### Headers

```json
{
  "x-api-key": "this-is-a-needlessly-long-placeholder-api-key"
}
```

### &nbsp; ☰ &nbsp; Responses

| Status Code |      Description      |          Properties           |
| :---------: | :-------------------: | :---------------------------: |
|   **201**   |        Created        |      `data: {cardData}`       |
|   **400**   |      Bad Request      | `error: { message, details }` |
|   **401**   |     Unauthorized      | `error: { message, details }` |
|   **404**   |       Not Found       | `error: { message, details }` |
|   **422**   | Unprocessable Entity  | `error: { message, details }` |
|   **500**   | Internal Server Error | `error: { message, details }` |

###### cardData example

```json
{
  "number": "5379-6040-7875-1659",
  "cardholderName": "CICLANA M MADEIRA",
  "securityCode": "175",
  "expirationDate": "09/27",
  "type": "health",
  "employeeId": 2,
  "isVirtual": false,
  "isBlocked": false
}
```

### &nbsp; ‣ &nbsp; Activate a card

### Activate a card

```http
PUT https://valex-t6.herokuapp.com/cards/activate/${cardId}
```

### &nbsp; ☰ &nbsp; Request

###### Body

```json
{
  "cvc": "950",
  "password": "1234"
}
```

### &nbsp; ☰ &nbsp; Responses

| Status Code |      Description      |          Properties           |
| :---------: | :-------------------: | :---------------------------: |
|   **200**   |          OK           |          `data: {}`           |
|   **400**   |      Bad Request      | `error: { message, details }` |
|   **404**   |       Not Found       | `error: { message, details }` |
|   **422**   | Unprocessable Entity  | `error: { message, details }` |
|   **500**   | Internal Server Error | `error: { message, details }` |

### &nbsp; ‣ &nbsp; Get Balance and Transactions

### Get Balance and Transactions

```http
GET https://valex-t6.herokuapp.com/cards/transactions/${cardId}
```

### &nbsp; ☰ &nbsp; Responses

| Status Code |      Description      |          Properties           |
| :---------: | :-------------------: | :---------------------------: |
|   **200**   |          OK           |  `data: {transactionsData}`   |
|   **400**   |      Bad Request      | `error: { message, details }` |
|   **404**   |       Not Found       | `error: { message, details }` |
|   **422**   | Unprocessable Entity  | `error: { message, details }` |
|   **500**   | Internal Server Error | `error: { message, details }` |

###### transactionsData example

```json
{
  "balance": 600,
  "transactions": [
    {
      "id": 18,
      "cardId": 10,
      "businessId": 5,
      "timestamp": "2022-09-05T19:02:31.000Z",
      "amount": 150,
      "businessName": "Unimed"
    },
    {
      "id": 19,
      "cardId": 10,
      "businessId": 5,
      "timestamp": "2022-09-05T19:02:35.000Z",
      "amount": 250,
      "businessName": "Unimed"
    }
  ],
  "recharges": [
    {
      "id": 5,
      "cardId": 10,
      "timestamp": "2022-09-05T19:02:17.000Z",
      "amount": 1000
    }
  ]
}
```

### &nbsp; ‣ &nbsp; Block a card

### Block a card

```http
POST https://valex-t6.herokuapp.com/card/block/${cardId}
```

### &nbsp; ☰ &nbsp; Request

###### Body

```json
{
  "password": "1234"
}
```

### &nbsp; ☰ &nbsp; Responses

| Status Code |      Description      |          Properties           |
| :---------: | :-------------------: | :---------------------------: |
|   **200**   |          OK           |          `data: {}`           |
|   **400**   |      Bad Request      | `error: { message, details }` |
|   **404**   |       Not Found       | `error: { message, details }` |
|   **422**   | Unprocessable Entity  | `error: { message, details }` |
|   **500**   | Internal Server Error | `error: { message, details }` |

### &nbsp; ‣ &nbsp; Unblock a card

### Unblock a card

```http
POST https://valex-t6.herokuapp.com/card/unblock/${cardId}
```

### &nbsp; ☰ &nbsp; Request

###### Body

```json
{
  "password": "1234"
}
```

### &nbsp; ☰ &nbsp; Responses

### &nbsp; ‣ &nbsp; Create a virtual card

### Create a virtual card

```http
POST https://valex-t6.herokuapp.com/cards/virtual${originalCardId}
```

### &nbsp; ☰ &nbsp; Request

###### Body

```json
{
  "password": "1234"
}
```

### &nbsp; ☰ &nbsp; Responses

| Status Code |      Description      |          Properties           |
| :---------: | :-------------------: | :---------------------------: |
|   **200**   |          OK           |          `data: {}`           |
|   **400**   |      Bad Request      | `error: { message, details }` |
|   **404**   |       Not Found       | `error: { message, details }` |
|   **422**   | Unprocessable Entity  | `error: { message, details }` |
|   **500**   | Internal Server Error | `error: { message, details }` |

## Payments

### &nbsp; ‣ &nbsp; New payment

### Create a new payment

```http
POST https://valex-t6.herokuapp.com/payment
```

### &nbsp; ☰ &nbsp; Request

###### Body

```json
{
  "cardId": 1,
  "password": "1234",
  "businessId": 3,
  "amount": 100
}
```

### &nbsp; ☰ &nbsp; Responses

| Status Code |      Description      |          Properties           |
| :---------: | :-------------------: | :---------------------------: |
|   **201**   |        Created        |          `data: {}`           |
|   **400**   |      Bad Request      | `error: { message, details }` |
|   **404**   |       Not Found       | `error: { message, details }` |
|   **422**   | Unprocessable Entity  | `error: { message, details }` |
|   **500**   | Internal Server Error | `error: { message, details }` |

### &nbsp; ‣ &nbsp; New online payment

### Create a online payment

```http
POST https://valex-t6.herokuapp.com/payment/online
```

### &nbsp; ☰ &nbsp; Request

###### Body

```json
{
  "number": "5273-9536-2600-3288",
  "cardHolderName": "CICLANA M MADEIRA",
  "expirationDate": "09/27",
  "cvc": "389",
  "businessId": 3,
  "amount": 100
}
```

### &nbsp; ☰ &nbsp; Responses

| Status Code |      Description      |          Properties           |
| :---------: | :-------------------: | :---------------------------: |
|   **201**   |        Created        |          `data: {}`           |
|   **400**   |      Bad Request      | `error: { message, details }` |
|   **404**   |       Not Found       | `error: { message, details }` |
|   **422**   | Unprocessable Entity  | `error: { message, details }` |
|   **500**   | Internal Server Error | `error: { message, details }` |

## Recharges

### &nbsp; ‣ &nbsp; New recharge

### Create a online payment

```http
POST https://valex-t6.herokuapp.com/payment/${cardId}
```

### &nbsp; ☰ &nbsp; Request

###### Body

```json
{
  "amount": 1000
}
```

###### Headers

```json
{
  "x-api-key": "this-is-a-needlessly-long-placeholder-api-key"
}
```

### &nbsp; ☰ &nbsp; Responses

| Status Code |      Description      |          Properties           |
| :---------: | :-------------------: | :---------------------------: |
|   **201**   |        Created        |          `data: {}`           |
|   **400**   |      Bad Request      | `error: { message, details }` |
|   **404**   |       Not Found       | `error: { message, details }` |
|   **422**   | Unprocessable Entity  | `error: { message, details }` |
|   **500**   | Internal Server Error | `error: { message, details }` |

<!-- Contact & Study Playlist -->
