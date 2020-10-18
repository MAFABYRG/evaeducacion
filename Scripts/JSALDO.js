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



function getSaldo() {

    //limpiamos



    var tasana = document.getElementById('txtInteres').value;
    var sInicial = document.getElementById('txtsinical').value;
    var compra1 = document.getElementById('txtcompra1').value;
    var compra2 = document.getElementById('txtcompra2').value;
    var compra3 = document.getElementById('txtcompra3').value;
    var pago = document.getElementById('txtPago').value;

    document.getElementById('txtspromedio').value = '';
    document.getElementById('txtinteres').value = '';
    document.getElementById('txtinteresiva').value = '';

    tasana = tasana / 100;


    if (tasana.toString().length > 0 && sInicial.length > 0 && compra1.length > 0 && pago.length > 0) {



        document.getElementById('txtInteres').value = '';
        document.getElementById('txtsinical').value = '';
        document.getElementById('txtcompra1').value = '';
        document.getElementById('txtcompra2').value = '';
        document.getElementById('txtcompra3').value = '';
        document.getElementById('txtPago').value = '';

  


        var varB = new Object();
        varB.Tanual = tasana;
        varB.Sinicial = sInicial;
        varB.Compra1 = compra1;
        varB.Compra2 = compra2;
        varB.Compra3 = compra3;
        varB.Pago = pago;



        varB = JSON.stringify(varB);

        $.ajax({
            type: "POST",
            url: "WM.aspx/getPromedio",
            data: varB,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {


                if (response.d != null) {

                    //alert(response.d);

                    BindTableAcc(response);
               
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
        alert("Llene tasa interes al menos la compra 1 y el pago");
    }


}


function BindTableAcc(Items) {


  

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
                var interes = TodoS[1];
                var iva = '$' +TodoS[2];
                var pagomen = '$' + TodoS[3];
                var saldo = '$' + TodoS[4];

                if (TodoS[1] != "999999") {


                    if (j == 0) {
                        cell.setAttribute("width", "20%");
                        cell.setAttribute("align", "center");
                        cell.appendChild(document.createTextNode(mes));
                    }
                    if (j == 1) {
                        cell.setAttribute("width", "18%");
                        cell.setAttribute("align", "center");
                        cell.appendChild(document.createTextNode(interes));
                    }
                    if (j == 2) {
                        cell.setAttribute("width", "23%");
                        cell.setAttribute("align", "center");
                        cell.appendChild(document.createTextNode(iva));
                    }
                    if (j == 3) {
                        cell.setAttribute("width", "23%");
                        cell.setAttribute("align", "center");
                        cell.appendChild(document.createTextNode(pagomen));
                    }
                    if (j == 4) {
                        cell.setAttribute("width", "23%");
                        cell.setAttribute("align", "center");
                        cell.appendChild(document.createTextNode(saldo));
                    }

                }

                row.appendChild(cell);
            }
            tbo.appendChild(row);

            if (TodoS[1] == "999999") {
                document.getElementById('txtspromedio').value = '$' + TodoS[5];
                document.getElementById('txtinteres').value = '$' + TodoS[6];
                document.getElementById('txtinteresiva').value = '$' + TodoS[7];


            }

        });
    });

    tab.appendChild(tbo);
    root.appendChild(tab);


    document.getElementById('txtInteres').focus();


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








