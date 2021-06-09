$(document).ready(function () {
    function isScrolledIntoView(elem) {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();

        var elemTop = $(elem).offset().top;
        var elemBottom = elemTop + $(elem).height();

        return elemBottom <= docViewBottom && elemTop >= docViewTop;
    }
    $(".cardd").each(function () {
        if (isScrolledIntoView(this) === true) {
            if (!$(this).hasClass("animate__animated animate__fadeInUp")) {
                $(this).removeClass("hidden")
                $(this).addClass("animate__animated animate__fadeInUp");
            }
        }
    });
    $(".testimonials .card").each(function () {
        if (isScrolledIntoView(this) === true) {
            if (!$(this).hasClass("animate__animated animate__fadeInUp")) {
                $(this).removeClass("hidden")
                $(this).addClass("animate__animated animate__fadeInUp");
            }
        }
    }); 
    
    // If element is scrolled into view, fade it in
    $(window).scroll(function () {
        $(".cardd").each(function () {
            if (isScrolledIntoView(this) === true) {
                if (!$(this).hasClass("animate__animated animate__fadeInUp")) {
                    $(this).removeClass("hidden")
                    $(this).addClass("animate__animated animate__fadeInUp");
                }
            }
        });
        $(".testimonials .card").each(function () {
            if (isScrolledIntoView(this) === true) {
                if (!$(this).hasClass("animate__animated animate__fadeInUp")) {
                    $(this).removeClass("hidden")
                    $(this).addClass("animate__animated animate__fadeInUp");
                }
            }
        }); 
    });

});

async function isPrivate(){
    const isPrivateModeOn = await isPrivateMode()
    if(isPrivateModeOn){
        $("#sp_img").attr("src", "/images/catcom.png")
    }
}
isPrivate()