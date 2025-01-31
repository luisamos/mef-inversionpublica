import { globalConst as gC } from './globalConst.js'
import { createGauge } from './grafico/GGauge.js'
import { GPie } from './grafico/GPieSD.js'
import { createCircular } from './grafico/GCircular.js'
import { createIndicador } from './grafico/GIndicador.js'
import { createbarra } from './grafico/GBarra.js'
import {numeroComas} from './extension.js'
import { getDataPliegoSD, getDataEjecutoraSD, getDataPRUbigeoSD, getDataTotalDescentralizacion, getDataDescargaFIDT, getDataTotalFIDT } from './dataService.js'

function setDataDescentralizacion(data) {
    var dataGauge = data.data[0].total;
    var dataPie = data.data[0].fuente;
    var dataCircular = data.data[0].general;
    var dataIndicador = data.data[0].indicador;

    //CONSTRUIR GAUGES

    $.each(dataGauge, function (index, value) {
        createGauge(value, index + 1);
    });

    //CONSTRUIR PIE
    GPie(dataPie);

    //CONSTRUIR CIRCULAR
    $.each(dataCircular, function (index, value) {
        createCircular(value, index + 1);
    });

    //CONSTRUIR INDICADOR
    $.each(dataIndicador, function (index, value) {
        createIndicador(value, index + 1)
    });

}

function setFiltros(data) {
    let sector = data.data.sector;
    let fuente = data.data.fuente;
    let rubro = data.data.rubro;
    let funcion = data.data.funcion;

    //sector
    var $cboSector = $('#select-sector');
    $.each(sector, function (id, value) {
        $cboSector.append('<option value=' + value.option + '>' + value.name + '</option>');
    });

    //fuente
    var $cboFuente = $('#select-fuente');
    $.each(fuente, function (id, value) {
        $cboFuente.append('<option value=' + value.option + '>' + value.name + '</option>');
    });

    //rubro
    var $cboRubro = $('#select-recurso');
    $.each(rubro, function (id, value) {
        $cboRubro.append('<option value=' + value.option + '>' + value.name + '</option>');
    });

    //funcion
    var $cboFuncion = $('#select-funcion');
    $.each(funcion, function (id, value) {
        $cboFuncion.append('<option value=' + value.option + '>' + value.name + '</option>');
    });
}

function onChangeSector(sector) {
    getDataPliegoSD(sector);
}

function onChangePliego(pliego) {
    let sector = $("#select-sector").children("option:selected").val();
    getDataEjecutoraSD(sector, pliego);
}

function setFiltroPliego(data) {
    $('#select-pliego').html('<option value="">Todos</option>');

    var $cboPliego = $('#select-pliego');

    $.each(data.data, function (id, value) {
        $cboPliego.append('<option value=' + value.option + '>' + value.name + '</option>');
    });
}

function setFiltroEjecutora(data) {
    $('#select-ejecutora').html('<option value="">Todos</option>');

    var $cboEjecutora = $('#select-ejecutora');

    $.each(data.data, function (id, value) {
        $cboEjecutora.append('<option value=' + value.option + '>' + value.name + '</option>');
    });
}
function setDataSearch(_nombre, _ubigeo) {
    let _sector = $("#select-sector").children("option:selected").val();
    let _plieg = $("#select-pliego").children("option:selected").val();
    let _ejecutora = $("#select-ejecutora").children("option:selected").val();
    let _fuente = $("#select-fuente").children("option:selected").val();
    let _recurso = $("#select-recurso").children("option:selected").val();



    const $listUbigeo = document.getElementById('listUbigeo');
    const $filtroUbigeo = document.getElementById('filtroUbigeo');

    $filtroUbigeo.value = _nombre;
    $listUbigeo.classList.remove('displayBlock');
    getDataPRUbigeoSD(_ubigeo);
    getDataTotalDescentralizacion('', _ubigeo, _sector, _plieg, _ejecutora, _fuente, _recurso);
    gC.UBIGEO = _ubigeo;
}

function setDataSearchFIDT(_nombre, _ubigeo) {
    // let _sector=$("#select-sector").children("option:selected").val();
    // let _plieg=$("#select-pliego").children("option:selected").val();
    // let _ejecutora=$("#select-ejecutora").children("option:selected").val();
    // let _fuente=$("#select-fuente").children("option:selected").val();
    // let _recurso=$("#select-recurso").children("option:selected").val();

    let _finan = $("#select-finan").children("option:selected").val();
    let _tipo = $("#select-tipo").children("option:selected").val();

    const $listUbigeo = document.getElementById('listUbigeo');
    const $filtroUbigeo = document.getElementById('filtroUbigeo');

    $filtroUbigeo.value = _nombre;
    $listUbigeo.classList.remove('displayBlock');
    getDataPRUbigeoSD(_ubigeo);
    getDataTotalFIDT(_ubigeo, _finan, _tipo);
    gC.UBIGEO = _ubigeo;
}

function changeFiltro() {
    let _sector = $("#select-sector").children("option:selected").val();
    let _plieg = $("#select-pliego").children("option:selected").val();
    let _ejecutora = $("#select-ejecutora").children("option:selected").val();
    let _fuente = $("#select-fuente").children("option:selected").val();
    let _recurso = $("#select-recurso").children("option:selected").val();

    let _ubigeo = '';
    if (gC.SETTINGS.get('ubigeo'))
        _ubigeo = gC.SETTINGS.get('ubigeo').toString();
    getDataTotalDescentralizacion('', _ubigeo, _sector, _plieg, _ejecutora, _fuente, _recurso);

}

function changeFiltroSD() {
    let _finan = $("#select-finan").children("option:selected").val();
    let _tipo = $("#select-tipo").children("option:selected").val();
    let _ambito = $("#select-ambito").children("option:selected").val();


    let _ubigeo = '';
    if (gC.UBIGEO)
        _ubigeo = gC.UBIGEO;

    getDataTotalFIDT(_ubigeo, _finan, _tipo, _ambito);

}
function DescargaFIDT() {
    let _finan = $("#select-finan").children("option:selected").val();
    let _tipo = $("#select-tipo").children("option:selected").val();
    let _ambito = $("#select-ambito").children("option:selected").val();


    let _ubigeo = '';
    if (gC.UBIGEO)
        _ubigeo = gC.UBIGEO;

    getDataDescargaFIDT(_ubigeo, _finan, _tipo, _ambito);

}
let MyChart;
let MyChart2;
let MyChart3;

let ColorGeneral=[
    '#36A2EB',
    '#FF9F40',
    '#FFCD56',
    '#FF6384'
];
function setFIDT(data) {
    var dataServicio = data.data.servicio[0];
    var dataObjeto = data.data.objeto[0];
    var dataTipo = data.data.tipo[0];
    var dataPropuesta = data.data.propuesta[0];
    createLegendD(dataObjeto);
    createbarra('fidt-gr-servicio', dataServicio.values, dataServicio.categories,'#ff6384')
  
    // createbarra('fidt-gr-objeto',dataObjeto.values,dataObjeto.categories)

    var ctx = document.getElementById('fidt-gr-objeto').getContext("2d");
    if (MyChart) {
        MyChart.destroy();
    }
    MyChart=new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: dataObjeto.categories,
            datasets: [{
                label: 'My First Dataset',
                data: dataObjeto.values,
                backgroundColor: ColorGeneral,
             
                datalabels: {
                    anchor: 'end'
                  }

            }]
        },
        
        options: {
            layout: {
                padding: 32
                          },
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
               
                legend: {
                    display: false
                },
                datalabels: {
                    
                    anchor: 'end',
                    align: 'end',
                    padding: 3,// Aq
        
                    font: {
                        size: 16, // Tamaño de la fuente
                        family: 'Montserrat', // Nombre de la fuente
                        weight: 'bold' 

                    },
                    color:  ['#36A2EB',
                    '#FF9F40',
                    '#FFCD56',
                    '#FF6384'],

                    display: function(context) {
                        var dataset = context.dataset;
                        var count = dataset.data.length;
                        var value = dataset.data[context.dataIndex];
                        return value > count * 1.5;
                      },
                },
                afterDraw: function(chart) {
                    console.log(chart);
                    var width = chart.chart.width,
                        height = chart.chart.height,
                        ctx = chart.chart.ctx;
    
                    ctx.restore();
                    var fontSize = (height / 114).toFixed(2);
                    ctx.font = fontSize + "em sans-serif";
                    ctx.textBaseline = "middle";
    
                    var text = "Total: 60", // Text to display
                        textX = Math.round((width - ctx.measureText(text).width) / 2),
                        textY = height / 2;
    
                    ctx.fillText(text, textX, textY);
                    ctx.save();
                }
            },
        },
        plugins: [ChartDataLabels]
    });



    let t_propuesta=dataObjeto.values.reduce((a, b) => a + b, 0);
    let t_monto=dataObjeto.montos.reduce((a, b) => a + b, 0);

    $("#t-propuesta").html(`  &nbsp ${t_propuesta}`);
    $("#t-monto").html(` &nbsp &nbsp ${numeroComas(t_monto.toFixed(2))}`);


    createbarra('fidt-gr-propuesta', dataPropuesta.values, dataPropuesta.categories,'#FF9A7B')



   // createbarra('fidt-gr-tipo', dataTipo.values, dataTipo.categories)

    var data1 = {
        labels: dataTipo.categories,
        datasets: [{
      
          data: dataTipo.values,
          backgroundColor: "#9ad0f5",
          borderColor: "#36a2eb",
          borderWidth: 3,
          borderRadius: 10,
          borderSkipped: false,
          barThickness: 120
        }]
      };
  
      // Opciones del gráfico
      var options1 = {
        responsive: true,
        plugins: {
            legend:{
            display:false
            },
          datalabels: {
            anchor: "end",
            align: "top",
            font: {
              weight: "bold"
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      };
  
      // Crear el gráfico
      var ctx1= document.getElementById("fidt-gr-tipo").getContext("2d");
      if (MyChart3) {
        MyChart3.destroy();
    }

       MyChart3 = new Chart(ctx1, {
        type: "bar",
        data: data1,
        options: options1,
        plugins: [ChartDataLabels]
      });

}

function createLegendD(data){
    console.log(data.values.length);
    let leg='';
    for (var i = 0; i < data.values.length; i++) {
       leg+=`<div class='leg-box' style="display:flex; justify-content: end;">  <div > <div> ${data.categories[i]} 
                </div><div class='leg-monto'>Monto total: ${numeroComas(data.montos[i])}
                </div> </div>
                <div style="margin-left:19px;">
                <svg width='16' height='16'><circle cx='8' cy='8' r='8' fill=" ${ColorGeneral[i] } "/></svg>
                </div>
                </div>`;
      
      }
    console.log(leg);
    $("#legend-gr-objeto").html(leg);
}

export { DescargaFIDT, changeFiltroSD, setDataSearchFIDT, setFIDT, changeFiltro, setDataSearch, setFiltroEjecutora, setFiltroPliego, onChangeSector, onChangePliego, setFiltros, setDataDescentralizacion }