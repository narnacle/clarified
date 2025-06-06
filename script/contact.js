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

    // Email configuration (replace with your secure token)
    Email.send({
      SecureToken: "YOUR_SECURE_TOKEN_HERE", // <-- replace with your real token
      To: "your@email.com",                  // <-- where the email should be sent
      From: email,
      Subject: subject || "New Contact Form Message",
      Body: `
        <strong>Name:</strong> ${name}<br>
        <strong>Email:</strong> ${email}<br>
        <strong>Subject:</strong> ${subject}<br>
        <strong>Message:</strong><br>${message.replace(/\n/g, "<br>")}
      `
    }).then(function (response) {
      const success = document.createElement("div");
      success.className = "form-alert";
      success.style.color = "green";
      success.style.marginTop = "10px";
      success.innerText = "Message sent successfully!";
      form.prepend(success);
      form.reset();
    }).catch(function (error) {
      const fail = document.createElement("div");
      fail.className = "form-alert";
      fail.style.color = "red";
      fail.style.marginTop = "10px";
      fail.innerText = "Failed to send message. Please try again.";
      form.prepend(fail);
    });
  });
});