#!/usr/bin/env bash
# Blueprint Operacional: cria/atualiza o provedor OIDC e a role de deploy após o repositório existir.
set -Eeuo pipefail

: "${GITHUB_OWNER:?Defina GITHUB_OWNER}"
: "${GITHUB_REPOSITORY_NAME:?Defina GITHUB_REPOSITORY_NAME}"
: "${GITHUB_OWNER_ID:?Defina GITHUB_OWNER_ID}"
: "${GITHUB_REPOSITORY_ID:?Defina GITHUB_REPOSITORY_ID}"

AWS_ACCOUNT_ID="378970971717"
ROLE_NAME="DeployPathGitHubActionsRole"
POLICY_NAME="DeployPathGitHubActionsPolicy"
PROVIDER_ARN="arn:aws:iam::${AWS_ACCOUNT_ID}:oidc-provider/token.actions.githubusercontent.com"
OIDC_SUBJECT="repo:${GITHUB_OWNER}@${GITHUB_OWNER_ID}/${GITHUB_REPOSITORY_NAME}@${GITHUB_REPOSITORY_ID}:environment:production"
SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
TRUST_FILE=$(mktemp)

cleanup() { rm -f "${TRUST_FILE}"; }
trap cleanup EXIT

if ! aws iam get-open-id-connect-provider --open-id-connect-provider-arn "${PROVIDER_ARN}" >/dev/null 2>&1; then
  aws iam create-open-id-connect-provider \
    --url https://token.actions.githubusercontent.com \
    --client-id-list sts.amazonaws.com >/dev/null
fi

sed "s|__GITHUB_OIDC_SUBJECT__|${OIDC_SUBJECT}|g" \
  "${SCRIPT_DIR}/iam/github-oidc-trust.template.json" > "${TRUST_FILE}"

if aws iam get-role --role-name "${ROLE_NAME}" >/dev/null 2>&1; then
  aws iam update-assume-role-policy \
    --role-name "${ROLE_NAME}" \
    --policy-document "file://${TRUST_FILE}"
else
  aws iam create-role \
    --role-name "${ROLE_NAME}" \
    --description "Credenciais temporárias do GitHub Actions para deploy via SSM" \
    --assume-role-policy-document "file://${TRUST_FILE}" >/dev/null
fi

aws iam put-role-policy \
  --role-name "${ROLE_NAME}" \
  --policy-name "${POLICY_NAME}" \
  --policy-document "file://${SCRIPT_DIR}/iam/github-actions-permissions.json"

aws iam get-role --role-name "${ROLE_NAME}" --query 'Role.Arn' --output text
