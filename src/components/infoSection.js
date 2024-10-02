import React from 'react';
import './infoSection.css'
import iconeClub from '../assets/Club.BRANCO.png';
const InfoSection = () => {
  return (
    <div className="info-section">

      <div className="text">
        <p> <b>Preencha o formulário</b> e faça o <b> upload dos seus dados genéticos</b>.
        <br></br>Em<b> poucos minutos</b>, você receberá seu<b> laudo DNA Club com informações exclusivas para sua jornada genética!</b> </p>
      </div>
      <div className='icon'>
        <img src={iconeClub}></img>
      </div>
    </div>
  );
};

export default InfoSection;
