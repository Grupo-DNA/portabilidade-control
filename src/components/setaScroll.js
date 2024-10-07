import React from 'react';
import './setaScroll.css'; // Estilos da seta

const ScrollArrow = ({ targetId }) => {
  // Função para rolar até o elemento de destino
  const scrollToTarget = () => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' }); // Rolagem suave
    }
  };

  return (
    <div className="scroll-arrow" onClick={scrollToTarget}>
      ⬇️ {/* A seta que será renderizada */}
    </div>
  );
};

export default ScrollArrow;
