

import {getDataTotalFIDT,getDataPRCenso,getDataPRUbigeoSD,getDataFiltroSD} from './modules/dataService.js';
import {globalVariables} from './modules/globalVariables.js'
import {globalConst} from './modules/globalConst.js'
import{onChangeSector,setDataSearchFIDT,onChangePliego,setDataSearch,changeFiltroSD,DescargaFIDT} from './modules/extension-sd.js'

const queryString = window.location.search;
globalConst.SETTINGS= new URLSearchParams(queryString);

window.onChangeSector =await onChangeSector;
window.onChangePliego =await onChangePliego;

window.onDescarga=await DescargaFIDT;

window.setDataSearch=setDataSearchFIDT;
window.changeFiltro=changeFiltroSD;

let ubigeo= globalConst.SETTINGS.get('ubigeo')?globalConst.SETTINGS.get('ubigeo').toString():'';

getDataPRUbigeoSD(ubigeo);
// getDataFiltroSD();
getDataTotalFIDT(ubigeo,'','');


