curl -X POST \
-H 'Content-Type: application/json' \
-d '{
  "check": {
    "metadata": {
      "name": "ops-test",
      "labels": {
          "contacts": "ops"
      }
    },
    "status": 1,
    "output": "could not connect to mysql",
    "handlers": ["email"]
  }
}' \
http://127.0.0.1:3031/events