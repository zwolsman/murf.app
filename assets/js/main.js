$(document).ready(function() {
  $("html").addClass("js-enabled")

  setupNivoLightbox()
  setupDense()

  $(window).load(function() {
    $(".js-preloader").fadeOut(800, () => {
      $(".js-main-container").fadeIn(800)

      setupScrollReveal()
      setupProgressBarAnimation()
    })
  })
})

function setupProgressBarAnimation() {
  const $animationElements = $("[class*='a-']")
  const $window = $(window)

  $window.on("scroll resize", function() {
    const windowHeight = $window.height()
    const windowTopPosition = $window.scrollTop()
    const windowBottomPosition = windowTopPosition + windowHeight

    $.each($animationElements, function() {
      const $element = $(this)
      const elementHeight = $element.outerHeight()
      const elementTopPosition = $element.offset().top
      const elementBottomPosition = elementTopPosition + elementHeight

      // Check to see if this current container is within viewport
      if (
        elementBottomPosition >= windowTopPosition &&
        elementTopPosition <= windowBottomPosition
      ) {
        $element.addClass("in-view")

        // Animate progress bar
        if ($element.hasClass("a-progress-bar")) {
          $element.css("width", $element.attr("data-iq") / 3 + "%")
        }
      }
      //else {
      //    $element.removeClass('in-view')
      //}
    })
  })

  $window.trigger("scroll")
}

function setupDense() {
  if ($.isFunction($.fn.dense)) {
    $("img").dense({
      glue: "@"
    })
  }
}

function setupScrollReveal() {
  if (typeof ScrollReveal === "undefined" || !$.isFunction(ScrollReveal))
    return

  window.sr = ScrollReveal()

  const defaultConfig = {
    duration: 500,
    delay: 0,
    easing: "ease",
    scale: 1,
    mobile: false
  }

  const headerConfig = {
    ...defaultConfig,
    duration: 1200,
    delay: 700
  }

  const footerConfig = {
    ...defaultConfig,
    duration: 1500,
    distance: 0,
    viewOffset: { top: 0, right: 0, bottom: 100, left: 0 }
  }

  const defaultDelay = 175

  sr.reveal(".a-header", headerConfig, defaultDelay)
  sr.reveal(".a-footer", footerConfig, defaultDelay)
}

function setupNivoLightbox() {
  if ($.isFunction($.fn.nivoLightbox)) {
    const $selector = $(".js-lightbox")

    // Hide all titles to prevent tooltip from showing
    $selector.each(function() {
      const title = $(this).attr("title")
      $(this).attr("data-title", title)
      $(this).attr("title", "")
    })

    // On click, add titles back, so lightbox can display them
    $selector.click(function() {
      $selector.each(function() {
        const title = $(this).attr("data-title")
        $(this).attr("title", title)
      })
    })

    $selector.nivoLightbox({
      effect: "fade", // The effect to use when showing the lightbox
      theme: "default", // The lightbox theme to use
      keyboardNav: true, // Enable/Disable keyboard navigation (left/right/escape)
      clickOverlayToClose: true, // If false clicking the "close" button will be the only way to close the lightbox
      onInit: () => {}, // Callback when lightbox has loaded
      beforeShowLightbox: () => {}, // Callback before the lightbox is shown
      afterShowLightbox: (lightbox) => {}, // Callback after the lightbox is shown
      beforeHideLightbox: () => {}, // Callback before the lightbox is hidden
      //afterHideLightbox: function(){},              // Callback after the lightbox is hidden
      onPrev: (element) => {}, // Callback when the lightbox gallery goes to previous item
      onNext: (element) => {}, // Callback when the lightbox gallery goes to next item
      afterHideLightbox: () => selector.attr("title", ""),
      errorMessage:
        "The requested content cannot be loaded. Please try again later." // Error message when content can't be loaded
    })
  }
}
