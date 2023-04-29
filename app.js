const form = document.querySelector("#form");
const locationInput = form.querySelector('input[type="text"]');
const mealSelect = form.querySelector('select[name="meal"]');
const pubTypeCheckboxes = form.querySelectorAll('input[type="checkbox"][name="pub-type"]');
const menuCheckboxes = form.querySelectorAll('input[type="checkbox"][name="menu"]');
const hygieneRadios = form.querySelectorAll('input[type="radio"][name="hygiene"]');
const tableUrl = "https://opendata.bristol.gov.uk/explore/embed/dataset/food-hygiene-ratings/table/?disjunctive.businesstype&disjunctive.rating&sort=ratingdate&location=9,51.48708,-1.3936&basemap=jawg.streets"
const mapUrl = "https://opendata.bristol.gov.uk/explore/embed/dataset/food-hygiene-ratings/map/?disjunctive.businesstype&disjunctive.rating&sort=ratingdate&location=9,51.48708,-1.3936&basemap=jawg.streets"
const tableBtn = document.querySelector('.table');
const mapBtn = document.querySelector('.map');
const iframeContent = document.querySelector('.main-content');

// Load the table iframe on page load
window.addEventListener('load', function() {
    let iframe = document.createElement('iframe');
    iframe.src = tableUrl;
    iframe.title = 'bristol data';
    iframeContent.appendChild(iframe);
    tableBtn.classList.add('active');
});

// Add event listener to tableBtn
tableBtn.addEventListener('click', (event) => {
    event.preventDefault();
    // Update iframe source to tableUrl
    iframeContent.querySelector('iframe').src = tableUrl;
    // Set tableBtn to active and remove active from mapBtn
    tableBtn.classList.add('active');
    mapBtn.classList.remove('active');
});

// Add event listener to mapBtn
mapBtn.addEventListener('click', (event) => {
    event.preventDefault();
    // Update iframe source to mapUrl
    iframeContent.querySelector('iframe').src = mapUrl;
    // Set mapBtn to active and remove active from tableBtn
    mapBtn.classList.add('active');
    tableBtn.classList.remove('active');
});


const values = {
    location: locationInput.value,
    meal: mealSelect.value,
    pubType: [],
    menu: [],
    hygiene: null,
};

function updateValues() {
    values.search = locationInput.value;
    values.meal = mealSelect.value;

    values.pubType = [];
    pubTypeCheckboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            values.pubType.push(checkbox.value);
        }
    });

    values.menu = [];
    menuCheckboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            values.menu.push(checkbox.value);
        }
    });

    hygieneRadios.forEach((radio) => {
        if (radio.checked) {
            values.hygiene = radio.value;
        }
    });
}

locationInput.addEventListener('change', updateValues);
mealSelect.addEventListener('change', updateValues);

pubTypeCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('click', () => {
        updateValues()
    });
});

menuCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('click', ()=> {
        console.log("Hello world")
        updateValues()
    });
});

hygieneRadios.forEach((radio) => {
    radio.addEventListener('change', updateValues);
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    location.reload();
});


