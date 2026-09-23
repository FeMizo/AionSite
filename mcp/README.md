# MCP de WhatsApp Business para AionSite

Este servidor usa exclusivamente WhatsApp Business Cloud API de Meta. No controla cuentas personales.

## Variables de entorno

Configura estas variables en el entorno donde se ejecuten Next.js y el MCP:

```text
WHATSAPP_ACCESS_TOKEN=token_de_meta
WHATSAPP_PHONE_NUMBER_ID=id_del_numero
WHATSAPP_APP_SECRET=app_secret_de_meta
WHATSAPP_VERIFY_TOKEN=secreto_de_verificacion_del_webhook
WHATSAPP_GRAPH_API_VERSION=v23.0
WHATSAPP_REQUIRE_APPROVAL=true
WHATSAPP_DATA_FILE=.data/whatsapp.json
```

`WHATSAPP_REQUIRE_APPROVAL=true` es el modo seguro predeterminado. Las herramientas de envío exigen `approved: true` y registran los rechazos.

## Ejecución

```text
npm run mcp:whatsapp
```

Registra el webhook de Meta en `/api/whatsapp/webhook`. La verificación GET usa `WHATSAPP_VERIFY_TOKEN`; los POST requieren `X-Hub-Signature-256` calculado con `WHATSAPP_APP_SECRET`.

## Herramientas MCP

- `whatsapp_list_conversations`
- `whatsapp_get_conversation`
- `whatsapp_search_conversations`
- `whatsapp_send_message`
- `whatsapp_send_template`
- `whatsapp_mark_read`

El almacenamiento local se puede sustituir por una base de datos durable mediante `WHATSAPP_DATA_FILE` o una futura implementación del mismo módulo.
