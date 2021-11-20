import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from './Button';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handlePostQuestion } from '../actions/shared';

const QuestionContainer = styled.div`
  max-width: 420px;
  width: 100%;
  margin: 5rem auto;
  border: 2px solid #f50057;
  border-radius: 8px;

  .header {
    border-bottom: 2px solid #f50057;
    padding: 1rem;

    h2 {
      text-align: center;
    }
  }

  .content {
    padding: 1rem;

    p,
    h2 {
      margin: 2rem 0;
      text-align: center;
    }

    input {
      width: 100%;
      border-radius: 5px;
      padding: 1rem;
      border: 1px solid #f50057;

      &:focus {
        outline: none;
        border: 2px solid #f50057;
      }
    }

    .btn {
      background-color: #f50057;
      color: #fff;
      margin: 2rem 0 1rem;
    }

    .divider {
      display: grid;
      align-items: center;
      grid-template-columns: 2fr 1fr 2fr;
    }
  }
`;

export default function NewQuestion() {
  const [optionOneText, setOptionOneText] = useState('');
  const [optionTwoText, setOptionTwoText] = useState('');
  const { authedUser } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const question = {
      optionOneText,
      optionTwoText,
      author: authedUser,
    };
    dispatch(handlePostQuestion(question));
    navigate('/');
  };

  useEffect(() => {
    if (!authedUser) {
      navigate('/login');
    }
  }, [authedUser]);

  if (!authedUser) return null;

  return (
    <QuestionContainer>
      <div className="header">
        <h2>Create New Question</h2>
      </div>
      <div className="content">
        <p>Complete this question:</p>
        <h2>Would you rather...</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Option One"
            value={optionOneText}
            onChange={({ target }) => setOptionOneText(target.value)}
          />
          <div className="divider">
            <hr />
            <p>OR</p>
            <hr />
          </div>
          <input
            type="text"
            placeholder="Enter Option Two"
            value={optionTwoText}
            onChange={({ target }) => setOptionTwoText(target.value)}
          />
          <Button content="Create" className="btn" />
        </form>
      </div>
    </QuestionContainer>
  );
}
