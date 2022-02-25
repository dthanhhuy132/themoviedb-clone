import './movie-list.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import tmdbApi, { category as cate } from '../../api/tmdbApi';

import { Swiper, SwiperSlide } from 'swiper/react';
import MovieCard from '../movie-card/MovieCard';
import { Skeleton } from '@mui/material';

const MovieList = ({ type, id, category }) => {
  const [items, setItems] = useState(null);

  useEffect(() => {
    const getList = async () => {
      try {
        let response = null;
        const params = {};
        if (type !== 'similar') {
          switch (type) {
            case cate.movie:
              response = await tmdbApi.getMovieList(type, params);
              break;
            default:
              response = await tmdbApi.getTvList(type, { params });
          }
        } else {
          response = await tmdbApi.similar(category, id);
        }

        setItems(response.results);
      } catch (error) {
        console.log(error.message);
      }
    };

    getList();
  }, [type, id]);

  return (
    <div className="movie-list">
      <Swiper
        slidesPerView={'auto'}
        spaceBetween={10}
        grabCursor={true}
        pagination={{
          type: 'progressbar',
        }}
        scrollbar={true}
      >
        {items ? (
          items.map((item, i) => (
            <SwiperSlide key={i}>
              <MovieCard item={item} category={category} />
            </SwiperSlide>
          ))
        ) : (
          <Skeleton variant="rectangular" width={210} height={118} />
        )}
      </Swiper>
    </div>
  );
};

MovieList.propTypes = {
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default MovieList;
