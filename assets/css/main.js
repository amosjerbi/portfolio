// burger menu mobile //
const novile = document.querySelector(".novile");
const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".global-nav");
const links = document.querySelectorAll(".global-nav__list li");

novile.addEventListener("click", () => {
  burger.classList.toggle("burger_close");
  navLinks.classList.toggle("js-open");
  links.forEach(link => {
    link.classList.toggle("fade");
  });
});

// // Hide Header on on scroll down
// var prev = 0;
// var $window = $(window);
// var nav = $('.navbar');
//
// $window.on('scroll', function(){
//   var scrollTop = $window.scrollTop();
//   nav.toggleClass('nav-up', scrollTop > prev);
//   prev = scrollTop;
// });


// // navigation bar//
$(document).ready(function() {
  $(window).scroll(function() { // check if scroll event happened
    if ($(document).scrollTop() > 0) { // check if user scrolled more than 50 from top of the browser window
      $("nav").css("background-color", "var(--navcolor)"); // if yes, then change the color of class "navbar-fixed-top" to white (#0b0e2d90)
    } else {
      $("nav").css("background-color", "transparent"); // if not, change it back to transparent
    }
  });
});

// Animation on scroll//
AOS.init({
  once: true,
  offset: 200,
  duration: 600,
  easing: 'ease-out-quart',
  delay: 100,
});

// testimonials gallery//
var glide = new Glide('#glide', {
  type: 'carousel',
  perView: 2,
  autoplay: 2200,
  loop: true,
  focusAt: 'center',
  breakpoints: {
    800: {
      perView: 2
    },
    480: {
      perView: 1
    },
  }
})
glide.mount()

//Anchor scrolls //
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .on('click', function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 550, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });
