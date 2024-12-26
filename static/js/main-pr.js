

import {getDataPRActual, getDataPRHistorico,getDataPRCenso,getDataPRUbigeo,getDataPRIndeci} from './modules/dataService.js';
import {globalVariables} from './modules/globalVariables.js'
import {globalConst} from './modules/globalConst.js'
import{init_app} from './modules/_init_.js'  
import{setData,selEjecucion,setSelUbigeo,setProvDpto,setSelUbigeoDpto,setDataOnlyTotal} from './modules/extension.js'
import {SeparateData, SeparateDataHistorico,SeparateDataCenso}from './modules/grafico/GSemiBarra_PR.js'
import { SetDataindeci,SetDataMinisterio,SetDataactual,SetDatahist,setUbigeo ,setDataSearch,DescargaPR} from './modules/extension-pr.js';

const queryString = window.location.search;
globalConst.SETTINGS= new URLSearchParams(queryString);

window.setData =await setData;
window.setDataactual =await SetDataactual;
window.setDataindeci =await SetDataindeci;
window.setDatahist =await SetDatahist;
window.selEjecucion =await selEjecucion;
// window.getInfo = init_app;
// window.setProvDpto=setProvDpto;
// window.setDataTotal=setDataOnlyTotal;
window.setDataSearch=setDataSearch;
window.onDescarga=await DescargaPR;
window.SetDataMinisterio=SetDataMinisterio;
// getDataPRActual('2023','todo',globalConst.SETTINGS.get('ubigeo').toString());
// getDataPRIndeci('2023','todo',globalConst.SETTINGS.get('ubigeo').toString());
// getDataPRUbigeo(globalConst.SETTINGS.get('ubigeo').toString());
// getDataPRCenso(globalConst.SETTINGS.get('ubigeo').toString());
// getDataPRHistorico('2017','2023','todo',globalConst.SETTINGS.get('ubigeo').toString());


