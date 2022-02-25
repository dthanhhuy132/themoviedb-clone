import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import { OutlineButton } from '../components/button/Button';
import HeroSlide from '../components/heroSlide/HeroSlide';
import MovieList from '../components/movie-list/MovieList';

import { category, movieType, tvType } from '../api/tmdbApi';

const Home = () => {
  return (
    <>
      <HeroSlide />

      <div className="container">
        <div className="section mb-2">
          <div className="section__header mb-2">
            <h2 className="section__header__title">Trending Movies</h2>

            <Link to="/movie">
              <OutlineButton className="small"> View more</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.popular} />
        </div>

        <div className="section mb-2">
          <div className="section__header mb-2">
            <h2>Upcoming Movies</h2>

            <Link to="/movie">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.upcoming} />
        </div>

        <div className="section mb-2">
          <div className="section__header mb-2">
            <h2 className="section__header__title">Trending TV</h2>

            <Link to="/tv">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.tv} type={tvType.popular} />
        </div>

        <div className="section mb-2">
          <div className="section__header mb-2">
            <h2 className="section__header__title">Upcoming TV</h2>

            <Link to="/tv">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.tv} type={tvType.upcoming} />
        </div>
      </div>
    </>
  );
};

export default Home;
