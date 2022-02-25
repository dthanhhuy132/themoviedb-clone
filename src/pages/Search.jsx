import { Pagination } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import tmdbApi from '../api/tmdbApi';

import MovieCard from '../components/movie-card/MovieCard';

export default function Search() {
  const { keyword } = useParams();
  const [movieSearchList, setMovieSearchList] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  async function handleGetListSearch(keyword, page = 1) {
    const params = {
      query: keyword,
      page: page,
    };

    const response = await tmdbApi.search(params);
    const searchList = response.results.filter(
      (x) => x.media_type == 'tv' || x.media_type == 'movie' || x.media_type == 'video'
    );

    const totalPages = response.total_pages;

    return {
      searchList,
      totalPages,
    };
  }

  function setData(searchList, totalPages) {
    setMovieSearchList(searchList);
    setTotalPages(totalPages);
  }

  useEffect(async () => {
    const { searchList, totalPages } = await handleGetListSearch(keyword);
    setData(searchList, totalPages);
  }, [keyword.length]);

  async function handleChangePage(page, pageSize) {
    const { searchList, totalPages } = await handleGetListSearch(keyword, page);
    setData(searchList, totalPages);
  }

  return (
    <div style={{ marginTop: '10rem' }}>
      {movieSearchList.length === 0 ? (
        <h2 style={{ color: '#fff', textAlign: 'center', marginBottom: '2rem' }}>
          No results for keyword: '{keyword}'
        </h2>
      ) : (
        <div className="movie-grid" style={{ marginTop: '10rem' }}>
          {movieSearchList?.map((item, index) => (
            <MovieCard item={item} category={item?.media_type} key={index}></MovieCard>
          ))}
        </div>
      )}
      <PaginationStyled
        total={totalPages * 10}
        showSizeChanger={false}
        showQuickJumper
        onChange={(page, pageSize) => {
          handleChangePage(page, pageSize);
        }}
      />
      ,
    </div>
  );
}

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
