import {globalVariables}from './globalVariables.js'
import {globalConst as gC}from './globalConst.js'
import {init_app} from './_init_.js'
import {getDataActual,getDataTotalDescentralizacion,getDataUbigeoFrontera,getDataUbigeoFronteraActual,getDataTotal } from './dataService.js'
import {setInfoControles} from './controllers.js'
import{DataGraficoBarT}from './grafico/GSemiBarra_T.js'
const nombreSerie = (id) => {
    var d = $.grep(globalVariables.dataGeneral.series, function(v) {
        return v.id === id;
    })
    return d;
};

function compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // property doesn't exist on either object
            return 0;
        }
        const varA = (typeof a[key] === 'string') ?
            a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string') ?
            b [key].toUpperCase() : b[key];
        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        return (
            (order === 'desc') ? (comparison * -1) : comparison
        );
    };
}
function numeroComas(x) {
    return 'S/ ' + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


function CleanBar() {
    let t = 6;

    for (var i = 1; i <= 6; i++) {
        $("#footerBar" + i).html('');
        $("#titleBar" + i).html('');
        $("#chartBar" + i).html('');
        $("#BarCont" + i).removeClass('borderBar');
        $('#BarCont' + i).css("background-image", "none");

    }
    if (globalVariables.tipo_reporte == "c")
        $("#titulo2").html("Categorías presupuestales con mayor inversión 2023");
    else if (globalVariables.tipo_reporte == "s")
        $("#titulo2").html("Sectores con mayor inversión 2023");
    else if (globalVariables.tipo_reporte == "f")
        $("#titulo2").html("Funciones con mayor inversión 2023");
}

function Top3(data) {
    var result = [];
    var dataOrder = [];
    dataOrder = data.reduce(function(res, value) {
        if (!res[value.c]) {
            res[value.c] = { c: value.c, p: 0 };
            result.push(res[value.c])
        }
        res[value.c].p += value.p;
        return res;
    }, {});

    result = result.sort(compareValues('p', 'desc'));
    //  result = result.splice(0, 6)

    var list_3 = [];
    gC.EJECUCION_SERIES.length = 0;
    gC.EJECUCION_6.length = 0;
    for (var i in result) {
        gC.EJECUCION_SERIES.push(result[i].c);
        if (i < 6)
            gC.EJECUCION_6.push(result[i].c)
        list_3.push(result[i].c);
    }

    return list_3;
}

function tooltipEjecucion(a, p, d) {
    let rojo = '<svg width="27" height="24" viewBox="0 0 27 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.779 3.47647L2.2596 18.7632C2.06333 19.0902 1.95948 19.4609 1.95838 19.8384C1.95728 20.2159 2.05897 20.5872 2.25334 20.9152C2.4477 21.2432 2.72796 21.5165 3.06623 21.708C3.40451 21.8994 3.789 22.0024 4.18147 22.0065H23.2203C23.6128 22.0024 23.9973 21.8994 24.3356 21.708C24.6738 21.5165 24.9541 21.2432 25.1485 20.9152C25.3428 20.5872 25.4445 20.2159 25.4434 19.8384C25.4423 19.4609 25.3385 19.0902 25.1422 18.7632L15.6228 3.47647C15.4224 3.15874 15.1403 2.89605 14.8037 2.71374C14.467 2.53143 14.0872 2.43565 13.7009 2.43565C13.3146 2.43565 12.9348 2.53143 12.5981 2.71374C12.2615 2.89605 11.9794 3.15874 11.779 3.47647V3.47647Z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.6382 9.06903V13.4168" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.6382 17.7646H13.6474" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    let verde = '<svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 10.6314V11.5054C20.9988 13.554 20.3355 15.5474 19.1089 17.1882C17.8823 18.829 16.1581 20.0293 14.1936 20.6101C12.2291 21.191 10.1294 21.1212 8.20775 20.4113C6.2861 19.7013 4.64542 18.3892 3.53041 16.6706C2.4154 14.9521 1.8858 12.9191 2.02059 10.8749C2.15538 8.83077 2.94735 6.88495 4.27837 5.32766C5.60938 3.77037 7.40814 2.68505 9.40638 2.23358C11.4046 1.7821 13.4953 1.98866 15.3665 2.82244" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 4L11.7143 14L8 9.98815" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    let amarillo = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.99951 12.0887H14.9995" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    let per = isNaN(Math.round((d / p) * 100)) ? 0 : Math.round((d / p) * 100);
    let color, svg = '';

    if (a == 2024) {
        if (per < 10) {
            color = '#FF3535';
            svg = rojo;
        } else if (per >= 10 && per < 20) {
            color = '#FFC924';
            svg = amarillo;
        } else {
            color = '#4AAB31';
            svg = verde;
        }
    } else {
        if (per < 50) {
            color = '#FF3535';
            svg = rojo;
        } else if (per >= 50 && per < 80) {
            color = '#FFC924';
            svg = amarillo;
        } else {
            color = '#4AAB31';
            svg = verde;
        }
    }
    return `<div style="min-width:58px;min-height:58px;background-color:${color};color:beige;border-radius: 0px 3px 3px 0px;">
    <div style="  padding: 10px;  margin: auto;
     width: 50%;">    ${svg}  <div> ${per}%</div></div>
   </div>
   </div>`;
}

function CleanArea() {
    for (var i = 1; i <= 6; i++) {
        $("#chartArea" + i).html('');
        $('#chartArea' + i).css("background-image", "none");
    }
}
function DataArea(code) {
    let datamod = globalVariables.dataGeneral.datas;
    let data_code = $.grep(datamod, function(v) {
        return v.t === globalVariables.tipo_proyecto_actividad && v.g == globalVariables.tipo_gobierno && v.c == code && v.a < 2024;
    });
    let d = data_code.sort(compareValues('a'));
    let dataP = [];
    let dataD = [];
    let mostrar = [];

    $.each(d, function(index, value) {
        dataP.push({ x: parseInt(value.a), y: value.p });
        dataD.push({ x: parseInt(value.a), y: value.d });
    });
   var serieP = { 'name': 'Presupuesto Total', 'data': dataP, 'color': '#70D4F6' };
    var serieD = { 'name': 'Presupuesto ejecutado', 'data': dataD, 'color': '#FFA4A4' };
    mostrar.push(serieP);
    mostrar.push(serieD);
    return mostrar;
}
function descArray(tipoGob, tipoPA, data) {
    let series = globalVariables.dataGeneral.series;
    let array1 = series.filter(function(item) {
        return data.includes(item.id);
    })
    return array1;
}
const setData= async function() { 
    setInfoControles();
    // if (!globalVariables.dataTotal_C | !globalVariables.dataTotal_S) {
    console.log('Ubigeo: '+globalVariables.ubigeo);
    if (globalVariables.ubigeo =="000000"){
        let data= await getDataActual(globalVariables.tipo_reporte);
        globalVariables.data_total_todo=await getDataTotal();
        setJs(data,globalVariables.tipo_reporte);
   

    }
    else{
        globalVariables.data_total_todo=await getDataTotal('t',globalVariables.ubigeo,globalVariables.anio_a,globalVariables.anio_d);
        let data= await getDataUbigeoFronteraActual(globalVariables.tipo_reporte, globalVariables.ubigeo );
        setJs(data,globalVariables.tipo_reporte);
       
    }
}

const setDataOnlyTotal= async function() { 
    setInfoControles();

    if (globalVariables.ubigeo =="000000" ||globalVariables.ubigeo =="00" ){
      
        globalVariables.data_total_todo=await getDataTotal('','',globalVariables.anio_a,globalVariables.anio_d);
        DataGraficoBarT();
   

    }
    else{
        globalVariables.data_total_todo=await getDataTotal('t',globalVariables.ubigeo,globalVariables.anio_a,globalVariables.anio_d);       
        DataGraficoBarT();
    }
}

function setJs(data, op) {
    if (op == 'f') {
        globalVariables.dataTotal_F = data;
        globalVariables.dataGeneral = globalVariables.dataTotal_F;
    } 
    if (op == 's') {
        globalVariables.dataTotal_S = data;
        globalVariables.dataGeneral =globalVariables.dataTotal_S;
    } else if (op == 'c') {
        globalVariables.dataTotal_C = data;
        globalVariables.dataGeneral = globalVariables.dataTotal_C;
    }
    init_app();
}
function selEjecucion(i, data) {
    // var chart = Highcharts.chart('chartArea' + i);
    let series = DataArea(data.value);
    var chart = $("#chartArea" + i).highcharts();
    chart.update({ series: series });
}


function setProvDpto(op,e){
    if(op==='1'){
        $('#SelectProv')
        .empty()
    
        let data_prov =$.grep(globalVariables.provincia , function( n, i ) {
            return n.cod_dpto===e.value || n.cod_prov==='0000';
        });
      
        const setProv=function (item) {
                $('#SelectProv')
                .append($("<option></option>")
                        .attr("value", item.cod_prov)
                        .text(item.nom_prov)); 
            };
        data_prov.map(setProv);
    }
    else if(op==='2'){
        $('#SelectDist')
        .empty()
    
        let data_distrito =$.grep(globalVariables.distritos , function( n, i ) {
            return n.cod_prov===e.value|| n.cod_dist==='000000';
        });
        const setDist=function (item) {
            $('#SelectDist')
            .append($("<option></option>")
                    .attr("value", item.cod_dist)
                    .text(item.nom_dist)); 
        };
        data_distrito.map(setDist);
    }




}

const setSelUbigeoDpto =async function setSelUbigeoDpto(){

}



const setSelUbigeo=async function setSelUbigeo(){

    let data = await getDataUbigeoFrontera();
    globalVariables.distritos=data;
    const key_c = 'cod_prov';
    const key_d = 'cod_dpto';

    const aProv = [...new Map(data.map(item =>
    [item[key_c], item])).values()];
    const aDpto = [...new Map(data.map(item =>
        [item[key_d], item])).values()];

    globalVariables.provincia=aDpto;
    globalVariables.provincia=aProv;


    const getFullName=function (item) {
        $('#SelectDpto')
        .append($("<option></option>")
                .attr("value", item.cod_dpto)
                .text(item.nom_dpto)); 
    };


    aDpto.map(getFullName);
   
    $("#SelectDpto option[value=00]").attr('selected', 'selected');
  
}


function SetDataTotal(){

    let data=globalVariables.data_total_todo.data;

    const getData=function(item){ 
        var data_return=[];
        var data_=$.grep(data, function(v) {     
            if(globalVariables.tipo_proyecto_actividad=='1'){   
                return v.tipo_gobierno === item;
            }
            else {
                return v.tipo_gobierno === item && v.tip_act_proy===globalVariables.tipo_proyecto_actividad;
            }
        })
        var sum_datos_p=0;
        var sum_datos_d=0;
        var sum_datos_g=0;
        $.map(data_, function(e) {
            sum_datos_p+=e.pim;
            sum_datos_d+=e.dev;
            sum_datos_g+=e.gir;
        })
        var d_tipo='';
        var _tipo = (item =='E') ? (d_tipo='Gobierno Nacional') : ((item =='R') ? (d_tipo='Gobierno Regional') : (d_tipo='Gobierno Local'))
        return {tipo_gobierno:_tipo,pim:sum_datos_p,dev:sum_datos_d,gir:sum_datos_g};
        
    }
    let data_gobiernos=[];
    $.map(gC.TIPO_GOB,function(e){
        data_gobiernos.push(getData(e));
     });


     var result = $.map(data_gobiernos, function(item) {
        var data_f = [];
        data_f.push({ id: item.tipo_gobierno, name: item.tipo_gobierno, data: { monto: [item.pim, item.dev, item.gir], per: [100, Math.round(item.dev / item.pim* 100), Math.round(item.gir / item.pim * 100)] } });
        return data_f;
    })
   return result;

}

//DESCENTRALIZACION
const setDataDescentralizacion= async function() { 
    //setInfoControles();
    // if (!globalVariables.dataTotal_C | !globalVariables.dataTotal_S) {

    // if (globalVariables.ubigeo =="000000"){
        let data= await getDataTotalDescentralizacion('','');
        console.log(data);
       // globalVariables.data_total_todo=await getDataTotal();
       // setJs(data,globalVariables.tipo_reporte);
    // }
    // else{
    //     globalVariables.data_total_todo=await getDataTotal('t',globalVariables.ubigeo,globalVariables.anio_a,globalVariables.anio_d);
    //     let data= await getDataUbigeoFronteraActual(globalVariables.tipo_reporte, globalVariables.ubigeo );
    //     setJs(data,globalVariables.tipo_reporte);
       
    // }
}


export {setDataDescentralizacion,nombreSerie,compareValues,numeroComas,CleanBar,Top3,tooltipEjecucion,CleanArea,DataArea,descArray,setData,selEjecucion,setSelUbigeo,setProvDpto,SetDataTotal,setSelUbigeoDpto,setDataOnlyTotal};