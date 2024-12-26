export function GFuente() {
    Highcharts.chart('grafico-fuente', {
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
}