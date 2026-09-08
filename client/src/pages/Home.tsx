/*
 * Blueprint Operacional: página assimétrica inspirada em documentação industrial,
 * com marfim, azul-marinho, cobre e checkpoints verificáveis.
 */
import { motion } from "framer-motion";
import {
  Activity,
  ArrowDownRight,
  Boxes,
  CheckCircle2,
  CloudCog,
  Container,
  GitBranch,
  LockKeyhole,
  Server,
  ShieldCheck,
  TerminalSquare,
} from "lucide-react";

const pipeline = [
  {
    code: "01",
    title: "Push na main",
    detail: "O commit dispara o workflow e fixa exatamente a revisão que será implantada.",
    icon: GitBranch,
  },
  {
    code: "02",
    title: "Validação e build",
    detail: "TypeScript, build do Vite e imagem Docker são verificados antes da entrega.",
    icon: Boxes,
  },
  {
    code: "03",
    title: "Identidade temporária",
    detail: "O GitHub assume uma role AWS por OIDC; nenhuma chave permanente entra no código.",
    icon: LockKeyhole,
  },
  {
    code: "04",
    title: "Comando via SSM",
    detail: "A AWS entrega a instrução à EC2 sem SSH e sem liberar a porta 22.",
    icon: CloudCog,
  },
  {
    code: "05",
    title: "Compose e healthcheck",
    detail: "A máquina atualiza o código, recria o serviço e confirma a saúde do container.",
    icon: Container,
  },
];

const reveal = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="DeployPath — início">
          <img src="https://files.manuscdn.com/user_upload_by_module/session_file/116739049/LrgOQGYViuwWjcrW.png" alt="" />
          <span className="brand-word">DEPLOY</span>
          <span className="brand-mono">PATH</span>
        </a>
        <nav aria-label="Navegação principal">
          <a href="#fluxo">Fluxo</a>
          <a href="#seguranca">Segurança</a>
          <a href="#alvo">Alvo</a>
        </nav>
        <span className="run-status"><i /> PIPELINE READY</span>
      </header>

      <main>
        <section className="hero" id="inicio">
          <motion.div
            className="hero-copy"
            initial="hidden"
            animate="visible"
            variants={reveal}
            transition={{ duration: 0.42, ease: [0.23, 1, 0.32, 1] }}
          >
            <p className="eyebrow">LAB 01 — ENTREGA CONTÍNUA SEGURA</p>
            <h1>Do commit ao <em>container</em>, sem abrir SSH.</h1>
            <p className="hero-lead">
              Uma aplicação pequena para enxergar o fluxo completo: GitHub Actions autentica,
              o SSM entrega o comando e o Docker Compose publica a nova versão na EC2.
            </p>
            <div className="hero-actions">
              <a className="primary-action" href="#fluxo">
                Percorrer o pipeline <ArrowDownRight size={18} />
              </a>
              <span className="hero-note"><ShieldCheck size={17} /> acesso limitado por IP</span>
            </div>
          </motion.div>

          <motion.figure
            className="hero-visual"
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.23, 1, 0.32, 1] }}
          >
            <img
              src="https://files.manuscdn.com/user_upload_by_module/session_file/116739049/pjFbPVcmlNnghYDO.png"
              alt="Ilustração do fluxo entre repositório, automação, gateway seguro e servidor"
            />
            <figcaption>FIG. 01 / CAMINHO DE ENTREGA</figcaption>
          </motion.figure>

          <aside className="target-strip" id="alvo">
            <span>DESTINO</span>
            <strong>i-03e69e83fc6b8193c</strong>
            <span>REGIÃO</span>
            <strong>us-east-1</strong>
            <span>PORTA</span>
            <strong>8082 / TCP</strong>
          </aside>
        </section>

        <section className="pipeline-section" id="fluxo">
          <div className="section-heading">
            <p className="eyebrow">SEQUÊNCIA OPERACIONAL</p>
            <h2>Cinco verificações.<br />Uma entrega repetível.</h2>
            <p>Cada push na branch principal percorre o mesmo caminho e deixa um registro auditável.</p>
          </div>

          <div className="pipeline-list">
            {pipeline.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.article
                  className="pipeline-step"
                  key={step.code}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.4 }}
                  variants={reveal}
                  transition={{ duration: 0.24, delay: index * 0.05 }}
                >
                  <span className="step-code">{step.code}</span>
                  <span className="step-icon"><Icon size={21} /></span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.detail}</p>
                  </div>
                  <CheckCircle2 className="step-check" size={20} />
                </motion.article>
              );
            })}
          </div>
        </section>

        <section className="evidence-section">
          <figure className="evidence-visual">
            <img
              src="https://files.manuscdn.com/user_upload_by_module/session_file/116739049/aeGEENGUFsyCNOBO.png"
              alt="Painel ilustrado com etapas de integração e entrega contínua"
            />
            <figcaption>FIG. 02 / EXECUÇÃO OBSERVÁVEL</figcaption>
          </figure>
          <div className="evidence-copy">
            <p className="eyebrow">O QUE O TESTE PROVA</p>
            <h2>A aplicação é simples. O caminho é real.</h2>
            <p>
              O objetivo deste laboratório não é esconder a infraestrutura: é tornar visível o que
              acontece entre uma alteração de código e a atualização efetiva do serviço.
            </p>
            <dl className="metrics">
              <div><dt>Gatilho</dt><dd>push / main</dd></div>
              <div><dt>Transporte</dt><dd>AWS SSM</dd></div>
              <div><dt>Runtime</dt><dd>Docker Compose</dd></div>
            </dl>
          </div>
        </section>

        <section className="security-section" id="seguranca">
          <div className="security-copy">
            <span className="security-index">SEC / 01</span>
            <p className="eyebrow">PERÍMETRO CONTROLADO</p>
            <h2>Automação não precisa significar exposição.</h2>
            <p>
              A instância recebe comandos pelo canal gerenciado da AWS. O tráfego da aplicação é
              aceito somente da origem corporativa configurada no Security Group e no Nginx.
            </p>
            <div className="security-rules">
              <span><ShieldCheck size={18} /> sem porta 22</span>
              <span><LockKeyhole size={18} /> OIDC temporário</span>
              <span><Activity size={18} /> healthcheck após deploy</span>
            </div>
          </div>
          <figure className="security-visual">
            <img
              src="https://files.manuscdn.com/user_upload_by_module/session_file/116739049/qexDUKzCHXamtrrJ.png"
              alt="Ilustração do caminho seguro de automação até uma instância Linux"
            />
            <figcaption>FIG. 03 / CANAL DE GERENCIAMENTO</figcaption>
          </figure>
        </section>

        <section className="command-section">
          <div className="command-label">
            <TerminalSquare size={19} /> COMANDO REMOTO
          </div>
          <pre><code>docker compose up -d --build --remove-orphans</code></pre>
          <div className="command-result">
            <i /> <span>service healthy</span> <Server size={18} />
          </div>
        </section>
      </main>

      <footer>
        <div className="brand footer-brand">
          <img src="https://files.manuscdn.com/user_upload_by_module/session_file/116739049/LrgOQGYViuwWjcrW.png" alt="" />
          <span className="brand-word">DEPLOY</span><span className="brand-mono">PATH</span>
        </div>
        <p>Laboratório GitHub Actions → AWS SSM → EC2 → Docker Compose</p>
        <span>REV. 01 / 2026</span>
      </footer>
    </div>
  );
}
