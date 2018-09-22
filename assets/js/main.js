$(document).ready(function() {

    $('html').addClass('js-enabled');

    setupNivoLightbox();
    setupDense();

    $(window).load(function() {
        $(".js-preloader").fadeOut(800, () => {
            $(".js-main-container").fadeIn(800);

            setupScrollReveal();
            setupProgressBarAnimation();
        });
    });

});



function setupProgressBarAnimation()
{
    var $animationElements = $("[class*='a-']");
    var $window = $(window);

    $window.on('scroll resize', function() {
        var windowHeight = $window.height();
        var windowTopPosition = $window.scrollTop();
        var windowBottomPosition = (windowTopPosition + windowHeight);

        $.each($animationElements, function() {
            var $element = $(this);
            var elementHeight = $element.outerHeight();
            var elementTopPosition = $element.offset().top;
            var elementBottomPosition = (elementTopPosition + elementHeight);

            // Check to see if this current container is within viewport
            if ((elementBottomPosition >= windowTopPosition) &&
                (elementTopPosition <= windowBottomPosition)) {
                $element.addClass('in-view');

                // Animate progress bar
                if ($element.hasClass('a-progress-bar')) {
                    $element.css('width', ($element.attr('data-iq') / 3)+ '%');
                }

            }
            //else {
            //    $element.removeClass('in-view');
            //}
        });
    });

    $window.trigger('scroll');

}



function setupDense()
{
    if($.isFunction($.fn.dense)) {

        $('img').dense({
            'glue': '@'
        });

    }
}



function setupScrollReveal()
{
    if(typeof ScrollReveal !== 'undefined' && $.isFunction(ScrollReveal)) {

        window.sr = ScrollReveal();

        const defaultConfig = {
            duration: 500,
            delay: 0,
            easing: 'ease',
            scale: 1,
            mobile: false
        };

        const headerConfig = {
            ...defaultConfig,
            duration: 1200,
            delay: 700
        }
        
        const footerConfig = {
            ...defaultConfig,
            duration: 1500,
            distance: 0,
            viewOffset: {top: 0, right: 0, bottom: 100, left: 0}
        }

        const defaultDelay = 175;

        sr.reveal('.a-header', headerConfig, defaultDelay);
        sr.reveal('.a-footer', footerConfig, defaultDelay);

    }

}



function setupNivoLightbox()
{
    if($.isFunction($.fn.nivoLightbox))
    {
        var $selector = $('.js-lightbox');

        // Hide all titles to prevent tooltip from showing
        $selector.each(function() {
            var title = $(this).attr('title');
            $(this).attr('data-title', title);
            $(this).attr('title', '');
        });

        // On click, add titles back, so lightbox can display them
        $selector.click(function() {
            $selector.each(function() {
                var title = $(this).attr('data-title');
                $(this).attr('title', title);
            });
        });

        $selector.nivoLightbox({
            effect: 'fade',                               // The effect to use when showing the lightbox
            theme: 'default',                             // The lightbox theme to use
            keyboardNav: true,                            // Enable/Disable keyboard navigation (left/right/escape)
            clickOverlayToClose: true,                    // If false clicking the "close" button will be the only way to close the lightbox
            onInit: function(){},                         // Callback when lightbox has loaded
            beforeShowLightbox: function(){},             // Callback before the lightbox is shown
            afterShowLightbox: function(lightbox){},      // Callback after the lightbox is shown
            beforeHideLightbox: function(){},             // Callback before the lightbox is hidden
            //afterHideLightbox: function(){},              // Callback after the lightbox is hidden
            onPrev: function(element){},                  // Callback when the lightbox gallery goes to previous item
            onNext: function(element){},                  // Callback when the lightbox gallery goes to next item
            afterHideLightbox: function() {
                // Remove title to prevent tooltip from showing
                $selector.attr('title', '');
            },
            errorMessage: 'The requested content cannot be loaded. Please try again later.' // Error message when content can't be loaded
        });

    }
}