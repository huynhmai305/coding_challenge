const API_URL = "https://api.github.com/users/";

const main = document.getElementById("main");
const form = document.getElementById("form");
const inputSearch = document.getElementById("search");

const createUserCard = (user) => {
  const cardHTML = `
    <div class="card">
      <div>
        <img src="${user.avatar_url}" alt="${user.name}" class="avatar" />
      </div>
      <div class="user-info">
        <h2>${user.name}</h2>
        <p>${user.bio}</p>
        <ul class="info">
          <li>${user.followers}<strong>Followers</strong></li>
          <li>${user.following}<strong>Following</strong></li>
          <li>${user.public_repos}<strong>Repos</strong></li>
        </ul>
        <div class="repos" id="repos"></div>
      </div>
    </div>
  `;
  main.innerHTML = cardHTML;
};

const addReposToCard = (repos) => {
  const reposContainer = document.getElementById("repos");
  // sort repo stargazers_count desc
  const reposSort = repos.sort(
    (a, b) => b.stargazers_count - a.stargazers_count
  );
  reposSort.slice(0, 10).forEach((repo) => {
    const repoEl = document.createElement("a");
    repoEl.classList.add("repo");
    repoEl.href = repo.html_url;
    repoEl.target = "_blank";
    repoEl.innerText = repo.name;
    reposContainer.appendChild(repoEl);
  });
};

const getUser = async (userName) => {
  const api = await fetch(API_URL + userName);
  const data = await api.json();
  createUserCard(data);
  fetchRepos(userName);
};

const fetchRepos = async (userName) => {
  const api = await fetch(API_URL + userName + "/repos");
  const data = await api.json();
  addReposToCard(data);
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const text = inputSearch.value;

  if (text) {
    getUser(text);
    inputSearch.value = "";
  }
});

getUser("florinpop17");
