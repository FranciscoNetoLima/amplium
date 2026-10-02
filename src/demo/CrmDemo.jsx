import { useEffect, useRef, useState } from 'react';
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
    metrics: ['Oportunidades ativas', 'Em negociação', 'Valor em aberto', 'Concluídas'],
    resultCount: (count) => `${count} ${count === 1 ? 'resultado' : 'resultados'}`,
    noResults: 'Nenhuma oportunidade encontrada. Ajuste os filtros ou a busca.',
    createAction: 'Nova oportunidade',
    edit: 'Editar oportunidade',
    update: 'Salvar alterações',
    created: 'Oportunidade adicionada ao funil.',
    updated: 'Oportunidade atualizada.',
    moved: 'Etapa da oportunidade atualizada.',
    noteSaved: 'Observação registrada no histórico.',
    pipeline: 'Funil comercial',
    openValue: 'Valor potencial das etapas em aberto',
    stageOf: 'Etapa atual',
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
    metrics: ['Active opportunities', 'In negotiation', 'Open pipeline value', 'Completed'],
    resultCount: (count) => `${count} ${count === 1 ? 'result' : 'results'}`,
    noResults: 'No opportunities found. Adjust your search or filters.',
    createAction: 'New opportunity',
    edit: 'Edit opportunity',
    update: 'Save changes',
    created: 'Opportunity added to the pipeline.',
    updated: 'Opportunity updated.',
    moved: 'Opportunity stage updated.',
    noteSaved: 'Note added to the history.',
    pipeline: 'Sales pipeline',
    openValue: 'Potential value across open stages',
    stageOf: 'Current stage',
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
  const [editingId, setEditingId] = useState(null);
  const [editedIds, setEditedIds] = useState(() => new Set());
  const [newItem, setNewItem] = useState({ client: '', contact: '', subject: '', value: '' });
  const [note, setNote] = useState('');
  const [notice, setNotice] = useState('');
  const detailDialog = useRef(null);
  const clientOf = (item) =>
    item.id === 5 && fromCampaign && !editedIds.has(item.id) ? c.campaignClient : item.client;
  const contactOf = (item) =>
    item.id === 5 && fromCampaign && !editedIds.has(item.id) ? c.contactPlaceholder : item.contact;
  const subjectOf = (item) =>
    item.id === 5 && fromCampaign && !editedIds.has(item.id)
      ? `${c.campaignNeeds[campaignNeed]} / ${c.campaignTypes[campaignType]}`
      : item.id >= 1 && item.id <= 4 && !editedIds.has(item.id)
        ? c.seedSubjects[item.id - 1]
        : item.subject;
  const selected = items.find((item) => item.id === selectedId);
  const metrics = [
    items.filter((item) => item.stage !== 'concluido').length,
    items.filter((item) => ['conversa', 'proposta'].includes(item.stage)).length,
    items
      .filter((item) => item.stage !== 'concluido')
      .reduce((total, item) => total + (Number(item.value) || 0), 0),
    items.filter((item) => item.stage === 'concluido').length,
  ];
  const visible = items.filter(
    (item) =>
      (filter === 'all' || filter === item.stage) &&
      `${clientOf(item)} ${contactOf(item)} ${subjectOf(item)}`
        .toLocaleLowerCase()
        .includes(query.trim().toLocaleLowerCase()),
  );
  const reset = () => {
    setItems(fresh(fromCampaign, campaignType, campaignNeed));
    setQuery('');
    setFilter('all');
    setSelectedId(null);
    setAdding(false);
    setEditingId(null);
    setEditedIds(new Set());
    setNewItem({ client: '', contact: '', subject: '', value: '' });
    setNote('');
    setNotice(c.resetNotice);
  };
  const move = (id, stage) => {
    const current = items.find((item) => item.id === id);
    if (!current || current.stage === stage) return;
    setItems((list) => list.map((item) => (item.id === id ? { ...item, stage } : item)));
    setNotice(c.moved);
  };
  useEffect(() => {
    if (selected && detailDialog.current && !detailDialog.current.open) {
      detailDialog.current.showModal();
    }
  }, [selected]);
  const closeDetails = () => {
    detailDialog.current?.close();
    setSelectedId(null);
    setNote('');
  };
  const startEdit = () => {
    if (!selected) return;
    setNewItem({
      client: clientOf(selected),
      contact: contactOf(selected),
      subject: subjectOf(selected),
      value: selected.value ? String(selected.value) : '',
    });
    setEditingId(selected.id);
    setAdding(true);
    closeDetails();
  };
  const create = (event) => {
    event.preventDefault();
    if (!newItem.client.trim() || !newItem.contact.trim() || !newItem.subject.trim()) return;
    const id = editingId ?? Date.now();
    if (editingId !== null) {
      setItems((current) =>
        current.map((item) =>
          item.id === editingId
            ? {
                ...item,
                client: newItem.client.trim(),
                contact: newItem.contact.trim(),
                subject: newItem.subject.trim(),
                value: Number(newItem.value) || 0,
              }
            : item,
        ),
      );
      setEditedIds((current) => new Set(current).add(editingId));
      setNotice(c.updated);
      setSelectedId(editingId);
      setEditingId(null);
      setAdding(false);
      setNewItem({ client: '', contact: '', subject: '', value: '' });
      return;
    }
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
    setNotice(c.created);
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
    setNotice(c.noteSaved);
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
            onClick={() => {
              setEditingId(null);
              setNewItem({ client: '', contact: '', subject: '', value: '' });
              setAdding((value) => !value);
            }}
            aria-expanded={adding}
          >
            {c.createAction} +
          </button>
        </div>
        <p role="status" className="showcase-success">
          {notice}
        </p>
        <section className="crm-metrics" aria-label={c.pipeline}>
          {metrics.map((metric, index) => (
            <article
              className={`crm-metric${index === 2 ? ' crm-metric--value' : ''}`}
              key={metric}
            >
              <span>{c.metrics[index]}</span>
              <strong>{index === 2 ? money(metric) : metric}</strong>
              {index === 2 && <small>{c.openValue}</small>}
            </article>
          ))}
        </section>
        {adding && (
          <form className="crm-create showcase-form" onSubmit={create}>
            <div className="crm-form-heading">
              <div>
                <span className="showcase-eyebrow">{c.kicker}</span>
                <h2>{editingId !== null ? c.edit : c.create}</h2>
              </div>
            </div>
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
                {editingId !== null ? c.update : c.save}
              </button>
              <button
                type="button"
                className="showcase-quiet-button"
                onClick={() => {
                  setAdding(false);
                  setEditingId(null);
                  setNewItem({ client: '', contact: '', subject: '', value: '' });
                }}
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
        <div className="crm-board-summary">
          <h2>{c.pipeline}</h2>
          <span>{c.resultCount(visible.length)}</span>
        </div>
        {visible.length === 0 && (
          <p className="crm-no-results" role="status">
            {c.noResults}
          </p>
        )}
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
                      <div className="crm-card-topline">
                        <span className="showcase-eyebrow">#{String(item.id).slice(-4)}</span>
                        <span className={`crm-stage-pill crm-stage-pill--${item.stage}`}>
                          {c.stages[stages.indexOf(item.stage)]}
                        </span>
                      </div>
                      <h3>{clientOf(item)}</h3>
                      <small>{contactOf(item)}</small>
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
                {visible.length > 0 && !visible.some((item) => item.stage === stage) && (
                  <p className="crm-empty">{c.empty}</p>
                )}
              </div>
            </section>
          ))}
        </div>
        {selected && (
          <dialog
            className="crm-details"
            ref={detailDialog}
            aria-labelledby="crm-detail-title"
            onClose={() => {
              setSelectedId(null);
              setNote('');
            }}
            onClick={(event) => {
              if (event.target === event.currentTarget) closeDetails();
            }}
          >
            <div className="crm-details-kicker">
              <span className="showcase-eyebrow">{c.details}</span>
              <button
                type="button"
                className="crm-dialog-close"
                onClick={closeDetails}
                aria-label={c.close}
              >
                ×
              </button>
            </div>
            <div className="crm-details-head">
              <div>
                <span className="showcase-eyebrow">#{selected.id}</span>
                <h2 id="crm-detail-title">{clientOf(selected)}</h2>
                <p>
                  {c.contactLabel}: {contactOf(selected)}
                </p>
                <p>{subjectOf(selected)}</p>
              </div>
              <button
                type="button"
                className="showcase-quiet-button crm-edit-action"
                onClick={startEdit}
              >
                {c.edit}
              </button>
            </div>
            <label>
              {c.stageOf}
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
          </dialog>
        )}
      </div>
    </ShowcaseShell>
  );
}
