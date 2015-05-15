$(function () {

    $("#image_url_text").focus();

    $("#image_url_text").keyup(function (event) {
        if (event.keyCode === 13) {
            $("#carregarImagem").click();
        }
    });

    $("#image_url_file").change(function (event) {
        var value = $("#image_url_file").val();
        if(value !== ""){
            $("#image_url_text").val(value);
        }
    });

    $("#carregarImagem").click(function (event) {
        var image_url = $("#image_url_text").val();
        var allowedTypes = ["image/jpeg", "image/png"];
        var allowed = false;

        if (image_url === "") {
            alert("Por favor, especifique uma imagem para visualização!");
            return;
        }

        var reader = new FileReader();
        reader.onload = getLoadedImage;
        try {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
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
                }
            }
            xhr.open('GET', image_url);
            xhr.responseType = 'blob';

            xhr.send(null);
        } catch (error) {
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
                console.log($("#image").innerWidth() + " x "
                        + $("#image").innerHeight());
                reader.readAsDataURL(file);
            } catch (error2) {
                alert("Não foi possível carregar a imagem.");
            }
        }
    });
});

function getLoadedImage(event) {
    $("#image").attr("src", event.target.result)
}

