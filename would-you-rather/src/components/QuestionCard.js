import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from './Button';

const Card = styled.div`
  border: 1px solid #efefef;
  border-radius: 5px;
  width: 100%;
  max-width: 540px;
  margin: 2rem auto;

  .title {
    font-weight: 700;
    background-color: #efefef;
    padding: 1rem;
  }

  .details {
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 2fr;
    padding: 1rem;
  }

  .avatar {
    text-align: center;

    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
  }

  .content {
    border-left: 1px solid #efefef;
    padding-left: 1rem;

    p,
    h2 {
      margin: 2rem 0;
    }

    .btn {
      background-color: #fff;
      color: #f50057;
      border: 1px solid #f50057;
      border-radius: 5px;
      padding: 0.5rem 1rem;
      max-width: 285px;
      width: 100%;
      display: block;
      text-align: center;
      font-weight: 600;

      &:hover {
        border: 1px solid #f50057;
        background-color: #f50057;
        color: #fff;
        transition: all 0.5s;
      }
    }

    .form-control {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;

      label {
        margin-left: 0.5rem;
      }
    }
  }
`;

export default function QuestionCard({
  id,
  isVoteCard,
  avatar,
  name,
  optionOne,
  optionTwo,
  handleChange,
  handleSubmit,
  type,
}) {
  return (
    <Card>
      <div className="title">{name} asks:</div>
      <div className="details">
        <div className="avatar">
          <img src={avatar} alt={name} />
        </div>
        <div className="content">
          <div>
            <h2>Would you rather</h2>
            {!isVoteCard ? (
              <div>
                <p>...{optionOne}...</p>

                <Link to={`/questions/${id}?type=${type}`} className="btn">
                  View question
                </Link>
              </div>
            ) : (
              <div>
                <form className="select" onSubmit={handleSubmit}>
                  <div className="form-control">
                    <input
                      type="radio"
                      id="option1"
                      name="question"
                      value={'optionOne'}
                      onChange={handleChange}
                    />
                    <label htmlFor="option1">{optionOne}</label>
                  </div>
                  <div className="form-control">
                    <input
                      type="radio"
                      id="option2"
                      name="question"
                      value={'optionTwo'}
                      onChange={handleChange}
                    />
                    <label htmlFor="option2">{optionTwo}</label>
                  </div>
                  <Button className="btn" content="Submit" />
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
