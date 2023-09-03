# Usage

## Endpoints

Request

 - **GET /products**

Query

- **`page`** *(optional)*: Page number for products. Defaults to 1.
- **`perPage`** *(optional)*: Number of products per page. Defaults to 4.

Example:
```http
GET /products?page=2&perPage=10
```

Response

The `/products` endpoint returns a list of products in JSON format. Example response:

```json
{
  "totalProducts": 71,
  "data": [
    {
      "id": "string",
      "priceDiscount": 1000,
      "name": "string"
      // ...
    },
    // Other products...
  ]
}
```
