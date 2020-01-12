$(document).ready(function() {
    $(".owl-carousel").owlCarousel({
        items: 2,
        singleItem: true,
        smartSpeed: 1000,
        autoplay: true,
        autoplayHoverPause: true,
        autoplayTimeout: 4000,
        loop: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            900: {
                items: 2
            }
        }
    });

    $("#go-main-cont").on("click", function() {
        $("#main-cont").toggleClass("active");
        $("#go-main-cont").toggleClass("active");
        $("#left-cont").toggleClass("active");
        $(".fade").toggleClass("active");
        $("#side-cont").toggleClass("active");
        $("body").css("overflow", "auto");
        $('#circle').toggleClass('active');
        $('#main-logo').toggleClass('active')
    });

    $("#go-main-cont-mb").on("click", function() {
        $("#main-cont").toggleClass("active");
        $("#side-cont").toggleClass("active");
        $(".fade").toggleClass("active");
        $("body").css("overflow", "auto");
        $("#go-main-cont-mb").toggleClass("active");
        $("#left-cont").toggleClass("active");
        $("#circle").toggleClass("active");
        $('#main-logo').toggleClass('active')
    });

    $("#logo").on("click", function() {
        $("#main-cont").toggleClass("active");
        $("#side-cont").toggleClass("active");
        $("#left-cont").toggleClass("active");
        $("#go-main-cont").toggleClass("active");
        $(".fade").toggleClass("active");
        $("body").css("overflow", "hidden");
        $("#go-main-cont-mb").toggleClass("active");
        $('#circle').toggleClass('active');
        $('#main-logo').toggleClass('active')
    });

    $("#hamburger").on("click", function() {
        $('#hb-first').toggleClass('active');
        $('#hb-second').toggleClass('active');
        $('#hb-third').toggleClass('active');
        $('#hamburger-cont').toggleClass('active');
        $('#side-nav').toggleClass('active');
    });

    // top-nav actions
    $("#about").on("click", function() {
        $("#about").addClass("active");
        $("#works").removeClass("active");
        $("#contacts").removeClass("active");
        document
            .getElementById("about-title")
            .scrollIntoView({ block: "start" });
    });

    $(window).on("scroll", function(e) {
        if (
            document.getElementById("about-page").getBoundingClientRect()
                .bottom >= 30 &&
            document.getElementById("about-page").getBoundingClientRect()
                .bottom <= innerHeight
        ) {
            $("#about").addClass("active");
            $("#works").removeClass("active");
            $("#contacts").removeClass("active");
        }
    });

    $("#works").on("click", function() {
        $("#about").removeClass("active");
        $("#works").addClass("active");
        $("#contacts").removeClass("active");
        document
            .getElementById("myworks-title")
            .scrollIntoView({ block: "start" });
    });

    $(window).on("scroll", function() {
        if (
            document.getElementById("myworks-title").getBoundingClientRect()
                .top >= -10 &&
            document.getElementById("myworks-title").getBoundingClientRect()
                .bottom <= innerHeight
        ) {
            $("#about").removeClass("active");
            $("#works").addClass("active");
            $("#contacts").removeClass("active");
        } else if (
            document.getElementById("myworks").getBoundingClientRect()
                .bottom >= innerHeight - 200 &&
            document.getElementById("myworks").getBoundingClientRect()
                .bottom <= innerHeight
        ) {
            $("#about").removeClass("active");
            $("#works").addClass("active");
            $("#contacts").removeClass("active");
        }
    });

    $("#contacts").on("click", function() {
        $("#about").removeClass("active");
        $("#works").removeClass("active");
        $("#contacts").addClass("active");
        document
            .getElementById("contact-title")
            .scrollIntoView({ block: "start" });
    });



    $(window).on("scroll", function() {
        if (
            document.getElementById("contact-title").getBoundingClientRect()
                .top >= -10 &&
            document.getElementById("contact-title").getBoundingClientRect()
                .top <= 100
        ) {
            $("#about").removeClass("active");
            $("#works").removeClass("active");
            $("#contacts").addClass("active");
        }
    });

    // Viewport checker
    class viewPortChecker {
        constructor(element, totalWidth, percent) {
            this.element = element;
            this.totalWidth = totalWidth;
            this.percent = percent;
        }

        // Checks if an element is in the viewport
        isInViewPort() {
            const windowHeight = innerHeight;
            const elementTop = this.element.getBoundingClientRect().bottom;

            if (windowHeight > elementTop && elementTop > 0) {
                return true;
            } else {
                return false;
            }
        }

        // if element is in viewport, animate progresse bar
        animte() {
            $(window).on("resize scroll", e => {
                if (this.isInViewPort(this.element)) {
                    this.element.style.width = `${(this.percent / 100) *
                        totalWidth}px`;
                    this.element.innerHTML = `${this.percent}%`;
                } else {
                    this.element.style.width = 0;
                    this.element.innerHTML = `${this.percent}%`;
                }
            });
        }

        fade() {
            $(window).on("resize scroll", e => {
                if (this.isInViewPort(this.element)) {
                    this.element.style.top = 0;
                    this.element.style.opacity = 1;
                } else {
                    this.element.style.top = "30px";
                    this.element.style.opacity = 0.1;
                }
            });
        }
    }

    var totalWidth = 250;
    var progress = document.getElementsByClassName("progress");
    var fade = document.getElementsByClassName("fade-onviewport");

    // Viewport checker progress bar intstantiate
    for (var i = 0; i < progress.length; i++) {
        new viewPortChecker(
            progress[i],
            totalWidth,
            progress[i].getAttribute("data-percent")
        ).animte();
    }

    // Viewport checker fade intstantiate
    for (var i = 0; i < fade.length; i++) {
        new viewPortChecker(fade[i]).fade();
    }
    
});


