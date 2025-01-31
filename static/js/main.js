

import {getDataHistorica,getDataTotal,getDataActual} from './modules/dataService.js';
import {globalVariables} from './modules/globalVariables.js'
import {globalConst} from './modules/globalConst.js'
import{init_app} from './modules/_init_.js'  
import{setData,selEjecucion,setSelUbigeo,setProvDpto,setSelUbigeoDpto,setDataOnlyTotal} from './modules/extension.js'

const queryString = window.location.search;
globalConst.SETTINGS= new URLSearchParams(queryString);

setSelUbigeo();
setSelUbigeoDpto();

if(globalConst.SETTINGS.get('amb')=='pb'){
globalVariables.dataGeneral= await getDataActual('f','PB');
    $("#SelectAnio_a").val("2017");  
    $("#SelectAnio_d").val("2022"); 
globalVariables.data_total_todo=await getDataTotal('p','','2017','2022');
}
else {
globalVariables.dataGeneral= await getDataActual('f','F');
globalVariables.data_total_todo=await getDataTotal('','','2013','2024');
}
await init_app();

window.setData =await setData;
window.selEjecucion =await selEjecucion;
window.getInfo = init_app;
window.setProvDpto=setProvDpto;
window.setDataTotal=setDataOnlyTotal;
