// export function GTop5Inversiones(tipoPA, tipoGob) {
import {globalVariables} from '../globalVariables.js'
import {globalConst} from '../globalConst.js'
import {nombreSerie,compareValues,numeroComas} from '../extension.js'

export function GTop5Inversiones() {
    $('#titleTop5').html('Top 5 de Inversión de presupuesto 2023');
    $("#frame4").css("background-image", "url('None')");
    var result = [];
    var dataOrder = [];
    var data = globalVariables.dataGeneral.datas;
        
    var data_code = $.grep(data, function(v) {
        return v.t === globalVariables.tipo_proyecto_actividad && v.g == globalVariables.tipo_gobierno && v.a == 2023;
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
    console.log(result);
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
        $('#titleTop5').html('');
        $('#grafico1').html('');
        $("#frame4").css("background-image", "url('" + globalConst.PATH_IMG + "frame/Frame-4-gris.png')");
    }
}