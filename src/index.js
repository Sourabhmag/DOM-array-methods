const api = `https://randomuser.me/api`;
const addUserBtn = document.getElementById("addUserBtn");
const ascSortBtn = document.getElementById("sort-asc");
const dscSortBtn = document.getElementById("sort-dsc");
const userList = document.getElementById("user-list");
const searchInput = document.getElementById("searchInput");

const appState = [];

addUserBtn.addEventListener("click", async () => {
  const userData = await fetch(api, {
    method: "GET"
  });
  const userJson = await userData.json();
  const user = userJson.results[0];
  appState.push(user);
  console.log(appState);
  domRenderer(appState);
});

const domRenderer = (stateArr) => {
  userList.innerHTML = null;
  stateArr.forEach((user) => {
    const userEl = document.createElement("div");
    userEl.innerHTML = `
    <div class="parentCard">
      <div class="card">
        <div>Name : ${user.name.title} ${user.name.first} ${user.name.last}</div>
        <div>Gender : ${user.gender}</div>
        <div>Email : ${user.email}</div>
      </div>
    </div>`;
    userList.appendChild(userEl);
  });
};

searchInput.addEventListener("keyup", (e) => {
  console.log(searchInput.value);
  const filteredData = appState.filter(
    (user) =>
      user.name.first.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      user.name.last.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      user.gender.toLowerCase().includes(searchInput.value.toLowerCase())
  );
  domRenderer(filteredData);
});

dscSortBtn.addEventListener("click", () => {
  const appStateCopy = [...appState];
  appStateCopy.sort((a, b) => (a.name.first < b.name.first ? 1 : -1));
  console.log(appStateCopy);

  domRenderer(appStateCopy);
});

ascSortBtn.addEventListener("click", () => {
  const appStateCopy = [...appState];
  appStateCopy.sort((a, b) => (a.name.first < b.name.first ? -1 : 1));
  console.log(appStateCopy);

  domRenderer(appStateCopy);
});
