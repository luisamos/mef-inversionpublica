

import {getDataTotalDescentralizacion,getDataPRCenso,getDataPRUbigeoSD,getDataFiltroSD} from './modules/dataService.js';
import {globalVariables} from './modules/globalVariables.js'
import {globalConst} from './modules/globalConst.js'
import{onChangeSector,onChangePliego,setDataSearch,changeFiltro} from './modules/extension-sd.js'

const queryString = window.location.search;
globalConst.SETTINGS= new URLSearchParams(queryString);

window.onChangeSector =await onChangeSector;
window.onChangePliego =await onChangePliego;
// window.setDataactual =await SetDataactual;
// window.setDataindeci =await SetDataindeci;
// window.setDatahist =await SetDatahist;
// window.selEjecucion =await selEjecucion;
// window.getInfo = init_app;
// window.setProvDpto=setProvDpto;
// window.setDataTotal=setDataOnlyTotal;
window.setDataSearch=setDataSearch;
window.changeFiltro=changeFiltro;

// window.SetDataMinisterio=SetDataMinisterio;
// getDataPRActual('2023','todo',globalConst.SETTINGS.get('ubigeo').toString());
// getDataPRIndeci('2023','todo',globalConst.SETTINGS.get('ubigeo').toString());

let ubigeo= globalConst.SETTINGS.get('ubigeo')?globalConst.SETTINGS.get('ubigeo').toString():'';

getDataPRUbigeoSD(ubigeo);
getDataFiltroSD();
getDataTotalDescentralizacion('',ubigeo,'','','','','');


