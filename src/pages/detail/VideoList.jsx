import React, { useEffect, useState } from 'react';
import tmdbApi from '../../api/tmdbApi';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Scrollbar, Navigation, Pagination } from 'swiper';
import styled from 'styled-components';

function VideoList({ category, id }) {
  const [videoList, setVideoList] = useState(null);
  const [isMobileDevice, setIsMobileDevice] = useState(window.innerWidth < 600);

  useEffect(() => {
    (async () => {
      const res = await tmdbApi.getVideos(category, id);
      setVideoList(res.results);
    })();
  }, [category, id]);

  function getWindowWidth() {
    if (window.innerWidth < 600) setIsMobileDevice(true);
    else setIsMobileDevice(false);
  }

  window.addEventListener('resize', getWindowWidth);

  return (
    <div className="videoList">
      {videoList && !isMobileDevice ? (
        <SwiperStyled
          slidesPerView={1}
          centeredSlides={true}
          scrollbar={true}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          spaceBetween={50}
          modules={[Keyboard, Scrollbar, Navigation]}
          className="mySwiper"
        >
          {videoList?.map((item, index) => (
            <SwiperSlide key={index}>
              <Video item={item} />
            </SwiperSlide>
          ))}
        </SwiperStyled>
      ) : (
        videoList?.map((item, index) => <Video item={item} />)
      )}
    </div>
  );
}

const Video = ({ item }) => {
  return (
    <div className="videos">
      <iframe
        src={`https://www.youtube.com/embed/${item?.key}`}
        width="100%"
        title="video"
      ></iframe>
    </div>
  );
};

const SwiperStyled = styled(Swiper)`
  padding: 0 3rem;

  .swiper-scrollbar {
    background: #423f3f;
    bottom: 0px;
  }
`;

export default VideoList;
