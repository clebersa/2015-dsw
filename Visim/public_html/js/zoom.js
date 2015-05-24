$(function () {
    var zoom_level = 20;

    $("#ZoomIn").click(function (event) {
        var current_left = parseInt($("#image").css("left"));
        var current_top = parseInt($("#image").css("top"));

        var current_width = $("#image").width();
        var current_height = $("#image").height();

        var new_width = current_width * (100 + zoom_level) / 100;
        var new_height = current_height * (100 + zoom_level) / 100;

        var width_distance = $("#maior").width() / 2 - current_left;
        var height_distance = $("#maior").height() / 2 - current_top;

        var new_left;
        if (width_distance > current_width) {
            console.log("width_distance > current_width");
            new_left = current_left - (new_width - current_width)
                    - (width_distance - current_width) * (zoom_level / 100) / 2;
        } else if (width_distance === current_width) {
            console.log("width_distance === current_width");
            new_left = current_left - (current_width - new_width);
        } else {
            if (width_distance > 0) {
                console.log("width_distance > 0");
                new_left = current_left - width_distance * (zoom_level / 100);
            } else if (width_distance === 0) {
                console.log("width_distance === 0");
                new_left = current_left;
            } else {
                console.log("width_distance < 0");
                new_left = current_left - (width_distance * (zoom_level / 100)) / 2;
            }
        }

        var new_top;
        if (height_distance > current_height) {
            console.log("height_distance > current_height");
            new_top = current_top - (new_height - current_height)
                    - (height_distance - current_height) * (zoom_level / 100) / 2;
        } else if (height_distance === current_height) {
            console.log("height_distance === current_height");
            new_top = current_top - (current_height - new_height);
        } else {
            if (height_distance > 0) {
                console.log("height_distance > 0");
                new_top = current_top - height_distance * (zoom_level / 100);
            } else if (height_distance === 0) {
                console.log("height_distance === 0");
                new_top = current_top;
            } else {
                console.log("height_distance < 0");
                new_top = current_top - (height_distance * (zoom_level / 100)) / 2;
            }
        }

        $("#image").width(new_width);
        $("#image").height(new_height);
        $("#image").css({
            "top": new_top,
            "left": new_left
        });
    });

    $("#ZoomOut").click(function (event) {
        var current_left = parseInt($("#image").css("left"));
        var current_top = parseInt($("#image").css("top"));

        var current_width = $("#image").width();
        var current_height = $("#image").height();

        var new_width = current_width * (100 - zoom_level) / 100;
        var new_height = current_height * (100 - zoom_level) / 100;

        var width_distance = $("#maior").width() / 2 - current_left;
        var height_distance = $("#maior").height() / 2 - current_top;

        var new_left;
        if (width_distance > current_width) {
            console.log("width_distance > current_width");
            new_left = current_left - (new_width - current_width)
                    + (width_distance - current_width) * (zoom_level / 100) / 2;
        } else if (width_distance === current_width) {
            console.log("width_distance === current_width");
            new_left = current_left + (current_width - new_width);
        } else {
            if (width_distance > 0) {
                console.log("width_distance > 0");
                new_left = current_left + width_distance * (zoom_level / 100);
            } else if (width_distance === 0) {
                console.log("width_distance === 0");
                new_left = current_left;
            } else {
                console.log("width_distance < 0");
                new_left = current_left + (width_distance * (zoom_level / 100)) / 2;
            }
        }

        var new_top;
        if (height_distance > current_height) {
            console.log("height_distance > current_height");
            new_top = current_top - (new_height - current_height)
                    + (height_distance - current_height) * (zoom_level / 100) / 2;
        } else if (height_distance === current_height) {
            console.log("height_distance === current_height");
            new_top = current_top + (current_height - new_height);
        } else {
            if (height_distance > 0) {
                console.log("height_distance > 0");
                new_top = current_top + height_distance * (zoom_level / 100);
            } else if (height_distance === 0) {
                console.log("height_distance === 0");
                new_top = current_top;
            } else {
                console.log("height_distance < 0");
                new_top = current_top + (height_distance * (zoom_level / 100)) / 2;
            }
        }

        $("#image").width(new_width);
        $("#image").height(new_height);
        $("#image").css({
            "top": new_top,
            "left": new_left
        });
    });
});
