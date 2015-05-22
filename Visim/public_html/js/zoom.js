$(function () {
    $("#ZoomIn").click(function (event) {
        var new_width = $("#image").width() * 1.2;
        var new_height = $("#image").height() * 1.2;
        $("#image").width(new_width);
        $("#image").height(new_height);
        alignImage();
    });

    $("#ZoomOut").click(function (event) {
        var new_width = $("#image").width() * 0.9;
        var new_height = $("#image").height() * 0.9;
        $("#image").width(new_width);
        $("#image").height(new_height);
        alignImage();
    });
});
