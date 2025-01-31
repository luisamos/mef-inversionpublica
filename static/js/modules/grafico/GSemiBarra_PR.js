
import {globalConst}from '../globalConst.js'
import {numeroComas,numeroComas2,setDataMontos} from '../extension-pr.js'

function DrawBarT(data, i) {
    console.log(data);
    var cColor = data.color;
    let idT =data.id_t;

    let cCont = "#BarContT"+idT + i;

    let cBar = "chartBarT"+idT + i;
    let tBar = "#titleBarT"+idT + i;
    let fBar = "#footerBarT"+idT + i;
    let fpBar = "#footerBarTP"+idT + i;
    
    let titlepr = "#tit-"+idT;
    let fuentepr = "#fuente-"+idT;
    let cantidadpr = "#ct-"+idT;
    let legendpr = "#legend-"+idT;

    console.log(titlepr,fuentepr,cantidadpr,legendpr);

    let lengd_d=`<svg width='8' height='8'><circle cx='4' cy='4' r='4' fill=" ${cColor[0] } "/></svg> <span style="margin-left:6px;margin-right:4px;"> Presupuesto Inicial Modificado</span>
    <svg width='8' height='8'><circle cx='4' cy='4' r='4' fill=" ${cColor[1] } "/></svg><span style="margin-left:6px;margin-right:4px;">Presupuesto Devengado </span>
    <svg width='8' height='8'><circle cx='4' cy='4' r='4' fill="  ${cColor[2] } "/></svg><span style="margin-left:6px;margin-right:4px;">Presupuesto Girado</span>`;
    
    
    //$(cCont).addClass('borderBar');

     $(titlepr).html(data.title);
     $(fuentepr).html(data.fuente);
     $(cantidadpr).html(data.ct);
     $(legendpr).html(lengd_d);


    var txtCategoria = data.data.per.map((item, index) => { return '<span style="color:' + cColor[index] + '"><b>' + item + '%</b></span>'; });

    let title = '<span>' + data.name + '</span>';
    let footer = $.map(data.data.monto, function(product, i) {
        return $("<div style='width:118px;display: flex;align-items: center;'><div  style='min-width:105px;text-align:right;margin-right:4px;'><span style='font-size:12px;' class='footerBar'>" + numeroComas(product) + "</span></div><svg width='8' height='8'><circle cx='4' cy='4' r='4' fill='" + cColor[i] + "'/></svg></div>");
    })
    console.log(data);
    let footerP = data.ct_n;
 
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
                    fontSize: '10px',
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
                    fontSize: "10px",
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
        },
        {
            name:'null',
            data:[100-data.data.per[0],100-data.data.per[1],100-data.data.per[2]],
            color:'#BDBDBD'
        }],
        legend: {
            enabled: false
        }
    });
    $(fBar).html(footer);
    $(tBar).html(title);
    $(fpBar).html(footerP);

    textFit($(tBar), { minFontSize: 8, maxFontSize: 16 });
  //  textFit($(tBar), { minFontSize: 8, maxFontSize: 18 })
}
function DataGraficoBarT(_data) {
 
    var result=setDataMontos(_data);

    var idx = 0;
    $.each(result, function(indice, data) {
        idx++;
        DrawBarT(data, indice + 1)
    });
    
}

function SeparateData(_data){
   if (_data.data[0].pr_e){
    var datapr_e=_data.data[0].pr_e;
    DataGraficoBarT(datapr_e);
   } 
   if(_data.data[0].pr_i){
    var datapr_i=_data.data[0].pr_i;
    DataGraficoBarT(datapr_i);
   }
   if(_data.data[0].pr_p){
    var datapr_p=_data.data[0].pr_p;
    DataGraficoBarT(datapr_p);
   }
   if(_data.data[0].pr_r){
    console.log('AQI CRIS');
    var datapr_r=_data.data[0].pr_r;
    DataGraficoBarT(datapr_r);
   }
}

function SeparateDataHistorico(_data){
    if(_data.data[0].pr_d){
        var datapr_d=_data.data[0].pr_d;
        DataGraficoBarT(datapr_d);
    }

    if(_data.data[0].pr_n){
        var datapr_n=_data.data[0].pr_n;
        DataGraficoBarT(datapr_n);
    }
    
    if(_data.data[0].pr_s){
        var datapr_s=_data.data[0].pr_s;
        DataGraficoBarT(datapr_s);
    }
}


function DataGraficoBarTC(_data){
    var resul=_data.datos;
    var idx = 0;
    $.each(resul, function(indice, data) {
        idx++;
        DrawBarTCenso(_data,data, indice + 1)
    });
   
}

function DataGraficoBarTCI(_data){
    var resul=_data.datos;
    var idx = 0;
    $.each(resul, function(indice, data) {
        idx++;
        DrawBarTCensoI(_data,data, indice + 1)
    });
}

function SeparateDataCenso(_data){
    if(_data.data[0].cr_a){
        var resul_cr_a=_data.data[0].cr_a;
        DataGraficoBarTC(resul_cr_a);
    }

    if(_data.data[0].cr_s){
        var resul_cr_s=_data.data[0].cr_s;
        DataGraficoBarTC(resul_cr_s);
    }

    if(_data.data[0].cr_i){
        var resul_cr_i=_data.data[0].cr_i;
        DataGraficoBarTCI(resul_cr_i);
    }
}

function DrawBarTCenso(ma,data, i) {
    var cColor = ma.color;
    let idT =ma.id;
    let cCont = "#BarContT"+idT + i;
    let cBar = "chartBarT"+idT + i;
    let tBar = "#titleBarT"+idT + i;
    let fBar = "#footerBarT"+idT + i;
    let titlepr = "#tit-"+idT;
    let fuentepr = "#fuente-"+idT;
    let cantidadpr = "#ct-"+idT;
    let legendpr = "#legend-"+idT;

    let lengd_d=`<svg width='8' height='8'><circle cx='4' cy='4' r='4' fill=" ${cColor[0] } "/></svg> <span style="margin-left:6px;margin-right:4px;"> Nacional</span>
    <svg width='8' height='8'><circle cx='4' cy='4' r='4' fill=" ${cColor[1] } "/></svg><span style="margin-left:6px;margin-right:4px;">Departamental </span>
    <svg width='8' height='8'><circle cx='4' cy='4' r='4' fill=" ${cColor[2] } "/></svg><span style="margin-left:6px;margin-right:4px;">Provincial </span>
    <svg width='8' height='8'><circle cx='4' cy='4' r='4' fill="  ${cColor[3] } "/></svg><span style="margin-left:6px;margin-right:4px;">Distrital</span>`;
    
     $(titlepr).html(ma.title);
     $(fuentepr).html(ma.fuente);
  
     $(legendpr).html(lengd_d);

    var txtCategoria = data.per.map((item, index) => { return '<span style="color:' + cColor[index] + '"><b>' + item + '%</b></span>'; });

    let title = '<span>' + data.title + '</span>';
    let footer = $.map(data.montos, function(product, i) {

        var html =`<div style='margin: 0 auto;width:146px;display: flex;align-items: center;'>
        <div  style='min-width:122px;text-align:right;margin-right:4px;'>
        <span style='font-size:12px;' class='footerBar'>${data.cat[i]}: ${numeroComas2(product)}</span></div><svg width='8' height='8'>
        <circle cx='4' cy='4' r='4' fill='${cColor[i]}'/></svg></div>`
        return $(html);
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
            size: '88%',
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
                    fontSize: '10px',
                    fontFamily: 'Calibri',
                    fontStyle: 'normal',
                    fontWeight: '400'
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
                    fontSize: "10px",
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
            data: data.per
        },
        {
            name:'null',
            data:[100-data.per[0],100-data.per[1],100-data.per[2],100-data.per[3]],
            color:'#BDBDBD'
        }],
        legend: {
            enabled: false
        }
    });
    $(fBar).html(footer);
    $(tBar).html(title);

  //  textFit($(tBar), { minFontSize: 8, maxFontSize: 18 })
}

function DrawBarTCensoI(ma,data, i) {
    var cColor = ma.color;
    let idT =ma.id;
    let cBar = "chartBarT"+idT + i;
    let tBar = "#titleBarT"+idT + i;
    let fBar = "#footerBarT"+idT + i;
    let titlepr = "#tit-"+idT;
    let fuentepr = "#fuente-"+idT;
    let legendpr = "#legend-"+idT;

    let lengd_d=`<svg width='8' height='8'><circle cx='4' cy='4' r='4' fill=" ${cColor[0] } "/></svg> <span style="margin-left:6px;margin-right:4px;"> Nacional</span>
    <svg width='8' height='8'><circle cx='4' cy='4' r='4' fill=" ${cColor[1] } "/></svg><span style="margin-left:6px;margin-right:4px;">Departamental </span>
    <svg width='8' height='8'><circle cx='4' cy='4' r='4' fill=" ${cColor[2] } "/></svg><span style="margin-left:6px;margin-right:4px;">Provincial </span>
    <svg width='8' height='8'><circle cx='4' cy='4' r='4' fill="  ${cColor[3] } "/></svg><span style="margin-left:6px;margin-right:4px;">Distrital</span>`;
    
     $(titlepr).html(ma.title);
     $(fuentepr).html(ma.fuente);
  
     $(legendpr).html(lengd_d);

    var txtCategoria = data.per.map((item, index) => { return '<span style="color:' + cColor[index] + '"><b>' + item + '%</b></span>'; });

    let title = '<span>' + data.title + '</span>';
    let footer = $.map(data.montos, function(product, i) {

        var html =`<div style='margin: 0 auto;width:146px;display: flex;align-items: center;'>
        <div  style='min-width:122px;text-align:right;margin-right:4px;'>
        <span style='font-size:12px;' class='footerBar'>${data.cat[i]}: ${numeroComas2(product)}</span></div><svg width='8' height='8'>
        <circle cx='4' cy='4' r='4' fill='${cColor[i]}'/></svg></div>`
        return $(html);
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
            innerSize: '10%',
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
                    fontSize: '10px',
                    fontFamily: 'Calibri',
                    fontStyle: 'normal',
                    fontWeight: '400'
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
                    fontSize: "10px",
                    fontFamily: 'Calibri',
                    color: "#BDBDBD"
                }
            }
        },
        plotOptions: {
            column: {
                size:100,
                stacking: 'normal',
                borderWidth: 0,
                pointPadding: 0,
                groupPadding: 0.15
            }
        },
        series: [{
            colorByPoint: true,
            name: 'Gold medals',
            data: data.per
        },
        {
            name:'null',
            data:[100-data.per[0],100-data.per[1],100-data.per[2],100-data.per[3]],
            color:'#BDBDBD'
        }],
        legend: {
            enabled: false
        }
    });
    $(fBar).html(footer);
    $(tBar).html(title);

  //  textFit($(tBar), { minFontSize: 8, maxFontSize: 18 })
}
export {DataGraficoBarT,SeparateData,SeparateDataHistorico,SeparateDataCenso}