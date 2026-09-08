# Pendências de implantação

- [x] Conceder temporariamente ao usuário `user-ec2-manus` permissão para criar e administrar o provedor OIDC e a role IAM de deploy.
- [x] Executar `deploy/configure-aws-oidc.sh` e obter o ARN da role `DeployPathGitHubActionsRole`.
- [x] Salvar o ARN como secret `AWS_DEPLOY_ROLE_ARN` no ambiente GitHub `production`.
- [x] Autorizar no Security Group `sg-077074a47d87bd92a` somente `200.10.185.12/32` na porta TCP 8082.
- [ ] Executar o workflow e validar `http://100.58.68.9:8082` a partir do IP autorizado.
