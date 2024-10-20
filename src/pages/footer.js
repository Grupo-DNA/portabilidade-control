import React from 'react';
import './footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2>DNA Club</h2>
          <p>Seu parceiro em análise genética, fornecendo resultados precisos e confiáveis para sua jornada de autoconhecimento.</p>
        </div>
        <div className="footer-section links">
          <h2>Links Úteis</h2>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Serviços</a></li>
            <li><a href="#">Contato</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h2>Contatos</h2>
          <p>Email: contato@dnaclub.com</p>
          <p>Telefone: (11) 99999-9999</p>
          <p>Endereço: Rua Genética, 123, São Paulo, SP</p>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2024 DNA Club | Todos os direitos reservados.
      </div>
    </footer>
  );
}

export default Footer;
