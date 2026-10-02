import { useState } from 'react';
import { ShowcaseShell, useDemoCopy } from './ShowcaseShell.jsx';

const stages = ['novo', 'conversa', 'proposta', 'concluido'];
const initial = [
  {
    id: 1,
    client: 'Aurora Café',
    contact: 'Lia Exemplo',
    subject: 'Site para apresentar o cardápio',
    stage: 'novo',
    value: 3200,
    notes: ['Contato de exemplo recebido pelo formulário.'],
  },
  {
    id: 2,
    client: 'Ateliê Horizonte',
    contact: 'Caio Exemplo',
    subject: 'Landing page de lançamento',
    stage: 'conversa',
    value: 2500,
    notes: ['Alinhar escopo da página.'],
  },
  {
    id: 3,
    client: 'Jardim Studio',
    contact: 'Nina Exemplo',
    subject: 'Organização de agendamentos',
    stage: 'proposta',
    value: 4800,
    notes: ['Proposta demonstrativa preparada.'],
  },
  {
    id: 4,
    client: 'Casa Lume',
    contact: 'Theo Exemplo',
    subject: 'Loja virtual de objetos',
    stage: 'concluido',
    value: 6100,
    notes: ['Exemplo de registro encerrado.'],
  },
];
const campaignRecord = {
  id: 5,
  client: 'Pessoa Exemplo / Brisa Clima',
  contact: 'Pessoa Exemplo',
  subject: 'Manutenção preventiva — campanha de exemplo',
  stage: 'novo',
  value: 0,
  notes: ['Origem: anúncio → landing page → solicitação simulada.'],
};
const copy = {
  pt: {
    title: 'Cada oportunidade tem um próximo passo.',
    lead: 'Um CRM comercial fictício para visualizar contatos, organizar negociações e acompanhar o histórico. Tudo acontece apenas nesta página.',
    kicker: 'PAINEL / OPORTUNIDADES',
    stages: ['Novo contato', 'Em conversa', 'Proposta', 'Concluído'],
    search: 'Pesquisar oportunidades',
    placeholder: 'Empresa ou necessidade',
    all: 'Todas as etapas',
    create: 'Criar oportunidade de exemplo',
    client: 'Empresa fictícia',
    clientPlaceholder: 'Estúdio Exemplo',
    contact: 'Contato fictício',
    contactPlaceholder: 'Pessoa Exemplo',
    contactLabel: 'Contato',
    subject: 'Necessidade',
    subjectPlaceholder: 'Novo projeto de exemplo',
    value: 'Valor ilustrativo (R$)',
    save: 'Adicionar ao funil',
    cancel: 'Cancelar',
    details: 'Abrir detalhes',
    empty: 'Nenhuma oportunidade nesta etapa com o filtro atual.',
    move: 'Mover para etapa',
    history: 'Observações',
    note: 'Nova observação de exemplo',
    addNote: 'Registrar observação',
    noteEmpty: 'Descreva a próxima ação.',
    close: 'Fechar detalhes',
    resetNotice: 'Dados demonstrativos restaurados.',
    simulation: 'Dados fictícios. Nada é enviado ou armazenado após sair da página.',
    source:
      'O registro de campanha é apenas um exemplo transferido pela demonstração de tráfego pago.',
    campaignNote: 'Origem: anúncio → landing page → solicitação simulada.',
    campaignClient: 'Pessoa Exemplo / Brisa Clima',
    campaignTypes: { residencia: 'Residência', empresa: 'Empresa' },
    campaignNeeds: {
      manutencao: 'Manutenção preventiva',
      falha: 'Avaliar falha no aparelho',
      informacao: 'Entender o serviço',
    },
    seedSubjects: [
      'Site para apresentar o cardápio',
      'Landing page de lançamento',
      'Organização de agendamentos',
      'Loja virtual de objetos',
    ],
    seedNotes: [
      'Contato de exemplo recebido pelo formulário.',
      'Alinhar escopo da página.',
      'Proposta demonstrativa preparada.',
      'Exemplo de registro encerrado.',
    ],
  },
  en: {
    title: 'Every opportunity has a next step.',
    lead: 'A fictional sales CRM for viewing contacts, organizing deals and tracking history. Everything happens on this page only.',
    kicker: 'DASHBOARD / OPPORTUNITIES',
    stages: ['New contact', 'In conversation', 'Proposal', 'Completed'],
    search: 'Search opportunities',
    placeholder: 'Company or need',
    all: 'All stages',
    create: 'Create example opportunity',
    client: 'Fictional company',
    clientPlaceholder: 'Example Studio',
    contact: 'Fictional contact',
    contactPlaceholder: 'Example Person',
    contactLabel: 'Contact',
    subject: 'Need',
    subjectPlaceholder: 'New example project',
    value: 'Example value (BRL)',
    save: 'Add to pipeline',
    cancel: 'Cancel',
    details: 'Open details',
    empty: 'No opportunities in this stage match the filter.',
    move: 'Move to stage',
    history: 'Notes',
    note: 'New example note',
    addNote: 'Save note',
    noteEmpty: 'Describe the next action.',
    close: 'Close details',
    resetNotice: 'Demo data restored.',
    simulation: 'Fictional data. Nothing is sent or stored after leaving the page.',
    source: 'The campaign record is only an example transferred from the paid-traffic demo.',
    campaignNote: 'Source: ad → landing page → simulated enquiry.',
    campaignClient: 'Example Person / Brisa Clima',
    campaignTypes: { residencia: 'Home', empresa: 'Business' },
    campaignNeeds: {
      manutencao: 'Preventive maintenance',
      falha: 'Assess a faulty unit',
      informacao: 'Understand the service',
    },
    seedSubjects: [
      'Website to present the menu',
      'Launch landing page',
      'Appointment organization',
      'Home goods online store',
    ],
    seedNotes: [
      'Example enquiry received through a form.',
      'Define the page scope.',
      'Demo proposal prepared.',
      'Example record closed.',
    ],
  },
};
const fresh = (campaign, type, need) => [
  ...initial.map((item) => ({ ...item, notes: [...item.notes] })),
  ...(campaign
    ? [
        {
          ...campaignRecord,
          subject: `${{ manutencao: 'Manutenção preventiva', falha: 'Avaliar falha no aparelho', informacao: 'Entender o serviço' }[need] ?? 'Manutenção preventiva'} / ${{ residencia: 'Residência', empresa: 'Empresa' }[type] ?? 'Residência'}`,
          notes: [...campaignRecord.notes],
        },
      ]
    : []),
];
const money = (value) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

export default function CrmDemo() {
  const c = useDemoCopy(copy);
  const params = new URLSearchParams(window.location.search);
  const fromCampaign = params.get('origem') === 'campanha';
  const campaignType = ['residencia', 'empresa'].includes(params.get('tipo'))
    ? params.get('tipo')
    : 'residencia';
  const campaignNeed = ['manutencao', 'falha', 'informacao'].includes(params.get('necessidade'))
    ? params.get('necessidade')
    : 'manutencao';
  const [items, setItems] = useState(() => fresh(fromCampaign, campaignType, campaignNeed));
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedId, setSelectedId] = useState(null);
  const [adding, setAdding] = useState(false);
  const [newItem, setNewItem] = useState({ client: '', contact: '', subject: '', value: '' });
  const [note, setNote] = useState('');
  const [notice, setNotice] = useState('');
  const clientOf = (item) => (item.id === 5 && fromCampaign ? c.campaignClient : item.client);
  const subjectOf = (item) =>
    item.id === 5 && fromCampaign
      ? `${c.campaignNeeds[campaignNeed]} / ${c.campaignTypes[campaignType]}`
      : item.id >= 1 && item.id <= 4
        ? c.seedSubjects[item.id - 1]
        : item.subject;
  const selected = items.find((item) => item.id === selectedId);
  const visible = items.filter(
    (item) =>
      (filter === 'all' || filter === item.stage) &&
      `${clientOf(item)} ${item.contact} ${subjectOf(item)}`
        .toLocaleLowerCase()
        .includes(query.trim().toLocaleLowerCase()),
  );
  const reset = () => {
    setItems(fresh(fromCampaign, campaignType, campaignNeed));
    setQuery('');
    setFilter('all');
    setSelectedId(null);
    setAdding(false);
    setNewItem({ client: '', contact: '', subject: '', value: '' });
    setNote('');
    setNotice(c.resetNotice);
  };
  const move = (id, stage) =>
    setItems((current) => current.map((item) => (item.id === id ? { ...item, stage } : item)));
  const create = (event) => {
    event.preventDefault();
    if (!newItem.client.trim() || !newItem.contact.trim() || !newItem.subject.trim()) return;
    const id = Date.now();
    setItems((current) => [
      {
        id,
        client: newItem.client.trim(),
        contact: newItem.contact.trim(),
        subject: newItem.subject.trim(),
        value: Number(newItem.value) || 0,
        stage: 'novo',
        notes: [],
      },
      ...current,
    ]);
    setNewItem({ client: '', contact: '', subject: '', value: '' });
    setAdding(false);
    setSelectedId(id);
  };
  const addNote = (event) => {
    event.preventDefault();
    if (!note.trim() || !selected) return;
    setItems((current) =>
      current.map((item) =>
        item.id === selected.id ? { ...item, notes: [...item.notes, note.trim()] } : item,
      ),
    );
    setNote('');
  };
  return (
    <ShowcaseShell
      variant="crm"
      brand="FLUXO CRM"
      title={c.title}
      lead={c.lead}
      cardId="servico-aplicacoes-crm"
      onReset={reset}
    >
      <div className="showcase-wrap crm-panel">
        <div className="crm-toolbar">
          <div>
            <span className="showcase-eyebrow">{c.kicker}</span>
            <p>{c.simulation}</p>
            {fromCampaign && <p className="crm-source">{c.source}</p>}
          </div>
          <button
            type="button"
            className="showcase-button"
            onClick={() => setAdding((value) => !value)}
            aria-expanded={adding}
          >
            {c.create} +
          </button>
        </div>
        <p role="status" className="showcase-success">
          {notice}
        </p>
        {adding && (
          <form className="crm-create showcase-form" onSubmit={create}>
            <div className="showcase-form-row">
              <label>
                {c.client}
                <input
                  required
                  maxLength={60}
                  value={newItem.client}
                  onChange={(event) =>
                    setNewItem((current) => ({ ...current, client: event.target.value }))
                  }
                  placeholder={c.clientPlaceholder}
                />
              </label>
              <label>
                {c.contact}
                <input
                  required
                  maxLength={60}
                  value={newItem.contact}
                  onChange={(event) =>
                    setNewItem((current) => ({ ...current, contact: event.target.value }))
                  }
                  placeholder={c.contactPlaceholder}
                />
              </label>
              <label>
                {c.subject}
                <input
                  required
                  maxLength={100}
                  value={newItem.subject}
                  onChange={(event) =>
                    setNewItem((current) => ({ ...current, subject: event.target.value }))
                  }
                  placeholder={c.subjectPlaceholder}
                />
              </label>
            </div>
            <label>
              {c.value}
              <input
                type="number"
                min="0"
                max="99999999"
                step="0.01"
                value={newItem.value}
                onChange={(event) =>
                  setNewItem((current) => ({ ...current, value: event.target.value }))
                }
              />
            </label>
            <div className="showcase-actions">
              <button type="submit" className="showcase-button">
                {c.save}
              </button>
              <button
                type="button"
                className="showcase-quiet-button"
                onClick={() => setAdding(false)}
              >
                {c.cancel}
              </button>
            </div>
          </form>
        )}
        <div className="crm-filters">
          <label>
            {c.search}
            <input
              type="search"
              placeholder={c.placeholder}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          <label>
            {c.all}
            <select value={filter} onChange={(event) => setFilter(event.target.value)}>
              <option value="all">{c.all}</option>
              {stages.map((stage, index) => (
                <option key={stage} value={stage}>
                  {c.stages[index]}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="crm-board">
          {stages.map((stage, index) => (
            <section className="crm-column" key={stage} aria-label={c.stages[index]}>
              <div className="crm-column-heading">
                <h2>{c.stages[index]}</h2>
                <span>{visible.filter((item) => item.stage === stage).length}</span>
              </div>
              <div className="crm-column-list">
                {visible
                  .filter((item) => item.stage === stage)
                  .map((item) => (
                    <article className="crm-card" key={item.id}>
                      <span className="showcase-eyebrow">#{String(item.id).slice(-4)}</span>
                      <h3>{clientOf(item)}</h3>
                      <small>
                        {item.id === 5 && fromCampaign ? c.contactPlaceholder : item.contact}
                      </small>
                      <p>{subjectOf(item)}</p>
                      <strong>{item.value ? money(item.value) : '—'}</strong>
                      <div className="crm-card-actions">
                        <button
                          type="button"
                          className="showcase-text-button"
                          onClick={() => setSelectedId(item.id)}
                        >
                          {c.details} ↗
                        </button>
                        <label>
                          <span className="sr-only">
                            {c.move}: {clientOf(item)}
                          </span>
                          <select
                            value={item.stage}
                            onChange={(event) => move(item.id, event.target.value)}
                            aria-label={`${c.move}: ${clientOf(item)}`}
                          >
                            {stages.map((option, i) => (
                              <option key={option} value={option}>
                                {c.stages[i]}
                              </option>
                            ))}
                          </select>
                        </label>
                      </div>
                    </article>
                  ))}
                {!visible.some((item) => item.stage === stage) && (
                  <p className="crm-empty">{c.empty}</p>
                )}
              </div>
            </section>
          ))}
        </div>
        {selected && (
          <section className="crm-details" aria-labelledby="crm-detail-title">
            <div className="crm-details-head">
              <div>
                <span className="showcase-eyebrow">#{selected.id}</span>
                <h2 id="crm-detail-title">{clientOf(selected)}</h2>
                <p>
                  {c.contactLabel}:{' '}
                  {selected.id === 5 && fromCampaign ? c.contactPlaceholder : selected.contact}
                </p>
                <p>{subjectOf(selected)}</p>
              </div>
              <button
                type="button"
                className="showcase-quiet-button"
                onClick={() => setSelectedId(null)}
              >
                {c.close} ×
              </button>
            </div>
            <label>
              {c.move}
              <select
                value={selected.stage}
                onChange={(event) => move(selected.id, event.target.value)}
              >
                {stages.map((stage, index) => (
                  <option key={stage} value={stage}>
                    {c.stages[index]}
                  </option>
                ))}
              </select>
            </label>
            <h3>{c.history}</h3>
            <ul>
              {selected.notes.map((entry, index) => (
                <li key={`${index}-${entry}`}>
                  {selected.id >= 1 && selected.id <= 4 && index === 0
                    ? c.seedNotes[selected.id - 1]
                    : selected.id === 5 && fromCampaign && index === 0
                      ? c.campaignNote
                      : entry}
                </li>
              ))}
            </ul>
            <form onSubmit={addNote}>
              <label>
                {c.note}
                <textarea
                  rows={3}
                  maxLength={300}
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  placeholder={c.noteEmpty}
                />
              </label>
              <button type="submit" className="showcase-button" disabled={!note.trim()}>
                {c.addNote}
              </button>
            </form>
          </section>
        )}
      </div>
    </ShowcaseShell>
  );
}
