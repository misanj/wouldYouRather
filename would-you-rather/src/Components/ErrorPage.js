import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ErrorImg from '../assets/404.svg';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #f50057;

  .img-container {
    text-align: center;
    margin-bottom: 2rem;
    img {
      width: 180px;
      height: 180px;
    }
  }

  .content {
    text-align: center;
    h2 {
      margin: 2rem 0;
    }
  }
`;

export default function ErrorPage() {
  return (
    <ErrorContainer>
      <div className="img-container">
        <img src={ErrorImg} alt="404-img" />
      </div>
      <div className="content">
        <h2>Ooops. Page you are looking for is lost in space</h2>
        <Link to="/" className="ghost-btn">
          Go Home
        </Link>
      </div>
    </ErrorContainer>
  );
}
