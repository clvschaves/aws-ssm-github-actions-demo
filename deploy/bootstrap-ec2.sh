#!/usr/bin/env bash
# Blueprint Operacional: preparação idempotente da EC2 para receber deploys por SSM.
set -Eeuo pipefail

export DEBIAN_FRONTEND=noninteractive

apt-get update
apt-get install -y ca-certificates curl git

if ! command -v docker >/dev/null 2>&1; then
  curl -fsSL https://get.docker.com | sh
fi

systemctl enable --now docker
docker compose version

install -d -m 0755 /opt/aws-ssm-github-actions-demo

echo "BOOTSTRAP_SUCCESS"

