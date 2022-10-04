import { Row } from "antd";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { API_KEY, API_URL, IMAGE_BASE_URL } from "../../Config";
import GridCards from "../commons/GridCards";
import MainImage from "../LandingPage/Sections/MainImage";
import Favorite from "./Sections/Favorite";
import MovieInfo from "./Sections/MovieInfo";

function MovieDetail(props) {
  let movieId = props.match.params.movieId;

  let [Movie, setMovie] = useState([]);
  let [Casts, setCasts] = useState([]);
  let [ActorToggle, setActorToggle] = useState(false);

  useEffect(() => {
    let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
    let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;

    fetch(endpointInfo)
      .then((response) => response.json())
      .then((response) => {
        setMovie(response); // Movie에 response를 넣어준다.
      });

    fetch(endpointCrew)
      .then((response) => response.json())
      .then((response) => {
        setCasts(response.cast); // Movie에 response를 넣어준다.
      });
  }, []);

  const toggleActorView = () => {
    // true로 하게되면 버튼을 눌렀을 때 열리기만 하고 닫히지 않음
    // !ActorToggle으로 true, false 반복시키자
    setActorToggle(!ActorToggle);
  };

  return (
    <div>
      {/* Header */}
      <MainImage
        image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
        title={Movie.original_title}
        text={Movie.overview}
      />

      {/* Body */}
      <div style={{ width: "85%", margin: "1rem auto" }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Favorite
            movieInfo={Movie}
            userFrom={localStorage.getItem("userId")}
            movieId={movieId}
          />
        </div>

        {/* Movie Info */}
        <MovieInfo movie={Movie} />

        <br />

        {/* Actors Grid */}
        <div
          style={{ display: "flex", justifyContent: "center", margin: "2rem" }}
        >
          <button onClick={toggleActorView}> Toggle Actor View </button>
        </div>

        {/* 이제 배우 이미지 넣기 */}
        {ActorToggle && (
          <Row gutter={[16, 16]}>
            {Casts &&
              Casts.map((cast, index) => (
                // 의미없는 div 가 추가된다. 이를 피하기 위해서 fragment를 사용
                // <Fragment> </Fragment> 대신 <> </> 이렇게 써도 된다.
                <React.Fragment key={index}>
                  <GridCards
                    image={
                      cast.profile_path
                        ? `${IMAGE_BASE_URL}w500${cast.profile_path}`
                        : null
                    }
                    CharacterName={cast.name}
                  />
                </React.Fragment>
              ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default MovieDetail;
