jQuery(function($) {
    window.s3bubblepopup = {};
    if ($.browser && $.browser.msie && ($.browser.version == "6.0" || $.browser.version == "7.0")) return;
    function S3BubblePopupButton() {
        var self = this;
        self.show = function() {
            var $button = $('<a href="#" id="s3bubble-button" />').appendTo($("body"));
            var property;
            $button.text(s3bubblePopup.text);
            $btnwidth = Math.round($button.width() + 34);
            if (s3bubblePopup.position === "right") {
                $button.addClass("s3bubble-right");
                property = "right";
                $button.css("margin-top", "-" + $btnwidth / 2 + "px");
            } else if (s3bubblePopup.position === "left") {
                $button.addClass("s3bubble-left");
                property = "left";
                $button.css("margin-top", "-" + $btnwidth / 2 + "px");
            } else {
                $button.addClass("s3bubble-bottom");
                property = "bottom";
                $button.css("margin-left", "-" + $btnwidth / 2 + "px");
            }
            $button.fadeIn();
            $button.click(function(event) {
                self.showWindow();
                event.preventDefault();
                return false;
            });
        };
        self.showWindow = function() {
            var $overlay = $('<div id="s3bubble-overlay" />').appendTo($("body"));
            $overlay.fadeIn("fast");
            var $loading = $('<div id="s3bubble-loading" />').appendTo($("body"));
            var $s3bubble_frame = $('<div id="s3bubble-iframe" />').appendTo($("body"));
            $s3bubble_frame.empty();
            $s3bubble_frame.css("opacity", 0);
            var sendData = {
                action: "s3bubble_video_popup_internal_ajax"
            };
            $.post(s3bubblePopup.ajax, sendData, function(response) {
                $s3bubble_frame.css("opacity", 0);
                $s3bubble_frame.html(response);
                $("#s3bubble-iframe-load").load(function() {
                    $loading.fadeOut("fast", function() {
                        $loading.remove();
                    });
                    $s3bubble_frame.animate({
                        opacity: 1
                    }, "fast");
                    var conWidth = $("#s3bubble-frame").width();
                    var valueHeight = Math.round(conWidth / 16 * 9);
                    $(this).height(valueHeight - 16);
                    $("#s3bubble-frame").css({
                        "margin-top": "-" + $("#s3bubble-frame").height() / 2 + "px",
                        "margin-left": "-" + conWidth / 2 + "px"
                    });
                });
                $("#s3bubble-frame-close").click(function() {
                    $("#s3bubble-overlay").fadeOut(function() {
                        $("#s3bubble-overlay").remove();
                    });
                    $("#s3bubble-loading").remove();
                    $("#s3bubble-iframe").fadeOut("fast", function() {
                        $("#s3bubble-iframe").remove();
                    });
                    return false;
                });
            });
        };
    }
    s3bubblepopup.S3BubblePopupButton = S3BubblePopupButton;
    s3bubblePopup.button = new s3bubblepopup.S3BubblePopupButton();
    s3bubblepopup.window = {
        show: s3bubblePopup.button.showWindow
    };
    s3bubblePopup.button.show();
    $("a[rel=s3bubble]").click(function() {
        s3bubblepopup.window.show();
        return false;
    });
});