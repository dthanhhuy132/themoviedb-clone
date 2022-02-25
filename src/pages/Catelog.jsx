import React from 'react';

import { useParams } from 'react-router-dom';
import { PageHeader } from '../components/page-header/PageHeader';

import { category as cate } from '../api/tmdbApi';
import { MovieGrid } from '../components/movie-grid/MovieGrid';

const Catelog = () => {
  const { category } = useParams();

  return (
    <div>
      <PageHeader>{category === cate.movie ? 'Movie' : 'TV Series'}</PageHeader>

      <div className="container mb-3">
        <MovieGrid category={category}></MovieGrid>
      </div>
    </div>
  );
};

export default Catelog;
