let countDownDate = new Date("December 16, 2025 09:00:00").getTime();

// Variable to store the interval ID
let timerInterval;

// Function to update the timer
function startTimer() {
  timerInterval = setInterval(function () {
    // Get today's date and time
    let now = new Date().getTime();

    // distance btwn now and the count down date
    let distance = countDownDate - now;

    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // display the result in the elements with corresponding IDs
    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;

    // if the count down is finished, display text
    if (distance < 0) {
      clearInterval(timerInterval);
      document.getElementById("timer-container").innerHTML =
        "<h2>EVENT STARTED</h2>";
    }
  }, 1000);
}

// Start the timer immediately on load
startTimer();

// --- FORM HANDLING ---

document.getElementById("toggleForm").onclick = function () {
  const box = document.getElementById("eventForm");
  if (box.style.display === "block") {
    box.style.display = "none";
  } else {
    box.style.display = "block";
  }
};

//  update timer
document
  .getElementById("countdownForm")
  .addEventListener("submit", function (event) {
    // prevent default form submission (page reload)
    event.preventDefault();

    // get values from input fields
    let newName = document.getElementById("name").value;
    let newDate = document.getElementById("date").value;
    let newTime = document.getElementById("time").value;

    // validate that user entered data
    if (newDate && newTime) {
      // create new date string and set global countDownDate
      // combines date and time string to standard format
      countDownDate = new Date(newDate + "T" + newTime).getTime();

      // update title
      document.getElementById("eventTitle").innerText = newName;

      // reset interval to ensure syncs immediately
      clearInterval(timerInterval);
      startTimer();

      // Close form after submission
      document.getElementById("eventForm").style.display = "none";
    } else {
      alert("Please enter both a date and a time.");
    }
  });
