import {globalVariables}from '../globalVariables.js'
import {globalConst}from '../globalConst.js'
import {compareValues,nombreSerie,CleanBar,numeroComas,SetDataTotal} from '../extension.js'

function DrawBarT(data, i) {
    let cCont = "#BarContT" + i;

    let cBar = "chartBarT" + i;
    let tBar = "#titleBarT" + i;
    let fBar = "#footerBarT" + i;
    $(cCont).addClass('borderBar');

    var cColor = ['#2479A7', '#ff3838', '#800000'];
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
function DataGraficoBarT() {
  
    // CleanBar();
    let result= SetDataTotal();
    var idx = 0;
    $.each(result, function(indice, data) {
        idx++;
        DrawBarT(data, indice + 1)
    });
    var i;
    for (i = idx + 1; i <= 3; i++) {
        $('#BarContT' + i).css("background-image", "url('" + globalConst.PATH_IMG + "frame/Frame-1-gris.png')");
        $('#BarContT' + i).css("background-repeat", "no-repeat");
    }
}

export {DataGraficoBarT}