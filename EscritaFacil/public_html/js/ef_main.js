//UNDONE: R5, R7, R8, R9, R10

$(function () {
    var json;
    var automatic_complete, navigating;

    var old_text = $(".text").val();

    $(".text").focus();

    $("#clear").click(function () {
        json = "";
        fillHelp(json);
    });

    $("#dict-file").change(function (event) {
        if ($("#dict-file").val() === "") {
            alert("Nenhum arquivo selecionado");
            $(".text").focus();
        } else {
            var json_file = $("#dict-file").prop("files")[0];
            var reader = new FileReader();
            reader.onload = function (event) {
                json = JSON.parse(event.target.result);
                sortJSON(json);
                //fillHelp(json);
                $(".text").focus();
            };
            reader.readAsText(json_file);
        }
    });

    $("#dict-url").keyup(function (event) {
        if (event.keyCode === 13) {
            $("#load-url").click();
        }
    });

    //Testing URLs
    //http://headers.jsontest.com/
    //https://www.dropbox.com/s/x9y4ezrqd4bvg7p/macros.json?dl=0
    //http://query.yahooapis.com/v1/public/yql?q=select%20%2a%20from%20yahoo.finance.quotes%20WHERE%20symbol%3D%27WRC%27&format=json&diagnostics=true&env=store://datatables.org/alltableswithkeys&callback
    $("#load-url").click(function (event) {
        var url = $("#dict-url").val();
        if (url === "") {
            if ($("#dict-file").val() !== "") {
                $("#dict-file").change();
            } else {
                alert("Nenhuma URL informada!");
            }
        } else {
            $.getJSON(url, function (result) {
                json = sortJSON(result);
                //fillHelp(json);
            });
            $(".text").focus();
        }
    });

    $("#help-select").keydown(function (event){
        console.log(event.keyCode);
            switch (event.keyCode) {
                case 38: //UP
                    console.log("up");
                    var select_options = $("#help-select option");
                    var selected_option = $("#help-select option:selected");
                    if(select_options[0].index === selected_option[0].index){
                        $(".text").focus();
                    }
                    var current_option = select_options[0];
                    console.log("Value: " + current_option.index);
                    break;
                case 13: //ENTER
                    console.log("enter")
                    break;
            }
    });
    
    var last_key = "";
    $(".text").keyup(function (event) {
        var new_text = $(".text").val();
        var txts = $("textarea");
        console.log("Size: " + txts.length);
        //HTMLTextAreaElement.rows
        console.log("Index: " + txts[0].rows);
        
        var changed_index = getChanging(old_text, new_text);
        if (changed_index.operation === null) {
            console.log(event.keyCode);
            switch (event.keyCode) {
                case 27: //ESC
                    if (automatic_complete === true) {
                        //restore word
                        automatic_complete = false;
                    }
                    break;
                case 38: //NAV UP
                    if (navigating === true) {
                        var select_options = $("#help-select option");
                        if(select_options.size() > 0 && select_options[0].prop("")){
                            
                        }
                        for (var index = 0; index < select_options.size(); index++) {
                            select_options[index].remove();
                        }
                    }
                    //check if is navigating
                    //true
                    //check if is in the top
                    //true
                    //focus on text, in the last position
                    //false
                    //go up in the list
                    break;
                case 40://NAV DOWN
                    //check if is navigating
                    //false
                    //set is navigating = true
                    //go down in the list
                    break;
                default:


            }

            console.log("No change made.");
            return;
        }

        var begin;
        if (changed_index.operation === "add") {
            begin = getWordBegin(new_text, changed_index.index);
        } else {
            begin = getWordBegin(new_text, changed_index.index);
        }

        console.log("Begin: " + begin);
        console.log("End: " + changed_index.index);

        var word = new_text.substring(begin, changed_index.index + 1)
                .replace(" ", "");
        console.log("Palavra: " + word);
        
        if(event.keyCode == 32){
            //Check match
            fillHelp("");
        }else if(json != null){
            var newJSON = {};
            for (var key in json) {
                if(json[key].chave.startsWith(word)){
                    newJSON[key] = json[key];
                }
            }
            console.log("NEW JSON:");
            for (var key in newJSON) {
                console.log(key + ": " + newJSON[key].chave +" = "+ newJSON[key].texto);
            }
            console.log("JSON:");
            for (var key in json) {
                console.log(key + ": " + json[key].chave +" = "+ json[key].texto);
            }
            if(Object.keys(newJSON).length !== Object.keys(json).length){
                console.log("Not equals");
                fillHelp(newJSON);
            }else{
                console.log("Equals");
                fillHelp("");
            }
        }

        console.log(event.keyCode);
        switch (event.keyCode) {
            case 27: //ESC
                if (automatic_complete === true) {
                    //restore word
                    automatic_complete = false;
                }
                break;
            case 32: //SPACE
                //check exact match
                //true
                //replace text
                //set automatic complete = true
                //save the key (word/shortcut) for restoring
                break;
            case 38: //NAV UP
                //check if is navigating
                //true
                //check if is in the top
                //true
                //focus on text, in the last position
                //false
                //go up in the list
                break;
            case 40://NAV DOWN
                //check if is navigating
                //false
                //set is navigating = true
                //go down in the list
                break;
            default:


        }


        old_text = new_text;
    });
});

function sortJSON(json) {
    json.sort(function (a, b) {
        var v1 = a.texto.toLowerCase();
        var v2 = b.texto.toLowerCase();
        return ((v1 < v2) ? -1 : ((v1 > v2) ? 1 : 0));
    });
    return json;
}

function fillHelp(json) {
    var select_options = $("#help-select option");
    for (var index = 0; index < select_options.size(); index++) {
        select_options[index].remove();
    }
    
    if (json === "")
        return;

    var select = $("#help-select");
    for (var key in json) {
        select.append("<option id = '" + json[key].chave + "'>" + json[key].texto + "</option>");
    }
//    $.each(json, function (key, val) {
//        select.append("<option id = '" + key + "'>" + val + "</option>");
//    });
}

function getChanging(old_text, new_text) {
    var changing = {};
    var bigger_size;
    if (old_text.length > new_text.length) {
        changing.operation = "del";
        bigger_size = old_text.length;
    } else if (old_text.length < new_text.length) {
        changing.operation = "add";
        bigger_size = new_text.length;
    } else {
        changing.operation = null;
    }

    for (var index = 0; index < bigger_size; index++) {
        if (old_text[index] !== new_text[index]) {
            changing.index = index;
            break;
        }
    }
    return changing;
}

function getWordBegin(text, index) {
    while (index > 0 && text[index - 1] !== " ") {
        index--;
    }
    return index;
}