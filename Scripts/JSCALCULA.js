function isNumberKey(txt, evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 46)
        return false;
    else {
        var len = txt.value.length;
        var index = txt.value.indexOf('.');

        if (index > 0 && charCode == 46) {
            return false;
        }
        if (index > 0) {
            var CharAfterdot = (len + 1) - index;
            if (CharAfterdot > 3) {
                return false;
            }
        }

    }
    return true;
}


function getPagos() {

    //limpiamos

    document.getElementById('txtpromedio').value = '';
    document.getElementById('txtpagado').value = '';
    document.getElementById('txtitotales').value = '';



    var Mto = document.getElementById('txtMonto').value;
    var tasana = document.getElementById('txtInteres').value;
    tasana = tasana / 100;




    var ms = document.getElementById('txtMeses').value;


    if (Mto.length > 0 && tasana.toString().length > 0 && ms.length > 0) {

        var varB = new Object();
        varB.Tanual = tasana;
        varB.Monto = Mto;
        varB.Meses = ms;

        varB = JSON.stringify(varB);

        $.ajax({
            type: "POST",
            url: "WM.aspx/getRazon",
            data: varB,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {


                if (response.d != null) {

                    //alert(response.d);

                    BindTableAcc(response);
                    document.getElementById('txtMonto').value = '';
                    document.getElementById('txtInteres').value = '';
                    document.getElementById('txtMeses').value = '';
                }
                else {

                    alert("hubo un error revisa tus parametros");

                }



            },
            failure: function (msg) {
                alert(msg);
            }

        });
    }

    else {

        alert("Llene todos los campos");
    }


}


function BindTableAcc(Items) {


    ////inciamos la busqueda
    //var div = document.getElementById('myHeader');
    //div.setAttribute("class", "visible");


    //Activamos la tabla de items
    var root = document.getElementById('mydivItems');
    try {
        var tbid = document.getElementById('tblItems');
        if (tbid != null) {
            root.removeChild(tbid);
        }

    }
    catch (e) {
        alert(e);
    }




    var tab = document.createElement('table');
    tab.setAttribute("id", "tblItems");
    tab.setAttribute("class", "tableStyle table-bordered border-dark table-sm");
    tab.setAttribute("cellspacing", "1px");
    var tbo = document.createElement('tbody');
    var row, cell;


    var Data = $.parseJSON(Items.d);



    $.each(Data, function (Key, Value) {

        $.each(Value, function (Key, Value) {

            var TodoS = String(Value).split(",", 8);

            row = document.createElement('tr');
            row.setAttribute("class", "tableRaw");
            for (var j = 0; j < 5; j++) {
                cell = document.createElement('td');
                // cell.setAttribute("width", "100px");
                var mes = TodoS[0];
                var interes = '$' + TodoS[1];
                var iva = '$' + TodoS[2];
                var pagomen = '$' + TodoS[3];
                var saldo = '$' + TodoS[4];

                if (TodoS[0] != "999999") {


                    if (j == 0) {
                        cell.setAttribute("width", "7%");
                        cell.setAttribute("align", "center");
                        cell.appendChild(document.createTextNode(mes));
                    }
                    if (j == 1) {
                        cell.setAttribute("width", "20%");
                        cell.setAttribute("align", "center");
                        cell.appendChild(document.createTextNode(interes));
                    }
                    if (j == 2) {
                        cell.setAttribute("width", "23%");
                        cell.setAttribute("align", "center");
                        cell.appendChild(document.createTextNode(iva));
                    }
                    if (j == 3) {
                        cell.setAttribute("width", "25%");
                        cell.setAttribute("align", "center");
                        cell.appendChild(document.createTextNode(pagomen));
                    }
                    if (j == 4) {
                        cell.setAttribute("width", "25%");
                        cell.setAttribute("align", "center");
                        cell.appendChild(document.createTextNode(saldo));
                    }

                }

                row.appendChild(cell);
            }
            tbo.appendChild(row);

            if (TodoS[0] == "999999") {
                document.getElementById('txtpromedio').value = '$' + TodoS[5];
                document.getElementById('txtpagado').value = '$' + TodoS[6];
                document.getElementById('txtitotales').value = '$' + TodoS[7];


            }

        });
    });

    tab.appendChild(tbo);
    root.appendChild(tab);


    document.getElementById('txtMonto').focus();


}



function getSanta() {



        $.ajax({
            type: "POST",
            url: "WM.aspx/tablSanta",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {


                if (response.d != null) {

                    BindSanta(response);

                   
                }
                else {

                    alert("hubo un error revisa tus parametros");

                }



            },
            failure: function (msg) {
                alert(msg);
            }

        });
}




function BindSanta(Items) {


    //Activamos la tabla de items
    var root = document.getElementById('mydivSanta');
    try {
        var tbid = document.getElementById('tblItems');
        if (tbid != null) {
            root.removeChild(tbid);
        }

    }
    catch (e) {
        alert(e);
    }



    var tab = document.createElement('table');
    tab.setAttribute("id", "tblSanta");
    tab.setAttribute("class", "tableStyle table-bordered border-dark table-sm");
    tab.setAttribute("cellspacing", "1px");
    var tbo = document.createElement('tbody');
    var row, cell;


    var Data = $.parseJSON(Items.d);



    $.each(Data, function (Key, Value) {

        $.each(Value, function (Key, Value) {

            var TodoS = String(Value).split(",", 3);

            row = document.createElement('tr');
            row.setAttribute("class", "tableRaw");
            for (var j = 0; j < 3; j++) {
                cell = document.createElement('td');
                // cell.setAttribute("width", "100px");
                var mes = TodoS[0];
                var interes = TodoS[1];
                var iva = TodoS[2];
               
                    if (j == 0) {
                        cell.setAttribute("width", "7%");
                        cell.setAttribute("align", "center");
                        cell.appendChild(document.createTextNode(mes));
                    }
                    if (j == 1) {
                        cell.setAttribute("width", "20%");
                        cell.setAttribute("align", "center");
                        cell.appendChild(document.createTextNode(interes));
                    }
                    if (j == 2) {
                        cell.setAttribute("width", "23%");
                        cell.setAttribute("align", "center");
                        cell.appendChild(document.createTextNode(iva));
                    }
                    
                

                row.appendChild(cell);
            }
            tbo.appendChild(row);


        });
    });

    tab.appendChild(tbo);
    root.appendChild(tab);


    document.getElementById('txtMonto').focus();


}






    

