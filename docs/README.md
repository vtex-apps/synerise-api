# Synerise API

## Example

```
curl --request POST \
  --url https://accountexample.vtexcommercestable.com.br/_v/campaign/ \
  --header 'Content-Type: application/json' \
  --data '{
	"uuid": "f446feec-2fe4-4906-8b53-7e956b4207e0",
	"campaignId": "lsRGDVA04",
	"itemId": "2",
  "jwt": "myjwt"
}'
```

## Input

| Param      | Description                                                                                                      |           |
| ---------- | ---------------------------------------------------------------------------------------------------------------- | --------- |
| uuid       | user's UUID                                                                                                      | mandatory |
| campaignId | Synerise campaign id                                                                                             | mandatory |
| itemId     | Vtex product id. Used in recommendations where a product input is necessary (eg cross selling, similar products) | optional  |
| jwt        | User JWTG                                                                                                        | optional  |

## Response

| Param    | Description                  |
| -------- | ---------------------------- |
| products | List of recommended products |
| jwt      | User JWTG                    |

## JWT usage

When it is users first access, JWT is not generated yet. This way, the first client's call will only contain the `uuid`.

```json
{
  "uuid": "${userUUID}",
  "campaignId": "${campaignId}"
}
```

The response will include a new JWT for the user

```json
{
  "products": [...],
  "jwt": "${userJWT}"
}
```

Now, the next synerise calls must have the JWT included

```json
{
  "uuid": "${userUUID}",
  "campaignId": "${campaignId}",
  "jwt": "${userJWT}"
}
```
