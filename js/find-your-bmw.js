// Example car database
const cars = [
    {
      model: "BMW M3",
      year: 2020,
      price: 60000,
      mileage: 20000,
      image: "images/bmwm3.jpg",
    },
    {
      model: "BMW M5",
      year: 2021,
      price: 80000,
      mileage: 15000,
      image: "images/bmwm5.jpg",
    },
    {
      model: "BMW X5M",
      year: 2022,
      price: 95000,
      mileage: 10000,
      image: "images/bmwx5m.jpg",
    },
    {
      model: "BMW M4",
      year: 2023,
      price: 100000,
      mileage: 5000,
      image: "images/bmwm4.jpg",
    },
  ];
  
  // HTML container for displaying cars
  const carList = document.getElementById("carList");
  
  // Dropdown event listeners
  document.querySelectorAll(".form-select").forEach((dropdown) => {
    dropdown.addEventListener("change", filterCars);
  });
  
  // Function to filter cars based on dropdown selections
  function filterCars() {
    const selectedModel = document.getElementById("modelDropdown").value;
    const selectedYear = document.getElementById("yearDropdown").value;
    const selectedPrice = document.getElementById("priceDropdown").value;
    const selectedMileage = document.getElementById("mileageDropdown").value;
  
    // Filter cars based on selections
    const filteredCars = cars.filter((car) => {
      const matchesModel = selectedModel === "all" || car.model === selectedModel;
      const matchesYear = selectedYear === "all" || car.year.toString() === selectedYear;
      const matchesPrice = selectedPrice === "all" || car.price <= parseInt(selectedPrice);
      const matchesMileage = selectedMileage === "all" || car.mileage <= parseInt(selectedMileage);
      return matchesModel && matchesYear && matchesPrice && matchesMileage;
    });
  
    // Display filtered cars
    displayCars(filteredCars);
  }
  
  // Function to display cars dynamically
  function displayCars(carArray) {
    carList.innerHTML = ""; // Clear current car list
  
    if (carArray.length === 0) {
      carList.innerHTML = "<p class='text-center'>No cars match your criteria.</p>";
      return;
    }
  
    carArray.forEach((car) => {
      const carCard = `
        <div class="col-md-4">
          <div class="card shadow-sm">
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
      carList.insertAdjacentHTML("beforeend", carCard);
    });
  }
  
  // Display all cars initially
  displayCars(cars);
  
