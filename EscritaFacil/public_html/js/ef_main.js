$(function () {
    var json;
    
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
                fillHelp(json);
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
            if($("#dict-file").val() !== ""){
                $("#dict-file").change();
            } else {
                alert("Nenhuma URL informada!");
            }
        } else {
            $.getJSON(url, function (result) {
                json = result;
                fillHelp(json);
            });
            $(".text").focus();
//            var xmlHTTP = new XMLHttpRequest();
//
//            xmlHTTP.onreadystatechange = function () {
//                if (xmlHTTP.readyState == 4 && xmlHTTP.status == 200) {
//                    var json = JSON.parse(xmlHTTP.responseText);
//                    $.each(json, function (key, val) {
//                        console.log(key + ' = ' + val);
//                    });
//                }
//            };
//            xmlHTTP.open("GET", url, true);
//            xmlHTTP.send();
        }
    });
    
    var automatic_complete;
    
    $(".text").keyup(function (event){
        var new_text = $(".text").val();
        
        var changed_index = getChanging(old_text, new_text);
        if(changed_index.operation === null){
            console.log("No change made.");
            return;
        }
        
        var begin;
        if(changed_index.operation === "add"){
            begin = getWordBegin(new_text, changed_index.index);
        } else {
            begin = getWordBegin(new_text, changed_index.index);
        }
        
        console.log("Begin: " + begin);
        console.log("End: " + changed_index.index);
        
        var word = new_text.substring(begin, changed_index.index+1)
                .replace(" ", "");
        console.log("Palavra: " + word);
        
        console.log(event.keyCode);
        switch(event.keyCode){
            case 27: //ESC
                if(automatic_complete === true){
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

function fillHelp(json) {
//    console.log("Not ordered:");
//    $.each(json, function (key, val) {
//        console.log(key + ' = ' + val);
//    });    
//    console.log("Ordered:");
//    $.each(json, function (key, val) {
//        console.log(key + ' = ' + val);
//    });

    var select_options = $("#help-select option");
    for (var index = 0; index < select_options.size(); index++) {
        select_options[index].remove();
    }
    var select = $("#help-select");
    if (json === "")
        return;
    $.each(json, function (key, val) {
        select.append("<option id = '" + key + "'>" + val + "</option>");
    });
}

function getChanging(old_text, new_text){
    var changing={};
    var bigger_size;
    if(old_text.length > new_text.length){
        changing.operation = "del";
        bigger_size = old_text.length;
    }else if(old_text.length < new_text.length){
        changing.operation = "add";
        bigger_size = new_text.length;
    }else{
        changing.operation = null;
    }
    
    for(var index = 0; index < bigger_size; index++){
        if(old_text[index] !== new_text[index]){
            changing.index = index;
            break;
        }
    }
    return changing;
}

function getWordBegin(text, index){
    while(index > 0 && text[index-1] !== " "){
        index--;
    }
    return index;
}