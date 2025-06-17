document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Remove existing alerts
    document.querySelectorAll(".form-alert").forEach(el => el.remove());

    // Get field values
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    let valid = true;

    function showError(input, msg) {
      const alert = document.createElement("div");
      alert.className = "form-alert";
      alert.style.color = "red";
      alert.style.marginBottom = "10px";
      alert.innerText = msg;
      input.insertAdjacentElement("beforebegin", alert);
      valid = false;
    }

    // Validate fields
    if (!name) showError(form.name, "Name is required.");
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) showError(form.email, "Valid email required.");
    if (message.length > 1000) showError(form.message, "Message must be under 1000 characters.");

    if (!valid) return;

    // Google Forms configuration
    document.addEventListener("DOMContentLoaded", function () {
      const form = document.querySelector(".google-form");
      const msgBox = document.getElementById("form-msg");

      form.addEventListener("submit", function (e) {
        e.preventDefault();

        const data = new FormData(form);

        fetch("https://docs.google.com/forms/d/e/1FAIpQLSdghT9sf1BUUe2rCHz9V8uEWy0jH6-eb7jhzLuvgWDUnMReyw/formResponse", {
          method: "POST",
          mode: "no-cors",
          body: data
        })
          .then(() => {
            form.reset();
            msgBox.style.color = "green";
            msgBox.textContent = "Message sent successfully!";
          })
          .catch(() => {
            msgBox.style.color = "red";
            msgBox.textContent = "There was an error sending your message.";
          });
      });
    });
  });
});