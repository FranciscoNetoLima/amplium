import { useEffect, useState } from 'react';
import { t, useLanguage } from '../i18n.js';
import './demo-site.css';

const root = '/demonstracoes/site-servicos';
const routes = [
  [root, 'Início'],
  [`${root}/servicos`, 'Serviços'],
  [`${root}/contato`, 'Contato'],
];
const services = [
  [
    '01',
    'Instalação de ar-condicionado',
    'Planejamos o ponto ideal, instalamos com cuidado e orientamos o uso do equipamento.',
    'Para um aparelho novo ou um ambiente que ainda não tem climatização.',
    '↗',
  ],
  [
    '02',
    'Manutenção preventiva',
    'Fazemos limpeza, inspeção e ajustes periódicos para manter o ambiente agradável.',
    'Para cuidar dos equipamentos em uso e identificar sinais de desgaste.',
    '✳',
  ],
  [
    '03',
    'Diagnóstico e reparo',
    'Avaliamos falhas, explicamos o serviço necessário e só iniciamos o reparo após sua aprovação.',
    'Para ruído, vazamento, baixa refrigeração ou funcionamento irregular.',
    '⌁',
  ],
  [
    '04',
    'Projetos para empresas',
    'Organizamos a climatização de salas, lojas e escritórios conforme o uso de cada espaço.',
    'Para negócios com vários ambientes ou uma rotina de manutenção.',
    '▦',
  ],
];

function Link({ href, children, className = '' }) {
  return (
    <a className={className} href={href}>
      {t(children)}
    </a>
  );
}

function Home() {
  return (
    <>
      <section className="demo-hero demo-container">
        <div className="demo-hero-copy">
          <span className="demo-kicker">{t('CLIMA CERTO, TODOS OS DIAS')}</span>
          <h1>{t('Conforto para viver e trabalhar melhor.')}</h1>
          <p>
            {t(
              'Instalação, manutenção e reparo de climatização para residências e empresas. Você entende cada etapa antes de decidir.',
            )}
          </p>
          <div className="demo-actions">
            <Link href={`${root}/contato`} className="demo-button">
              Solicitar orçamento →
            </Link>
            <Link href={`${root}/servicos`} className="demo-text-link">
              Conhecer os serviços ↗
            </Link>
          </div>
          <div className="demo-hero-facts">
            <span>{t('Atendimento residencial e comercial')}</span>
            <span>{t('Orçamento explicado antes do serviço')}</span>
          </div>
        </div>
        <div className="demo-hero-art" aria-hidden="true">
          <div className="demo-art-sun" />
          <div className="demo-art-ring demo-art-ring-one" />
          <div className="demo-art-ring demo-art-ring-two" />
          <div className="demo-art-unit">
            <span />
            <i />
            <b />
          </div>
          <div className="demo-art-air demo-art-air-one" />
          <div className="demo-art-air demo-art-air-two" />
          <div className="demo-art-air demo-art-air-three" />
          <span className="demo-art-label">{t('O ambiente certo muda o dia.')}</span>
        </div>
      </section>
      <section className="demo-section demo-container">
        <div className="demo-section-head">
          <span className="demo-kicker">{t('NOSSO JEITO DE TRABALHAR')}</span>
          <h2>{t('Clareza do primeiro contato à entrega.')}</h2>
          <p>
            {t(
              'Você conta o que acontece no ambiente. Nós avaliamos as opções, explicamos o serviço indicado e combinamos os próximos passos.',
            )}
          </p>
        </div>
        <div className="demo-value-grid">
          <article>
            <span>01 /</span>
            <h3>{t('Entendemos o espaço')}</h3>
            <p>{t('Uso, tamanho e necessidade do ambiente orientam a recomendação.')}</p>
          </article>
          <article>
            <span>02 /</span>
            <h3>{t('Explicamos as opções')}</h3>
            <p>{t('Você recebe uma proposta com escopo claro antes de aprovar.')}</p>
          </article>
          <article>
            <span>03 /</span>
            <h3>{t('Cuidamos da execução')}</h3>
            <p>{t('O serviço é organizado para causar menos interrupção à sua rotina.')}</p>
          </article>
        </div>
      </section>
      <section className="demo-feature demo-container">
        <div>
          <span className="demo-kicker">{t('SERVIÇOS')}</span>
          <h2>{t('Uma solução para cada momento do seu equipamento.')}</h2>
        </div>
        <div>
          <p>
            {t(
              'Vai instalar, cuidar ou resolver uma falha? Veja o que fazemos e escolha um ponto de partida para conversar.',
            )}
          </p>
          <Link href={`${root}/servicos`} className="demo-text-link">
            Explorar serviços ↗
          </Link>
        </div>
      </section>
    </>
  );
}

function ServicesPage() {
  return (
    <>
      <div className="demo-page-head demo-container">
        <span className="demo-kicker">{t('SERVIÇOS / CLIMATIZAÇÃO')}</span>
        <h1>{t('O cuidado certo para cada ambiente.')}</h1>
        <p>
          {t(
            'Da escolha do equipamento à manutenção, veja como podemos ajudar e quando cada serviço faz sentido.',
          )}
        </p>
      </div>
      <section
        className="demo-services-grid demo-container"
        aria-label={t('Serviços de climatização')}
      >
        {services.map(([number, title, description, detail, icon]) => (
          <article className="demo-service" key={number}>
            <div className="demo-service-top">
              <span>{number} / 04</span>
              <span className="demo-service-icon" aria-hidden="true">
                {icon}
              </span>
            </div>
            <h2>{t(title)}</h2>
            <p>{t(description)}</p>
            <div className="demo-service-detail">{t(detail)}</div>
            <Link href={`${root}/contato`} className="demo-text-link">
              Conversar sobre este serviço ↗
            </Link>
          </article>
        ))}
      </section>
      <section className="demo-note demo-container">
        <h2>{t('Não sabe por onde começar?')}</h2>
        <p>
          {t(
            'Descreva o ambiente ou o problema. A conversa inicial ajuda a identificar qual atendimento solicitar.',
          )}
        </p>
        <Link href={`${root}/contato`} className="demo-button">
          Descrever minha necessidade →
        </Link>
      </section>
    </>
  );
}

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [values, setValues] = useState({ name: '', email: '', service: '', message: '' });
  const update = (event) => {
    event.target.setCustomValidity('');
    setSubmitted(false);
    setValues((current) => ({ ...current, [event.target.name]: event.target.value }));
  };
  const submit = (event) => {
    event.preventDefault();
    for (const [name, value] of Object.entries(values)) {
      if (!value.trim()) {
        const field = event.currentTarget.elements.namedItem(name);
        field.setCustomValidity(t('Preencha este campo.'));
        field.reportValidity();
        return;
      }
    }
    setValues({ name: '', email: '', service: '', message: '' });
    setSubmitted(true);
  };
  return (
    <>
      <div className="demo-page-head demo-container">
        <span className="demo-kicker">{t('CONTATO / SIMULAÇÃO')}</span>
        <h1>{t('Vamos entender o que seu espaço precisa?')}</h1>
        <p>
          {t(
            'Conte sobre o ambiente ou o equipamento. Em um projeto real, essas informações ajudariam a preparar o atendimento.',
          )}
        </p>
      </div>
      <section className="demo-contact demo-container">
        <div className="demo-contact-aside">
          <span className="demo-kicker">{t('ANTES DE ENVIAR')}</span>
          <h2>{t('Uma conversa começa com contexto.')}</h2>
          <p>
            {t(
              'Informe o tipo de serviço e descreva sua necessidade. Aqui você pode testar o formulário livremente.',
            )}
          </p>
          <div className="demo-contact-points">
            <span>{t('01 / Escolha o serviço')}</span>
            <span>{t('02 / Conte o que acontece')}</span>
            <span>{t('03 / Veja a confirmação local')}</span>
          </div>
        </div>
        <form className="demo-form" onSubmit={submit}>
          <p className="demo-form-disclaimer">
            {t('Este formulário é uma simulação. Nenhum dado será enviado ou armazenado.')}
          </p>
          <div className="demo-form-row">
            <label>
              {t('Seu nome')}
              <input
                name="name"
                autoComplete="name"
                required
                minLength={2}
                maxLength={80}
                value={values.name}
                onChange={update}
                placeholder={t('Como podemos chamar você?')}
              />
            </label>
            <label>
              {t('Seu e-mail')}
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={120}
                value={values.email}
                onChange={update}
                placeholder="voce@exemplo.com"
              />
            </label>
          </div>
          <label>
            {t('Serviço de interesse')}
            <select name="service" required value={values.service} onChange={update}>
              <option value="">{t('Selecione uma opção')}</option>
              {services.map((service) => (
                <option key={service[0]} value={service[1]}>
                  {t(service[1])}
                </option>
              ))}
              <option value="Ainda não sei">{t('Ainda não sei')}</option>
            </select>
          </label>
          <label>
            {t('O que você precisa?')}
            <textarea
              name="message"
              required
              minLength={10}
              maxLength={1000}
              rows={5}
              value={values.message}
              onChange={update}
              placeholder={t('Descreva o ambiente, equipamento ou problema.')}
            />
          </label>
          <button className="demo-button" type="submit">
            {t('Testar envio →')}
          </button>
          <p className="demo-form-confirmation" role="status" aria-live="polite">
            {submitted
              ? t(
                  'Simulação concluída. O formulário funcionou, mas nenhum dado foi enviado ou armazenado.',
                )
              : ''}
          </p>
        </form>
      </section>
    </>
  );
}

export default function DemoSite() {
  useLanguage();
  const path = window.location.pathname.replace(/\/$/, '');
  const page =
    path === `${root}/servicos` ? 'services' : path === `${root}/contato` ? 'contact' : 'home';
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    document.title = `${t(page === 'home' ? 'Início' : page === 'services' ? 'Serviços' : 'Contato')} — ${t('Brisa Clima | Projeto demonstrativo')}`;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        'content',
        t('Site demonstrativo de serviços de climatização. Empresa e dados fictícios.'),
      );
  });
  return (
    <div className="demo-site">
      <div className="demo-banner">
        <div className="demo-container">
          <span>{t('Projeto demonstrativo — empresa e dados fictícios.')}</span>
          <a href="/#servico-sites">{t('Voltar à Amplium')} ↗</a>
        </div>
      </div>
      <header className="demo-header">
        <div className="demo-container demo-header-inner">
          <Link href={root} className="demo-brand">
            BRISA CLIMA
          </Link>
          <button
            type="button"
            className="demo-menu-button"
            aria-expanded={menuOpen}
            aria-controls="demo-navigation"
            aria-label={t(menuOpen ? 'Fechar menu' : 'Abrir menu')}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span aria-hidden="true">{menuOpen ? '×' : '☰'}</span>
          </button>
          <nav
            id="demo-navigation"
            className={menuOpen ? 'demo-nav is-open' : 'demo-nav'}
            aria-label={t('Navegação principal')}
          >
            {routes.map(([href, label]) => (
              <Link key={href} href={href} className={path === href ? 'is-active' : ''}>
                {label}
              </Link>
            ))}
            <Link href={`${root}/contato`} className="demo-nav-cta">
              Solicitar orçamento ↗
            </Link>
          </nav>
        </div>
      </header>
      <main id="demo-main">
        {page === 'services' ? <ServicesPage /> : page === 'contact' ? <ContactPage /> : <Home />}
      </main>
      <section className="demo-amplium-cta demo-container">
        <div>
          <span className="demo-kicker">AMPLIUM / DEMONSTRAÇÃO</span>
          <h2>{t('Quer um site para sua empresa?')}</h2>
          <p>
            {t(
              'A Amplium pode criar uma experiência pensada para o seu negócio e para as pessoas que você quer atender.',
            )}
          </p>
        </div>
        <Link href="/#contato" className="demo-button">
          Conte seu projeto ↗
        </Link>
      </section>
      <footer className="demo-footer">
        <div className="demo-container">
          <span>
            BRISA CLIMA <small>· {t('Projeto demonstrativo')}</small>
          </span>
          <nav aria-label={t('Navegação do rodapé')}>
            {routes.map(([href, label]) => (
              <Link key={href} href={href}>
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}
