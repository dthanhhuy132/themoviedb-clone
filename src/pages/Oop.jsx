import './oop.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/button/Button';

export default function Oop() {
  return (
    <div className="oop-page">
      <img
        src="https://colorlib.com/wp/wp-content/uploads/sites/2/404-error-template-3.png"
        alt="404"
      ></img>

      <Link to="/">
        <Button>Home Page</Button>
      </Link>
    </div>
  );
}
