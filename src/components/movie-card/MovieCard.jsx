import './movie-card.scss';

import React from 'react';
import { category as cate } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';
import Button from '../button/Button';
import { Link } from 'react-router-dom';

const MovieCard = ({ item, category }) => {
  const link = `/${cate[category]}/${item.id}`;
  const background =
    item.poster_path || item.backdrop_path
      ? apiConfig.w500Image(item.poster_path || item.backdrop_path)
      : 'https://image.kkday.com/v2/image/get/s1.kkday.com/campaign_1345/20210113072959_BYrad/jpg';

  return (
    <Link to={link}>
      <div className="movie-card" style={{ backgroundImage: `url(${background})` }}>
        <Button>
          <i className="bx bx-play">&#9658;</i>
        </Button>
      </div>
      <h3>{item.title || item.name}</h3>
    </Link>
  );
};

export default MovieCard;
