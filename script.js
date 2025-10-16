// ===== VARIABLES =====
let selectedFlight = null;
let promoUsed = false;
let passengerCount = 1;

// ===== FLIGHT DATA ARRAY =====
const flightData = [
  // Round Trip Flights
  {
    flightNo: "5J560",
    from: "cebu",
    to: "manila",
    type: "roundtrip",
    departTime: "09:00 AM",
    returnTime: "05:00 PM",
    departDate: "2025-10-20",
    returnDate: "2025-10-25",
    duration: "1h 10m",
    price: 2500,
    seatsAvailable: 45,
    fareType: "Promo Fare",
    terminal: "Terminal 1"
  },
  {
    flightNo: "PR301",
    from: "manila",
    to: "davao",
    type: "roundtrip",
    departTime: "10:00 AM",
    returnTime: "06:30 PM",
    departDate: "2025-10-20",
    returnDate: "2025-10-25",
    duration: "1h 30m",
    price: 3200,
    seatsAvailable: 32,
    fareType: "Regular Fare",
    terminal: "Terminal 2"
  },
  {
    flightNo: "DG150",
    from: "manila",
    to: "cebu",
    type: "roundtrip",
    departTime: "07:30 AM",
    returnTime: "03:20 PM",
    departDate: "2025-10-20",
    returnDate: "2025-10-25",
    duration: "1h",
    price: 2700,
    seatsAvailable: 28,
    fareType: "Promo Fare",
    terminal: "Terminal 3"
  },
  // One Way Flights
  {
    flightNo: "5J562",
    from: "cebu",
    to: "manila",
    type: "oneway",
    departTime: "08:00 AM",
    returnTime: null,
    departDate: "2025-10-20",
    returnDate: null,
    duration: "1h 10m",
    price: 1800,
    seatsAvailable: 15,
    fareType: "Promo Fare",
    terminal: "Terminal 1"
  },
  {
    flightNo: "PR305",
    from: "manila",
    to: "davao",
    type: "oneway",
    departTime: "11:00 AM",
    returnTime: null,
    departDate: "2025-10-20",
    returnDate: null,
    duration: "1h 30m",
    price: 2300,
    seatsAvailable: 22,
    fareType: "Regular Fare",
    terminal: "Terminal 2"
  },
  {
    flightNo: "DG155",
    from: "manila",
    to: "cebu",
    type: "oneway",
    departTime: "05:30 PM",
    returnTime: null,
    departDate: "2025-10-20",
    returnDate: null,
    duration: "1h",
    price: 2100,
    seatsAvailable: 18,
    fareType: "Regular Fare",
    terminal: "Terminal 3"
  }
];

// ===== SHOW/HIDE FUNCTIONS =====
function hideAllSections() {
  const sections = [
    "navbar", "home", "destination", "service",
    "client", "blog", "contact",
    "booking", "flights", "passenger", "summary"
  ];
  for (let i = 0; i < sections.length; i++) {
    const el = document.getElementById(sections[i]);
    if (el) el.style.display = "none";
  }
}

function showBookingForm() {
  hideAllSections();
  document.getElementById("booking").style.display = "block";
}

function showFlightsSection() {
  hideAllSections();
  document.getElementById("flights").style.display = "block";
}

function showPassengerForm() {
  document.getElementById("flights").style.display = "none";
  document.getElementById("passenger").style.display = "block";
}

function showSummarySection() {
  hideAllSections();
  document.getElementById("summary").style.display = "block";
}

function showHome() {
  hideAllSections();
  document.getElementById("navbar").style.display = "block";
  document.getElementById("home").style.display = "block";
  document.getElementById("destination").style.display = "block";
  document.getElementById("service").style.display = "block";
  document.getElementById("client").style.display = "block";
  document.getElementById("blog").style.display = "block";
  document.getElementById("contact").style.display = "block";
}

// ===== NAVIGATION =====
document.getElementById("bookFlightBtn").addEventListener("click", showBookingForm);
document.getElementById("bookinglink").addEventListener("click", function(event) {
  event.preventDefault();
  showBookingForm();
});

// ===== FLIGHT TYPE TOGGLE =====
document.getElementById("flightType").onchange = function() {
  const returnDate = document.getElementById("returnDateField");
  returnDate.style.display = this.value === "roundtrip" ? "block" : "none";
};

// ===== AUTO-GENERATE PASSENGER FIELDS =====
document.getElementById("passengers").addEventListener("input", function () {
  const container = document.getElementById("passengerFields");
  container.innerHTML = "";
  passengerCount = parseInt(this.value) || 1;

  for (let i = 1; i <= passengerCount; i++) {
    const passengerDiv = document.createElement("div");
    passengerDiv.classList.add("passenger-block");
    passengerDiv.innerHTML = `
      <h4>Passenger ${i}</h4>
      <input type="text" class="pName" placeholder="Full Name" required>
      <input type="number" class="pAge" placeholder="Age" min="1" max="120" required>
      <select class="pGender" required>
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
      <input type="email" class="pEmail" placeholder="Email" required>
    `;
    container.appendChild(passengerDiv);
  }
});

// ===== VALIDATION FUNCTIONS =====
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassengerForm() {
  const names = document.querySelectorAll('.pName');
  const ages = document.querySelectorAll('.pAge');
  const genders = document.querySelectorAll('.pGender');
  const emails = document.querySelectorAll('.pEmail');
  
  for (let i = 0; i < names.length; i++) {
    if (names[i].value.trim() === '') {
      alert(`Please enter full name for Passenger ${i + 1}`);
      names[i].focus();
      return false;
    }
    
    if (ages[i].value === '' || ages[i].value < 1 || ages[i].value > 120) {
      alert(`Please enter a valid age (1-120) for Passenger ${i + 1}`);
      ages[i].focus();
      return false;
    }
    
    if (genders[i].value === '') {
      alert(`Please select gender for Passenger ${i + 1}`);
      genders[i].focus();
      return false;
    }
    
    if (!isValidEmail(emails[i].value)) {
      alert(`Please enter a valid email for Passenger ${i + 1}`);
      emails[i].focus();
      return false;
    }
  }
  return true;
}

// ===== SEARCH FLIGHT =====
document.getElementById("bookingForm").onsubmit = function(event) {
  event.preventDefault();

  const from = document.getElementById("from").value.trim().toLowerCase();
  const to = document.getElementById("to").value.trim().toLowerCase();
  const type = document.getElementById("flightType").value;
  const departDate = document.getElementById("departDate").value;
  const returnDate = document.getElementById("returnDate").value;

  if (!departDate) {
    alert("Please select a depart date.");
    return;
  }

  if (type === "roundtrip" && !returnDate) {
    alert("Please select a return date for round trip.");
    return;
  }

  // Filter flights based on search criteria
  const filteredFlights = flightData.filter(flight => {
    const matchesRoute = flight.from === from && flight.to === to;
    const matchesType = flight.type === type;
    const matchesDepartDate = flight.departDate === departDate;
    
    if (type === "roundtrip") {
      return matchesRoute && matchesType && matchesDepartDate && flight.returnDate === returnDate;
    } else {
      return matchesRoute && matchesType && matchesDepartDate;
    }
  });

  displayFlights(filteredFlights);
  showFlightsSection();
};

// ===== DISPLAY FLIGHTS =====
function displayFlights(flights) {
  const flightList = document.getElementById("flightList");
  flightList.innerHTML = "";

  if (flights.length === 0) {
    flightList.innerHTML = `
      <div class="no-flight">
        <h3>No Flights Found</h3>
        <p>Sorry, no flights match your search criteria.</p>
        <button onclick="showBookingForm()">Modify Search</button>
      </div>
    `;
    document.querySelector(".promo-section").style.display = "none";
    return;
  }

  flights.forEach(flight => {
    const flightCard = document.createElement("div");
    flightCard.classList.add("flight-card");
    flightCard.setAttribute("data-flightno", flight.flightNo);
    
    const returnInfo = flight.type === "roundtrip" 
      ? `<p><b>Return:</b> ${flight.returnTime} (${flight.returnDate})</p>`
      : "";

    flightCard.innerHTML = `
      <h4>${flight.flightNo} - ${flight.from.toUpperCase()} ➜ ${flight.to.toUpperCase()}</h4>
      <p><b>Depart:</b> ${flight.departTime} (${flight.departDate})</p>
      ${returnInfo}
      <p><b>Duration:</b> ${flight.duration}</p>
      <p><b>Seats Available:</b> <span class="seats">${flight.seatsAvailable}</span></p>
      <p><b>Fare Type:</b> <span class="fareType">${flight.fareType}</span></p>
      <p><b>Terminal:</b> <span class="terminal">${flight.terminal}</span></p>
      <p><b>Price:</b> ₱<span class="price">${flight.price}</span></p>
      <button type="button" class="selectFlightBtn">Select Flight</button>
    `;
    
    flightList.appendChild(flightCard);
  });

  // Re-attach event listeners to new buttons
  document.querySelectorAll(".selectFlightBtn").forEach(button => {
    button.onclick = function() {
      const flightCard = this.closest(".flight-card");
      const flightNo = flightCard.getAttribute("data-flightno");
      selectedFlight = flightData.find(flight => flight.flightNo === flightNo);
      showPassengerForm();
    };
  });

  document.querySelector(".promo-section").style.display = "block";
}

// ===== APPLY PROMO =====
document.getElementById("applyPromo").onclick = function() {
  if (promoUsed) {
    alert("Promo already used.");
    return;
  }

  const code = document.getElementById("promoCode").value.trim().toUpperCase();
  if (code === "SAVE25") {
    const visiblePrices = document.querySelectorAll(".flight-card .price");
    visiblePrices.forEach(priceElement => {
      const original = parseFloat(priceElement.textContent);
      priceElement.textContent = (original * 0.75).toFixed(0);
    });
    promoUsed = true;
    alert("Promo applied! 25% discount activated.");
  } else {
    alert("Invalid promo code. Try Again.");
  }
};

// ===== BACK BUTTONS =====
document.getElementById("backToHome").onclick = showHome;
document.getElementById("backToBooking").onclick = showBookingForm;
document.getElementById("backToFlights").onclick = showFlightsSection;
document.getElementById("backToPassenger").onclick = showPassengerForm;

// ===== DONE BUTTON (Passenger to Summary) =====
document.getElementById("doneBtn").onclick = function() {
  if (!selectedFlight) {
    alert("Please select a flight first.");
    return;
  }

  if (!validatePassengerForm()) {
    return;
  }

  const names = document.querySelectorAll(".pName");
  const ages = document.querySelectorAll(".pAge");
  const genders = document.querySelectorAll(".pGender");
  const emails = document.querySelectorAll(".pEmail");

  let passengersSummary = "";
  for (let i = 0; i < names.length; i++) {
    passengersSummary += `
      <div class="passenger-summary">
        <p><b>Passenger ${i + 1}:</b> ${names[i].value}</p>
        <p><b>Age:</b> ${ages[i].value} | <b>Gender:</b> ${genders[i].value}</p>
        <p><b>Email:</b> ${emails[i].value}</p>
        ${i < names.length - 1 ? '<hr>' : ''}
      </div>
    `;
  }

  const summaryDetails = document.getElementById("summaryDetails");
  summaryDetails.innerHTML = `
    <h3>Flight Information</h3>
    <p><b>Flight:</b> ${selectedFlight.flightNo}</p>
    <p><b>From:</b> ${selectedFlight.from.toUpperCase()}</p>
    <p><b>To:</b> ${selectedFlight.to.toUpperCase()}</p>
    <p><b>Depart:</b> ${selectedFlight.departTime} (${selectedFlight.departDate})</p>
    <p><b>Return:</b> ${selectedFlight.type === "roundtrip" ? `${selectedFlight.returnTime} (${selectedFlight.returnDate})` : "N/A"}</p>
    <p><b>Terminal:</b> ${selectedFlight.terminal}</p>
    <p><b>Fare Type:</b> ${selectedFlight.fareType}</p>
    <p><b>Duration:</b> ${selectedFlight.duration}</p>
    <p><b>Total Price:</b> ₱${selectedFlight.price}</p>
    
    <h3>Passenger Details (${names.length} passenger${names.length > 1 ? 's' : ''})</h3>
    ${passengersSummary}
  `;

  showSummarySection();
};

// ===== BOOK NOW =====
document.getElementById("bookNowBtn").onclick = function() {
  const confirmationNumber = "YN" + Math.random().toString(36).substr(2, 8).toUpperCase();
  
  alert(`Booking Successful!\n\nConfirmation Number: ${confirmationNumber}\nFlight: ${selectedFlight.flightNo}\nFrom: ${selectedFlight.from.toUpperCase()} to ${selectedFlight.to.toUpperCase()}\nDepart: ${selectedFlight.departDate}\n\nThank you for choosing Y&N Airlines!`);
  
  // Reset form and return to home
  document.getElementById("bookingForm").reset();
  selectedFlight = null;
  promoUsed = false;
  showHome();
};

// ===== INITIALIZE DATE INPUTS =====
document.addEventListener('DOMContentLoaded', function() {
  // Set min date to today
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('departDate').min = today;
  document.getElementById('returnDate').min = today;
});