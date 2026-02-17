const themeButton = document.getElementById("theme-button");
themeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

const rsvpForm = document.getElementById("rsvp-form");
let count = 3;

let motionEnabled = true;

const addParticipant = (person) => {
  const newP = document.createElement("p");
  newP.textContent = `🇲🇽 ${person.name}, who loves ${person.snack}, RSVPed.`;

  const participantList = document.querySelector(".rsvp-participants");
  participantList.appendChild(newP);

  const oldCount = document.getElementById("rsvp-count");
  if (oldCount) oldCount.remove();

  count++;
  const newCount = document.createElement("p");
  newCount.id = "rsvp-count";
  newCount.textContent = `⭐ ${count} people have RSVP'd to this event!`;
  participantList.appendChild(newCount);
};

const validateForm = (event) => {
  event.preventDefault();
  let containsErrors = false;

  const rsvpInputs = document.getElementById("rsvp-form").elements;

  for (let i = 0; i < rsvpInputs.length; i++) {
    const input = rsvpInputs[i];
    if (input.tagName === "INPUT" && input.type !== "submit") {
      if (input.id === "email") {
        if (input.value.trim().length < 2 || !input.value.includes("@")) {
          input.classList.add("error");
          containsErrors = true;
        } else {
          input.classList.remove("error");
        }
      } else {
        if (input.value.trim().length < 2) {
          input.classList.add("error");
          containsErrors = true;
        } else {
          input.classList.remove("error");
        }
      }
    }
  }

  if (!containsErrors) {
    const person = {
      name: rsvpInputs[0].value.trim(),
      email: rsvpInputs[1].value.trim(),
      snack: rsvpInputs[2].value.trim()
    };

    addParticipant(person);
    toggleModal(person);

    // Clear inputs
    for (let i = 0; i < rsvpInputs.length; i++) {
      const input = rsvpInputs[i];
      if (input.tagName === "INPUT" && input.type !== "submit") {
        input.value = "";
        input.classList.remove("error");
      }
    }
  }
};

const modal = document.getElementById("success-modal");
const modalText = document.getElementById("modal-text");
const modalImage = document.getElementById("modal-image");
let rotateFactor = 0;

const animateImage = () => {
  rotateFactor = rotateFactor === 0 ? -10 : 0;
  modalImage.style.transform = `rotate(${rotateFactor}deg)`;
};

const toggleModal = (person) => {
  modal.style.display = "flex";
  modalText.textContent = `Thanks for RSVPing, ${person.name}! We can't wait to see you at the event!`;

  let intervalId;

  if (motionEnabled) {
    intervalId = setInterval(animateImage, 500);
  }

  setTimeout(() => {
    modal.style.display = "none";
    if (motionEnabled) {
      clearInterval(intervalId);
    }
  }, 7000); 
};

const closeModalButton = document.getElementById("close-modal-button");
closeModalButton.addEventListener("click", () => {
  modal.style.display = "none";
});

const rsvpButton = document.querySelector("#rsvp-form input[type='submit']");
rsvpButton.addEventListener("click", validateForm);

const reduceMotionButton = document.getElementById("reduce-motion-button");

const reduceMotion = () => {
  motionEnabled = !motionEnabled;
};

reduceMotionButton.addEventListener("click", reduceMotion);