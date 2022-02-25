import './movie-grid.scss';

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import tmdbApi, { category as cate, movieType, tvType } from '../../api/tmdbApi';

import MovieCard from '../movie-card/MovieCard';
import { Pagination } from 'antd';
import styled from 'styled-components';

export const MovieGrid = ({ category, keyword }) => {
  const [items, setItems] = useState();
  const [totalPages, setTotalPages] = useState(400);

  useEffect(() => {
    const getList = async () => {
      let response = null;

      if (keyword === undefined) {
        const params = {};
        switch (category) {
          case cate.movie:
            response = await tmdbApi.getMovieList(movieType.upcoming, { params });
            break;
          default:
            response = await tmdbApi.getTvList(tvType.popular, { params });
        }
      } else {
        const params = {
          query: keyword,
        };

        response = await tmdbApi.search(keyword);
      }

      setItems(response.results);
      setTotalPages(response.total_pages);
    };

    getList();

    return () => {};
  }, [category, keyword]);

  async function handleChangePage(page) {
    let response = null;

    if (keyword === undefined || keyword === '') {
      const params = {
        page: page,
      };
      switch (category) {
        case cate.movie:
          response = await tmdbApi.getMovieList(movieType.upcoming, { params });
          break;
        default:
          response = await tmdbApi.getMovieList(tvType.upcoming, { params });
          break;
      }
    } else {
      const params = {
        query: keyword,
        page: page,
      };

      response = await tmdbApi.search({ params });
    }
    setItems(response.results);
  }

  return (
    <>
      <div className="movie-grid">
        {items?.map((item, index) => (
          <MovieCard item={item} category={category} key={index}></MovieCard>
        ))}
      </div>
      <PaginationStyled
        total={totalPages * 10}
        showSizeChanger={false}
        showQuickJumper
        onChange={(page, pageSize) => {
          handleChangePage(page, pageSize);
        }}
      />
      ,
    </>
  );
};

const PaginationStyled = styled(Pagination)`
  text-align: center;
  color: #fff;
  font-family: inherit;

  li:not(.ant-pagination-options),
  button,
  input,
  a,
  .ant-pagination-item-link {
    background: #494949;
    border: none;
    color: #fff;
  }

  .ant-pagination-item-ellipsis {
    color: #fff !important;
  }

  li.ant-pagination-item-active a {
    color: red !important;
    background: #fff;
  }
`;
