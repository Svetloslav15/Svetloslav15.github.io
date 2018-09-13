$(() => {
    $('#section-one').hover(function () {
        $('#web-design-section').fadeIn();
        $('#first-p').fadeOut();
        $('#first-p').hide();
        $('#web-design-text').fadeOut();
        $('#web-design-text').hide();
        $('#web-design-section').show();
    }, function () {
        $('#web-design-section').fadeOut();
        $('#web-design-section').hide();
        $('#first-p').show();
        $('#web-design-text').show();
    });
    $('#section-two').hover(function () {
        $('#branding-section').fadeIn();
        $('#second-p').fadeOut();
        $('#second-p').hide();
        $('#branding-text').fadeOut();
        $('#branding-text').hide();
        $('#branding-section').show();
    }, function () {
        $('#branding-section').fadeOut();
        $('#branding-section').hide();
        $('#second-p').show();
        $('#branding-text').show();
    });
    $('#section-three').hover(function () {
        $('#3d-production-section').fadeIn();
        $('#production-text').fadeOut();
        $('#production-text').fadeOut();
        $('#third-p').hide();
        $('#third-p').hide();
        $('#3d-production-section').show();
    }, function () {
        $('#3d-production-section').fadeOut();
        $('#3d-production-section').hide();
        $('#production-text').show();
        $('#third-p').show();
    });
});