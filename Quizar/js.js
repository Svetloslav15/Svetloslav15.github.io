(() => {
    $('#my-profile-icon').on("click", function () {
        if ($('#my-profile-div').css('display') == "none"){
            $('#my-profile-div').show();
        }
        else {
            $('#my-profile-div').hide();
        }
    });
    $('#menu-arrow-collapse').on("click", function () {
        $('#my-profile-div').hide();
    });
    $('#role').on("change", function () {
       let value = $('#role').val();
        console.log(value);
        if (value === "student"){
           $('#subject-menu').hide();
           $('#class-menu').show();
       }
       else if (value === "teacher"){
            $('#class-menu').hide();
            $('#subject-menu').show();
       }
    });
})();
