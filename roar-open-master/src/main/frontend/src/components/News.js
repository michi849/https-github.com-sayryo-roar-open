import React from "react";
import { Container } from '@material-ui/core';
import NewsCard from './NewsCard';


const News = () => {

  return (
    <Container>
      <div className="m-5">
        <h1 className="text-left">News</h1>
      </div>
      <div className="ml-5 ">
        最新のニュースを紹介
      </div>
      <NewsCard/>
    </Container>
  );
};

export default News;
