import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  border: 1px solid #f50057;
  border-radius: 8px;
  max-width: 300px;
  width: 100%;
  padding: 0.5rem 1rem;
  background-color: #efefef;
  color: #000;
  position: relative;
  margin-bottom: 2rem;

  p {
    font-weight: 600;
    margin: 2rem 0;
  }
`;

export default function VoteResultCard({
  vote,
  percentage,
  option,
  voteCount,
  totalVotes,
}) {
  return (
    <Card style={{ backgroundColor: vote && '#fff' }}>
      <h3>{option}</h3>
      <p>
        {voteCount} out of {totalVotes} votes
      </p>
      <p>{percentage}%</p>
    </Card>
  );
}
