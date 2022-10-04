import React, { useEffect } from "react";
import Axios from "axios";

function Favorite(props) {
  const userFrom = props.userFrom;
  const movieId = props.movieId;
  const movieTitle = props.movieInfo.title;
  const moviePost = props.movieInfo.post;
  const movieRunTime = props.movieInfo.runTime;

  useEffect(() => {
    let variables = {
      userFrom,
      movieId,
    };

    Axios.post("/api/favorite/favoriteNumber", variables).then((response) => {
      console.log(response.data);
      if (response.data.success) {
      } else {
        alert("숫자 정보를 가져오는 데 실패하였습니다");
      }
    });

    Axios.post("/api/favorite/favorited", variables).then((response) => {
      console.log(response.data);
      if (response.data.success) {
      } else {
        alert("정보를 가져오는 데 실패하였습니다");
      }
    });

  }, []);
  return (
    <div>
      <button>Favorite</button>
    </div>
  );
}

export default Favorite;
