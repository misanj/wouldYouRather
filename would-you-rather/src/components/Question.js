import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import VoteResultCard from './VoteResultCard';
import QuestionCard from './QuestionCard';
import { saveQuestionAnswer } from '../actions/users';
import { handleQuestionSave } from '../actions/shared';

const Container = styled.div`
  max-width: 580px;
  margin: 5rem auto;
  border: 2px solid #efefef;
  border-radius: 8px;

  h1 {
    margin: 0;
    border-bottom: 2px solid #efefef;
    padding: 1rem;
  }

  .result {
    padding: 1rem;
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 1rem;

    .avatar {
      align-self: center;
      justify-self: center;
      img {
        height: 150px;
        width: 150px;
        border-radius: 50%;
      }
    }
    .details {
      border-left: 2px solid #efefef;
      padding: 1rem;
    }
  }
`;

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const percentage = (noOfVotes, totalVotes) => {
  const result = (noOfVotes / totalVotes) * 100;
  return Math.round(result * 100) / 100;
};

export default function Question() {
  const [option, setOption] = useState('');
  const { questionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const query = useQuery();

  const state = useSelector((state) => state);
  const { users, authedUser, questions } = state;

  const currentUser = authedUser && users[authedUser];

  useEffect(() => {
    if (!authedUser) {
      navigate('/login');
    }
  }, [authedUser]);

  if (!authedUser) return null;

  const type = query.get('type');
  const question = questions[questionId];

  const { optionOne, optionTwo, author } = question;
  const { avatarURL, name } = users[author];
  const totalVotes = optionOne.votes.length + optionTwo.votes.length;

  const handleSubmit = (e) => {
    e.preventDefault();

    const answerPayload = {
      authedUser,
      qid: questionId,
      answer: option,
    };

    dispatch(handleQuestionSave(answerPayload));
    navigate(`/questions/${questionId}?type=answered`);
  };

  if (type === 'unanswered') {
    return (
      <QuestionCard
        avatar={avatarURL}
        id={questionId}
        name={name}
        optionOne={optionOne.text}
        optionTwo={optionTwo.text}
        isVoteCard={true}
        handleChange={({ target }) => setOption(target.value)}
        handleSubmit={handleSubmit}
      />
    );
  }

  return (
    <div>
      {type === 'answered' && (
        <Container>
          <div>
            <h1>Asked by {name}</h1>
            <div className="result">
              <div className="avatar">
                <img src={avatarURL} alt={author} />
              </div>

              <div className="details">
                {[optionOne, optionTwo].map(({ votes, text }) => {
                  const voteCount = votes.length;
                  return (
                    <VoteResultCard
                      key={text}
                      option={text}
                      percentage={percentage(voteCount, totalVotes)}
                      vote={votes.includes(currentUser.id)}
                      voteCount={voteCount}
                      totalVotes={totalVotes}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      )}
    </div>
  );
}
