import './ContactUS.css';
import logoRoxo from '../assets/LogoclubRoxo.png';
import nutricionistaFoto from '../assets/RafaFoto.jpg'
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
                alt="Rafaela Amaral"
                className="profile-pic"
              />
            </div>
            <div className="text-section">
              <h2>Rafaela Amaral | Nutricionista Parceira</h2>
              <p>
                Estou pronta para te ajudar a <strong>interpretar os resultados do seu laudo de mapeamento genético</strong>. Vou te guiar em cada detalhe, explicando como as informações genéticas podem influenciar sua saúde e bem-estar, conte comigo para <strong>transformar esses dados em ações concretas para o seu futuro!</strong>
              </p>
              <div className="button-group">
                <button className="btn primary-btn"     onClick={() => window.open('https://www.dnaclub.com.br/', '_blank')}>Saiba mais</button>
                <button className="btn secondary-btn"     onClick={() => window.open('https://api.whatsapp.com/send?phone=5555169962840&text=Ol%C3%A1!%20Vim%20pelo%20Portal%20de%20portabilidades.%20Gostaria%20de%20atendimento.', 
                  '_blank')} >Agende sua consulta</button>
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
