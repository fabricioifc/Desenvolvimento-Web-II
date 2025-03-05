#!/bin/sh
while [ ! -f /etc/letsencrypt/fullchain.pem ]; do
  echo "Aguardando certificados..."
  sleep 1
done
echo "Certificados encontrados!"
exec nginx -g "daemon off;"