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
  if (api.status !== 404) {
    const data = await api.json();
    if (data) {
      createUserCard(data);
      fetchRepos(userName);
    }
  } else {
    main.innerHTML = `
      <div class="card">
        <div class="user-info" style="margin: 0">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path></svg>
          <h2>Not Found</h2>
        </div>
      </div>
    `;
  }
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
