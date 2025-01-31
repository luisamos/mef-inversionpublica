import {globalConst }from './globalConst.js'
import {SeparateData, SeparateDataHistorico,SeparateDataCenso}from './grafico/GSemiBarra_PR.js'
import {setUbigeo}from './extension-pr.js'
import { setFIDT,setFiltroEjecutora,setFiltroPliego,setDataDescentralizacion,setFiltros} from './extension-sd.js'
//GET DATA PERSONALIZAD

// function getDataUbigeo() {
//     return fetch(globalConst.PATH + 'ubigeo')
//         .then((response) => {
//             return response.json().then((data) => { console.log(data)
//                 return data;
//             }).catch((err) => {
//             });
//         });
// };



function getDataUbigeoFrontera() {
    if(globalConst.SETTINGS.get('amb')=='pb'){
        return fetch(globalConst.PATH + 'pb')
        .then((response) => {
            return response.json().then((data) => { console.log(data)
                return data;
            }).catch((err) => {
            });
        });
    }
    else {
    return fetch(globalConst.PATH + 'fronterizo')
        .then((response) => {
            return response.json().then((data) => { 
                return data;
            }).catch((err) => {
            });
        });
    }
};

function getDataUbigeoFronteraActual(op,ubigeo) {
    return fetch(globalConst.PATH + 'fronterizo/'+op+'/'+ubigeo)
        .then((response) => {
            return response.json().then((data) => {
                return data;
            }).catch((err) => {
            });
        });
};

async function getDataHistorica() {
    return fetch(globalConst.PATH + 'hist/fronterizo')
        .then((response) => {
            return response.json().then((data) => {
                return data;
            }).catch((err) => {
            });
        });
};

function getDataActual(op,r) {
    return fetch(globalConst.PATH + 'hist/fronterizo/'+ op +'/'+r )
        .then((response) => {
            return response.json().then((data) => {
                return data;
            }).catch((err) => {

            });
        });
};

function getDataTotal(_op,_ubigeo,_anio_a,_anio_d) {
    if(globalConst.SETTINGS.get('amb')=='pb'){
    return fetch(globalConst.PATH + 'hist/fronterizo/total?'+ new URLSearchParams({ op:_op,ubigeo:_ubigeo ,anio_a:_anio_a,anio_d:_anio_d}))
        .then((response) => {
            return response.json().then((data) => {
                return data;console.log(data)
            }).catch((err) => {

            });
        });}
    else {
        return fetch(globalConst.PATH + 'hist/fronterizo/total?'+ new URLSearchParams({ op:_op,ubigeo:_ubigeo ,anio_a:_anio_a,anio_d:_anio_d}))
        .then((response) => {
            return response.json().then((data) => {
                return data;console.log(data)
            }).catch((err) => {

            });
        }); 
    }
};

//PRESIDENCIA

function getDataPRMinisterioHist(_anio_i,_anio_f,_op,_ubigeo) {
    var e=document.getElementsByName('a3');

        e[0].classList.add("displayblur");
        e[1].classList.add("displayblur");

    return fetch(globalConst.PATH_PR + 'ministerio-hist?'+new URLSearchParams({ubigeo:_ubigeo,op:_op,anio_i:_anio_i,anio_f:_anio_f}))
        .then(response=>response.json())
        .then(data=>{
            SeparateDataHistorico(data)
            
        })
        
        .finally(()=>{
            e[0].classList.remove("displayblur");
            e[1].classList.remove("displayblur");
   
          });
};
function getDataPRMinisterio(_anio,_op,_ubigeo) {
    var e=document.getElementsByName('a3');

        e[0].classList.add("displayblur");
        e[1].classList.add("displayblur");

    return fetch(globalConst.PATH_PR + 'ministerio?'+new URLSearchParams({ubigeo:_ubigeo,op:_op,anio:_anio}))
        .then(response=>response.json())
        .then(data=>{
            SeparateData(data)
            
        })
        
        .finally(()=>{
            e[0].classList.remove("displayblur");
            e[1].classList.remove("displayblur");
   
          });
};

function setCBMinisterio(){
    getDataPRMinisterio('','','');
}
function getDataPRActual(_anio,_op,_ubigeo) {
    var e=document.getElementsByName('a3');

        e[0].classList.add("displayblur");
        e[1].classList.add("displayblur");

    return fetch(globalConst.PATH_PR + 'all?'+new URLSearchParams({ubigeo:_ubigeo,op:_op,anio:_anio}))
        .then(response=>response.json())
        .then(data=>{
            SeparateData(data)
            
        })
        
        .finally(()=>{
            e[0].classList.remove("displayblur");
            e[1].classList.remove("displayblur");
   
          });
};

function getDataPRHistorico(_anio_i,_anio_f,_op,_ubigeo) {
    var e=document.getElementsByName('a3');

    e[0].classList.add("displayblur");
    e[1].classList.add("displayblur");
    return fetch(globalConst.PATH_PR + 'all-hist?'+new URLSearchParams({anio_i:_anio_i,anio_f:_anio_f,op:_op,ubigeo:_ubigeo}))
    .then(response=>response.json())
    .then(data=>{
        SeparateDataHistorico(data)
    })
    .finally(()=>{
        e[0].classList.remove("displayblur");
        e[1].classList.remove("displayblur");
          });
};

function getDataPRCenso(_ubigeo) {
    var e=document.getElementsByName('a3');

        e[0].classList.add("displayblur");
        e[1].classList.add("displayblur");
    return fetch(globalConst.PATH_PR + 'censo?'+new URLSearchParams({ubigeo:_ubigeo}))
    .then(response=>response.json())
    .then(data=>{
        SeparateDataCenso(data);
    })
    .finally(()=>{
        e[0].classList.remove("displayblur");
        e[1].classList.remove("displayblur");
        
          });
};

function getDataPRIndeci(_anio,_op,_ubigeo) {
    var e=document.getElementsByName('a3');

        e[0].classList.add("displayblur");
        e[1].classList.add("displayblur");
    return fetch(globalConst.PATH_PR + 'indeci?'+new URLSearchParams({ubigeo:_ubigeo,op:_op,anio:_anio}))
    .then(response=>response.json())
    .then(data=>{
        SeparateDataCenso(data);
    })
    .finally(()=>{
        e[0].classList.remove("displayblur");
        e[1].classList.remove("displayblur");
        
          });
};


function getDataPRUbigeo(_ubigeo) {
    var e=document.getElementsByName('a3');

        e[0].classList.add("displayblur");
        e[1].classList.add("displayblur");
    return fetch(globalConst.PATH_PR + 'ubigeo?'+new URLSearchParams({ubigeo:_ubigeo}))
    .then(response=>response.json())
    .then(data=>{
        setUbigeo(data);
    }).finally(()=>{
        e[0].classList.remove("displayblur");
        e[1].classList.remove("displayblur");
   
          });
};

function getDataPRUbigeoSD(_ubigeo) {
    return fetch(globalConst.PATH_PR + 'ubigeo?'+new URLSearchParams({ubigeo:_ubigeo}))
    .then(response=>response.json())
    .then(data=>{
        setUbigeo(data);
    });
};



// DESCENTRALIZACION

function getDataTotalDescentralizacion(_anio,_ubigeo,_sector,_pliego,_ejecutora,_fuente,_recurso) {
    
    return fetch(globalConst.PATH_SD + 'general?'+ new URLSearchParams({ubigeo:_ubigeo ,
        anio:_anio,sector:_sector,pliego:_pliego,_ejecutora:_ejecutora,fuente:_fuente,recurso:_recurso}))
        .then((response) => {
            return response.json().then((data) => {
                return data;
            }).catch((err) => {

            });
        }).then(data=>{
            setDataDescentralizacion(data);
        });
        
}

function getDataFiltroSD() {
    return fetch(globalConst.PATH_SD + 'filtro?'+new URLSearchParams({}))
    .then(response=>response.json())
    .then(data=>{
        setFiltros(data);
        // setUbigeo(data);
    });
}

function getDataPliegoSD(_sector) {
    return fetch(globalConst.PATH_SD + 'filtro/pliego?'+new URLSearchParams({sector:_sector}))
    .then(response=>response.json())
    .then(data=>{
        setFiltroPliego(data);
        // setUbigeo(data);
    });
}

function getDataEjecutoraSD(_sector,_pliego) {
    return fetch(globalConst.PATH_SD + 'filtro/ejecutora?'+new URLSearchParams({sector:_sector,pliego:_pliego}))
    .then(response=>response.json())
    .then(data=>{
        setFiltroEjecutora(data);
        // setUbigeo(data);
    });
}



function getDataTotalFIDT(_ubigeo,_is_finan,_tipo,_ambito) {
    return fetch(globalConst.PATH_SD + 'filtro/fidt/general?'+new URLSearchParams({ubigeo:_ubigeo,
        is_finan:_is_finan,tipo:_tipo,ambito:_ambito}))
    .then(response=>response.json())
    .then(data=>{
        console.log(data);
        setFIDT(data);
        // setUbigeo(data);
    });
}

function getDataDescargaFIDT(_ubigeo,_is_finan,_tipo,_ambito) {
    return fetch(globalConst.PATH_SD + 'filtro/fidt/descarga?'+new URLSearchParams({ubigeo:_ubigeo,is_finan:_is_finan,
        tipo:_tipo,ambito:_ambito}))
    .then(response=>response.blob())
    .then(data=>{
        var a = document.createElement("a");
        a.href = window.URL.createObjectURL(data);
        a.download = "fidt"+globalConst.UBIGEO+".xlsx";
        a.click();
    });
}

function getDataDescargaPresidencia(_ubigeo,_stipo,_anio) {
    
    console.log(_stipo);
    return fetch(globalConst.PATH_PR + '/descarga?'+new URLSearchParams({ubigeo:_ubigeo,
        tipo:_stipo,anio:_anio}))
    .then(response=>response.blob())
    .then(data=>{
        var a = document.createElement("a");
        a.href = window.URL.createObjectURL(data);
        a.download = "proyecto"+globalConst.UBIGEO+".xlsx";
        a.click();
    });
}



export {getDataDescargaPresidencia,getDataDescargaFIDT,getDataTotalFIDT,getDataPliegoSD,getDataEjecutoraSD,getDataFiltroSD,getDataPRUbigeoSD,getDataTotalDescentralizacion,getDataPRMinisterioHist,getDataPRMinisterio,getDataPRIndeci,getDataPRUbigeo,getDataHistorica,getDataActual,getDataUbigeoFrontera,getDataUbigeoFronteraActual,getDataTotal,getDataPRActual,getDataPRHistorico,getDataPRCenso};