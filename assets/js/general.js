function footerAdj() {
    var footerH = $("footer").outerHeight();
    $("footer").css({
        "margin-top": -footerH
    });
    $(".wrapper").css({
        "padding-bottom": footerH
    });
}

function headerAdj() {
    var headerH = $("header").innerHeight();
    $(".main-content").css({
        "padding-top": headerH
    });
}
// set cookie
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// get cookie
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

function equalHeight() {
    $.fn.extend({
        equalHeights: function () {
            var top = 0;
            var row = [];
            var classname = ("equalHeights" + Math.random()).replace(".", "");
            $(this)
                .each(function () {
                    var thistop = $(this).offset().top;
                    if (thistop > top) {
                        $("." + classname).removeClass(classname);
                        top = thistop;
                    }
                    $(this).addClass(classname);
                    $(this).height("auto");
                    var h = Math.max.apply(
                        null,
                        $("." + classname)
                        .map(function () {
                            return $(this).outerHeight();
                        })
                        .get()
                    );
                    $("." + classname).outerHeight(h);
                })
                .removeClass(classname);
        }
    });
    $(".classname").equalHeights();
}
// function zoomText(){
//   var size=parseInt($('html').css('font-size'));
// }

var nVer = navigator.appVersion;
var nAgt = navigator.userAgent;
var browserName = navigator.appName;
var fullVersion = "" + parseFloat(navigator.appVersion);
var majorVersion = parseInt(navigator.appVersion, 10);
var nameOffset, verOffset, ix;

// In Opera, the true version is after "Opera" or after "Version"
if ((verOffset = nAgt.indexOf("Opera")) != -1) {
    browserName = "Opera";
    fullVersion = nAgt.substring(verOffset + 6);
    if ((verOffset = nAgt.indexOf("Version")) != -1) fullVersion = nAgt.substring(verOffset + 8);
}
// In MSIE, the true version is after "MSIE" in userAgent
else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
    browserName = "Microsoft Internet Explorer";
    fullVersion = nAgt.substring(verOffset + 5);
}
// In Chrome, the true version is after "Chrome"
else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
    browserName = "Chrome";
    fullVersion = nAgt.substring(verOffset + 7);
}
// In Safari, the true version is after "Safari" or after "Version"
else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
    browserName = "Safari";
    fullVersion = nAgt.substring(verOffset + 7);
    if ((verOffset = nAgt.indexOf("Version")) != -1) fullVersion = nAgt.substring(verOffset + 8);
}
// In Firefox, the true version is after "Firefox"
else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
    browserName = "Firefox";
    fullVersion = nAgt.substring(verOffset + 8);
}
// In most other browsers, "name/version" is at the end of userAgent
else if ((nameOffset = nAgt.lastIndexOf(" ") + 1) < (verOffset = nAgt.lastIndexOf("/"))) {
    browserName = nAgt.substring(nameOffset, verOffset);
    fullVersion = nAgt.substring(verOffset + 1);
    if (browserName.toLowerCase() == browserName.toUpperCase()) {
        browserName = navigator.appName;
    }
}

var OSName = "UnknownOS";
if (navigator.appVersion.indexOf("Win") != -1) OSName = "Windows";
if (navigator.appVersion.indexOf("Mac") != -1) OSName = "MacOS";
if (navigator.appVersion.indexOf("X11") != -1) OSName = "UNIX";
if (navigator.appVersion.indexOf("Linux") != -1) OSName = "Linux";
$("body,html")
    .addClass(browserName.toLowerCase())
    .addClass(OSName.toLowerCase());

if (navigator.userAgent.match(/iP(hone|od|ad)/i)) {
    $("body,html").addClass("browser-ios");
}

function isIE() {
    ua = navigator.userAgent;
    /* MSIE used to detect old browsers and Trident used to newer ones*/
    var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;

    return is_ie;
}

$(document).ready(function () {
    // IE detection

    /*$('.menu-wrap li').click(function() {
        $(this).closest(".menu-wrap li").toggleClass('submenu-open');
    });*/
    // check if cookie exists
    if (document.cookie.indexOf("fontSize=") >= 0 && document.cookie.indexOf("containerWidth=") >= 0) {
        var ft_size = getCookie("fontSize");
        var container_width = getCookie("containerWidth");
        $("html").css("font-size", parseInt(ft_size));
        $(".container").css("max-width", parseInt(container_width));
    }

    $(".menu-wrap li").click(function () {
        $(".menu-wrap li").removeClass("submenu-open");
        $(this).addClass("submenu-open");
    });

    function isTouchDevice() {
        return true == ("ontouchstart" in window || (window.DocumentTouch && document instanceof DocumentTouch));
    }

    if (isTouchDevice() === true) {
        $("body")
            .removeClass("desk")
            .addClass("mob");
    } else {
        $("body")
            .removeClass("mob")
            .addClass("desk");
    }
    FastClick.attach(document.body);

    if (isIE()) {
        $("body").addClass("ie-browser");
        $("body").on("mousewheel", function () {
            // remove default behavior
            event.preventDefault();

            //scroll without smoothing
            var wheelDelta = event.wheelDelta;
            var currentScrollPosition = window.pageYOffset;
            window.scrollTo(0, currentScrollPosition - wheelDelta);
        });
    } else {
        $("body").removeClass("ie-browser");
    }
    $(".mob a[target=_blank]").each(function () {
        if ($(this).attr("target") == "_blank") {
            $(this).attr("data-target-redirect", "_blank");
            $(this).removeAttr("target");
        }
    });
    $(".mob a[data-target-redirect]").on("touchend", function (e) {
        var el = $(this);
        var link = el.attr("href");
        console.log(el);
        e.stopPropagation();
        e.preventDefault();
        debugger;
        if ($(this).attr("data-target-redirect") == "_blank") {
            window.open(link, "_blank");
        } else {
            window.location = link;
        }
    });

    footerAdj();
    headerAdj();

    $("a[href='#']").click(function (e) {
        e.preventDefault();
    });

    /* Placeholder */
    $("[placeholder]").each(function () {
        $(this).attr("data-placeholder", this.placeholder);

        $(this).bind("focus", function () {
            this.placeholder = "";
        });
        $(this).bind("blur", function () {
            this.placeholder = $(this).attr("data-placeholder");
        });
    });

    // zoom in-out
    var f_size = parseInt($("html").css("font-size"));
    var cont_width = parseInt($(".container").css("max-width"));
    var topH_height = $(".top-header").innerHeight();
    $(".zoom-inout-block a").on("click", function () {
        if ($(this).hasClass("zoom-in")) {
            if (f_size <= 14) {
                f_size += 2;
                cont_width += 120;
                if (f_size <= 11) {
                    cont_width = 1200;
                    f_size -= 1;
                    $("html").css("font-size", f_size);
                    $(".container").css("max-width", cont_width);
                    setCookie("fontSize", f_size);
                    setCookie("containerWidth", cont_width);
                }
                $("html").css("font-size", f_size);
                $(".container").css("max-width", cont_width);
                setCookie("fontSize", f_size);
                setCookie("containerWidth", cont_width);
            }
            $("html").css("font-size", f_size);
            $(".container").css("max-width", cont_width);
            setCookie("fontSize", f_size);
            setCookie("containerWidth", cont_width);
        } else if ($(this).hasClass("zoom-out")) {
            f_size -= 2;
            cont_width -= 120;
            if (f_size < 10) {
                cont_width = 1200;
                f_size += 1;
                if (f_size <= 7) {
                    f_size = 7;
                    $("html").css("font-size", f_size);
                    $(".container").css("max-width", cont_width);
                    setCookie("fontSize", f_size);
                    setCookie("containerWidth", cont_width);
                }
                $("html").css("font-size", f_size);
                $(".container").css("max-width", cont_width);
                setCookie("fontSize", f_size);
                setCookie("containerWidth", cont_width);
            }
            $("html").css("font-size", f_size);
            $(".container").css("max-width", cont_width);
            setCookie("fontSize", f_size);
            setCookie("containerWidth", cont_width);
        } else {
            f_size = 10;
            cont_width = 1200;
            $("html").css("font-size", f_size);
            $(".container").css("max-width", "");
            setCookie("fontSize", f_size);
            setCookie("containerWidth", "");
        }

        setTimeout(function () {
            footerAdj();
            headerAdj();
        }, 350);

        $(window).scroll(function () {
            if ($(window).scrollTop() > $(".site-header").outerHeight()) {
                var topH_height = $(".top-header").innerHeight();
                $("header").css("top", -topH_height);
            } else {
                $("header").css("top", "");
            }
        });
    });

    // mobile-menu
    $(".nav-icon").on("click", function () {
        $("body").toggleClass("open-menu");
    });

    $("body").on("click touchend", ".back-btn", function (e) {
        $("li").removeClass("active-submenu");
        // e.preventDefault();
        // e.stopPropagation();
    });
    // mobile sum-menu toggle
    $(document).on("click touchend", ".menu-wrap li.menu-item-has-children em", function (e) {
        if ($(window).width() < 992) {
            // e.stopPropagation();
            // var $this = $(this).closest(".menu-wrap").children('li');
            $(".menu-wrap li").removeClass("active-submenu");
            $(this).closest('li.menu-item-has-children').addClass("active-submenu");

            // $this.toggleClass("active-submenu");
            // $this.siblings(".active-submenu").removeClass("active-submenu")
        }
    });
    $(".mob .menu-wrap li.menu-item-has-children").on("click touchend", function () {
        if ($(this).find(".sub-menu").hasClass("touch-open-menu")) {
            $(this).find(".sub-menu").removeClass("touch-open-menu");
        } else {
            $(this).find(".sub-menu").addClass("touch-open-menu");
        }
    });
    
    $(".nav-icon").on("click", function () {
        $(".menu-wrap li").removeClass("active-submenu");
    });
    
    $('li.menu-item-has-children').append('<em></em>');

    // body theme class
    // $('nav .menu-wrap li a').click(function(e) {
    //   var menu_active = $('.menu-wrap li a.active');
    //   var data_att = $(this).data('tag');
    //   menu_active.removeClass('active');
    //   $(this).addClass('active');
    //   if ($(this).data("tag") === 'yellow-orange-theme') {
    //     $("body").addClass("yellow-orange-theme");
    //     $("body").removeClass("green-skyblue-theme");
    //     $("body").removeClass("lieghtgreen-green-theme");
    //     $("body").removeClass("pink-blue-theme");
    //     $("body").removeClass("green-blue-theme");
    //     $("body").removeClass("white-theme");

    //   } else if ($(this).data("tag") === 'green-skyblue-theme') {
    //     $("body").removeClass("yellow-orange-theme");
    //     $("body").addClass("green-skyblue-theme");
    //     $("body").removeClass("lieghtgreen-green-theme");
    //     $("body").removeClass("pink-blue-theme");
    //     $("body").removeClass("green-blue-theme");
    //     $("body").removeClass("white-theme");

    //   } else if ($(this).data("tag") === 'lieghtgreen-green-theme') {
    //    $("body").removeClass("yellow-orange-theme");
    //    $("body").removeClass("green-skyblue-theme");
    //    $("body").addClass("lieghtgreen-green-theme");
    //    $("body").removeClass("pink-blue-theme");
    //    $("body").removeClass("green-blue-theme");
    //    $("body").removeClass("white-theme");

    //  } else if ($(this).data("tag") === 'pink-blue-theme') {
    //   $("body").removeClass("yellow-orange-theme");
    //   $("body").removeClass("green-skyblue-theme");
    //   $("body").removeClass("lieghtgreen-green-theme");
    //   $("body").addClass("pink-blue-theme");
    //   $("body").removeClass("green-blue-theme");
    //   $("body").removeClass("white-theme");

    // }else if ($(this).data("tag") === 'green-blue-theme') {
    //   $("body").removeClass("yellow-orange-theme");
    //   $("body").removeClass("green-skyblue-theme");
    //   $("body").removeClass("lieghtgreen-green-theme");
    //   $("body").removeClass("pink-blue-theme");
    //   $("body").addClass("green-blue-theme");
    //   $("body").removeClass("white-theme");

    // } else if ($(this).data("tag") === 'white-theme') {
    //   $("body").removeClass("yellow-orange-theme");
    //   $("body").removeClass("green-skyblue-theme");
    //   $("body").removeClass("lieghtgreen-green-theme");
    //   $("body").removeClass("pink-blue-theme");
    //   $("body").removeClass("green-blue-theme");
    //   $("body").addClass("white-theme");

    // } else {
    //   $("body").removeClass("yellow-orange-theme");
    //   $("body").removeClass("green-skyblue-theme");
    //   $("body").removeClass("lieghtgreen-green-theme");
    //   $("body").removeClass("pink-blue-theme");
    //   $("body").removeClass("green-blue-theme");
    //   $("body").removeClass("white-theme");

    // }

    // });

    // footer accordion
    $(".footer-menu-col h5").on("click", function () {
        var $this = $(this).closest(".footer-menu-col");
        if ($(window).width() < 768) {
            $this.toggleClass("open-accordion");
            $this
                .find("ul")
                .stop(true, false)
                .slideToggle();
            $this
                .siblings(".open-accordion")
                .removeClass("open-accordion")
                .find("ul")
                .stop(true, false)
                .slideUp();
        } else {
            $(".footer-menu-col ul").css("display", "");
            $(".footer-menu-col").removeClass("open-accordion");
        }
    });
});
$(window).on("load", function () {
    footerAdj();
    setTimeout(function () {
        headerAdj();
    }, 350);
    equalHeight();
    if ($(window).scrollTop() > $(".site-header").outerHeight()) {
        $(".wrapper").addClass("small-header");
    } else {
        $(".wrapper").removeClass("small-header");
    }

    // body theme class
    $(".current-menu-item a[data-tag], .current-page-ancestor a[data-tag]").each(function () {
        var data_tag = $(this).data("tag");
        $("body").addClass(data_tag);
    });
});

$(window).scroll(function (e) {
    if ($(window).scrollTop() > $(".site-header").outerHeight()) {
        $(".wrapper").addClass("small-header");
    } else {
        $(".wrapper").removeClass("small-header");
    }
});

$(window).resize(function () {
    footerAdj();
    setTimeout(function () {
        headerAdj();
    }, 350);
    equalHeight();
    if ($(window).width() > 767) {
        $(".footer-menu-col ul").css("display", "");
        $(".footer-menu-col").removeClass("open-accordion");
    }
});