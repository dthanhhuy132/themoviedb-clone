import React, { useEffect, useState } from 'react';

import tmdbApi from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

function CastList({ category, id }) {
  const [castList, setCastList] = useState(null);
  useEffect(() => {
    (async () => {
      const response = await tmdbApi.credits(category, id);

      setCastList(response.cast.slice(0, 5));
    })();
  }, [category, id]);

  return (
    <div className="casts">
      {castList &&
        castList.map((cast, index) => (
          <div key={index} className="casts__item">
            <div
              className="casts__item__img"
              style={{ backgroundImage: `url(${apiConfig.w500Image(cast.profile_path)})` }}
            ></div>
            <p className="casts__item__name">{cast.name}</p>
          </div>
        ))}
    </div>
  );
}

export default CastList;
