import { t, useLanguage } from '../i18n.js';
import { technologies } from './TechnologyIcons.jsx';
const steps = [
  {
    title: 'Diagnóstico e planejamento',
    description: 'Entendemos seu negócio e definimos prioridades, escopo e prazo.',
    label: 'Entender',
  },
  {
    title: 'Design e validação',
    description: 'Você vê e aprova a proposta visual antes do desenvolvimento.',
    label: 'Validar',
  },
  {
    title: 'Desenvolvimento e testes',
    description: 'Construímos a solução e testamos os caminhos essenciais.',
    label: 'Construir',
  },
  {
    title: 'Publicação e continuidade',
    description: 'Colocamos o projeto no ar e orientamos sua equipe sobre o uso.',
    label: 'Entregar',
  },
];
function Illustration({ stage }) {
  return (
    <div className={`process-illustration process-illustration-${stage}`} aria-hidden="true">
      <svg className="method-art" viewBox="0 0 240 160" fill="none">
        <defs>
          <linearGradient
            id={`method-gradient-${stage}`}
            x1="30"
            y1="20"
            x2="205"
            y2="140"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#7dabff" />
            <stop offset="1" stopColor="#4257bf" />
          </linearGradient>
          <radialGradient id={`method-glow-${stage}`}>
            <stop stopColor="#427bc9" stopOpacity=".3" />
            <stop offset="1" stopColor="#427bc9" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="120" cy="85" rx="105" ry="70" fill={`url(#method-glow-${stage})`} />
        {t(
          stage === 0 && (
            <>
              <g className="method-orbits">
                <circle cx="120" cy="80" r="29" />
                <circle cx="120" cy="80" r="50" />
                <ellipse cx="120" cy="80" rx="83" ry="37" transform="rotate(-25 120 80)" />
              </g>
              <path className="method-connector" d="M47 49 120 80 190 111M120 80 165 35" />
              <g className="method-float">
                <rect
                  x="100"
                  y="60"
                  width="40"
                  height="40"
                  rx="12"
                  fill={`url(#method-gradient-${stage})`}
                />
                <path d="m110 84 10-14 10 14h-20m10-14v21" stroke="#e0edff" strokeWidth="1.5" />
              </g>
              <g className="method-nodes">
                <circle cx="47" cy="49" r="9" />
                <circle cx="190" cy="111" r="9" />
                <circle cx="165" cy="35" r="6" />
              </g>
              <text x="24" y="30">
                {t('OBJETIVO')}
              </text>
              <text x="155" y="139">
                {t('PRIORIDADES')}
              </text>
            </>
          ),
        )}
        {t(
          stage === 1 && (
            <>
              <g className="method-layer method-layer-back">
                <path d="m48 56 93-29 53 47-93 29Z" fill="#14223b" stroke="#547bb1" />
                <path d="m66 59 66-20 15 13-66 20Z" fill="#253d60" />
              </g>
              <g className="method-layer method-layer-front">
                <path
                  d="m48 86 93-29 53 47-93 29Z"
                  fill="#142440"
                  stroke={`url(#method-gradient-${stage})`}
                />
                <path d="m66 89 35-11 22 20-35 11Z" fill="#476bbe" />
                <path d="m112 75 31-10 12 11-31 10Z" fill="#a0c1fc" />
                <path
                  d="m126 89 31-10m-21 19 20-6"
                  stroke="#6588c2"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </g>
              <circle cx="199" cy="40" r="12" fill="#1f3c5d" stroke="#719fea" />
              <path d="m194 40 4 4 7-8" stroke="#bad7ff" strokeWidth="2" />
              <text x="23" y="144">
                {t('VISUAL + EXPERIÊNCIA')}
              </text>
            </>
          ),
        )}
        {t(
          stage === 2 && (
            <>
              <path className="method-connector" d="M53 82h38m60 0h37M120 50V30m0 100v15" />
              <g className="method-float">
                <rect
                  x="84"
                  y="46"
                  width="72"
                  height="72"
                  rx="16"
                  fill="#14233a"
                  stroke={`url(#method-gradient-${stage})`}
                />
                <path
                  d="m108 68-12 14 12 14m24-28 12 14-12 14m-7-29-10 31"
                  stroke="#9ec2ff"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <g className="method-test">
                <rect x="24" y="66" width="30" height="30" rx="9" />
                <path d="m32 81 5 5 9-10" />
                <rect x="187" y="66" width="30" height="30" rx="9" />
                <path d="m195 81 5 5 9-10" />
              </g>
              <circle cx="120" cy="25" r="5" fill="#77aaff" />
              <circle cx="120" cy="143" r="4" fill="#466594" />
              <text x="15" y="132">
                {t('INTEGRAÇÕES')}
              </text>
              <text x="173" y="41">
                {t('TESTES')}
              </text>
            </>
          ),
        )}
        {t(
          stage === 3 && (
            <>
              <ellipse className="method-orbits" cx="120" cy="120" rx="76" ry="22" />
              <ellipse className="method-orbits" cx="120" cy="120" rx="48" ry="13" />
              <path className="method-connector" d="M120 116V68m-53 54 27-12m79 12-27-12" />
              <g className="method-float">
                <path
                  d="M94 61a18 18 0 0 1 35-7 15 15 0 0 1 7 29H95a11 11 0 0 1-1-22Z"
                  fill="#1a3050"
                  stroke={`url(#method-gradient-${stage})`}
                  strokeWidth="2"
                />
                <path
                  d="M116 74V50m-9 9 9-9 9 9"
                  stroke="#a9cbff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <g className="method-nodes">
                <circle cx="67" cy="122" r="5" />
                <circle cx="173" cy="122" r="5" />
                <circle cx="120" cy="116" r="7" />
              </g>
              <circle className="method-beacon" cx="120" cy="116" r="13" stroke="#7caef3" />
              <text x="158" y="58">
                {t('NO AR')}
              </text>
              <text x="32" y="149">
                {t('EVOLUÇÃO CONTÍNUA')}
              </text>
            </>
          ),
        )}
      </svg>
    </div>
  );
}
export default function Process() {
  useLanguage();
  return (
    <section className="section wrap process-section" id="metodo" aria-labelledby="process-heading">
      <div className="section-head reveal process-heading">
        <div>
          <div className="eyebrow">{t('03 / Como trabalhamos')}</div>
          <h2 id="process-heading">
            {t('Clareza do primeiro')}
            <br />
            {t('contato à entrega.')}
          </h2>
        </div>
        <p>
          {t(
            'Entendemos seu objetivo, apresentamos a solução, validamos com você e colocamos o projeto em funcionamento.',
          )}
        </p>
      </div>
      <div className="process">
        {t(
          steps.map((step, index) => (
            <article className="process-card reveal" key={step.title}>
              <div className="process-stage">
                <span>0{t(index + 1)}</span>
                <span>{t(step.label)}</span>
              </div>
              <Illustration stage={index} />
              <h3>{t(step.title)}</h3>
              <p>{t(step.description)}</p>
            </article>
          )),
        )}
      </div>
      <div className="tech-wrap">
        <div className="tech-caption">
          {t('Tecnologias escolhidas conforme as necessidades de cada projeto.')}
        </div>
        <div
          className="tech-strip"
          tabIndex="0"
          aria-label={t('Tecnologias utilizadas conforme as necessidades de cada projeto')}
        >
          <div className="tech-track">
            {t(
              technologies.map(({ name, icon }) => (
                <span className="tech-pill" key={name}>
                  {t(icon)}
                  <span>{t(name)}</span>
                </span>
              )),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
