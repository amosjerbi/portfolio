// $('.navbar').hide(); $(window).scroll(function () { if ($(this).scrollTop() > 20) { $('.navbar').slideDown(); } else { $('.navbar').slideUp(); } });
//-->

$(document).ready(function() {

  // Check for click events on the navbar burger icon
  $(".novile").click(function() {
    $('.burger').toggleClass('burger_close');
    $('.global-nav').toggleClass('js-open');


  });
});

window.onscroll = () => {
  const nav = document.querySelector('#navbar');
  if (this.scrollY <= 10) nav.className = '';
  else nav.className = 'navsolid';
};

AOS.init({
  once: true,
  offset: 200,
  duration: 600,
  easing: 'ease-out-quart',
  delay: 100,
});

var glide = new Glide('#glide', {
  type: 'carousel',
  perView: 2,
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

//Anchor scroll
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
