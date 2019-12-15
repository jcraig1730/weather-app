import React from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import Axios from 'axios';
import Article from '../article/Article.jsx';
import './articleCard.css';


export default function ArticleCard(props) {
  const history = useHistory();
  const { article } = props;
  const handleArticleClick = async (e) => {
    window.open(article.url);
  };

  return (
    <li className="media py-3 border border-shade1 mx-2">
      <img src={article.urlToImage} className="mr-3 col-3 article-link" alt="Article Image" onClick={handleArticleClick} />
      <div className="media-body">
        <h5 className="mt-0 mb-1 article-link" onClick={handleArticleClick}>{article.title}</h5>
        <p><small className="text-shade4">{article.source.name}</small></p>
        {article.description}
      </div>
    </li>
  );
}
