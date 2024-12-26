import {globalVariables} from './globalVariables.js'

function setInfoControles() {
    let _valueInfo = "0";
    let _chkAct = $("#chkAct").is(":checked");
    let _chkPry = $("#chkPry").is(":checked");

    //valor tipo de Informacion
    if (_chkAct && _chkPry)
        _valueInfo = "1";
    else if (!_chkAct && _chkPry)
        _valueInfo = "2";
    else if (_chkAct && !_chkPry)
        _valueInfo = "3";

    //valor de tipo Grafico
    let _valueUbigeo ='';
    let _valueGrafico = $("#tipoGrafico").children("option:selected").val();
    //valor de tipo Distrito
   
    let cbo_d=$("#SelectDist").children("option:selected").val();
    //valor de tipo Provincia
    let cbo_p=$("#SelectProv").children("option:selected").val();
    //valor de tipo Departamento
    let cbo_t= $("#SelectDpto").children("option:selected").val();

    if(cbo_d&&cbo_d!='000000'){
        _valueUbigeo=cbo_d;
    }
    else if (cbo_p&&cbo_p!='0000'){
        _valueUbigeo=cbo_p;
    }
    else if (cbo_t){
        _valueUbigeo=cbo_t;
    }
    console.log(_valueUbigeo);
    //valor de tipo Gobierno
    let _valueGobierno = $("#tipoGobierno").children("option:selected").val();

        globalVariables.tipo_gobierno = _valueGobierno;
        globalVariables.tipo_proyecto_actividad = _valueInfo;
        globalVariables.ubigeo=_valueUbigeo;

    globalVariables.anio_a=$("#SelectAnio_a").children("option:selected").val();
    globalVariables.anio_d=$("#SelectAnio_d").children("option:selected").val();
  
}

export{setInfoControles};