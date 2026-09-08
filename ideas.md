# Direção de design — AWS SSM GitHub Actions Demo

## Abordagens consideradas

### Theme Name: Blueprint Operacional
**Very Brief Intro:** Uma página inspirada em plantas técnicas e runbooks de infraestrutura, com hierarquia rígida, linhas de conexão e acabamento editorial. A interface torna um fluxo complexo visualmente simples e confiável.
**Probability:** 0.04

### Theme Name: Console de Campo
**Very Brief Intro:** Uma estética utilitária de terminal e etiquetas de operação, densa e pragmática, como uma sala de controle de implantação. O foco seria velocidade de leitura e indicadores de status.
**Probability:** 0.02

### Theme Name: Caderno de Engenharia
**Very Brief Intro:** Uma composição leve, quase analógica, que apresenta o pipeline como uma sequência anotada em papel técnico. A intenção é didática, humana e acessível para quem está aprendendo CI/CD.
**Probability:** 0.07

## Abordagem escolhida: Blueprint Operacional

### Design Movement
Swiss International Style reinterpretado por documentação industrial e diagramas de engenharia dos anos 1960.

### Core Principles
1. **Clareza operacional:** cada bloco deve explicar uma etapa real do fluxo, sem ornamentos que confundam o entendimento.
2. **Assimetria controlada:** grandes áreas de respiro equilibram painéis técnicos densos e evitam uma landing page centralizada e genérica.
3. **Materialidade editorial:** papel marfim, linhas finas, tinta azul-marinho e cobre sugerem um runbook físico e confiável.
4. **Estados verificáveis:** marcadores, checkpoints e códigos curtos devem comunicar progresso e segurança.

### Color Philosophy
O fundo marfim reduz a frieza típica de interfaces de infraestrutura. Azul-marinho representa estabilidade e legibilidade; cobre identifica caminhos ativos, decisões e chamadas para ação. Azul-acinzentado aparece apenas em elementos secundários. A paleta evita neon e transmite competência sem parecer excessivamente corporativa.

### Layout Paradigm
Página longitudinal assimétrica, organizada como uma prancha técnica: hero dividido em proporção 5/7, trilha vertical de implantação deslocada à esquerda e blocos editoriais alternados. O conteúdo nunca depende de uma grade central uniforme.

### Signature Elements
- Linhas de fluxo em cobre com checkpoints quadrados numerados.
- Etiquetas técnicas em caixa alta com espaçamento amplo entre letras.
- Cantos majoritariamente retos com pequenos recortes diagonais, em vez de cartões arredondados uniformes.

### Interaction Philosophy
Interações devem confirmar ações como instrumentos físicos: botões comprimem levemente ao clique, links recebem sublinhado cobre e etapas ganham contraste ao entrar na viewport. Não haverá animações decorativas contínuas.

### Animation
Entradas com deslocamento vertical máximo de 12 px e opacidade, duração entre 180 e 260 ms, usando `cubic-bezier(0.23, 1, 0.32, 1)`. Checkpoints entram em cascata de 50 ms. Apenas `transform` e `opacity` serão animados, com respeito a `prefers-reduced-motion`.

### Typography System
**Fraunces** em títulos editoriais, com peso 600 e itálico apenas para ênfase conceitual. **IBM Plex Sans** no corpo e na navegação. **IBM Plex Mono** em identificadores, comandos e rótulos de infraestrutura. A escala usa grandes contrastes: 64–76 px no hero, 38–48 px nos títulos de seção e 16–18 px no corpo.

### Brand Essence
**Posicionamento:** um laboratório visual para equipes que querem compreender, validar e repetir um deploy seguro do GitHub até a EC2. **Personalidade:** precisa, didática e sóbria.

### Brand Voice
Headlines soam como instruções claras de engenharia; CTAs descrevem a ação exata; microcopy evita promessas vagas. Exemplos: **“Do commit ao container, sem abrir SSH.”** e **“Veja cada verificação antes do tráfego chegar.”**

### Wordmark & Logo
O símbolo funde uma bifurcação de versionamento, um gateway seguro e a face de um container em uma forma geométrica compacta. O wordmark usa composição própria, com “DEPLOY” em IBM Plex Sans condensado visualmente e “PATH” em mono espaçado, nunca como texto padrão isolado.

### Signature Brand Color
**Cobre de execução — `#B96536`**, reservado a caminhos ativos, checkpoints e ações primárias.

## Arquitetura da demonstração

A aplicação será um frontend React estático, compilado no GitHub Actions e empacotado em uma imagem Nginx. O workflow autenticará na AWS preferencialmente por **GitHub OIDC**, enviará um comando SSM para a EC2 e executará `docker compose pull && docker compose up -d`. Para o primeiro laboratório, haverá também uma variante simples com segredos AWS, mas a documentação recomendará rotação das chaves anteriormente compartilhadas e migração para OIDC.

O Security Group da EC2 deverá liberar a porta de publicação somente para `200.10.185.12/32`. O inventário da instância revelou serviços ativos nas portas 8080 e 8081; por isso, o novo container publicará na porta livre `8082`, sem interferir nas aplicações existentes. O diretório remoto será `/opt/aws-ssm-github-actions-demo`.
