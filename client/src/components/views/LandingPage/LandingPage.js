import { Row } from "antd";
import React, { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";
import { API_KEY, API_URL, IMAGE_BASE_URL } from "../../Config";
import GridCards from "../commons/GridCards";
import MainImage from "./Sections/MainImage";

function LandingPage() {
  const [Movies, setMovies] = useState([]); // 영화 리스트를 배열에 넣어야 한다
  const [mainMovieImage, setMainMovieImage] = useState(null);
  const [CurrentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    fetchMovie(endpoint);
  }, []);

  // 공통적인 부분은 묶어서 필요한 부분에 처리
  const fetchMovie = (endpoint) => {
    // fetch에 endpoint를 넣으면 해당 데이터를 가져옴
    fetch(endpoint)
      .then((response) => response.json())
      .then((response) => {
        // results에 영화 리스트가 있기 때문에 [response.results]로 적어 Movies에 넣는다.
        // ...Movies: 현재 가지고있는 Movies들 포함해서 더 출력
        setMovies([...Movies, ...response.results]); // important
        setMainMovieImage(response.results[0]); // 메인 이미지 하나만 가져오기 위해 0 인덱스.
        setCurrentPage(response.page);
      });
  };

  const loadMoreItems = () => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${
      CurrentPage + 1
    }`;
    fetchMovie(endpoint);
  };

  return (
    <div style={{ width: "100%", margin: "0" }}>
      {/* main image  - 실제 이미지 가져오는 url 구조를 따라함 */}
      {/* && : 있으면 */}
      {mainMovieImage && (
        <MainImage
          image={`${IMAGE_BASE_URL}w1280${mainMovieImage.backdrop_path}`}
          title={mainMovieImage.original_title}
          text={mainMovieImage.overview}
        />
      )}

      <div style={{ width: "85%", margin: "1rem auto" }}>
        <h2>Movies by latest</h2>
        <hr />

        {/* movies grid cards */}
        <Row gutter={[16, 16]}>
          {Movies &&
            Movies.map((movie, index) => (
              // 의미없는 div 가 추가된다. 이를 피하기 위해서 fragment를 사용
              // <Fragment> </Fragment> 대신 <> </> 이렇게 써도 된다.
              <React.Fragment key={index}>
                <GridCards
                  landingPage
                  image={
                    movie.poster_path
                      ? `${IMAGE_BASE_URL}w500${movie.poster_path}`
                      : null
                  }
                  movieId={movie.id}
                  movieName={movie.original_title}
                />
              </React.Fragment>
            ))}
        </Row>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={loadMoreItems}>Load More</button>
      </div>
    </div>
  );
}

export default LandingPage;
