let $app = document.querySelector('#app');

function router(_route) {
    $app.innerHTML = '';
    let htmlPage = '';
    // resetMenu(_route);
    // loader(true);

    switch (_route) {
        case '':
        case '#/':
        case '#/dashboard-1':
            htmlPage = $DASHBOARD1_PAGE;
            setMenuActive('mnuOption1');
            setTimeout(() => {
                currentDepartamentoAuxiliar = 'LIMA'
                currentDepartamento = '15';
                currentProvinciaAuxiliar=''
                currentProvincia = '';
                currentDistritoAuxiliar = '';
                currentDistrito = '';
                currentNivel = 'E';
                currentPliego = '';
                currentActPro = '';

                getInfo(currentDistrito);
            }, 200);
            dbOption = 1;
            break;

        case '#/dashboard-2':
            htmlPage = $DASHBOARD2_PAGE;
            setMenuActive('mnuOption2');
            setTimeout(() => {
                currentDepartamentoAuxiliar = 'LIMA'
                currentDepartamento = '15';
                currentProvinciaAuxiliar=''
                currentProvincia = '';
                currentDistrito = '';
                currentNivel = 'E';
                currentPliego = '';
                currentActPro = '';
                
                getDataProyectos();
            }, 200);
            dbOption = 2;
            break;

        case '#/dashboard-3':
            htmlPage = $DASHBOARD3_PAGE;
            setMenuActive('mnuOption3');
            setTimeout(() => {
                setMap();

                buildAvanceGauge('container__nacional', 0, 0);
                buildAvanceGauge('container__regional', 0, 0);
                buildAvanceGauge('container__local', 0, 0);
                getDepartamentoDefault();
            }, 200);
            dbOption = 3;
            break;

        default:
            // htmlPage = $ERROR_PAGE;
            // setTimeout(() => {
            // }, 200);
            break;
    }

    $app.insertAdjacentHTML('beforeend', `${htmlPage}`);
}