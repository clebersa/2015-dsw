$("#ZoomIn").click(ZoomIn());

$("#ZoomOut").click(ZoomOut());

function ZoomIn(event) {

    $("#div img").width(
            $("#div img").width() * 1.2);

    $("#div img").height(
            $("#div img").height() * 1.2);
}

function  ZoomOut(event) {

    $("#div img").width(
            $("#imgDtls").width() * 0.5);

    $("#div img").height(
            $("#div img").height() * 0.5);
}


