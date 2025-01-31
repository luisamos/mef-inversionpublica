//import { globalVariables } from "./modules/globalVariables";

const colorBloke2 = ['#2479A7', '#5CB731', '#FFD952'];
const tipoGob = [{ id: 'E', name: 'Gob. Nacional' }, { id: 'R', name: 'Gob. Regional' }, { id: 'M', name: 'Gob. Local' }];
const tipoGra = [{ id: 's', name: 'Sectores' }, { id: 'f', name: 'Funciones' }, { id: 'c', name: 'Cat. Presupuestal' }];
const EJECUCION_6 = [];
const EJECUCION_SERIES = [];
var ARRAY_EJECUCION_H = []
var TIPOGOB = '';
var TIPOPA = '';
var TIPOREPO = 'f';
var PATH = '/inversion/data/' // add "/inversion/" in prod
var PATH_IMG = '/inversion/static/img/'
//var PATH = '/data/' // add "/inversion/" in prod
//var PATH_IMG = '/static/img/'
var dataTotal_F = [];
var dataTotal_S;
var dataTotal_C;
var dataGeneral = [];
var confTipoGob = 'R';
var confTipoPA = '2';
var dataHistorica = [];
let fechaActual = new Date(),
anio = (fechaActual.getMonth()== 0)? fechaActual.getFullYear() - 1 : fechaActual.getFullYear();
const meses = [
    "Enero", "Febrero", "Marzo", "Abril", 
    "Mayo", "Junio", "Julio", "Agosto", 
    "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

function setJs(data, op, ubigeo){
    if (op == 'f') {
        dataTotal_F = data;
        dataGeneral = dataTotal_F;
        // TIPOREPO = 's';
    } 

    if (op == 's') {
        dataTotal_S = data;
        dataGeneral = dataTotal_S;
        // TIPOREPO = 's';
    } else if (op == 'c') {
        dataTotal_C = data;
        dataGeneral = dataTotal_C;
        // TIPOREPO = 'c';
    }
    //console.log(dataGeneral);
    getInfo(ubigeo);
}

function getDataOriginal(op, ubigeo) {
    //console.log(PATH + op + '/' + ubigeo)
    fetch(PATH + op + '/' + ubigeo)
        .then(res => res.json())
        .then(response => setJs(response, op, ubigeo))
}

// funciones
const nombreSerie = (id) =>{
    var d = $.grep(dataGeneral.series, function(v) {
        return v.id === id;
    })
    return d;
};
function numeroComas(x){
    return 'S/ ' + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
// ------------------------
function descArray(tipoGob, tipoPA, data){
    let series = dataGeneral.series;
    let array1 = series.filter(function(item) {
        return data.includes(item.id);
    })
    return array1;
}

function setData(op, ubigeo){
    if (!dataTotal_C | !dataTotal_S) {
        getDataOriginal(op.value, ubigeo);
    } else {
        if (op.value == 's') {
            dataGeneral = dataTotal_S;
        } else if (op.value == 'c') {
            dataGeneral = dataTotal_C;
        } else if (op.value == 'f') {
            dataGeneral = dataTotal_F;
        }
        getInfo(ubigeo);
    }
}

function onload(ubigeo){
    fetch(PATH  + 'hist/' + ubigeo)    
    .then(res => res.json())
    .then(data => {dataTotal_F =data;dataGeneral = dataTotal_F; getInfo(ubigeo);})
}

function getInfo(ubigeo){
    //console.log(dataGeneral);
    var _valueInfo = "0";
    var _chkAct = $("#chkAct").is(":checked");
    var _chkPry = $("#chkPry").is(":checked");

    //valor tipo de Informacion
    if (_chkAct && _chkPry)
        _valueInfo = "1";
    else if (!_chkAct && _chkPry)
        _valueInfo = "2";
    else if (_chkAct && !_chkPry)
        _valueInfo = "3";

    //valor de tipo Grafico
    var _valueGrafico = $("#tipoGrafico").children("option:selected").val();
    //valor de tipo Gobierno
    var _valueGobierno;
    if(ubigeo === null) _valueGobierno='E';
    else if(ubigeo.length=== 2) 
    {
        _valueGobierno='R';
        $("#tipoGobierno option").eq(0).prop("selected", true);
        $("#tipoGobierno option").eq(1).prop("disabled", true);
    }
    else if((ubigeo.length=== 4 || ubigeo.length=== 6)){
        _valueGobierno='M';
        $("#tipoGobierno option").eq(0).prop("disabled", true);
        $("#tipoGobierno option").eq(1).prop("selected", true);
        //console.log(ubigeo);
    }

    //_valueGobierno = $("#tipoGobierno").children("option:selected").val();

    TIPOREPO = _valueGrafico;
    TIPOGOB = _valueGobierno;
    TIPOPA = _valueInfo;

    if (TIPOREPO == 'f')
        $("#titulo1").html("Reporte de Inversiones </br> (Función)");
    else if (TIPOREPO == 's')
        $("#titulo1").html("Reporte de Inversiones </br> (Sector)");
    else if (TIPOREPO == 'c')
        $("#titulo1").html("Reporte de Inversiones </br> (Categoría Presupuestal)");

    //1.GRAFICO PIE
    //console.log(_valueInfo);
    //console.log(_valueGobierno);
    Top5Inversiones(_valueInfo, _valueGobierno);

    // 2. GRAFICO RADIO BAR
    dataBar = DataGraficoBar(_valueInfo, _valueGobierno);
    CleanBar();

    var idx = 0;
    $.each(dataBar, function(indice, data) {
        idx++;
        DrawBar(data, indice + 1)
    });
    var i;
    for (i = idx + 1; i <= 6; i++) {
        $('#BarCont' + i).css("background-image", "url('" + PATH_IMG + "frame/Frame-1-gris.png')");
        $('#BarCont' + i).css("background-repeat", "no-repeat");
    }
    //console.log(idx,_valueInfo,_valueGobierno);

    // 3. ACUMULADO AREA CHART
    //console.log(_valueInfo);
    //console.log(_valueGobierno);
    DrawAreaAcumulado(_valueInfo, _valueGobierno);
    let dataDesc = descArray(_valueGobierno, _valueInfo, EJECUCION_SERIES);
    if (TIPOREPO == "f")
        $("#titulo3").html("Ejecución de funciones");
    else if (TIPOREPO == "s")
        $("#titulo3").html("Ejecución de sectores");
    else if (TIPOREPO == "c")
        $("#titulo3").html("Ejecución de categorías presupuestales");
    CleanArea();
    var idj = 0;
    $.each(EJECUCION_6, function(index, value) {
        idj++;
        DrawArea(DataArea(_valueInfo, _valueGobierno, value), index + 1, dataDesc, value);
    });
    var j;
    for (j = idj + 1; j <= 6; j++) {
        $('#chartArea' + j).css("background-image", "url('" + PATH_IMG + "frame/Frame-2-gris.png')");
        $('#chartArea' + j).css("background-repeat", "no-repeat");
    }
}

function tooltipEjecucion(a, p, d) {
    let rojo = '<svg width="27" height="24" viewBox="0 0 27 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.779 3.47647L2.2596 18.7632C2.06333 19.0902 1.95948 19.4609 1.95838 19.8384C1.95728 20.2159 2.05897 20.5872 2.25334 20.9152C2.4477 21.2432 2.72796 21.5165 3.06623 21.708C3.40451 21.8994 3.789 22.0024 4.18147 22.0065H23.2203C23.6128 22.0024 23.9973 21.8994 24.3356 21.708C24.6738 21.5165 24.9541 21.2432 25.1485 20.9152C25.3428 20.5872 25.4445 20.2159 25.4434 19.8384C25.4423 19.4609 25.3385 19.0902 25.1422 18.7632L15.6228 3.47647C15.4224 3.15874 15.1403 2.89605 14.8037 2.71374C14.467 2.53143 14.0872 2.43565 13.7009 2.43565C13.3146 2.43565 12.9348 2.53143 12.5981 2.71374C12.2615 2.89605 11.9794 3.15874 11.779 3.47647V3.47647Z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.6382 9.06903V13.4168" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.6382 17.7646H13.6474" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    let verde = '<svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 10.6314V11.5054C20.9988 13.554 20.3355 15.5474 19.1089 17.1882C17.8823 18.829 16.1581 20.0293 14.1936 20.6101C12.2291 21.191 10.1294 21.1212 8.20775 20.4113C6.2861 19.7013 4.64542 18.3892 3.53041 16.6706C2.4154 14.9521 1.8858 12.9191 2.02059 10.8749C2.15538 8.83077 2.94735 6.88495 4.27837 5.32766C5.60938 3.77037 7.40814 2.68505 9.40638 2.23358C11.4046 1.7821 13.4953 1.98866 15.3665 2.82244" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 4L11.7143 14L8 9.98815" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    let amarillo = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.99951 12.0887H14.9995" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    let per = isNaN(Math.round((d / p) * 100)) ? 0 : Math.round((d / p) * 100);
    let color, svg = '';

    if (a == anio) {
        if (per < 10) {
            color = '#FF3535';
            svg = rojo;
        } else if (per >= 10 && per < 20) {
            color = '#FFC924';
            svg = amarillo;
        } else {
            color = '#4AAB31';
            svg = verde;
        }
    } else {
        if (per < 50) {
            color = '#FF3535';
            svg = rojo;
        } else if (per >= 50 && per < 80) {
            color = '#FFC924';
            svg = amarillo;
        } else {
            color = '#4AAB31';
            svg = verde;
        }
    }
    return '<div class="tooltipEjecucion" style="margin-left:10px; float:right ;width:58px;min-height:58px;background-color:' + color + '; border-radius: 0px 3px 3px 0px;">' + '<div style="display: block;margin: auto; margin-top:5px; min-height:29px;width:29px;">' + svg + '</div>' + per + '%</div>'
}
//PRIMER GRAFICO PIE
function DrawAreaAcumulado(tipoPA, tipoGob) {
    var data = dataGeneral.datas;
    var Ccolor = ['#70D4F6', '#CC93CD', '#FFDD87', '#94DA88', '#FF8E8E'];
    let groupbyanio = $.grep(data, function(v) {
        return v.t === tipoPA && v.g == tipoGob && v.a <= anio;
    });

    top3 = Top3(groupbyanio).splice(0, 5);


    let array1 = groupbyanio.filter(function(item) {
        return top3.includes(item.c);
    })


    var groupBy = key => array =>
        array.reduce((objectsByKeyValue, obj) => {
            const value = obj[key];
            objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
            return objectsByKeyValue;
        }, {});

    let groupByBrand = groupBy('c');
    d = groupByBrand(array1);
    dataHistorica = d;
    var mostrar = [];
    var i = 0;
    let de = $.each(d, function(index, value) {
        let data = [];

        d = value.sort(compareValues('a'));

        $.each(d, function(index, value) {
            data.push({ x: parseInt(value.a), y: value.p, d: value.d });

        });
        serie = { 'name': nombreSerie(index)[0]['name'], 'color': Ccolor[i], 'data': data };
        mostrar.push(serie);
        i++;
    });
    let html = "";

    if (TIPOREPO == 'f')
        html = `<div class="titleAll" style="position:absolute;">Histórico de funciones con mayor inversión (2016-${anio})</div>`;
    else if (TIPOREPO == 's')
        html = `<div class="titleAll" style="position:absolute;">Histórico de sectores con mayor inversión (2016-${anio})</div>`;
    else if (TIPOREPO == 'c')
        html = `<div class="titleCategoria" style="position:absolute;">Histórico de categoría presupuestal con mayor inversión (2016-${anio})</div>`;
    Highcharts.chart('charArea', {
        chart: {
            type: 'area',
            backgroundColor: 'transparent',
            marginTop: 70
                // events: {
                //     load: function() {
                //         this.legend.allItems[0].legendGroup.attr({
                //             translateX: 320
                //         });
                //     }

            // }
        },
        title: {
            align: 'left',
            margin: 50,
            x: 0,
            y: 10,
            useHTML: true,
            text: html
        },
        credits: {
            enabled: false
        },
        legend: {

            itemStyle: {
                fontFamily: 'Calibri'
            },
            layout: 'horizontal',
            align: 'right',
            verticalAlign: 'top',
            itemWidth: 150
        },
        xAxis: {
            width: '100%',
            left: 75,
            lineWidth: 0,
            labels: {
                style: {

                    fontSize: '18px',
                    fontFamily: 'Calibri'
                }
            },
            categories: [...Array(anio - 2016 + 1).keys()].map(i => String(2016 + i)),
        },
        yAxis: {
            left: 155,
            lineColor: '#828282',
            lineWidth: 1,
            labels: {
                formatter: function() {
                    let theval = [''+this.value].map(n => {
                        //console.log(n);
                        if (n >0 &&n<1000000) return (n/1000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' Mil';
                        
                        else if  (n==1000000)return (n/1000000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' Millón';
                     
                        else if (n>1000000 &&n< 100000000000) return (n/1000000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' Millones';
                     
                        })
                        return theval;},
    
                        
                style: {

                    fontSize: '18px',
                    fontFamily: 'Calibri'
                }
            },
            title: {
                text: ''
            },
            allowDecimals: false

        },
        tooltip: {
            useHTML: true,
            padding: 0,
            borderWidth: 0,
            style: { opacity: 1, background: "rgba(255, 255, 255, 1)" },
            formatter: function() {
                return '<div style="display:flex;margin-left:10px; min-height:58px;font-family: Calibri;font-style: normal;font-weight: normal;font-size:18px;"><div style="margin-top:5px; height:55px;"><div style="display:flex;"><div  style="width:153px;"> <span>Presup. total:</span></div><div><div style="min-width:130px;text-align:right;">' + numeroComas(this.y) + '</div></div></div>' +
                    '<div style="display:flex;"><div  style="width:153px;"><span style="font-family: Calibri;font-style: normal;font-weight: normal;font-size:18px;">Presup. ejecutado:</span></div><div style="min-width:130px;text-align:right;"><tspan>' + numeroComas(this.point.options.d) + '</tspan></div></div></div>' + tooltipEjecucion(this.point.x, this.y, this.point.options.d) + '</div>';
            }
        },
        plotOptions: {
            area: {
                pointStart: 2016,
                fillOpacity: 0.5,
                groupPadding: 0,
                pointPadding: 0.1,
                borderWidth: 0
            }
        },
        series: mostrar
    });

}


function Top5Inversiones(tipoPA, tipoGob) {
    let mes= meses[fechaActual.getMonth()];
    var data = dataGeneral.datas;
    var result = [];
    //var dataOrder = [];        
    //var series = dataGeneral.series;
    if(mes == 'Enero') mes= meses[11];
    $('#titleTop5').html(`Top 5 de Inversión de presupuesto ${anio} (${mes})`);
    $("#frame4").css("background-image", "url('None')");
    var data_code = $.grep(data, function(v) {
        return v.t === tipoPA && v.g == tipoGob && v.a == anio;
    });

    //funcion para agrupar y sumar
    dataOrder = data_code.reduce(function(res, value) {
        if (!res[value.c]) {
            res[value.c] = { c: value.c, p: 0 };
            result.push(res[value.c])
        }
        res[value.c].p += value.p;
        return res;
    }, {});

    result = result.map(s => ({
        name: nombreSerie(s.c)[0]['name'],
        y: s.p
    }));
    result = result.sort(compareValues('y', 'desc'));
    result = result.splice(0, 5)
    if (result.length) {
        Highcharts.chart('grafico1', {

            chart: {
                backgroundColor: 'transparent',
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            credits: {
                enabled: false
            },
            title: {
                text: ''
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            plotOptions: {
                pie: {
                    colors: ['#227CAC', '#FF6356', '#FACA1F', '#70A745', '#750280'],
                    size: 200,
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        useHTML: true,
                        distance: 5,
                        crop: false,
                        overflow: "justify",
                        pointPadding: 0,
                        borderWidth: 0,
                        allowOverlap: true,
                        colors: ['#227CAC', '#FF6356', '#FACA1F', '#70A745', '#750280'],
                        connectorWidth: 0,
                        style: {
                            fontFamily: 'Calibri',
                            fontSize: "20px"
                        },
                        formatter: function() {
                            return '<span style="color:' + this.point.color + ';"><b>' + numeroComas(this.point.y) + '</span>';
                        }
                    },
                    showInLegend: true
                }
            },
            legend: {
                enabled: true,
                itemWidth: 140,
                itemStyle: {
                    fontFamily: 'Calibri',
                    fontSize: "12px"
                }
            },
            series: [{
                name: 'Inversiones',

                data: result
            }]
        });

    } else {
        //console.log("url('" + PATH_IMG + "frame/Frame-4-gris.png')");
        $('#titleTop5').html('');
        $('#grafico1').html('');
        $("#frame4").css("background-image", "url('" + PATH_IMG + "frame/Frame-4-gris.png')");
        // $("#frame4").html("<img src='" + PATH_IMG + "frame/Frame-4-gris.png'>");
        // console.log('NO HAY DATA');
    }


}

function CleanArea() {
    for (var i = 1; i <= 6; i++) {
        $("#chartArea" + i).html('');
        $('#chartArea' + i).css("background-image", "none");
    }
}

function CleanBar() {
    let t = 6;
    for (var i = 1; i <= 6; i++) {
        $("#footerBar" + i).html('');
        $("#titleBar" + i).html('');
        $("#chartBar" + i).html('');
        $("#BarCont" + i).removeClass('borderBar');
        $('#BarCont' + i).css("background-image", "none");
    }

    if (TIPOREPO == "c")
        $("#titulo2").html(`Categorías presupuestales con mayor inversión ${anio}`);
    else if (TIPOREPO == "s")
        $("#titulo2").html(`Sectores con mayor inversión ${anio}`);
    else if (TIPOREPO == "f")
        $("#titulo2").html(`Funciones con mayor inversión ${anio}`);

}
//SEGUNDO GRAFICO BAR CHART
function DrawBar(data, i) {
    let cCont = "#BarCont" + i;

    let cBar = "chartBar" + i;
    let tBar = "#titleBar" + i;
    let fBar = "#footerBar" + i;
    $(cCont).addClass('borderBar');

    var cColor = ['#2479A7', '#5CB731', '#FFD700'];
    var txtCategoria = data.data.per.map((item, index) => { return '<span style="color:' + cColor[index] + '"><b>' + item + '%</b></span>'; });

    let title = '<span>' + data.name + '</span>';
    let footer = $.map(data.data.monto, function(product, i) {
        return $("<div style='width:142px;margin-left:46px;display: flex;align-items: center;'><svg width='20' height='20'><circle cx='10' cy='10' r='10' fill='" + cColor[i] + "'/></svg><div  style='min-width:122px;text-align:right;'><span style='font-size:16px;align: right;'>" + numeroComas(product) + "</span></div></div>");
    })

    Highcharts.chart(cBar, {
        colors: cColor,
        credits: {
            enabled: false
        },
        chart: {
            type: 'column',
            inverted: true,
            polar: true,
            margin: [0, 0, 0, 0],
            backgroundColor: 'transparent'
        },
        title: {
            text: ''
        },
        tooltip: {
            enabled: false
        },
        pane: {
            size: '85%',
            innerSize: '20%',
            endAngle: 270
        },
        xAxis: {
            tickInterval: 1,
            labels: {
                align: 'right',
                useHTML: true,
                allowOverlap: true,
                step: 1,
                y: 3,
                style: {
                    fontSize: '18px',
                    fontFamily: 'Calibri'
                }
            },
            lineWidth: 0,
            categories: txtCategoria

        },
        yAxis: {
            crosshair: {
                enabled: true,
                color: '#333'
            },
            lineWidth: 0,
            tickInterval: 20,
            reversedStacks: false,
            endOnTick: true,
            showLastLabel: true,
            labels: {
                distance: 3,
                style: {
                    fontSize: "12px",
                    fontFamily: 'Calibri',
                    color: "#BDBDBD"
                }
            }
        },
        plotOptions: {
            column: {
                size: 80,
                stacking: 'normal',
                borderWidth: 0,
                pointPadding: 0,
                groupPadding: 0.15
            }
        },
        series: [{
            colorByPoint: true,
            name: 'Gold medals',
            data: data.data.per
        }],
        legend: {
            enabled: false
        }
    });
    $(fBar).html(footer);
    $(tBar).html(title);

    textFit($(tBar), { minFontSize: 8, maxFontSize: 18 })
}

function DataArea(tipoPA, tipoGob, code) {
    let datamod = dataGeneral.datas;
    let data_code = $.grep(datamod, function(v) {
        return v.t === tipoPA && v.g == tipoGob && v.c == code && v.a <= anio;
    });
    let d = data_code.sort(compareValues('a'));
    let dataP = [];
    let dataD = [];
    let mostrar = [];

    $.each(d, function(index, value) {
        dataP.push({ x: parseInt(value.a), y: value.p });
        dataD.push({ x: parseInt(value.a), y: value.d });
    });
    serieP = { 'name': 'Presupuesto Total', 'data': dataP, 'color': '#70D4F6' };
    serieD = { 'name': 'Presupuesto ejecutado', 'data': dataD, 'color': '#FFA4A4' };
    mostrar.push(serieP);
    mostrar.push(serieD);
    return mostrar;
}

function selEjecucion(i, data) {
    //var chart = Highcharts.chart('chartArea' + i);
    let series = DataArea(TIPOPA, TIPOGOB, data.value);
    var chart = $("#chartArea" + i).highcharts();
    chart.update({ series: series });
}
//TERCERO GRAFICO AREA

function DrawArea(data, i, series, id) {

    let cArea = "chartArea" + i;
    let cCombo = "comboArea" + i;
    let cSelect = '';

    $.each(series, function(index, value) {
        if (id == value.id)
            cSelect += '<option value="' + value.id + '" selected>' + value.name + '</option>';
        else
            cSelect += '<option value="' + value.id + '">' + value.name + '</option>';
    });
    let html = '<div style="position:absolute;"><select id="comboArea' + i + '" class="filtro-select-ejecucion" onchange="selEjecucion(' + i + ',this);" >' + cSelect + '</div>';

    ARRAY_EJECUCION_H.push(Highcharts.chart(cArea, {
        chart: {
            type: 'area',
            backgroundColor: 'transparent',
            marginTop: 70
        },
        title: {
            text: html,
            useHTML: true,
            align: 'left',
            margin: 50,
            x: 0,
            y: 20
        },
        credits: {
            enabled: false
        },
        legend: {
            itemStyle: {
                fontFamily: 'Calibri',
                fontSize: '16px'
            },
            layout: 'horizontal',
            align: 'right',
            verticalAlign: 'top',
            y: 0
                // x: -150,
                // y: 100,
                // floating: true,
                // borderWidth: 1,
                // backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF'
        },
        xAxis: {
            width: '100%',
            lineWidth: 0,
            labels: {
                style: {

                    fontSize: '18px',
                    fontFamily: 'Calibri'
                }
            },
            //categories: ["2016", "2017", "2018", "2019", "2020", "2021", "2022","2023", "2024"]
            categories: [...Array(anio - 2016 + 1).keys()].map(i => String(2016 + i)),
        },
        yAxis: {
            lineColor: '#828282',
            lineWidth: 1,
            labels: {

                formatter: function() {
                    let theval = [''+this.value].map(n => {
                        //console.log(n);
                        if (n >0 &&n<1000000) return (n/1000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' Mil';
                        
                        else if  (n==1000000)return (n/1000000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' Millón';
                     
                        else if (n>1000000 &&n< 100000000000) return (n/1000000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' Millones';
                     
                        })
                        return theval;},
    

                    
                // formatter: function() {
                //     let valor= this.value;
                //     let valor_formateado="";
                //     if (valor >= 1000000){
                //             valor_formateado=(this.value / 1000000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'M';
                //     }
                //     else if(valor >= 1000 && valor<1000000) {
                //         valor_formateado=(this.value / 1000000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'Mil';
                //     }
                //     else if(valor <1000){
                //         valor_formateado=(this.value / 1000000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                //     }



                //     return  valor_formateado;
                //   },
                style: {
                    fontSize: '18px',
                    fontFamily: 'Calibri'
                }
            },
            title: {
                text: ''
            },
            allowDecimals: false

        },
        tooltip: {
            crosshairs: [{
                width: 2,
                color: 'rgba(0,0,0,0.2)',
                zIndex: 3
            }],
            shared: true,
            useHTML: true,
            padding: 0,
            borderWidth: 0,
            // style: { opacity: 1, background: "rgba(255, 255, 255, 1)" },
            // formatter: function() {
            //     return '<div style="display:flex;margin-left:10px; min-height:58px;font-family: Calibri;font-style: normal;font-weight: normal;font-size:18px;"><div style="margin-top:5px; height:55px;"><div style="display:flex;"><div  style="width:153px;"> <span>Presup. total:</span></div><div><div style="min-width:130px;text-align:right;">' + numeroComas(this.y) + '</div></div></div>' +
            //         '<div style="display:flex;"><div  style="width:153px;"><span style="font-family: Calibri;font-style: normal;font-weight: normal;font-size:18px;">Presup. ejecutado:</span></div><div style="min-width:130px;text-align:right;"><tspan>' + numeroComas(this.point.options.d) + '</tspan></div></div></div>' + tooltipEjecucion(this.y, this.point.options.d) + '</div>';
            // }
        },
        plotOptions: {
            area: {
                pointStart: 2016,
                fillOpacity: 0.5
            }
        },
        series: data
    }));


}
const SeriesName = () => {
    let s = dataGeneral.series;
    n_series = s.map(function(obj) {
        obj['valueField'] = obj['valuefield']; // Assign new key 
        delete obj['valuefield']; // Delete old key 
        return obj;
    });
    return n_series;
}

function numberWithCommas(x) {
    return 'S/ ' + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function Top3(data) {
    var result = [];
    var dataOrder = [];
    dataOrder = data.reduce(function(res, value) {
        if (!res[value.c]) {
            res[value.c] = { c: value.c, p: 0 };
            result.push(res[value.c])
        }
        res[value.c].p += value.p;
        return res;
    }, {});

    result = result.sort(compareValues('p', 'desc'));
    //  result = result.splice(0, 6)

    var list_3 = [];
    EJECUCION_SERIES.length = 0;
    EJECUCION_6.length = 0;
    for (var i in result) {
        EJECUCION_SERIES.push(result[i].c);
        if (i < 6)
            EJECUCION_6.push(result[i].c)
        list_3.push(result[i].c);
    }
    return list_3;
}

function DataSerie(listatop) {
    let s = dataGeneral.series;
    let array2 = [];
    array2 = s.filter(function(item) {
        return listatop.includes(item.id);
    })
    return array2;
}

function DataSerie2(data2) {
    let dat = data2;
    let n2_series = [];
    n2_series = dat.map(function(obj) {
        obj['valueField'] = obj['id'];
        return obj;
    });
    return n2_series;
}
// function para ordernar
function compareValues(key, order = 'asc'){
    return function innerSort(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // property doesn't exist on either object
            return 0;
        }
        const varA = (typeof a[key] === 'string') ?
            a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string') ?
            b[key].toUpperCase() : b[key];
        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        return (
            (order === 'desc') ? (comparison * -1) : comparison
        );
    };
}

function DataBloke2(tipoPA, tipoGob, code){
    let datamod = dataGeneral.datas;
    let data_code = $.grep(datamod, function(v) {
        return v.t === tipoPA && v.g == tipoGob && v.c == code && v.a < anio;
    });

    return data_code.sort(compareValues('a'));
}

function combo(id){
    let data = dataGeneral.series;
    $('#cmb' + id).dxSelectBox({
        width: 250,
        items: data,
        value: 1,
        valueExpr: "id",
        displayExpr: "name",
        onValueChanged: function(data) {

            let d = DataBloke2(confTipoPA, confTipoGob, data.value);

            $("#as" + id).dxChart("option", "dataSource", d);
            // createChart(id, d);
        }
    });
}

function createChart(container, data){
    combo(container);
    $("#as" + container).dxChart({
        margin: {
            right: 20
        },
        palette: "Harmony Light",
        dataSource: data,
        commonSeriesSettings: {
            type: 'area',
            argumentField: "a",
            area: {
                point: { visible: true }
            }
        },
        series: [{ valueField: "p", name: 'Presupuesto Total', color: '#FF7D7D' }, { valueField: "d", name: 'Presupuesto Ejecutado', color: '#50BDE3' }],
        margin: {
            bottom: 20
        },
        argumentAxis: {
            valueMarginsEnabled: false
        },
        legend: {
            visible: false
        },
        size: {
            height: 270
        },
        onLegendClick: function(e) {
            var series = e.target;
            if (series.isVisible()) {
                series.hide();
            } else {
                series.show();
            }
        }
    }).dxChart("instance");
}

function createPie(data) {
    let dataSerie = dataGeneral.series;
    $("#pie").dxPieChart({
        size: {
            height: 380,
        },
        innerRadius: 0.65,
        type: "doughnut",
        resolveLabelOverlapping: 'shift',
        palette: "Soft Pastel",
        // title: "Top 5 de Inversión de presupuesto de la región",
        dataSource: data,
        legend: {
            visible: false,
            horizontalAlignment: "center",
            verticalAlignment: "bottom"
        },
        series: [{
            smallValuesGrouping: {
                mode: "topN",
                topCount: 3
            },
            argumentField: "c",
            valueField: "p",
            label: {
                visible: true,
                connector: {
                    visible: true,
                    width: 2
                },
                font: {
                    size: 14
                },
                format: "fixedPoint",
                backgroundColor: "none",
                customizeText: function(e) {
                    var found_names = $.grep(dataSerie, function(v) {
                        return v.id == e.argumentText;
                    });
                    let d = found_names[0] ? found_names[0].name : 'otros'
                    return d + "\n" + "<b>" + e.valueText + "</b>";
                }
            }

        }],
        centerTemplate: function(pieChart, container) {
            var total = pieChart.getAllSeries()[0].getVisiblePoints().reduce(function(s, p) { return s + p.originalValue; }, 0),
                content = $('<svg><circle cx="100" cy="100" fill="#eee" r="' + (pieChart.getInnerRadius() - 6) + '"></circle>' +
                    '<text text-anchor="middle" style="font-size: 18px" x="100" y="90" fill="#494949">' +

                    '<tspan x="100" dy="20px" style="font-size:28px;font-weight: 600">' +
                    numberWithCommas(total) +
                    '</tspan></text></svg>');
            container.appendChild(content.get(0));
        }
    });
}

function DataGraficoBar(tipoPA, tipoGob){
    var datamod = dataGeneral.datas;
    var data_code = $.grep(datamod, function(v) {
        return v.t === tipoPA && v.g == tipoGob && v.a == anio;
    });

    data_code = data_code.sort(compareValues('p', 'desc'));
    data_code = data_code.splice(0, 6);

    var result = $.map(data_code, function(item) {
        var data_f = [];
        data_f.push({ id: item.c, name: nombreSerie(item.c)[0]['name'], data: { monto: [item.p, item.d, item.i], per: [100, Math.round(item.d / item.p * 100), Math.round(item.i / item.p * 100)]}});
        return data_f;
    });

    //console.log(result);
    return result;
}

function DataBloke3(tipoPA, tipoGob, code){
    var datamod = dataGeneral.datas;
    var data_code = $.grep(datamod, function(v) {
        return v.t === tipoPA && v.g == tipoGob && v.c == code && v.a == anio;
    });

    data_code = data_code.sort(compareValues('p', 'desc'));
    data_code = data_code.splice(0, 3)

    var result = $.map(data_code, function(item) {
        var data_f = [];
        data_f.push({ name: 'Presupuesto', count: 100, m: item.p }, { name: 'Devengado', count: Math.round(item.d / item.p * 100), m: item.d }, { name: 'Girado', count: Math.round(item.i / item.p * 100), m: item.i });
        return data_f;

    })
    return result;
}

function DataForm(tipoPA, tipoGob, dataP){

    let groupbyanio = $.grep(dataP, function(v) {
        return v.t === tipoPA && v.g == tipoGob && v.a < anio;
    });

    top3 = Top3(groupbyanio)

    let array1 = groupbyanio.filter(function(item) {
        return top3.includes(item.c);
    })
    let series_name = DataSerie(top3, dataGeneral.series);
    var groupBy = key => array =>
        array.reduce((objectsByKeyValue, obj) => {
            const value = obj[key];
            objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
            return objectsByKeyValue;
        }, {});

    let groupByBrand = groupBy('a');

    d = groupByBrand(array1);
    dataHistorica = d;
    var mostrar = [];
    let mes;
    let de = $.each(d, function(index, value) {
        mes = '{"year":"' + index + '",';
        $.each(value, function(index, value) {
            mes += '"' + value.c + '":' + value.p + ',';
        })
        mes = mes.slice(0, -1) + '},';
        mostrar.push(JSON.parse(mes.slice(0, -1)));
    });
    $("#chart").dxChart({
        size: {
            height: 500,
        },
        palette: "Harmony Light",
        dataSource: mostrar,
        commonSeriesSettings: {
            type: 'area',
            argumentField: "year",
            area: {
                point: { visible: true }
            }
        },
        series: DataSerie2(series_name),
        margin: {
            bottom: 20
        },
        title: `Histórico de funciones con mayor inversión (2016-${anio})`,
        argumentAxis: {
            valueMarginsEnabled: false
        },
        legend: {
            verticalAlignment: "top",
            horizontalAlignment: "center"
        },
        yAxis: {
            labels: {
                formatter: function() {
                    return this.value / 1000000 + 'M';
                  },
                style: {
                    fontSize: '18px',
                    fontFamily: 'Calibri'
                }
            },
        },
        onLegendClick: function(e) {
            var series = e.target;
            if (series.isVisible()) {
                series.hide();
            } else {
                series.show();
            }
        },
        tooltip: {
            enabled: true,
            contentTemplate: function(info, container) {

            }
        }
    }).dxChart("instance");

}