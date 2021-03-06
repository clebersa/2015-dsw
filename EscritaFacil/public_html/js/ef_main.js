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
    
    $(".text").keydown(function (event){
        switch (event.keyCode) {
            case 38: //NAV UP
                var select_options = $("#help-select option");
                var select = $("#help-select");
                var selected_option = $("#help-select option:selected");
                console.log("Select size: "+select_options.size());
                console.log("Selected index: "+selected_option[0].index);
                if(selected_option[0].index > 0){
                    var value = select_options[selected_option[0].index - 1].value;
                    console.log(value);
                    select.val(value);
                }
                event.preventDefault();
                break;
            case 40: //NAV DOWN
                var select_options = $("#help-select option");
                var select = $("#help-select");
                var selected_option = $("#help-select option:selected");
                console.log("Select size: "+select_options.size());
                console.log("Selected index: "+selected_option[0].index);
                if(selected_option[0].index + 1 < select_options.size()){
                    var value = select_options[selected_option[0].index + 1].value;
                    console.log(value);
                    select.val(value);
                }
                event.preventDefault();
                break;
            case 13: // ENTER
                event.preventDefault();
            break;
            default:
        }
         
    });
    
    var last_key = "";
    var withoutReplace = "";
    $(".text").keyup(function (event) {
        event.preventDefault();
        var new_text = $(".text").val();
        var txts = $("textarea");
        console.log("Size: " + txts.length);
        console.log("Index: " + txts[0].rows);
        var changed_index = getChanging(old_text, new_text);
        console.log("NEW: " + new_text);
        console.log("OLD: " + old_text);
        console.log("Operation: " + changed_index.operation);
        
        console.log(event.keyCode);
        switch (event.keyCode) {
            case 27: //ESC
                if (automatic_complete == true) {
                    console.log("Reverting autocomplete...");
                    $(".text").val(withoutReplace);
                    new_text = withoutReplace;
                    old_text = withoutReplace;
                }
                break;
            default:
        }
        automatic_complete = false;
        if (changed_index.operation === null) {
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
            var selected_option = $("#help-select option:selected");
            console.log("Opção selecionada: " + selected_option.prop("id") + " | " 
                    + selected_option.val());
            if(word == selected_option.prop("id")){
                console.log("Perfect match");
                withoutReplace = new_text;
                var withReplace = new_text.substring(0, begin) 
                        + selected_option.val()
                        + new_text.substring(changed_index.index, new_text.length);
                //console.log("Without replace: " + withoutReplace);
                //console.log("Without replace: " + withReplace);
                $(".text").val(withReplace);
                new_text = withReplace;
                automatic_complete = true;
            }else{
                console.log("Not perfect match");
            }
            fillHelp("");
        }else if(event.keyCode == 13){
            var selected_option = $("#help-select option:selected");
            console.log("Opção selecionada: " + selected_option.prop("id") + " | " 
                    + selected_option.val());
            
            withoutReplace = new_text;
            var withReplace = new_text.substring(0, begin) 
                    + selected_option.val()
                    + new_text.substring(changed_index.index, new_text.length);
            //console.log("Without replace: " + withoutReplace);
            //console.log("Without replace: " + withReplace);
            $(".text").val(withReplace);
            new_text = withReplace;
            automatic_complete = true;
            fillHelp("");
        }else if(json != null){
            var newJSON = {};
            for (var key in json) {
                if(json[key].chave.startsWith(word)){
                    newJSON[key] = json[key];
                }
            }
            if(Object.keys(newJSON).length !== Object.keys(json).length){
                console.log("JSON not equals");
                fillHelp(newJSON);
            }else{
                console.log("JSON equals");
                fillHelp("");
            }
        }

        console.log(event.keyCode);
        
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
    var index = 0;
    var selected;
    var insert;
    for (var key in json) {
        insert = "<option id = '" + json[key].chave + "'";
        if(index == 0){
            insert += "selected";
        }
        index++;
        insert +=" value=\"" + json[key].texto + "\">" + json[key].texto + "</option>";
        select.append(insert);
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