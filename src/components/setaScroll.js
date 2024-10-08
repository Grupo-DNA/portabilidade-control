import React from 'react';
import './setaScroll.css'; // Estilos da seta
import { FaArrowDown } from "react-icons/fa";

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
      <FaArrowDown />
    </div>
  );
};

export default ScrollArrow;
