const articlesWrapper = document.getElementById('articles-wrapper');

async function getArticles() {
  const token = localStorage.getItem('token');
  const res = await fetch('http://localhost:3000/articles', {
    headers: { authorization: 'Bearer ' + token },
  });
  const response = await res.json();
  if (!response.success) {
    return false;
  }
  return response.message;
}

async function createArticleElements() {
  const articles = await getArticles();
  if (!articles) {
    location.replace('login.html');
  }
  articles.forEach((article) => {
    const articleElement = document.createElement('div');
    articleElement.classList.add('article-wrapper');
    articleElement.innerHTML = `<h3 class="article-title">${article.title}</h3>
    <p class="article-content">${article.content}</p>
    <div class="article-date">${formatDate(article.date)}</div>`;
    articlesWrapper.append(articleElement);
  });
}

function formatDate(date) {
  return date.split('T')[0];
}

createArticleElements();
