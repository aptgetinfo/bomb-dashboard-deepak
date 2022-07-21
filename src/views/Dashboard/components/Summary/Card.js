import React from 'react';

const Card = ({ children, className }) => {
  return (
    <div
      className={`${className && className}`}
      style={{
        border: '1px solid rgba(114, 140, 223, 1)',
        backgroundColor: 'rgba(35, 40, 75, 0.75)',
        borderRadius: '10px',
        padding: '12px',
      }}
    >
      {children && children}
    </div>
  );
};

export default Card;
