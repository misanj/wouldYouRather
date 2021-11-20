import React from 'react';
import styled from 'styled-components';

const Btn = styled.button`
  width: 100%;
  border: none;
  padding: 1rem;
  text-align: center;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
`;

export default function Button({ content, className, onClick, disabled }) {
  return (
    <Btn
      className={className}
      disabled={disabled}
      onClick={onClick}
      style={{ cursor: disabled === true ? 'not-allowed' : 'pointer' }}
    >
      {content}
    </Btn>
  );
}
