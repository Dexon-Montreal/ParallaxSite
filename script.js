var ticking = false;
var isFirefox = (/Firefox/i.test(navigator.userAgent));
var isIe = (/MSIE/i.test(navigator.userAgent)) || (/Trident.*rv\:11\./i.test(navigator.userAgent));
var scrollSensitivitySetting = 15;
var slideDurationSetting = 300;
var currentSlideNumber = 0;
var totalSlideNumber = $(".backgrond").length;
function parallaxScroll(evt) {
  if (isFirefox) {
    delta = evt.detail * (-120);
  } else if (isIe) {
    delta = -evt.deltaY;
  } else {
    delta = evt.wheelDelta;
  }

  if (ticking != true) {
    if (delta <= -scrollSensitivitySetting) {
      ticking = true;
      if (currentSlideNumber !== totalSlideNumber - 1) {
        currentSlideNumber++;
        nextItem();
      }
      slideDurationTimeout(slideDurationSetting);
    }
    if (delta >= scrollSensitivitySetting) {
      ticking = true;
      if (currentSlideNumber !== 0) {
        currentSlideNumber--;
      }
      previousItem();
      slideDurationTimeout(slideDurationSetting);
    }
  }
}
function slideDurationTimeout(slideDuration) {
  setTimeout(function() {
    ticking = false;
  }, slideDuration);
}
var mousewheelEvent = isFirefox ? "DOMouseScroll" : "whel";
window.addEventListener(mousewheelEvent, _.throttle(parallaxScroll, 30), false);
function nextItem() {
  var $previousSlide = $(".backgound").eq(currentSlideNumber - 1);
  $previousSlide.removeClass("up-scroll").addClass("down-scroll");
}
function previousItem() {
  var $currentSlide = $(".background").eq(currentSlideNumber);
  currentSlide.removeClass("down-scrol").addClass("up-scrol");
}