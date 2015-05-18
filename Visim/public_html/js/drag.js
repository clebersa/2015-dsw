$(function () {
    $('#maior').resizable();

    $("#image").mousedown(function () {
        $(window).mousemove(function () {
            var alturaDiv = $("#maior").innerHeight();
            var larguraDiv = $("#maior").innerWidth();
            var alturaImagem = $("#image").innerHeight();
            var larguraImagem = $("#image").innerWidth();
            if (alturaImagem > alturaDiv || larguraImagem > larguraDiv) {
                if (alturaImagem > alturaDiv) {
                    if (larguraImagem > larguraDiv) {
                        $("#image").draggable();
                    } else {
                        $("#image").draggable({axis: "y"});
                    }
                } else {
                    $("#image").draggable({axis: "x"});
                }
            }
        });
    });
});