import './header.scss';

import React, { useRef, useEffect, useState } from 'react';

import logo from '../../assets/tmovie.png';
import { Link, useLocation } from 'react-router-dom';
import Input from '../input/Input';

const Header = () => {
  const headerNav = [
    {
      display: 'Home',
      path: '/',
    },
    {
      display: 'Movie',
      path: '/movie',
    },
    {
      display: 'TV series',
      path: '/tv',
    },
  ];

  const headerRef = useRef(null);
  const pathname = useLocation();
  const activeIdx = headerNav.findIndex((el) => el.path === pathname);

  useEffect(() => {
    function shrinkHeaderWhenScrolling() {
      if (document.documentElement.scrollTop > 100) {
        headerRef.current.classList.add('shrink');
      } else {
        headerRef.current.classList.remove('shrink');
      }
    }

    window.addEventListener('scroll', shrinkHeaderWhenScrolling);
    return () => {
      window.removeEventListener('scroll', shrinkHeaderWhenScrolling);
    };
  }, []);

  return (
    <div ref={headerRef} className="header">
      <div className="header__wrap container">
        <div className="logo">
          <img src={logo} alt="logo" />
          <Link to="/">tMovies</Link>
        </div>

        <Input placeholder="Search..."></Input>

        <ul className="header__nav">
          {headerNav.map((el, i) => {
            return (
              <li key={i} className={`${i === activeIdx ? 'active' : ''}`}>
                <>
                  <Link to={el.path}>{el.display}</Link>
                  <div className="nav-trans"></div>
                </>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Header;
