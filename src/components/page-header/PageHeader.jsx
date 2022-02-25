import React from 'react';

import './page-header.scss';

import background from '../../assets/footer-bg.jpg';

export const PageHeader = (props) => {
  return (
    <div style={{ backgroundImage: `url(${background})` }} className="page-header">
      <h2>{props.children}</h2>
    </div>
  );
};
