import {numeroComas} from '../extension.js'

export function GPie(data){
    Highcharts.chart('grafico-pie', {
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
                size: 300,
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
                    connectorWidth: 1,
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
            verticalAlign: 'top',
            enabled: true,
            itemWidth: 200,
            itemStyle: {
                fontFamily: 'Calibri',
                fontSize: "12px"
            }
        },
        series: [{
            name: 'Inversiones',
            data: data
        }]
    });
}