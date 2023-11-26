const learner = document.querySelector("#name");
const date = document.querySelector("#date");

learner.innerText = "Learner name: Nguyen Truc Nhan";
const newDate = new Date();
date.innerText = `${newDate}`;

const BASE_URL = `https://frcz3.sse.codesandbox.io`;
const jobList = document.querySelector("#job-list");
let page = 1;
const searchInput = document.querySelector("#search");
const searchBtn = document.querySelector("#search-btn");

const getJob = async (page) => {
  try {
    let url = `${BASE_URL}/jobs?_page=${page}&_limit=10`;
    if (searchInput.value) {
      url += `&q=${searchInput.value}`;
    }

    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.msg);
  }
};
// getJob();

const renderJob = async (page) => {
  try {
    const data = await getJob(page);
    jobList.innerHTML = "";
    data.forEach((job) => {
      const x = document.createElement("li");
      x.innerHTML = `${job.title}`;
      jobList.appendChild(x);
    });
  } catch (error) {
    console.log(error.msg);
  }
};

renderJob(page);

document.querySelector("#pre").addEventListener("click", () => {
  if (page <= 1) return;
  page--;
  renderJob(page);
});
document.querySelector("#next").addEventListener("click", () => {
  page++;
  renderJob(page);
});

searchBtn.addEventListener("click", () => {
  page = 1;
  renderJob(page);
});
