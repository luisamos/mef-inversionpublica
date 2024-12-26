import {globalVariables, globalVariables as gV} from '../globalVariables.js'
import {globalConst as gC, globalConst} from '../globalConst.js'
import {CleanArea,DataArea,descArray} from '../extension.js'
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

   gV.array_ejecucion_h.push(Highcharts.chart(cArea, {
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
            categories: ["2016", "2017", "2018", "2019", "2020", "2021", "2022","2023"]
        },
        yAxis: {
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
            crosshairs: [{
                width: 2,
                color: 'rgba(0,0,0,0.2)',
                zIndex: 3
            }],
            shared: true,
            useHTML: true,
            padding: 0,
            borderWidth: 0,

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

function GAreasPeque(){
    CleanArea();
    let dataDesc = descArray(globalVariables.tipo_gobierno, globalVariables.tipo_proyecto_actividad, globalConst.EJECUCION_SERIES);
    var idj = 0;
    $.each(gC.EJECUCION_6, function(index, value) {
        idj++;
        DrawArea(DataArea(value), index + 1, dataDesc, value);
    });
    var j;
    for (j = idj + 1; j <= 6; j++) {
        $('#chartArea' + j).css("background-image", "url('" + gC.PATH_IMG + "frame/Frame-2-gris.png')");
        $('#chartArea' + j).css("background-repeat", "no-repeat");
    }
}

export {GAreasPeque};