import './input.scss';

import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import debounce from 'lodash.debounce';

export default function Input({ type, placeholder }) {
  const [showClearBtn, setShowClearBtn] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const history = useHistory();
  const location = useLocation();

  function handleInputValue(e) {
    history.push(`/search/${inputValue}`);
    if (inputValue.length > 0) setShowClearBtn(true);
    else setShowClearBtn(false);
  }

  useEffect(() => {
    handleInputValue();
    if (inputValue.length === 0) history.push('/');
    // if (location.pathname.indexOf('search') === -1) setInputValue('');
    return () => {};
  }, [inputValue.length]);

  function handleClearInputValue() {
    setInputValue('');
    document.querySelector('.search input').focus();
  }

  return (
    <div className="search">
      <i className="search__icon fa-solid fa-magnifying-glass"></i>
      <input
        type={type}
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      {showClearBtn && (
        <i className="search__remove-value fa-solid fa-xmark" onClick={handleClearInputValue}></i>
      )}
    </div>
  );
}
