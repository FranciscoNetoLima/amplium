import { useEffect, useRef, useState } from 'react';
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
    results: (count) => `${count} ${count === 1 ? 'produto encontrado' : 'produtos encontrados'}`,
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
    clearFilters: 'Limpar busca e filtros',
    priceNote: 'Preço ilustrativo',
    quantity: 'Quantidade',
    resetTitle: 'Carrinho e filtros reiniciados.',
    items: 'itens',
    mobileCart: 'Ir para o carrinho',
    emptyAction: 'Ver todos os produtos',
    orderSummary: 'Resumo da compra simulada',
    deliveryChosen: 'Opção escolhida',
    completedItems: 'Itens confirmados',
  },
  en: {
    title: 'Objects that shape your space.',
    lead: 'Explore a fictional store with a catalog, filters, details, cart and simulated checkout. Products and prices are examples.',
    kicker: 'CASA NATIVA / CATALOG',
    search: 'Search products',
    searchPlaceholder: 'Search by name or detail',
    all: 'All',
    categories: ['Light', 'Home', 'Desk'],
    results: (count) => `${count} ${count === 1 ? 'product found' : 'products found'}`,
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
    clearFilters: 'Clear search and filters',
    priceNote: 'Example price',
    quantity: 'Quantity',
    resetTitle: 'Cart and filters reset.',
    items: 'items',
    mobileCart: 'Go to cart',
    emptyAction: 'Browse all products',
    orderSummary: 'Simulated order summary',
    deliveryChosen: 'Selected option',
    completedItems: 'Confirmed items',
  },
};
const money = (value) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

function ProductArtwork({ id }) {
  const drawings = {
    luminaria: (
      <g>
        <ellipse cx="160" cy="191" rx="78" ry="12" fill="#8b785f" opacity=".15" />
        <path d="M118 79h84l-15 35h-54z" fill="#c5854d" />
        <path d="M126 79c5-26 63-26 68 0z" fill="#e5b878" />
        <path d="M160 114v61" stroke="#6d5946" strokeWidth="7" strokeLinecap="round" />
        <path d="M132 181c0-7 12-13 28-13s28 6 28 13v6h-56z" fill="#75634f" />
        <path d="M137 187h46" stroke="#514537" strokeWidth="4" strokeLinecap="round" />
      </g>
    ),
    vaso: (
      <g>
        <ellipse cx="160" cy="191" rx="68" ry="11" fill="#8b785f" opacity=".15" />
        <path
          d="M142 56h36v27c0 8 8 20 16 32 9 13 13 29 10 48-2 17-20 25-44 25s-42-8-44-25c-3-19 2-35 11-48 8-12 15-24 15-32z"
          fill="#b76c4e"
        />
        <path d="M142 62h36v9h-36z" fill="#82503d" />
        <path
          d="M129 143c13 8 49 9 63-1"
          fill="none"
          stroke="#d89571"
          strokeWidth="5"
          opacity=".8"
        />
        <path
          d="M153 54c-5-15-17-20-25-18m35 18c5-17 17-21 26-20"
          fill="none"
          stroke="#73815e"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </g>
    ),
    organizador: (
      <g>
        <ellipse cx="160" cy="184" rx="93" ry="15" fill="#8b785f" opacity=".16" />
        <path d="m68 121 90-41 94 37-91 48z" fill="#c9a775" />
        <path d="m68 121 93 44v27l-93-46z" fill="#9e7850" />
        <path d="m161 165 91-48v27l-91 48z" fill="#806044" />
        <path d="m117 99 91 37m-46-58v85m-46-63v26" fill="none" stroke="#806044" strokeWidth="6" />
        <path d="m84 128 69 33m28-28 49-26" stroke="#e2c89d" strokeWidth="3" opacity=".8" />
      </g>
    ),
    arandela: (
      <g>
        <ellipse cx="160" cy="189" rx="70" ry="12" fill="#8b785f" opacity=".15" />
        <path d="M160 43v95" stroke="#6f6051" strokeWidth="9" strokeLinecap="round" />
        <circle cx="160" cy="59" r="22" fill="#a9845f" />
        <path d="M160 89c-30 0-54 20-58 53h116c-4-33-28-53-58-53" fill="#d2a96d" />
        <path d="M111 143h98" stroke="#a67a4b" strokeWidth="6" strokeLinecap="round" />
        <path d="M134 150h52l-8 26h-36z" fill="#f4dda6" opacity=".75" />
      </g>
    ),
    bandeja: (
      <g>
        <ellipse cx="160" cy="173" rx="100" ry="27" fill="#789084" />
        <ellipse cx="160" cy="164" rx="91" ry="19" fill="#d4a873" />
        <ellipse cx="160" cy="161" rx="72" ry="10" fill="#efe0c6" />
        <path
          d="M71 163c0 23 40 42 89 42s89-19 89-42"
          fill="none"
          stroke="#9e754b"
          strokeWidth="7"
        />
        <path
          d="M99 140c0-11 10-19 22-19h78c12 0 22 8 22 19"
          fill="none"
          stroke="#9e754b"
          strokeWidth="6"
        />
      </g>
    ),
    suporte: (
      <g>
        <ellipse cx="160" cy="190" rx="93" ry="13" fill="#8b785f" opacity=".15" />
        <path d="M75 77h170v11H75z" fill="#6d6557" />
        <path d="m105 88 25 70h-15L91 88zm110 0-24 70h15l25-70z" fill="#9b7957" />
        <path d="M98 159h124v11H98z" fill="#c9a16e" />
        <path d="M123 170h75" stroke="#826646" strokeWidth="5" strokeLinecap="round" />
        <path d="M88 73h145" stroke="#e5d3b6" strokeWidth="3" opacity=".9" />
      </g>
    ),
  };
  return (
    <svg viewBox="0 0 320 220" aria-hidden="true" focusable="false">
      <circle cx="160" cy="111" r="82" fill="#ffffff" opacity=".34" />
      {drawings[id]}
    </svg>
  );
}

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
  const [completedOrder, setCompletedOrder] = useState(null);
  const [notice, setNotice] = useState('');
  const detailsDialog = useRef(null);
  const cartRef = useRef(null);
  const cartTitleRef = useRef(null);
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
    setCompletedOrder(null);
    setNotice('');
    setCart((current) => ({ ...current, [id]: Math.max(0, (current[id] ?? 0) + delta) }));
  };
  useEffect(() => {
    if (selected && detailsDialog.current && !detailsDialog.current.open) {
      detailsDialog.current.showModal();
    }
  }, [selected]);
  const closeDetails = () => {
    detailsDialog.current?.close();
    setSelected(null);
  };
  const addProduct = (product) => {
    adjust(product.id, 1);
    setNotice(`${product[language][0]} — ${c.added}.`);
  };
  const clearFilters = () => {
    setQuery('');
    setCategory('all');
  };
  const focusCart = () => {
    cartRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    cartTitleRef.current?.focus({ preventScroll: true });
  };
  const reset = () => {
    setQuery('');
    setCategory('all');
    detailsDialog.current?.close();
    setSelected(null);
    setCart({});
    setCheckout(false);
    setDelivery('');
    setComplete(false);
    setCompletedOrder(null);
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
              {c.all} / {c.results(filtered.length)}
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
          <button type="button" className="shop-mobile-cart-trigger" onClick={focusCart}>
            <span>
              {c.mobileCart} · {count} {c.items}
            </span>
            <strong>{money(total)} ↓</strong>
          </button>
          {filtered.length ? (
            <div className="shop-grid">
              {filtered.map((product) => (
                <article className="shop-product" key={product.id}>
                  <div className={`shop-art shop-art--${product.id}`}>
                    <ProductArtwork id={product.id} />
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
                        onClick={() => addProduct(product)}
                      >
                        {c.add} +
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="shop-no-results" role="status">
              <p>{c.noResults}</p>
              <button type="button" className="showcase-quiet-button" onClick={clearFilters}>
                {c.clearFilters}
              </button>
            </div>
          )}
          {selected && (
            <dialog
              className="shop-detail"
              ref={detailsDialog}
              aria-labelledby="shop-detail-title"
              onClose={() => setSelected(null)}
              onClick={(event) => {
                if (event.target === event.currentTarget) closeDetails();
              }}
            >
              <div className="shop-detail-heading">
                <span className="showcase-eyebrow">{c.details}</span>
                <button
                  type="button"
                  className="shop-dialog-close"
                  onClick={closeDetails}
                  aria-label={c.close}
                >
                  ×
                </button>
              </div>
              {products
                .filter((product) => product.id === selected)
                .map((product) => (
                  <div key={product.id}>
                    <div className={`shop-art shop-art--${product.id}`}>
                      <ProductArtwork id={product.id} />
                    </div>
                    <div>
                      <span className="showcase-eyebrow">{c.priceNote}</span>
                      <h2 id="shop-detail-title">{product[language][0]}</h2>
                      <p className="shop-detail-summary">{product[language][1]}</p>
                      <p>{product[language][2]}</p>
                      <strong>{money(product.price)}</strong>
                      <button
                        type="button"
                        className="showcase-button"
                        onClick={() => {
                          addProduct(product);
                          closeDetails();
                        }}
                      >
                        {c.add} +
                      </button>
                    </div>
                  </div>
                ))}
            </dialog>
          )}
        </div>
        <aside className="shop-cart" aria-labelledby="shop-cart-title" ref={cartRef}>
          <div className="shop-cart-heading">
            <h2 id="shop-cart-title" ref={cartTitleRef} tabIndex={-1}>
              {c.cart}
            </h2>
            <span aria-label={`${count} ${c.items}`}>{count}</span>
          </div>
          <p role="status" className="shop-notice">
            {notice}
          </p>
          {complete && (
            <section className="shop-order-confirmation" role="status" aria-live="polite">
              <span className="showcase-eyebrow">{c.success}</span>
              <h3>{c.orderSummary}</h3>
              <p>{c.completedItems}</p>
              <ul>
                {completedOrder?.items.map(({ id, quantity }) => {
                  const product = products.find((entry) => entry.id === id);
                  return (
                    <li key={id}>
                      <span>
                        {product?.[language][0]} × {quantity}
                      </span>
                      <strong>{money((product?.price ?? 0) * quantity)}</strong>
                    </li>
                  );
                })}
              </ul>
              <p>
                {c.deliveryChosen}: {completedOrder?.delivery === 'pickup' ? c.pickup : c.shipment}
              </p>
              <div className="shop-total">
                <span>{c.total}</span>
                <strong>{money(completedOrder?.total ?? 0)}</strong>
              </div>
            </section>
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
                      onClick={() => {
                        setCart((current) => ({ ...current, [product.id]: 0 }));
                        setNotice(`${product[language][0]} — ${c.remove.toLocaleLowerCase()}.`);
                      }}
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
            <div className="shop-cart-empty">
              <p>{c.cartEmpty}</p>
              <button
                type="button"
                className="showcase-text-button"
                onClick={() => {
                  clearFilters();
                  document.querySelector('.shop-catalog')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {c.emptyAction} ↗
              </button>
            </div>
          )}
          {checkout && entries.length > 0 && (
            <form
              className="shop-checkout"
              onSubmit={(event) => {
                event.preventDefault();
                if (!delivery) return;
                setCompletedOrder({
                  items: entries.map((product) => ({ id: product.id, quantity: cart[product.id] })),
                  total,
                  delivery,
                });
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
