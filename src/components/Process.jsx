import { t } from '../i18n.js';
const steps = ['Entendemos sua necessidade', 'Definimos a proposta', 'Desenvolvemos e entregamos'];
export default function Process() {
  return (
    <div className="compact-process" id="metodo" aria-labelledby="process-heading">
      <h3 id="process-heading">{t('Como trabalhamos')}</h3>
      <ol>
        {steps.map((step, index) => (
          <li key={step}>
            <span aria-hidden="true">0{index + 1}</span>
            {t(step)}
          </li>
        ))}
      </ol>
    </div>
  );
}
