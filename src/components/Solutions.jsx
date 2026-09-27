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
              <div className="eyebrow">{t('02 / Soluções')}</div>
              <h2 id="solutions-heading">{t('Da ideia à solução.')}</h2>
              <p>
                {t(
                  'Comece pelo que precisa melhorar. Combinamos serviços em um caminho para o seu negócio.',
                )}
              </p>
            </div>
            <div className="solutions-counter" aria-hidden="true">
              <span id="solution-current">01</span>
              <span> / 07</span>
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
                aria-label={t('1 de 7: Conquistar confiança')}
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
                    <span>{t('Plano integrado')}</span>
                  </div>
                  <h3>{t('Transforme visitas em boas conversas.')}</h3>
                  <p className="solution-description">
                    <strong>{t('Seu cliente chega, mas não entende seu diferencial?')}</strong>
                    {t(
                      ' Organizamos a apresentação da empresa, os argumentos e as respostas às dúvidas em um site com um caminho direto para o atendimento.',
                    )}
                  </p>
                  <p className="solution-mobile-summary">
                    {t('Apresente seus diferenciais e facilite o contato com sua equipe.')}
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
                aria-label={t('2 de 7: Gerar oportunidades')}
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
                    <span>{t('Plano integrado')}</span>
                  </div>
                  <h3>{t('Conecte divulgação e venda.')}</h3>
                  <p className="solution-description">
                    <strong>{t('Sua oferta precisa chegar a novos clientes?')}</strong>
                    {t(
                      ' Unimos anúncios, uma página focada e registro dos contatos no CRM. Sua equipe acompanha o caminho da campanha até a conversa e o orçamento.',
                    )}
                  </p>
                  <p className="solution-mobile-summary">
                    {t('Conecte anúncios, landing page e CRM para acompanhar cada oportunidade.')}
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
                className="solution-card solution-commerce"
                role="group"
                aria-label={t('3 de 7: Facilitar a compra')}
              >
                <div className="solution-art" aria-hidden="true">
                  <div className="solution-orbit"></div>
                  <div className="solution-window">
                    <div className="solution-chrome">
                      <i></i>
                      <i></i>
                      <i></i>
                      <span>{t('Sua loja')}</span>
                    </div>
                    <div className="solution-interface">
                      <div className="solution-sidebar">
                        <b>{t('A')}</b>
                        <i></i>
                        <i></i>
                        <i></i>
                      </div>
                      <div className="solution-screen">
                        <span className="solution-ui-label">{t('Jornada do cliente')}</span>
                        <div className="solution-ui-content">
                          <div className="solution-ui-tile">
                            <i></i>
                            <b>{t('Escolher e comprar')}</b>
                            <span></span>
                          </div>
                          <div className="solution-ui-tile">
                            <i></i>
                            <b>{t('Acompanhar o pedido')}</b>
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
                  <span className="solution-art-caption">{t('Facilitar a compra')}</span>
                </div>
                <div className="solution-copy">
                  <div className="solution-meta">
                    <span>{t('03 / Facilitar a compra')}</span>
                    <span>{t('Plano integrado')}</span>
                  </div>
                  <h3>{t('Uma jornada de compra completa.')}</h3>
                  <p className="solution-description">
                    <strong>{t('Vender depende de trocar muitas mensagens?')}</strong>
                    {t(
                      ' Conectamos catálogo, pagamento e acompanhamento do pedido. O cliente encontra as informações para comprar, e sua equipe mantém o atendimento próximo quando ele precisa de ajuda.',
                    )}
                  </p>
                  <p className="solution-mobile-summary">
                    {t('Integre catálogo, pagamentos e pedidos para facilitar a compra.')}
                  </p>
                  <button type="button" className="solution-details" onClick={showDetail}>
                    {t('Ver detalhes ')}
                    <span aria-hidden="true">+</span>
                  </button>
                  <ul>
                    <li>{t('Loja + pagamentos')}</li>
                    <li>{t('Pedidos organizados')}</li>
                    <li>{t('Atendimento conectado')}</li>
                  </ul>
                  <a href="#contato" className="solution-link">
                    {t('Quero facilitar minhas vendas ')}
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>
              <article
                className="solution-card solution-crm"
                role="group"
                aria-label={t('4 de 7: Acompanhar negociações')}
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
                    <span>{t('04 / Acompanhar negociações')}</span>
                    <span>{t('Plano integrado')}</span>
                  </div>
                  <h3>{t('Dê continuidade a cada contato.')}</h3>
                  <p className="solution-description">
                    <strong>{t('Propostas e retornos ficam esquecidos?')}</strong>
                    {t(
                      ' Reunimos histórico, responsáveis e etapas da negociação em um CRM com lembretes e rotinas de acompanhamento. Cada oportunidade ganha um próximo passo claro para a equipe.',
                    )}
                  </p>
                  <p className="solution-mobile-summary">
                    {t('Organize contatos, propostas e retornos com CRM e lembretes.')}
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
                aria-label={t('5 de 7: Agilizar o atendimento')}
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
                    <span>{t('05 / Agilizar o atendimento')}</span>
                    <span>{t('Plano integrado')}</span>
                  </div>
                  <h3>{t('Respostas ágeis. Pessoas por perto.')}</h3>
                  <p className="solution-description">
                    <strong>{t('Perguntas repetidas ocupam o dia da equipe?')}</strong>
                    {t(
                      ' Estruturamos respostas, triagem e registro dos pedidos com automação e IA. Os casos que precisam de atenção seguem para uma pessoa, com o contexto da conversa.',
                    )}
                  </p>
                  <p className="solution-mobile-summary">
                    {t('Automatize perguntas e triagens, com sua equipe por perto.')}
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
                aria-label={t('6 de 7: Simplificar a operação')}
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
                    <span>{t('06 / Simplificar a operação')}</span>
                    <span>{t('Plano integrado')}</span>
                  </div>
                  <h3>{t('Menos retrabalho entre ferramentas.')}</h3>
                  <p className="solution-description">
                    <strong>{t('Sua equipe copia os mesmos dados em vários lugares?')}</strong>
                    {t(
                      ' Mapeamos o processo e conectamos sistemas, formulários e rotinas internas. As informações circulam entre as ferramentas, com uma visão organizada do que precisa ser feito.',
                    )}
                  </p>
                  <p className="solution-mobile-summary">
                    {t('Conecte sistemas e rotinas para reduzir o trabalho repetido.')}
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
                aria-label={t('7 de 7: Decidir com clareza')}
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
                    <span>{t('07 / Decidir com clareza')}</span>
                    <span>{t('Plano integrado')}</span>
                  </div>
                  <h3>{t('Enxergue o caminho dos resultados.')}</h3>
                  <p className="solution-description">
                    <strong>{t('Os números estão espalhados e difíceis de comparar?')}</strong>
                    {t(
                      ' Reunimos dados de campanhas, contatos e vendas em uma visão comum. Indicadores definidos para seu negócio ajudam a identificar gargalos e orientar os próximos ajustes.',
                    )}
                  </p>
                  <p className="solution-mobile-summary">
                    {t('Reúna campanhas, contatos e vendas em indicadores claros.')}
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
