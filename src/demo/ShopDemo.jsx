import { useState } from 'react';
import { ShowcaseShell, useDemoCopy } from './ShowcaseShell.jsx';

const products = [
  {
    id: 'luminaria',
    category: 'Luz',
    price: 189,
    icon: '◉',
    pt: [
      'Luminária Aurora',
      'Luz suave para leitura e trabalho.',
      'Cúpula direcionável, acabamento fosco e base compacta para mesa.',
    ],
    en: [
      'Aurora lamp',
      'Soft light for reading and work.',
      'Adjustable shade, matte finish and compact desk base.',
    ],
  },
  {
    id: 'vaso',
    category: 'Casa',
    price: 79,
    icon: '◕',
    pt: [
      'Vaso Terra',
      'Um detalhe de textura para prateleiras.',
      'Cerâmica decorativa de formato orgânico para arranjos secos.',
    ],
    en: [
      'Terra vase',
      'A textured detail for shelves.',
      'Decorative organic ceramic for dried arrangements.',
    ],
  },
  {
    id: 'organizador',
    category: 'Mesa',
    price: 95,
    icon: '▣',
    pt: [
      'Organizador Linear',
      'Uma mesa mais livre para criar.',
      'Compartimentos simples para guardar objetos pequenos à vista.',
    ],
    en: [
      'Linear organizer',
      'A clearer desk for creating.',
      'Simple compartments to keep small essentials at hand.',
    ],
  },
  {
    id: 'arandela',
    category: 'Luz',
    price: 215,
    icon: '✺',
    pt: [
      'Arandela Nuvem',
      'Iluminação de apoio para cantos acolhedores.',
      'Peça decorativa de luz difusa para compor ambientes internos.',
    ],
    en: [
      'Cloud wall light',
      'Accent lighting for cozy corners.',
      'Decorative diffuse light for indoor spaces.',
    ],
  },
  {
    id: 'bandeja',
    category: 'Casa',
    price: 119,
    icon: '▱',
    pt: [
      'Bandeja Íris',
      'Organize objetos com leveza.',
      'Bandeja de apoio para aparadores, mesas ou bancada.',
    ],
    en: [
      'Iris tray',
      'Organize small objects with ease.',
      'Display tray for sideboards, desks or counters.',
    ],
  },
  {
    id: 'suporte',
    category: 'Mesa',
    price: 139,
    icon: '⌁',
    pt: [
      'Suporte Arco',
      'Eleve a tela e libere espaço.',
      'Base de mesa com espaço para teclado e pequenos acessórios.',
    ],
    en: [
      'Arc stand',
      'Raise your screen and free up space.',
      'Desk stand with room for a keyboard and small accessories.',
    ],
  },
];
const copy = {
  pt: {
    title: 'Objetos que dão forma ao seu espaço.',
    lead: 'Explore uma loja fictícia com catálogo, filtros, detalhes, carrinho e compra simulada. Produtos e preços são exemplos.',
    kicker: 'CASA NATIVA / CATÁLOGO',
    search: 'Buscar produtos',
    searchPlaceholder: 'Busque por nome ou detalhe',
    all: 'Todos',
    categories: ['Luz', 'Casa', 'Mesa'],
    results: 'produtos encontrados',
    details: 'Ver detalhes',
    add: 'Adicionar ao carrinho',
    added: 'Adicionado ao carrinho',
    close: 'Fechar detalhes',
    cart: 'Seu carrinho',
    cartEmpty: 'Escolha um produto para começar. Os itens e valores aqui são apenas exemplos.',
    each: 'cada',
    remove: 'Remover',
    subtotal: 'Subtotal',
    total: 'Total demonstrativo',
    checkout: 'Continuar para checkout',
    back: 'Voltar ao catálogo',
    checkoutTitle: 'Finalizar compra simulada',
    checkoutText:
      'Nenhuma compra, cobrança ou entrega real ocorrerá. Não informe dados de cartão ou dados pessoais reais.',
    delivery: 'Forma de entrega de exemplo',
    pickup: 'Retirada fictícia',
    shipment: 'Entrega fictícia',
    finish: 'Confirmar compra simulada',
    success: 'Compra demonstrativa concluída. Nenhum pagamento foi realizado.',
    noResults: 'Nenhum produto corresponde à busca. Tente outro termo ou categoria.',
    priceNote: 'Preço ilustrativo',
    quantity: 'Quantidade',
    resetTitle: 'Carrinho e filtros reiniciados.',
  },
  en: {
    title: 'Objects that shape your space.',
    lead: 'Explore a fictional store with a catalog, filters, details, cart and simulated checkout. Products and prices are examples.',
    kicker: 'CASA NATIVA / CATALOG',
    search: 'Search products',
    searchPlaceholder: 'Search by name or detail',
    all: 'All',
    categories: ['Light', 'Home', 'Desk'],
    results: 'products found',
    details: 'View details',
    add: 'Add to cart',
    added: 'Added to cart',
    close: 'Close details',
    cart: 'Your cart',
    cartEmpty: 'Choose a product to start. Items and prices here are examples only.',
    each: 'each',
    remove: 'Remove',
    subtotal: 'Subtotal',
    total: 'Demo total',
    checkout: 'Continue to checkout',
    back: 'Back to catalog',
    checkoutTitle: 'Complete simulated purchase',
    checkoutText:
      'No real purchase, charge or delivery will occur. Do not enter card details or real personal data.',
    delivery: 'Example delivery method',
    pickup: 'Fictional pickup',
    shipment: 'Fictional delivery',
    finish: 'Confirm simulated purchase',
    success: 'Demo purchase complete. No payment was made.',
    noResults: 'No products match your search. Try another term or category.',
    priceNote: 'Example price',
    quantity: 'Quantity',
    resetTitle: 'Cart and filters reset.',
  },
};
const money = (value) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

export default function ShopDemo() {
  const c = useDemoCopy(copy);
  const language = c === copy.en ? 'en' : 'pt';
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [selected, setSelected] = useState(null);
  const [cart, setCart] = useState({});
  const [checkout, setCheckout] = useState(false);
  const [delivery, setDelivery] = useState('');
  const [complete, setComplete] = useState(false);
  const [notice, setNotice] = useState('');
  const categories = ['Luz', 'Casa', 'Mesa'];
  const filtered = products.filter(
    (product) =>
      (category === 'all' || product.category === category) &&
      `${product[language].join(' ')} ${c.categories[categories.indexOf(product.category)]}`
        .toLocaleLowerCase()
        .includes(query.trim().toLocaleLowerCase()),
  );
  const entries = products.filter((product) => cart[product.id] > 0);
  const count = entries.reduce((sum, product) => sum + cart[product.id], 0);
  const total = entries.reduce((sum, product) => sum + product.price * cart[product.id], 0);
  const adjust = (id, delta) => {
    setComplete(false);
    setNotice('');
    setCart((current) => ({ ...current, [id]: Math.max(0, (current[id] ?? 0) + delta) }));
  };
  const reset = () => {
    setQuery('');
    setCategory('all');
    setSelected(null);
    setCart({});
    setCheckout(false);
    setDelivery('');
    setComplete(false);
    setNotice(c.resetTitle);
  };
  return (
    <ShowcaseShell
      variant="shop"
      brand="CASA NATIVA"
      title={c.title}
      lead={c.lead}
      cardId="servico-e-commerce"
      onReset={reset}
    >
      <div className="showcase-wrap shop-layout">
        <div className="shop-catalog">
          <div className="showcase-section-head">
            <span className="showcase-eyebrow">{c.kicker}</span>
            <h2>
              {c.all} / {products.length} {c.results}
            </h2>
          </div>
          <div className="shop-tools">
            <label>
              {c.search}
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={c.searchPlaceholder}
              />
            </label>
            <div className="shop-filters" role="group" aria-label={c.kicker}>
              <button
                type="button"
                className={category === 'all' ? 'is-active' : ''}
                aria-pressed={category === 'all'}
                onClick={() => setCategory('all')}
              >
                {c.all}
              </button>
              {categories.map((name, index) => (
                <button
                  type="button"
                  key={name}
                  className={category === name ? 'is-active' : ''}
                  aria-pressed={category === name}
                  onClick={() => setCategory(name)}
                >
                  {c.categories[index]}
                </button>
              ))}
            </div>
          </div>
          {filtered.length ? (
            <div className="shop-grid">
              {filtered.map((product) => (
                <article className="shop-product" key={product.id}>
                  <div className={`shop-art shop-art--${product.id}`} aria-hidden="true">
                    <span>{product.icon}</span>
                  </div>
                  <div className="shop-product-copy">
                    <span className="showcase-eyebrow">
                      {c.categories[categories.indexOf(product.category)]}
                    </span>
                    <h3>{product[language][0]}</h3>
                    <p>{product[language][1]}</p>
                    <strong>{money(product.price)}</strong>
                    <small>{c.priceNote}</small>
                    <div className="shop-product-actions">
                      <button
                        type="button"
                        className="showcase-text-button"
                        onClick={() => setSelected(product.id)}
                      >
                        {c.details}
                      </button>
                      <button
                        type="button"
                        className="showcase-button"
                        onClick={() => {
                          adjust(product.id, 1);
                          setNotice(`${product[language][0]} — ${c.added}.`);
                        }}
                      >
                        {c.add} +
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="showcase-empty">{c.noResults}</p>
          )}
          {selected && (
            <section className="shop-detail" aria-labelledby="shop-detail-title">
              <button
                type="button"
                className="showcase-quiet-button"
                onClick={() => setSelected(null)}
              >
                ← {c.close}
              </button>
              {products
                .filter((product) => product.id === selected)
                .map((product) => (
                  <div key={product.id}>
                    <div className={`shop-art shop-art--${product.id}`} aria-hidden="true">
                      <span>{product.icon}</span>
                    </div>
                    <div>
                      <span className="showcase-eyebrow">{c.priceNote}</span>
                      <h2 id="shop-detail-title">{product[language][0]}</h2>
                      <p>{product[language][2]}</p>
                      <strong>{money(product.price)}</strong>
                      <button
                        type="button"
                        className="showcase-button"
                        onClick={() => {
                          adjust(product.id, 1);
                          setNotice(`${product[language][0]} — ${c.added}.`);
                        }}
                      >
                        {c.add} +
                      </button>
                    </div>
                  </div>
                ))}
            </section>
          )}
        </div>
        <aside className="shop-cart" aria-labelledby="shop-cart-title">
          <div className="shop-cart-heading">
            <h2 id="shop-cart-title">{c.cart}</h2>
            <span>{count}</span>
          </div>
          <p role="status" className="shop-notice">
            {notice}
          </p>
          {complete && (
            <p className="showcase-success" role="status">
              {c.success}
            </p>
          )}
          {entries.length ? (
            <>
              <ul>
                {entries.map((product) => (
                  <li key={product.id}>
                    <div>
                      <strong>{product[language][0]}</strong>
                      <small>
                        {money(product.price)} {c.each}
                      </small>
                    </div>
                    <div className="shop-quantity">
                      <button
                        type="button"
                        aria-label={`− ${product[language][0]}`}
                        onClick={() => adjust(product.id, -1)}
                      >
                        −
                      </button>
                      <span aria-label={`${c.quantity}: ${cart[product.id]}`}>
                        {cart[product.id]}
                      </span>
                      <button
                        type="button"
                        aria-label={`+ ${product[language][0]}`}
                        onClick={() => adjust(product.id, 1)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      className="shop-remove"
                      onClick={() => setCart((current) => ({ ...current, [product.id]: 0 }))}
                    >
                      {c.remove}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="shop-total">
                <span>{c.subtotal}</span>
                <strong>{money(total)}</strong>
              </div>
              <p className="shop-total-note">{c.total}</p>
              <button type="button" className="showcase-button" onClick={() => setCheckout(true)}>
                {c.checkout} →
              </button>
            </>
          ) : (
            <p>{c.cartEmpty}</p>
          )}
          {checkout && entries.length > 0 && (
            <form
              className="shop-checkout"
              onSubmit={(event) => {
                event.preventDefault();
                if (!delivery) return;
                setCart({});
                setCheckout(false);
                setDelivery('');
                setComplete(true);
              }}
            >
              <h3>{c.checkoutTitle}</h3>
              <p>{c.checkoutText}</p>
              <label>
                {c.delivery}
                <select
                  required
                  value={delivery}
                  onChange={(event) => setDelivery(event.target.value)}
                >
                  <option value="">{c.all} / —</option>
                  <option value="pickup">{c.pickup}</option>
                  <option value="shipment">{c.shipment}</option>
                </select>
              </label>
              <div className="shop-total">
                <span>{c.total}</span>
                <strong>{money(total)}</strong>
              </div>
              <div className="showcase-actions">
                <button type="submit" className="showcase-button">
                  {c.finish}
                </button>
                <button
                  type="button"
                  className="showcase-quiet-button"
                  onClick={() => setCheckout(false)}
                >
                  {c.back}
                </button>
              </div>
            </form>
          )}
        </aside>
      </div>
    </ShowcaseShell>
  );
}
