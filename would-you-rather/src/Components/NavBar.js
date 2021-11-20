import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../actions/authedUser';

const NavContainer = styled.nav`
  padding: 0.5rem 0;
  ul {
    display: flex;
    gap: 2rem;
    align-items: center;
    justify-content: center;

    li {
      &:nth-child(3) {
        margin-right: 3rem;
      }
    }

    a,
    li {
      color: #000;
    }

    a {
      display: block;
    }

    a:hover {
      color: #f50057;
    }

    .logout {
      cursor: pointer;

      &:hover {
        color: #f50057;
        font-weight: 600;
      }
    }

    .active {
      background-color: #f50057;
      padding: 1rem;
      border-radius: 8px;
      color: #fff;

      &:hover {
        color: #fff;
      }
    }
  }
`;

export default function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, authedUser } = useSelector((state) => state);
  const currentUser = authedUser && users[authedUser];

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <NavContainer>
      <ul>
        <li>
          <NavLink to="/" activeClassName="active" exact>
            Home
          </NavLink>
        </li>

        <li>
          <NavLink to="/add" activeClassName="active">
            New Questions
          </NavLink>
        </li>

        <li>
          <NavLink to="/leaderboard" activeClassName="active">
            Leaderboard
          </NavLink>
        </li>

        {currentUser && <p> Hello, {currentUser.name}</p>}

        <li>
          {!currentUser ? (
            <NavLink to="/login" activeClassName="active">
              Login
            </NavLink>
          ) : (
            <div className="logout" onClick={handleLogout}>
              Logout
            </div>
          )}
        </li>
      </ul>
    </NavContainer>
  );
}
