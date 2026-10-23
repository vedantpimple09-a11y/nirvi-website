
"use strict";

const DESTINATION_EMAIL = "vedantpimple09@gmail.com";

const ANSWERS = {
  yes: {
    label: "Yes ❤️",
    message: "Thank you for telling me. ❤️ Let's talk about us honestly."
  },
  time: {
    label: "I need time 🤍",
    message: "Of course. Take your time, Nirvi. I respect that. 🤍"
  },
  no: {
    label: "I don't feel the same",
    message: "Thank you for being honest with me. I respect your feelings. 🤍"
  }
};

document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll("[data-choice]");
  const output = document.getElementById("answer");

  buttons.forEach(function (button) {
    button.addEventListener("click", async function () {
      const choice = button.dataset.choice;
      const selected = ANSWERS[choice];

      if (!selected || !output) return;

      buttons.forEach(function (item) {
        item.disabled = true;
      });

      output.textContent = "Sending your answer… 🤍";

      try {
        const response = await fetch(
          "https://formsubmit.co/ajax/" + DESTINATION_EMAIL,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
              _subject: "Nirvi's answer to my letter 💌",
              _template: "table",
              name: "Nirvi",
              answer: selected.label,
              message: "Response submitted through the proposal website."
            })
          }
        );

        const data = await response.json();

        if (!response.ok || data.success === false ||
            data.success === "false") {
          throw new Error(data.message || "Submission failed");
        }

        output.textContent =
          "Your answer was submitted. " + selected.message;
      } catch (error) {
        console.error("Answer submission error:", error);

        output.textContent =
          "Your choice: " + selected.label +
          ". Email couldn't be confirmed. Please tell Vedant directly. 🤍";

        buttons.forEach(function (item) {
          item.disabled = false;
        });
      }
    });
  });
});


