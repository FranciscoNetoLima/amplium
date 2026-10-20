import { t, useLanguage } from '../i18n.js';
import { useEffect, useRef, useState } from 'react';
export default function Solutions() {
  useLanguage();
  const [detail, setDetail] = useState(null);
  const dialogRef = useRef(null);
  useEffect(() => {
    if (detail) dialogRef.current.showModal();
  }, [detail]);
  const showDetail = (event) => {
    const copy = event.currentTarget.closest('.solution-copy');
    setDetail({
      title: copy.querySelector('h3').textContent,
      text: copy.querySelector('.solution-description').textContent,
    });
  };
  return (
    <>
      <section
        className="section solutions-scroll"
        id="solucoes"
        aria-labelledby="solutions-heading"
      >
        <div className="solutions-sticky">
          <div className="wrap solutions-header">
            <div>
              <div className="eyebrow">{t('02 / Objetivos do seu negócio')}</div>
              <h2 id="solutions-heading">{t('Comece pelo que seu negócio precisa resolver.')}</h2>
              <p>
                {t(
                  'Veja qual solução atende ao seu objetivo: sites, captação de contatos, CRM, IA e sistemas.',
                )}
              </p>
            </div>
            <div className="solutions-counter" aria-hidden="true">
              <span id="solution-current">01</span>
              <span> / 06</span>
            </div>
          </div>
          <div className="solutions-viewport">
            <div
              className="solutions-track"
              id="rail"
              role="region"
              aria-roledescription={t('carrossel')}
              aria-label={t('Soluções da Amplium — role para explorar')}
              tabIndex="0"
            >
              <article
                className="solution-card solution-web"
                role="group"
                aria-label={t('1 de 6: Conquistar confiança')}
              >
                <div className="solution-art" aria-hidden="true">
                  <div className="solution-orbit"></div>
                  <div className="solution-window">
                    <div className="solution-chrome">
                      <i></i>
                      <i></i>
                      <i></i>
                      <span>{t('Sua marca')}</span>
                    </div>
                    <div className="solution-interface">
                      <div className="solution-sidebar">
                        <b>{t('A')}</b>
                        <i></i>
                        <i></i>
                        <i></i>
                      </div>
                      <div className="solution-screen">
                        <span className="solution-ui-label">{t('Apresentação da empresa')}</span>
                        <div className="solution-ui-content">
                          <div className="solution-ui-tile">
                            <i></i>
                            <b>{t('Por que escolher')}</b>
                            <span></span>
                          </div>
                          <div className="solution-ui-tile">
                            <i></i>
                            <b>{t('Fale com a equipe')}</b>
                            <span></span>
                          </div>
                          <div className="solution-ui-chart">
                            <i></i>
                            <i></i>
                            <i></i>
                            <i></i>
                            <i></i>
                            <i></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className="solution-art-caption">{t('Conquistar confiança')}</span>
                </div>
                <div className="solution-copy">
                  <div className="solution-meta">
                    <span>{t('01 / Conquistar confiança')}</span>
                    <span>{t('Site institucional')}</span>
                  </div>
                  <h3>{t('Site institucional para sua empresa.')}</h3>
                  <p className="solution-description">
                    <strong>{t('Seu cliente chega, mas não entende seu diferencial?')}</strong>
                    {t(
                      ' Isso dificulta a avaliação da empresa. Reúna serviços, diferenciais e respostas em um site com um caminho claro para o contato.',
                    )}
                  </p>
                  <p className="solution-mobile-summary">
                    {t('Um site que valoriza sua empresa desde a primeira visita.')}
                  </p>
                  <button type="button" className="solution-details" onClick={showDetail}>
                    {t('Ver detalhes ')}
                    <span aria-hidden="true">+</span>
                  </button>
                  <ul>
                    <li>{t('Site + conteúdo')}</li>
                    <li>{t('Provas de confiança')}</li>
                    <li>{t('Contato no WhatsApp')}</li>
                  </ul>
                  <a href="#contato" className="solution-link">
                    {t('Quero apresentar melhor minha empresa ')}
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>
              <article
                className="solution-card solution-landing"
                role="group"
                aria-label={t('2 de 6: Gerar oportunidades')}
              >
                <div className="solution-art" aria-hidden="true">
                  <div className="solution-orbit"></div>
                  <div className="solution-window">
                    <div className="solution-chrome">
                      <i></i>
                      <i></i>
                      <i></i>
                      <span>{t('Sua próxima oportunidade')}</span>
                    </div>
                    <div className="solution-interface">
                      <div className="solution-sidebar">
                        <b>{t('A')}</b>
                        <i></i>
                        <i></i>
                        <i></i>
                      </div>
                      <div className="solution-screen">
                        <span className="solution-ui-label">{t('Jornada de captação')}</span>
                        <div className="solution-ui-content">
                          <div className="solution-ui-tile">
                            <i></i>
                            <b>{t('Oferta → contato')}</b>
                            <span></span>
                          </div>
                          <div className="solution-ui-tile">
                            <i></i>
                            <b>{t('Contato → orçamento')}</b>
                            <span></span>
                          </div>
                          <div className="solution-ui-chart">
                            <i></i>
                            <i></i>
                            <i></i>
                            <i></i>
                            <i></i>
                            <i></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className="solution-art-caption">{t('Gerar oportunidades')}</span>
                </div>
                <div className="solution-copy">
                  <div className="solution-meta">
                    <span>{t('02 / Gerar oportunidades')}</span>
                    <span>{t('Anúncios + landing page')}</span>
                  </div>
                  <h3>{t('Landing page e tráfego pago.')}</h3>
                  <p className="solution-description">
                    <strong>{t('Sua divulgação gera interesse, mas o contato se perde?')}</strong>
                    {t(
                      ' Conecte anúncios, landing page e CRM para acompanhar o caminho entre divulgação, contato e negociação.',
                    )}
                  </p>
                  <p className="solution-mobile-summary">
                    {t('Anúncios, landing page e CRM conectam o interesse à negociação.')}
                  </p>
                  <button type="button" className="solution-details" onClick={showDetail}>
                    {t('Ver detalhes ')}
                    <span aria-hidden="true">+</span>
                  </button>
                  <ul>
                    <li>{t('Anúncios + landing page')}</li>
                    <li>{t('Contato + CRM')}</li>
                    <li>{t('Custo por oportunidade')}</li>
                  </ul>
                  <a href="#contato" className="solution-link">
                    {t('Quero captar oportunidades ')}
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>
              <article
                className="solution-card solution-crm"
                role="group"
                aria-label={t('3 de 6: Acompanhar negociações')}
              >
                <div className="solution-art" aria-hidden="true">
                  <div className="solution-orbit"></div>
                  <div className="solution-window">
                    <div className="solution-chrome">
                      <i></i>
                      <i></i>
                      <i></i>
                      <span>{t('Sua operação')}</span>
                    </div>
                    <div className="solution-interface">
                      <div className="solution-sidebar">
                        <b>{t('A')}</b>
                        <i></i>
                        <i></i>
                        <i></i>
                      </div>
                      <div className="solution-screen">
                        <span className="solution-ui-label">{t('Rotina comercial')}</span>
                        <div className="solution-ui-content">
                          <div className="solution-ui-tile">
                            <i></i>
                            <b>{t('Propostas em aberto')}</b>
                            <span></span>
                          </div>
                          <div className="solution-ui-tile">
                            <i></i>
                            <b>{t('Retornos agendados')}</b>
                            <span></span>
                          </div>
                          <div className="solution-ui-chart">
                            <i></i>
                            <i></i>
                            <i></i>
                            <i></i>
                            <i></i>
                            <i></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className="solution-art-caption">{t('Acompanhar negociações')}</span>
                </div>
                <div className="solution-copy">
                  <div className="solution-meta">
                    <span>{t('03 / Acompanhar negociações')}</span>
                    <span>{t('CRM')}</span>
                  </div>
                  <h3>{t('CRM para organizar suas negociações.')}</h3>
                  <p className="solution-description">
                    <strong>
                      {t('Propostas e retornos esquecidos podem interromper uma negociação.')}
                    </strong>
                    {t(
                      ' Centralize o histórico, organize os próximos contatos e acompanhe cada oportunidade até a decisão do cliente.',
                    )}
                  </p>
                  <p className="solution-mobile-summary">
                    {t('CRM com histórico de contatos, propostas e lembretes de retorno.')}
                  </p>
                  <button type="button" className="solution-details" onClick={showDetail}>
                    {t('Ver detalhes ')}
                    <span aria-hidden="true">+</span>
                  </button>
                  <ul>
                    <li>{t('CRM + histórico')}</li>
                    <li>{t('Lembretes automáticos')}</li>
                    <li>{t('Próximas ações')}</li>
                  </ul>
                  <a href="#contato" className="solution-link">
                    {t('Quero organizar meu comercial ')}
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>
              <article
                className="solution-card solution-automation"
                role="group"
                aria-label={t('4 de 6: Agilizar o atendimento')}
              >
                <div className="solution-art" aria-hidden="true">
                  <div className="solution-orbit"></div>
                  <div className="solution-window">
                    <div className="solution-chrome">
                      <i></i>
                      <i></i>
                      <i></i>
                      <span>{t('Seu fluxo')}</span>
                    </div>
                    <div className="solution-interface">
                      <div className="solution-sidebar">
                        <b>{t('A')}</b>
                        <i></i>
                        <i></i>
                        <i></i>
                      </div>
                      <div className="solution-screen">
                        <span className="solution-ui-label">{t('Atendimento conectado')}</span>
                        <div className="solution-ui-content">
                          <div className="solution-ui-tile">
                            <i></i>
                            <b>{t('Triagem com IA')}</b>
                            <span></span>
                          </div>
                          <div className="solution-ui-tile">
                            <i></i>
                            <b>{t('Equipe com contexto')}</b>
                            <span></span>
                          </div>
                          <div className="solution-ui-chart">
                            <i></i>
                            <i></i>
                            <i></i>
                            <i></i>
                            <i></i>
                            <i></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className="solution-art-caption">{t('Agilizar o atendimento')}</span>
                </div>
                <div className="solution-copy">
                  <div className="solution-meta">
                    <span>{t('04 / Agilizar o atendimento')}</span>
                    <span>{t('Agentes de IA')}</span>
                  </div>
                  <h3>{t('Agentes de IA para atendimento.')}</h3>
                  <p className="solution-description">
                    <strong>{t('Perguntas repetidas ocupam o dia da equipe?')}</strong>
                    {t(
                      ' O cliente espera enquanto a equipe repete respostas. Automatize dúvidas frequentes e encaminhe os casos que precisam de atenção humana com o contexto do contato.',
                    )}
                  </p>
                  <p className="solution-mobile-summary">
                    {t('Agentes de IA respondem dúvidas e encaminham o contato à sua equipe.')}
                  </p>
                  <button type="button" className="solution-details" onClick={showDetail}>
                    {t('Ver detalhes ')}
                    <span aria-hidden="true">+</span>
                  </button>
                  <ul>
                    <li>{t('IA + base de respostas')}</li>
                    <li>{t('Triagem de contatos')}</li>
                    <li>{t('Encaminhamento à equipe')}</li>
                  </ul>
                  <a href="#contato" className="solution-link">
                    {t('Quero melhorar meu atendimento ')}
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>
              <article
                className="solution-card solution-ads"
                role="group"
                aria-label={t('5 de 6: Simplificar a operação')}
              >
                <div className="solution-art" aria-hidden="true">
                  <div className="solution-orbit"></div>
                  <div className="solution-window">
                    <div className="solution-chrome">
                      <i></i>
                      <i></i>
                      <i></i>
                      <span>{t('Sua campanha')}</span>
                    </div>
                    <div className="solution-interface">
                      <div className="solution-sidebar">
                        <b>{t('A')}</b>
                        <i></i>
                        <i></i>
                        <i></i>
                      </div>
                      <div className="solution-screen">
                        <span className="solution-ui-label">{t('Ferramentas conectadas')}</span>
                        <div className="solution-ui-content">
                          <div className="solution-ui-tile">
                            <i></i>
                            <b>{t('Entrada de dados')}</b>
                            <span></span>
                          </div>
                          <div className="solution-ui-tile">
                            <i></i>
                            <b>{t('Rotinas integradas')}</b>
                            <span></span>
                          </div>
                          <div className="solution-ui-chart">
                            <i></i>
                            <i></i>
                            <i></i>
                            <i></i>
                            <i></i>
                            <i></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className="solution-art-caption">{t('Simplificar a operação')}</span>
                </div>
                <div className="solution-copy">
                  <div className="solution-meta">
                    <span>{t('05 / Simplificar a operação')}</span>
                    <span>{t('Aplicações sob medida')}</span>
                  </div>
                  <h3>{t('Sistemas e automações sob medida.')}</h3>
                  <p className="solution-description">
                    <strong>
                      {t(
                        'Copiar os mesmos dados em ferramentas diferentes ocupa tempo e aumenta a chance de erro.',
                      )}
                    </strong>
                    {t(
                      ' Integre sistemas e automatize rotinas para simplificar o trabalho da equipe.',
                    )}
                  </p>
                  <p className="solution-mobile-summary">
                    {t('Aplicações sob medida conectam ferramentas e automatizam tarefas.')}
                  </p>
                  <button type="button" className="solution-details" onClick={showDetail}>
                    {t('Ver detalhes ')}
                    <span aria-hidden="true">+</span>
                  </button>
                  <ul>
                    <li>{t('Sistema sob medida')}</li>
                    <li>{t('Integrações + automação')}</li>
                    <li>{t('Rotinas centralizadas')}</li>
                  </ul>
                  <a href="#contato" className="solution-link">
                    {t('Quero simplificar minha operação ')}
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>
              <article
                className="solution-card solution-capture"
                role="group"
                aria-label={t('6 de 6: Decidir com clareza')}
              >
                <div className="solution-art" aria-hidden="true">
                  <div className="solution-orbit"></div>
                  <div className="solution-window">
                    <div className="solution-chrome">
                      <i></i>
                      <i></i>
                      <i></i>
                      <span>{t('Sua jornada')}</span>
                    </div>
                    <div className="solution-interface">
                      <div className="solution-sidebar">
                        <b>{t('A')}</b>
                        <i></i>
                        <i></i>
                        <i></i>
                      </div>
                      <div className="solution-screen">
                        <span className="solution-ui-label">{t('Visão do negócio')}</span>
                        <div className="solution-ui-content">
                          <div className="solution-ui-tile">
                            <i></i>
                            <b>{t('Campanhas e contatos')}</b>
                            <span></span>
                          </div>
                          <div className="solution-ui-tile">
                            <i></i>
                            <b>{t('Vendas e indicadores')}</b>
                            <span></span>
                          </div>
                          <div className="solution-ui-chart">
                            <i></i>
                            <i></i>
                            <i></i>
                            <i></i>
                            <i></i>
                            <i></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className="solution-art-caption">{t('Decidir com clareza')}</span>
                </div>
                <div className="solution-copy">
                  <div className="solution-meta">
                    <span>{t('06 / Decidir com clareza')}</span>
                    <span>{t('Dashboard')}</span>
                  </div>
                  <h3>{t('Painel de resultados do seu negócio.')}</h3>
                  <p className="solution-description">
                    <strong>{t('Os números estão espalhados e difíceis de comparar?')}</strong>
                    {t(
                      ' Isso dificulta entender o que merece atenção. Reúna dados de campanhas, contatos e vendas em indicadores claros para orientar as próximas decisões.',
                    )}
                  </p>
                  <p className="solution-mobile-summary">
                    {t('Dashboard que reúne dados de campanhas, contatos e vendas.')}
                  </p>
                  <button type="button" className="solution-details" onClick={showDetail}>
                    {t('Ver detalhes ')}
                    <span aria-hidden="true">+</span>
                  </button>
                  <ul>
                    <li>{t('Campanhas + CRM')}</li>
                    <li>{t('Dashboard de indicadores')}</li>
                    <li>{t('Acompanhamento do funil')}</li>
                  </ul>
                  <a href="#contato" className="solution-link">
                    {t('Quero acompanhar meus resultados ')}
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>
            </div>
          </div>
          <div className="wrap solutions-bottom">
            <span>
              {t('Role para explorar ')}
              <span aria-hidden="true">↓</span>
            </span>
            <div className="solutions-progress" aria-hidden="true">
              <span></span>
            </div>
            <span>{t('Caminhos para seu negócio')}</span>
          </div>
        </div>
      </section>
      <dialog
        className="solution-dialog"
        ref={dialogRef}
        onClose={() => setDetail(null)}
        aria-labelledby="solution-detail-title"
      >
        <form method="dialog">
          <button className="solution-dialog-close" aria-label={t('Fechar detalhes')}>
            {t('×')}
          </button>
        </form>
        <h3 id="solution-detail-title">{t(detail?.title)}</h3>
        <p>{t(detail?.text)}</p>
        <form method="dialog">
          <button className="solution-dialog-done">{t('Voltar às soluções')}</button>
        </form>
      </dialog>
    </>
  );
}
