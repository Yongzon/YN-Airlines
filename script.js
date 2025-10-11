    let selectedFlight = null;
    let bookingData = {};

function showBookingForm() {
  document.getElementById("booking").style.display = "block";
  document.getElementById("navbar").style.display = "none";
  document.getElementById("home").style.display = "none";
  document.getElementById("destination").style.display = "none";
  document.getElementById("service").style.display = "none";
  document.getElementById("client").style.display = "none";
  document.getElementById("blog").style.display = "none";
  document.getElementById("contact").style.display = "none";
}

// Attach the same function to both elements
document.getElementById("bookFlightBtn").addEventListener("click", showBookingForm);
document.getElementById("bookinglink").addEventListener("click", showBookingForm);
