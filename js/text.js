
function enableSmoothScrolling() {
  const links = document.querySelectorAll("a.nav-link");
  links.forEach(link => {
    link.addEventListener("click", function (event) {
      const targetId = link.getAttribute("href");
      if (targetId.startsWith("#")) {
        event.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });
}


function updateFooterYear() {
  const yearElement = document.getElementById("footerYear");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}


function highlightActiveNav() {
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  const currentLocation = window.location.pathname.split("/").pop();

  navLinks.forEach(link => {
    if (link.getAttribute("href") === currentLocation) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}


function addCardHoverEffect() {
  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px)";
      card.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.2)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
      card.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
    });
  });
}


function setupCarFiltering() {
  const cars = [
    { model: "BMW 3 Series", year: 2022, price: 41250, mileage: 5000, image: "assets/images/bmw3.jpg" },
    { model: "BMW 5 Series", year: 2021, price: 54200, mileage: 10000, image: "assets/images/bmw5.jpg" },
    { model: "BMW X5", year: 2023, price: 65400, mileage: 2000, image: "assets/images/bmwx5.jpg" },
    { model: "BMW M4", year: 2020, price: 72000, mileage: 15000, image: "assets/images/bmwm4.jpg" },
  ];

  const carList = document.getElementById("carList");
  const modelDropdown = document.getElementById("modelDropdown");
  const yearDropdown = document.getElementById("yearDropdown");
  const priceInput = document.getElementById("priceInput");
  const mileageInput = document.getElementById("mileageInput");

  function displayCars(filteredCars) {
    if (!carList) return;
    carList.innerHTML = ""; 
    filteredCars.forEach(car => {
      const carCard = `
        <div class="col-md-3 car-card">
          <div class="card">
            <img src="${car.image}" class="card-img-top" alt="${car.model}">
            <div class="card-body">
              <h5 class="card-title">${car.model}</h5>
              <p class="card-text">Year: ${car.year}</p>
              <p class="card-text">Price: $${car.price.toLocaleString()}</p>
              <p class="card-text">Mileage: ${car.mileage.toLocaleString()} miles</p>
            </div>
          </div>
        </div>
      `;
      carList.innerHTML += carCard;
    });
    addCardHoverEffect();
  }

  function filterCars() {
    const selectedModel = modelDropdown ? modelDropdown.value : "all";
    const selectedYear = yearDropdown ? yearDropdown.value : "all";
    const maxPrice = priceInput ? parseInt(priceInput.value) || Infinity : Infinity;
    const maxMileage = mileageInput ? parseInt(mileageInput.value) || Infinity : Infinity;

    const filteredCars = cars.filter(car => {
      return (
        (selectedModel === "all" || car.model === selectedModel) &&
        (selectedYear === "all" || car.year === parseInt(selectedYear)) &&
        car.price <= maxPrice &&
        car.mileage <= maxMileage
      );
    });

    displayCars(filteredCars);
  }

  if (modelDropdown && yearDropdown && priceInput && mileageInput) {
    modelDropdown.addEventListener("change", filterCars);
    yearDropdown.addEventListener("change", filterCars);
    priceInput.addEventListener("input", filterCars);
    mileageInput.addEventListener("input", filterCars);
  }

  displayCars(cars); 
}


document.addEventListener("DOMContentLoaded", () => {
  enableSmoothScrolling();
  updateFooterYear();
  highlightActiveNav();
  addCardHoverEffect();
  setupCarFiltering();
});

