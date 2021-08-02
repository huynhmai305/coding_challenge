const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

const formatTime = (time) => {
  return time < 10 ? `0${time}` : time;
};

const countdown = () => {
  const currentDate = new Date();
  const newYear = new Date(currentDate.getFullYear() + 1, 0, 1); // 1st January
  const diff = newYear - currentDate;

  const days = Math.floor(diff / (24 * 60 * 60 * 1000));
  const hours = Math.floor(diff / (60 * 60 * 1000)) % 24;
  const minutes = Math.floor(diff / (60 * 1000)) % 60;
  const seconds = Math.floor(diff / 1000) % 60;

  daysEl.innerHTML = formatTime(days);
  hoursEl.innerHTML = formatTime(hours);
  minutesEl.innerHTML = formatTime(minutes);
  secondsEl.innerHTML = formatTime(seconds);
};

// countdown();
setInterval(countdown, 1000);
