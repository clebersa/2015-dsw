$(function () {
    var zoom_level = 10;
    var current_zoom = 100;
    var min_zoom = 10;
    var max_zoom = 200;

    $("#zoom-in").click(function (event) {
        if (current_zoom + zoom_level <= max_zoom) {
            applyZoom(100 * 100 / current_zoom);
            current_zoom += zoom_level;
            applyZoom(current_zoom);
//            console.log("Zoom in: " + current_zoom + "%");
        } else {
            alert("Não é possível ampliar mais a imagem! O zoom máximo é de "
                    + max_zoom + "%.");
        }
    });

    $("#zoom-out").click(function (event) {
        if (current_zoom - zoom_level >= min_zoom) {
            applyZoom(100 * 100 / current_zoom);
            current_zoom -= zoom_level;
            applyZoom(current_zoom);
//            console.log("Zoom out: " + current_zoom + "%");
        } else {
            alert("Não é possível reduzir mais a imagem! O zoom mínimo é de "
                    + min_zoom + "%.");
        }
    });
});

/**
 * Applies zoom to an image, setting its size and positioning it inside its div.
 * @param int zoom_level The zoom level that will be applied to the image.
 * Example: 100 means that the image will be set to the original size.
 */
function applyZoom(zoom_level) {
    var current_left = parseInt($("#image").css("left"));
    var current_top = parseInt($("#image").css("top"));

    var current_width = $("#image").width();
    var current_height = $("#image").height();

    var new_width = current_width * zoom_level / 100;
    var new_height = current_height * zoom_level / 100;

    var width_distance = $("#maior").width() / 2 - current_left;
    var height_distance = $("#maior").height() / 2 - current_top;

    var zoom_diff = zoom_level - 100;

    var new_left;
    if (width_distance > current_width) {
//        console.log("width_distance > current_width");
        new_left = current_left - (new_width - current_width)
                - (width_distance - current_width) * (zoom_diff / 100) / 2;
    } else if (width_distance === current_width) {
//        console.log("width_distance === current_width");
        new_left = current_left + (current_width - new_width);
    } else {
        if (width_distance > 0) {
//            console.log("width_distance > 0");
            new_left = current_left - width_distance * (zoom_diff / 100);
        } else if (width_distance === 0) {
//            console.log("width_distance === 0");
            new_left = current_left;
        } else {
//            console.log("width_distance < 0");
            new_left = current_left - (width_distance * (zoom_diff / 100)) / 2;
        }
    }

    var new_top;
    if (height_distance > current_height) {
//        console.log("height_distance > current_height");
        new_top = current_top - (new_height - current_height)
                - (height_distance - current_height) * (zoom_diff / 100) / 2;
    } else if (height_distance === current_height) {
//        console.log("height_distance === current_height");
        new_top = current_top + (current_height - new_height);
    } else {
        if (height_distance > 0) {
//            console.log("height_distance > 0");
            new_top = current_top - height_distance * (zoom_diff / 100);
        } else if (height_distance === 0) {
//            console.log("height_distance === 0");
            new_top = current_top;
        } else {
//            console.log("height_distance < 0");
            new_top = current_top - (height_distance * (zoom_diff / 100)) / 2;
        }
    }

    $("#image").width(new_width);
    $("#image").height(new_height);
    $("#image").css({
        "top": new_top,
        "left": new_left
    });
}