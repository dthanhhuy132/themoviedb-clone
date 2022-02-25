import 'swiper/css';
import 'swiper/css/pagination';
import './hero-slide.scss';

import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

import tmdbApi, { category, movieType, tvType } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import SwiperCore, { Autoplay } from 'swiper';

import Button, { OutlineButton } from '../button/Button';
import Modal, { ModalContent } from '../modal/Modal';

export const HeroSlide = () => {
  const [movieItems, setMovieItems] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1 };

      try {
        const response = await tmdbApi.getMovieList(movieType.popular, { params });
        setMovieItems(response.results);
      } catch (error) {}
    };

    getMovies();
  }, []);

  SwiperCore.use([Autoplay]);

  return (
    <div className="hero-slide">
      <Swiper
        className="mySwiper"
        modules={[Pagination]}
        pagination={{
          dynamicBullets: true,
        }}
        loop={true}
        autoplay={{ delay: 3000 }}
      >
        {movieItems.map((item, i) => (
          <SwiperSlide key={i}>
            {({ isActive }) => <HeroSlideItem item={item} className={isActive ? 'active' : ''} />}
          </SwiperSlide>
        ))}
      </Swiper>

      {movieItems.map((item, i) => (
        <TrailerModal key={i} item={item}></TrailerModal>
      ))}
    </div>
  );
};

const HeroSlideItem = ({ item, className }) => {
  let history = useHistory();
  const background = apiConfig.originalImage(item?.backdrop_path);

  const setModalActive = async () => {
    try {
      const modal = document.querySelector(`#modal__${item.id}`);
      const videos = await tmdbApi.getVideos(category.movie, item?.id);

      if (videos.results.length > 0) {
        const videoUrl = `https://www.youtube.com/embed/${videos.results[0].key}`;

        modal?.querySelector(`.modal__content > iframe`).setAttribute('src', videoUrl);
      } else {
        modal.querySelector(`.modal__content`).innerHTML = 'No trailer';
      }

      modal.classList.toggle('active');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
      className={`hero-slide__item ${className}`}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="hero-slide__item__content container">
        <div className="hero-slide__item__content__infor">
          <h2 className="title">{item?.title}</h2>
          <div className="overview">{item?.overview}</div>

          <div className="btns">
            <Button onClick={() => history.push(`/movie/${item.id}`)}>Watch now</Button>
            <OutlineButton onClick={setModalActive}>Watch trailer</OutlineButton>
          </div>
        </div>

        <div className="hero-slide__item__content__poster">
          <img src={apiConfig.w500Image(item.poster_path)} alt="poster" />
        </div>
      </div>
    </div>
  );
};

const TrailerModal = ({ item }) => {
  const iframeRef = useRef(null);

  const onClose = () => iframeRef.current.setAttribute('src', '');

  return (
    <Modal active={false} id={`modal__${item.id}`}>
      <ModalContent onClose={onClose} iframeRef->
        <iframe ref={iframeRef} width="100%" height="500px" title="trailer"></iframe>
      </ModalContent>
    </Modal>
  );
};

export default HeroSlide;
