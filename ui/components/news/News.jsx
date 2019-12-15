import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import { useStateValue } from '../../state/AppState.jsx';
import { newsApi } from '../../../keys.js';
import LoadingSpinner from '../LoadingSpinner.jsx';
import ArticleList from './articleList/ArticleList.jsx';

function Landing(props) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIstLoading] = useState(true);

  const getNews = async () => {
    const articles = await Axios.get(`https://newsapi.org/v2/top-headlines?q=climate&apiKey=${newsApi}`);
    return articles;
  };

  useEffect(() => {
    (async () => {
      const { data } = await getNews();
      setArticles(data.articles);
      setIstLoading(false);
    })();
  }, []);

  return (
    isLoading ? <LoadingSpinner /> : <ArticleList articles={articles} />
  );
}

export default withRouter(Landing);
