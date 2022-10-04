import { Descriptions } from "antd";
import React from "react";

function MovieInfo(props) {
  return (
    // bordered하면 표 border가 생긴다
    <Descriptions title="Movie Info" bordered>
      <Descriptions.Item label="Title">
        {props.movie.original_title}
      </Descriptions.Item>
      <Descriptions.Item label="release_date">
        {props.movie.release_date}
      </Descriptions.Item>
      <Descriptions.Item label="revenue">
        {props.movie.revenue}
      </Descriptions.Item>
      <Descriptions.Item label="runtime">
        {props.movie.runtime}
      </Descriptions.Item>
      <Descriptions.Item label="vote_average">
        {props.movie.vote_average}
      </Descriptions.Item>
      <Descriptions.Item label="vote_count">
        {props.movie.vote_count}
      </Descriptions.Item>
      <Descriptions.Item label="status">{props.movie.status}</Descriptions.Item>
      <Descriptions.Item label="popularity">
        {props.movie.popularity}
      </Descriptions.Item>
    </Descriptions>
  );
}

export default MovieInfo;
