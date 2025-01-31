const $DASHBOARD1_PAGE = `
    <section class="dashboard__content">
        <div class="card__total">
            <span>TOTAL de presupuesto</span>
            <div class="card__amount">
                <span id="lblPimResumen"class="amount__primary">33 MM</span>
                <span id="lblPimCompleto" class="amount__secondary">S/ 3341,000,000 millones</span>
            </div>
        </div>

        <div class="card__ejecucion">
            <div>
                <span>Nivel de ejecución</span>
                <p id="lblEjecucionAvance">0.00%</p>
            </div>
            
            <div class="ejecucion__gauge">
                <figure class="highcharts-figure">
                    <div id="container"></div>
                </figure>
            </div>
        </div>

        <div class="card__ambito">
            <span>Ámbito <br/>Territorial</span>
            <div id="container1">
            </div>
        </div>

        <div class="presupuesto__financiamiento">
            <div class="card__presupuesto">
                <span>Presupuesto según funciones</span>
                <div class="ppto__list">
                </div>
            </div>
            <div class="card__fuente">
                <span>Fuente de financiamiento</span>
                <div id="container2">
                </div>
            </div>

            <div class="card__tipo">
                <span>Presupuesto según nivel de gobierno</span>
                <div id="container3">
                </div>
            </div>
        </div>
    </section>
`;

function buildCardEjecucion(_value) {

    Highcharts.chart('container', {

        chart: {
            type: 'gauge',
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false,
            height: '60%'
        },

        title: {
            text: ''
        },

        pane: {
            startAngle: -90,
            endAngle: 89.9,
            background: null,
            center: ['50%', '75%'],
            size: '140%'
        },

        // the value axis
        yAxis: {
            min: 0,
            max: 100,
            tickPixelInterval: 72,
            tickPosition: 'inside',
            tickColor: Highcharts.defaultOptions.chart.backgroundColor || '#FFFFFF',
            tickLength: 0,
            tickWidth: 2,
            minorTickInterval: null,
            labels: {
                distance: 0,
                style: {
                    fontSize: '0'
                }
            },
            lineWidth: 0,
            plotBands: [
                {
                    from: 0,
                    to: 10,
                    color: '#FE4533',
                    thickness: 20
                },
                {
                    from: 10,
                    to: 65,
                    color: '#FFC93F',
                    thickness: 20
                },
                {
                    from: 65,
                    to: 100,
                    color: '#00B71D',
                    thickness: 20
                },

            ]
        },

        series: [{
            name: 'Avance',
            data: [_value],
            tooltip: {
                valueSuffix: ' %'
            },
            dataLabels: {
                format: '{y} %',
                borderWidth: 0,
                color: (
                    Highcharts.defaultOptions.title &&
                    Highcharts.defaultOptions.title.style &&
                    Highcharts.defaultOptions.title.style.color
                ) || '#333333',
                style: {
                    fontSize: '16px'
                }
            },
            dial: {
                radius: '50%',
                backgroundColor: 'black',
                baseWidth: 12,
                baseLength: '10%',
                rearLength: '0%'
            },
            pivot: {
                backgroundColor: 'black',
                radius: 6
            }

        }]

    });

}

function buildFuenteFinanciamiento(_data) {

    if (_data === null) return;
    let mData = [];
    _data.forEach(item => {
        let oItem = { name: capitalize(item.nombre_fuente.toLowerCase()), y: item.monto };
        mData.push(oItem);
    });


    Highcharts.chart('container2', {
        chart: {
            backgroundColor: 'transparent',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: '',
            align: ''
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },

        plotOptions: {
            pie: {
                colors: ['#FF6356', '#227CAC', '#FACA1F', '#70A745', '#750280'],
                allowPointSelect: true,
                size: 200,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    useHTML: true,
                    distance: 3,
                    crop: true,
                    overflow: "justify",




                    style: {
                        fontFamily: 'Calibri',
                        fontSize: "16px"
                    },
                    formatter: function () {
                        return '<span style="color:' + this.point.color + ';"><b>' + miles(this.point.y) + '</span>';
                    }
                },
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
            data: mData

        }]
    });
}

function buildTipoGobierno(_data) {

    if (_data === null) return;
    let mMontos = [];
    mMontos.push(_data.filter(i => i.tipo_gobierno === 'E')[0]?.monto ?? 0);
    mMontos.push(_data.filter(i => i.tipo_gobierno === 'R')[0]?.monto ?? 0);
    mMontos.push(_data.filter(i => i.tipo_gobierno === 'M')[0]?.monto ?? 0);

    Highcharts.chart('container3', {
        chart: {
            type: 'column'
        },
        title: {
            text: ''
        },
        legend: {
            enabled: false
        },
        xAxis: {
            categories: [
                'Gobierno \nNacional',
                'Gobierno \Regional',
                'Gobierno \nLocal'
            ],

        },
        yAxis: {

            labels: {
                enabled: false
            },
            min: 0,
            title: {
                text: ''
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                `<td style="padding:0"><b>{point.y:.2f}</b></td></tr>`,
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true
                }
            },
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: '',
            data: mMontos

        }]
    });
}