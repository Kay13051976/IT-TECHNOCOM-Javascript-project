// carosel
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

const courses = document.querySelector("#courses-list"),
  shoppingCartContent = document.querySelector("#cart-content tbody"),
  clearCartBtn = document.querySelector("#clear-cart");

loadEventListeners();
function loadEventListeners() {
  courses.addEventListener("click", buyCourse);
  shoppingCartContent.addEventListener("click", removeCourse);
  clearCartBtn.addEventListener("click", clearCart);

  function removeCourse(e) {
    if (e.target.classList.contains("remove")) {
      e.target.parentElement.parentElement.remove();
    }
  }

  function clearCart() {
    while (shoppingCartContent.firstChild) {
      shoppingCartContent.removeChild(shoppingCartContent.firstChild);
    }
  }

  function buyCourse(e) {
    if (e.target.classList.contains("add-to-cart")) {
      const course = e.target.parentElement.parentElement;
      getCourseInfo(course);
    }
  }
}

function getCourseInfo(course) {
  // Create and Object with course data
  const courseInfo = {
    image: course.querySelector("img").src,
    title: course.querySelector("h4").textContent,
    price: course.querySelector(".price span").textContent,
    id: course.querySelector("a").getAttribute("data-id"),
  };
  addToCart(courseInfo);
}
function addToCart(course) {
  const row = document.createElement("tr");

  row.innerHTML = `
        <tr>
            <td>
                <img src="${course.image}" width="100">
            </td>
            <td>
                ${course.title}
            </td>
            <td>
                ${course.price}
            </td>
            <td>
                <a href="#" class="remove" data-id="${course.id}">X</a>
            </td>
        </tr>
    `;

  shoppingCartContent.appendChild(row);
}
