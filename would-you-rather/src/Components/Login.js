import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';
import { useNavigate } from 'react-router-dom';
import QuestionSVG from '../assets/login.svg';
import Button from './Button';

const LoginContainer = styled.div`
  max-width: 640px;
  width: 100%;
  margin: 5rem auto;
  border: 1px solid #f50057;
  padding: 2rem 1rem;
  border-radius: 5px;

  p,
  h1,
  h2 {
    margin: 2rem 0;
    text-align: center;
  }

  .login-btn {
    background-color: #f50057;
    color: #fff;
  }

  select {
    width: 100%;
    padding: 1rem;
    border: 1px solid #f50057;
    border-radius: 8px;
    margin-bottom: 1rem;
  }

  .img-container {
    text-align: center;
    margin-bottom: 2rem;
    img {
      width: 180px;
      height: 180px;
    }
  }
`;

export default function Login() {
  const [selectedUser, setSelectedUser] = useState(null);

  const navigate = useNavigate();
  const { loadingBar, users } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(setAuthedUser(selectedUser));
    navigate('/');
  };

  return (
    <LoginContainer>
      <h1>Welcome to this App!</h1>
      <p>Please, select a user to continue</p>

      <h2>Sign in</h2>
      <div className="img-container">
        <img src={QuestionSVG} alt="question" />
      </div>

      {loadingBar && loadingBar.default ? (
        'Loading users...'
      ) : (
        <div>
          <select onChange={({ target }) => setSelectedUser(target.value)}>
            <option value="">Choose user</option>
            {Object.values(users).map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>

          <Button
            content="Sign in"
            className="login-btn"
            onClick={handleLogin}
          />
        </div>
      )}
    </LoginContainer>
  );
}
