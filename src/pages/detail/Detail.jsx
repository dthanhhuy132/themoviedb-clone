import './detail.scss';

import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import tmdbApi from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import CastList from './CastList';
import VideoList from './VideoList';
import MovieList from '../../components/movie-list/MovieList';

function Detail() {
  const { category, id } = useParams();
  const [item, setItem] = useState(null);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      try {
        const params = {};
        const response = await tmdbApi.detail(category, id, { params });
        console.log('response', response);
        setItem(response);
      } catch (error) {
        console.log('error', error.message);
        history.push('/opp/opp/oppage');
      }
    })();

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [category, id]);

  return (
    <>
      {item && (
        <>
          <div
            className="banner"
            style={{
              backgroundImage: `url(${apiConfig.originalImage(
                item.poster_path || item.backdrop_path
              )})`,
            }}
          ></div>

          <div className="mb-3 movie-content container">
            <div
              className="movie-content__poster"
              style={{
                backgroundImage: `url(${apiConfig.originalImage(
                  item.poster_path || item.backdrop_path
                )})`,
              }}
            ></div>
            <div className="movie-content__infor">
              <h1 className="title">{item.title || item.name}</h1>
              <div className="genres">
                {item.genres.map((genre, i) => (
                  <span key={i} className="genres__item">
                    {genre.name}
                  </span>
                ))}
              </div>

              <p className="overview">{item.overview}</p>

              <div className="cast">
                <div className="section__header">
                  <h2>Casts</h2>
                </div>
                <CastList category={category} id={item.id} />
              </div>
            </div>
          </div>

          <div className="conatiner">
            <div className="section mb-3">
              <h2
                style={{
                  color: '#fff',
                  fontSize: '1.5rem',
                  margin: '5rem 0rem 1rem 0rem',
                  borderBottom: '1px solid rgb(160 151 151)',
                }}
              >
                Trailer & Teaser video
              </h2>
              <VideoList id={id} category={category} />
            </div>
            <div className="section mb-3">
              <div className="mb-2">
                <h2
                  style={{
                    color: '#fff',
                    fontWeight: '500',
                    fontSize: '1.5rem',
                    borderBottom: '1px solid rgb(160 151 151)',
                  }}
                >
                  Similar video
                </h2>
              </div>
              <MovieList type="similar" id={id} category={category} />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Detail;
