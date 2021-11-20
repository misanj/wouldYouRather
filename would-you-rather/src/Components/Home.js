import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import QuestionCard from './QuestionCard';

const HomeContainer = styled.div`
  border: 1px solid #f50057;
  border-radius: 5px;
  width: 100%;
  max-width: 640px;
  margin: 5rem auto;
  overflow: scroll;

  .tab {
    cursor: pointer;

    &:hover {
      color: #f50057;
    }
  }

  .header {
    display: flex;
    justify-content: center;
    gap: 3rem;
    background-color: #efefef;
    padding: 1rem;
    border-radius: 5px 5px 0 0;
  }

  .question-container {
    overflow: scroll;
    height: 700px;
  }

  .center {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: #f50057;
  }
`;

export default function Home() {
  const [tab, setTab] = useState(0);
  const state = useSelector((state) => state);
  const { users, authedUser, questions } = state;
  const navigate = useNavigate();

  const currentUser = authedUser && users[authedUser];

  useEffect(() => {
    if (!authedUser) {
      navigate('/login');
    }
  }, [authedUser]);

  if (!authedUser) return null;

  const unansweredQuestions = useMemo(() => {
    return Object.values(questions)
      .filter(({ id }) => {
        return !currentUser.answers[id];
      })
      .sort((a, b) => b.timestamp - a.timestamp);
  }, [currentUser]);

  const answeredQuestions = useMemo(() => {
    return Object.values(questions)
      .filter(({ id }) => {
        return currentUser.answers[id];
      })
      .sort((a, b) => b.timestamp - a.timestamp);
  }, [currentUser]);

  return (
    <HomeContainer>
      <div className="header">
        <div
          className="tab"
          onClick={() => setTab(0)}
          style={{ color: tab === 0 && '#F50057' }}
        >
          Un-answered Questions
        </div>

        <div
          className="tab"
          onClick={() => setTab(1)}
          style={{ color: tab === 1 && '#F50057' }}
        >
          Answered Questions
        </div>
      </div>
      <div>
        {tab === 0 && (
          <div className="question-container">
            {unansweredQuestions.map(({ id, optionOne, author }) => {
              const { avatarURL, name } = users[author];
              return (
                <QuestionCard
                  key={id}
                  avatar={avatarURL}
                  id={id}
                  name={name}
                  optionOne={optionOne.text}
                  type="unanswered"
                />
              );
            })}

            {unansweredQuestions.length === 0 && (
              <div className="center">You have answered all questions</div>
            )}
          </div>
        )}

        {tab === 1 && (
          <div className="question-container">
            {answeredQuestions.map(({ id, optionOne, author }) => {
              const { avatarURL, name } = users[author];
              return (
                <QuestionCard
                  key={id}
                  avatar={avatarURL}
                  id={id}
                  name={name}
                  optionOne={optionOne.text}
                  type="answered"
                />
              );
            })}
            {answeredQuestions.length === 0 && (
              <div className="center">Answer some questions</div>
            )}
          </div>
        )}
      </div>
    </HomeContainer>
  );
}
