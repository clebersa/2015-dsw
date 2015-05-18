$(function () {

    $("#image_url_text").focus();

    $("#image_url_text").keyup(function (event) {
        if (event.keyCode === 13) {
            $("#carregarImagem").click();
        }
    });

    $("#carregarImagem").click(function (event) {

        var allowedTypes = ["image/jpeg", "image/png"];
        var allowed = false;

        var reader = new FileReader();
        reader.onload = getLoadedImage;

        if ($("#image_url_file").val() == "") {
            var image_url = $("#image_url_text").val();
            if (image_url === "") {
                alert("Por favor, especifique uma imagem para visualização!");
                return;
            }
            try {
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (this.readyState === 4) {
                        if (this.status === 200) {
                            var file = this.response;
                            for (var index = 0; index < allowedTypes.length; index++) {
                                if (allowedTypes[index] === file.type) {
                                    allowed = true;
                                    break;
                                }
                            }
                            if (!allowed) {
                                alert("Imagem inválida! Por favor, informe uma imagem JPEG ou PNG.");
                                return;
                            }
                            reader.readAsDataURL(this.response);
                            reader.onloadend = function () {
                                $("image").attr("src", this.result);
                                alignImage();
                            }
                        } else {
                            alert("Não foi possível carregar a imagem a partir da URL informada!");
                        }
                    }
                }
                xhr.open('GET', image_url);
                xhr.responseType = 'blob';

                xhr.send(null);
            } catch (error) {
            }
        } else {
            var file = $("#image_url_file").prop("files")[0];

            for (var index = 0; index < allowedTypes.length; index++) {
                if (allowedTypes[index] === file.type) {
                    allowed = true;
                    break;
                }
            }
            if (!allowed) {
                alert("Imagem inválida! Por favor, informe uma imagem JPEG ou PNG.");
                return;
            }
            try {
                reader.readAsDataURL(file);
                reader.onloadend = function () {
                    $("image").attr("src", this.result);
                    alignImage();
                }
            } catch (error2) {
                alert("Não foi possível carregar a imagem.");
            }
        }
    });
});

function getLoadedImage(event) {
    $("#image").attr("src", event.target.result);
}

function alignImage(event) {

    var ajusteHorizontal = ($("#image").height()) / 2;
    var ajusteVertical = ($("#image").width()) / 2;

    ajusteHorizontal = '-' + ajusteHorizontal + 'px';
    ajusteVertical = '-' + ajusteVertical + 'px';

    $("#image").addClass("js-fix").css({
        "margin-left": ajusteHorizontal,
        "margin-top": ajusteVertical
    });
}
