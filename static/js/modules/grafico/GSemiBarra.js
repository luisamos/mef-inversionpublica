import {globalVariables}from '../globalVariables.js'
import {globalConst}from '../globalConst.js'
import {compareValues,nombreSerie,CleanBar,numeroComas} from '../extension.js'

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
function DataGraficoBar() {
    var datamod = globalVariables.dataGeneral.datas;
    var data_code = $.grep(datamod, function(v) {
        return v.t === globalVariables.tipo_proyecto_actividad && v.g == globalVariables.tipo_gobierno && v.a == 2023;
    });

    data_code = data_code.sort(compareValues('p', 'desc'));
    data_code = data_code.splice(0, 3);

    var result = $.map(data_code, function(item) {
        var data_f = [];
        data_f.push({ id: item.c, name: nombreSerie(item.c)[0]['name'], data: { monto: [item.p, item.d, item.i], per: [100, Math.round(item.d / item.p * 100), Math.round(item.i / item.p * 100)] } });
        return data_f;
    })

    CleanBar();

    var idx = 0;
    $.each(result, function(indice, data) {
        idx++;
        DrawBar(data, indice + 1)
    });
    var i;
    for (i = idx + 1; i <= 3; i++) {
        $('#BarCont' + i).css("background-image", "url('" + globalConst.PATH_IMG + "frame/Frame-1-gris.png')");
        $('#BarCont' + i).css("background-repeat", "no-repeat");
    }
}

export {DataGraficoBar}