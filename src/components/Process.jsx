import { t, useLanguage } from '../i18n.js';
import { technologies } from './TechnologyIcons.jsx';
const steps = [
  {
    title: 'Diagnóstico e planejamento',
    description:
      'Identificamos o que seu negócio precisa melhorar e definimos a solução, as prioridades e o plano de execução.',
    label: 'ENTENDER',
  },
  {
    title: 'Proposta e validação',
    description:
      'Apresentamos como a solução vai funcionar e alinhamos com você o escopo e os critérios de sucesso.',
    label: 'VALIDAR',
  },
  {
    title: 'Implementação e testes',
    description:
      'Desenvolvemos, configuramos e conectamos o que o projeto exige. Testamos os fluxos antes de colocar a solução em uso.',
    label: 'IMPLEMENTAR',
  },
  {
    title: 'Entrega e próximos passos',
    description:
      'Colocamos a solução em funcionamento e orientamos seu uso. Alinhamos o acompanhamento e os próximos ajustes conforme o serviço contratado.',
    label: 'ACOMPANHAR',
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
                <path
                  d="m82 83 3 3 5-8m6 18 3 3 5-8"
                  stroke="#bad7ff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="m101 78 39-12m-25 25 39-12m-48 29 48-15"
                  stroke="#6588c2"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </g>
              <circle cx="199" cy="40" r="12" fill="#1f3c5d" stroke="#719fea" />
              <path d="m194 40 4 4 7-8" stroke="#bad7ff" strokeWidth="2" />
            </>
          ),
        )}
        {t(
          stage === 2 && (
            <>
              <path className="method-connector" d="M54 82h30m72 0h31M120 46V33m0 85v14" />
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
                <path d="M109 82h22m-11 0v16" stroke="#719fea" strokeWidth="2" />
                <rect x="97" y="64" width="15" height="22" rx="4" fill="#476bbe" />
                <rect x="128" y="64" width="15" height="22" rx="4" fill="#6588c2" />
                <rect x="112" y="96" width="16" height="12" rx="4" fill="#a0c1fc" />
              </g>
              <rect x="24" y="66" width="30" height="30" rx="9" fill="#243e65" stroke="#719fea" />
              <g className="method-test">
                <rect x="187" y="66" width="30" height="30" rx="9" />
                <path d="m195 81 5 5 9-10" />
              </g>
              <circle cx="120" cy="25" r="5" fill="#77aaff" />
              <circle cx="120" cy="143" r="4" fill="#466594" />
            </>
          ),
        )}
        {t(
          stage === 3 && (
            <>
              <circle className="method-orbits" cx="120" cy="80" r="61" />
              <path
                className="method-connector"
                d="M64 58a60 60 0 0 1 111-5M176 102a60 60 0 0 1-111 5"
              />
              <path
                d="m164 50 11 3 3-11m-102 68-11-3-3 11"
                stroke="#9ec2ff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <g className="method-float">
                <rect
                  x="84"
                  y="47"
                  width="72"
                  height="66"
                  rx="14"
                  fill="#14233a"
                  stroke={`url(#method-gradient-${stage})`}
                />
                <path
                  d="M98 65h44m-44 15h44m-44 15h44"
                  stroke="#466594"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <circle cx="115" cy="65" r="4" fill="#a0c1fc" />
                <circle cx="132" cy="80" r="4" fill="#77aaff" />
                <circle cx="106" cy="95" r="4" fill="#6588c2" />
              </g>
              <g className="method-nodes">
                <circle cx="120" cy="20" r="5" />
                <circle cx="120" cy="140" r="5" />
              </g>
              <circle className="method-beacon" cx="120" cy="140" r="9" stroke="#7caef3" />
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
            'Entendemos seu objetivo, definimos a solução com você e colocamos tudo em funcionamento, com clareza em cada etapa.',
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
