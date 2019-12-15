import React from 'react';
import ArticleCard from '../articleCard/ArticleCard.jsx';

export default function ArticleList({ articles }) {
  return (
    <ul className="list-unstyled">
      {articles.map((article, idx) => <ArticleCard article={article} key={idx} />)}
    </ul>
  );
}
