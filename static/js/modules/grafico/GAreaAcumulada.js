import {globalVariables} from '../globalVariables.js'
import {compareValues,Top3,numeroComas,tooltipEjecucion,nombreSerie} from '../extension.js'

function GAreaAcumulada() {
    globalVariables.data_total_acumu=[];
    var data = globalVariables.dataGeneral.datas;
    var Ccolor = ['#70D4F6', '#CC93CD', '#FFDD87', '#94DA88', '#FF8E8E'];
    let groupbyanio = $.grep(data, function(v) {
        return v.t === globalVariables.tipo_proyecto_actividad && v.g == globalVariables.tipo_gobierno && v.a <= 2023;
    });

    var top3 = Top3(groupbyanio).splice(0, 5);

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
    var d = groupByBrand(array1);
    globalVariables.dataHistorica = d;
    var mostrar = [];
    var i = 0;
    var data_total=[];
    let sum_tipo_d=0;
    let sum_tipo_p=0;
    let de = $.each(d, function(index, value) {
        let data = [];

        d = value.sort(compareValues('a'));

        $.each(d, function(index, value) {
            data.push({ x: parseInt(value.a), y: value.p, d: value.d });
            sum_tipo_d+=value.d;
            sum_tipo_p+=value.p;
        });

        globalVariables.data_total_acumu.push({'name':nombreSerie(index)[0]['name'],'sum_d':sum_tipo_d,'sum_p':sum_tipo_p});
        var  serie = { 'name': nombreSerie(index)[0]['name'], 'color': Ccolor[i], 'data': data };
        mostrar.push(serie);
        sum_tipo_d=0;
        sum_tipo_p=0;
        i++;
    });
    let html = "";

    console.log(data_total);
    console.log(mostrar);

    if (globalVariables.tipo_reporte == 'f')
        html = '<div class="titleAll" style="position:absolute;">Histórico de funciones con mayor inversión (2013-2023)</div>';
    else if (globalVariables.tipo_reporte == 's')
        html = '<div class="titleAll" style="position:absolute;">Histórico de sectores con mayor inversión (2013-2023)</div>';
    else if (globalVariables.tipo_reporte == 'c')
        html = '<div class="titleCategoria" style="position:absolute;">Histórico de categoria presupuestal con mayor inversión (2013-2023)</div>';
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
            left: 100,
            lineWidth: 0,
            labels: {
                style: {

                    fontSize: '18px',
                    fontFamily: 'Calibri'
                }
            },
            categories: ["2016", "2017", "2018", "2019", "2020", "2021", "2022","2023"]
        },
        yAxis: {
            left: 155,
            lineColor: '#828282',
            lineWidth: 1,
            labels: {
                formatter: function() {
                    let theval = [''+this.value].map(n => {
                
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
            height: 500,
            borderWidth: 0,
            style: { opacity: 1, background: "rgba(255, 255, 255, 1)" },
            formatter: function() {
                let item=this.series.name;
                let total=$.grep(globalVariables.data_total_acumu, function(v) {
                    return v.name===item;
                });
                // '<div style="display:flex;margin-left:10px; min-height:58px;font-family: Calibri;font-style: normal;font-weight: normal;font-size:18px;"><div style="margin-top:5px; height:55px;"><div style="display:flex;"><div  style="width:153px;"> <span>Presup. total:</span></div><div><div style="min-width:130px;text-align:right;">' + numeroComas(total[0].sum_d) + '</div></div></div>'+
                return`<div style="display:flex;flex-direction: column;">
                <div style='display:flex;'>
                <div style="display:flex;max-width:350px; padding: 5px">
                  <div style="display:flex;flex-direction: column;">
                    <div style="display:flex;margin:auto;font-family: Calibri;font-style: normal;font-weight: normal;font-size:16px;">Año ${(this.point.options.x)}</div>
                    <div style="display:flex;">
                      <div style="width:153px;">
                        <span style="font-family: Calibri;font-style: normal;font-weight: normal;font-size:18px;">Presupuestado:</span>
                      </div>
                      <div style="min-width:130px;text-align:right;">
                        <tspan style="font-family: Calibri;font-style: normal;font-weight: normal;font-size:16px;">${ numeroComas(this.y) }</tspan>
                      </div>
                    </div>
                    <div style="display:flex;">
                      <div style="width:153px;">
                        <span style="font-family: Calibri;font-style: normal;font-weight: normal;font-size:18px;">Ejecutado:</span>
                      </div>
                      <div style="min-width:130px;text-align:right;">
                        <tspan style="font-family: Calibri;font-style: normal;font-weight: normal;font-size:16px;"> ${numeroComas(this.point.options.d)}</tspan>
                      </div>
                    </div>
                  </div>
                </div>
                ${ tooltipEjecucion(this.point.x, this.y, this.point.options.d) } 
                  <div style='display:flex;'>
                <div style="border-top: solid #dfe6e9;display:flex;max-width:350px; padding: 5px">
                  <div style="display:flex;flex-direction: column;">
                        <div style="display:flex;margin:auto;font-family: Calibri;font-style: normal;font-weight: normal;font-size:16px;">Año 2013-2023</div>
                    <div style="display:flex;">
                      <div style="width:153px;">
                        <span style="font-family: Calibri;font-style: normal;font-weight: normal;font-size:18px;">Presupuestado:</span>
                      </div>
                      <div style="min-width:187px;text-align:right;">
                        <tspan style="font-family: Calibri;font-style: normal;font-weight: normal;font-size:16px;"> ${numeroComas(total[0].sum_p)}</tspan>
                      </div>
                    </div>
                    <div style="display:flex;">
                      <div style="width:153px;">
                        <span style="font-family: Calibri;font-style: normal;font-weight: normal;font-size:18px;">Ejecutado:</span>
                      </div>
                      <div style="min-width:187px;text-align:right;">
                        <tspan style="font-family: Calibri;font-style: normal;font-weight: normal;font-size:16px;">${numeroComas(total[0].sum_d)} </tspan>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
                </div>`;            
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

export {GAreaAcumulada};