#!/usr/bin/env bash

# Usage: ./wait-for-ingress.sh foo.localhost 60
HOST=$1
TIMEOUT=${2:-60}  # default timeout 60s

echo "Waiting for ingress $HOST to be available..."

for i in $(seq 1 $TIMEOUT); do
  if curl -s "http://$HOST" >/dev/null; then
    echo "Ingress $HOST is up!"
    exit 0
  fi
  sleep 1
done

echo "Timeout reached waiting for ingress $HOST"
exit 1
