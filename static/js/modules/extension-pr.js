import {globalVariables}from './globalVariables.js'
import {globalConst as gC}from './globalConst.js'
import {getDataPRActual,getDataPRMinisterio, getDataPRHistorico,getDataPRIndeci,getDataPRCenso,getDataPRUbigeo, getDataPRMinisterioHist,getDataDescargaPresidencia} from './dataService.js'

import {SeparateData, SeparateDataHistorico}from './grafico/GSemiBarra_PR.js'

function numeroComas(x) {
    return 'S/ ' + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function numeroComas2(x) {
    return  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function setDataMontos(data){
    var data_f = [];
    var item=data.datos;
 
   item.map(item=>{   console.log(item);
    var p_dev=Math.round(item.dev / item.pim* 100)      
    var p_gir=Math.round(item.gir/ item.pim* 100)
    var p_pim=100
    if(isNaN(p_dev))
        p_dev=0;
    if(isNaN(p_gir))
        p_gir=0;
    if(item.pim==0)
        p_pim=0 
    
    data_f.push({id_t:data.id,color:data.color,title:data.title,fuente:data.fuente,ct:data.ct ,ct_n:item.ct,id: item.tipo_gobierno, name: item.niv_gobierno, data: { monto: [item.pim.toFixed(2), item.dev.toFixed(2), item.gir.toFixed(2)], per: [p_pim, p_dev, p_gir] } });
   });

    return data_f;
  
 }
 
async function SetDataactual(id,anio){
    await getDataPRActual(anio,id,gC.UBIGEO);
}
async function SetDataindeci(id,anio){
    await getDataPRIndeci(anio,id,gC.UBIGEO);
}

 async function SetDataMinisterio(){
    var op= $(cbministerio).children("option:selected").val();

    if(op=='00')
        await getDataPRActual(2023,'todo', gC.UBIGEO);
    else
    {
        await getDataPRMinisterio(2023,op, gC.UBIGEO);
   //     await getDataPRMinisterioHist(2017,2023,op, gC.UBIGEO);

    }
 }


 async function SetDatahist(id){
    var cba="#cbi"+id;
    var cbf="#cbf"+id;

    var anio_i= $(cba).children("option:selected").val();
    var anio_f= $(cbf).children("option:selected").val();
    
    console.log(cba);
    console.log(cbf);

    SeparateDataHistorico(await getDataPRHistorico(anio_i,anio_f,id,gC.UBIGEO));
 }
 $("#btn-mapa").hide();
 function setUbigeo(data){

    $(".departamento").html(data.data[0].departamento);
    $(".provincia").html(data.data[0].provincia);
    $(".distrito").html(data.data[0].distrito);

 
    
    $("#title-ubigeo-label").html(data.data[0].title);
    if(gC.UBIGEO.length==2)
        $("#btn-mapa").show();
        $("#map-href").attr("href", `https://visor.geoperu.gob.pe/sd/?ubigeo=${gC.UBIGEO}`);
       // $("#btn-mapa").html("<button class='map-button'><i class='fas fa-map'></i><a style='text-decoration:none;color:white;' href='https://visor.geoperu.gob.pe/sd/?ubigeo="+gC.UBIGEO+"' target='_blank'>Ir Mapa</a></button>"); 
    
    // $("#departamento").html(data.data[0].departamento);
    // $("#provincia").html(data.data[0].provincia);
    // $("#distrito").html(data.data[0].distrito);
 }

 function setDataSearch(_nombre,_ubigeo){
    const $listUbigeo = document.getElementById('listUbigeo');
    const $filtroUbigeo = document.getElementById('filtroUbigeo');

    $filtroUbigeo.value = _nombre;
    $listUbigeo.classList.remove('displayBlock');

    getDataPRActual('2023','todo',_ubigeo);
    getDataPRIndeci('2023','todo',_ubigeo);
    getDataPRUbigeo(_ubigeo);
    getDataPRCenso(_ubigeo);
    getDataPRHistorico('2023','2023','todo',_ubigeo);


    gC.UBIGEO=_ubigeo;
    

         
}
function DescargaPR(tipo) {
    
    let _tipo=tipo;
    let _anio='2023';
    if (tipo='pr-e')
        _anio = $("#anio-pr-e").children("option:selected").val();
    else if(tipo='pr-i')
         _anio = $("#anio-pr-i").children("option:selected").val();
    else if(tipo='pr-p')
        _anio = $("#anio-pr-p").children("option:selected").val();
  
    let _ubigeo = '';
    if (gC.UBIGEO)
        _ubigeo = gC.UBIGEO;
    
    
    
    getDataDescargaPresidencia(_ubigeo, _tipo,_anio);
   

}


export {DescargaPR,SetDataindeci,SetDataMinisterio,numeroComas2,numeroComas,setDataMontos,SetDataactual,SetDatahist,setUbigeo,setDataSearch};