import {GTop5Inversiones} from './grafico/GTop5Inversiones.js'
import {DataGraficoBar} from './grafico/GSemiBarra.js'
import {GAreaAcumulada} from './grafico/GAreaAcumulada.js'
import {GAreasPeque} from './grafico/GAreasPeque.js'
import {DataGraficoBarT} from './grafico/GSemiBarra_T.js'
import {setInfoControles} from './controllers.js'
import {SetDataTotal} from './extension.js'

function init_app(){
     setInfoControles();
     GTop5Inversiones();
     DataGraficoBar();
     GAreaAcumulada();
     GAreasPeque();
     DataGraficoBarT();

}
export{init_app}