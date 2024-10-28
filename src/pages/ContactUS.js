import './ContactUS.css';
import logoRoxo from '../assets/LogoclubRoxo.png';
import nutricionistaFoto from '../assets/tamiFoto.png'
const ContactUS =  () =>
    {
    return (
        <div className="contact-container">
          <header>
            <h1>TIRE SUAS DÚVIDAS</h1>
            <p>
              Te ajudamos a <strong>revelar caminhos para uma vida melhor</strong>
            </p>
          </header>
          <div className="contact-content">
            <div className="profile-section">
              <img
                src={nutricionistaFoto}
                alt="Tamires Oliveira"
                className="profile-pic"
              />
            </div>
            <div className="text-section">
              <h2>Tamires Oliveira | Nutricionista Parceira</h2>
              <p>
                Estou pronta para te ajudar a <strong>interpretar os resultados do seu laudo de mapeamento genético</strong>. Vou te guiar em cada detalhe, explicando como as informações genéticas podem influenciar sua saúde e bem-estar, conte comigo para <strong>transformar esses dados em ações concretas para o seu futuro!</strong>
              </p>
              <div className="button-group">
                <button className="btn primary-btn">Saiba mais</button>
                <button className="btn secondary-btn">Agende sua consulta</button>
              </div>
            </div>
          </div>
          <footer>
            <img
              src={logoRoxo}
              alt="DNA Club logo"
              className="dna-club-logo"
            />
          </footer>
        </div>
      );
}
export default ContactUS;
