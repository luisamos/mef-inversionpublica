window.addEventListener('hashchange', hasChangeLocation);

//Función para asignar la primera letra de cada palabra en mayúsculas
function capitalize(str) {
    return str.replace(/^(.)|\s(.)/g, function (match) {
        return match.toUpperCase();
    });
}

let dbOption = 1;
//Función que detecta la dirección URL
function hasChangeLocation() {
    let routeCurrent = window.location.hash;
    router(routeCurrent);
}

let currentDepartamento, currentProvincia, currentDistrito, currentDepartamentoAuxiliar, currentProvinciaAuxiliar, currentDistritoAuxiliar;
let mDepartamento, mProvincia, mDistrito;
async function openListDepartamento() {

    let $list = document.querySelector('.list__departamento');
    $list.classList.toggle('displayNone');
    $list.innerHTML = '';
    let mList = Ubigeo.filter(i => i.codigo.length === 2);
    mDepartamento = mList.sort(sortUbigeo);

    mDepartamento.forEach(r => {
        let $item = `<div onclick="setDepartamento('${r.codigo}', '${r.nombre}');"><span data-codigo="${r.codigo}">${capitalize(r.nombre.toLocaleLowerCase())}</span></div>`;
        $list.insertAdjacentHTML('beforeend', $item);
    });
}

async function openListProvincia() {

    let $list = document.querySelector('.list__provincia');
    $list.classList.toggle('displayNone');
    $list.innerHTML = '';
    let mList = Ubigeo.filter(i => i.codigo.length === 4 && i.codigo.slice(0, 2) === currentDepartamento);
    mProvincia = mList.sort(sortUbigeo);

    mProvincia.forEach(r => {
        let $item = `<div onclick="setProvincia('${r.codigo}', '${r.nombre}');"><span data-codigo="${r.codigo}">${capitalize(r.nombre.toLocaleLowerCase())}</span></div>`;
        $list.insertAdjacentHTML('beforeend', $item);
    });
}

async function openListDistrito() {

    let $list = document.querySelector('.list__distrito');
    $list.classList.toggle('displayNone');
    $list.innerHTML = '';
    let mList = Ubigeo.filter(i => i.codigo.length === 6 && i.codigo.slice(0, 4) === currentProvincia);
    mDistrito = mList.sort(sortUbigeo);

    mDistrito.forEach(r => {
        let $item = `<div onclick="setDistrito('${r.codigo}', '${r.nombre}');"><span data-codigo="${r.codigo}">${capitalize(r.nombre.toLocaleLowerCase())}</span></div>`;
        $list.insertAdjacentHTML('beforeend', $item);
    });
}

let mNivel, mPliego, mActPro;
let currentNivel, currentPliego, currentActPro;
async function openListNivel() {
    let $list = document.querySelector('.list__nivel');
    $list.classList.toggle('displayNone');
    $list.innerHTML = '';

    mNivel = API_NIVEL;

    mNivel.forEach(r => {
        let $item = `<div onclick="setNivel('${r.codigo}', '${r.nombre}');"><span data-codigo="${r.codigo}">${r.nombre}</span></div>`;
        $list.insertAdjacentHTML('beforeend', $item);
    });
}

async function openListPliego() {
    let $list = document.querySelector('.list__pliego');
    $list.classList.toggle('displayNone');
    $list.innerHTML = '';

    if (currentNivel === 'M') {
        const mData = await fetch(`${URL_PLIEGO}?dep=${currentDepartamentoAuxiliar ?? ''}&pro=${currentProvinciaAuxiliar ?? ''}&dis=${currentDistritoAuxiliar ?? ''}`).then(resp => resp.json());
        mPliego = mData.data;
    }
    else mPliego = API_NIVEL.filter(r => r.codigo === currentNivel)[0].data;

    mPliego.forEach(r => {
        let $item = `<div onclick="setPliego('${currentNivel === 'M' ? r.id : r.codigo}', '${r.nombre}');"><span data-codigo="${r.codigo}">${r.nombre}</span></div>`;
        $list.insertAdjacentHTML('beforeend', $item);
    });
}

async function openListActPro() {
    let $list = document.querySelector('.list__actpro');
    $list.classList.toggle('displayNone');
    $list.innerHTML = '';
    mActPro = API_ACTPRO;

    mActPro.forEach(r => {
        let $item = `<div onclick="setActPro('${r.codigo}', '${r.nombre}');"><span data-codigo="${r.codigo}">${r.nombre}</span></div>`;
        $list.insertAdjacentHTML('beforeend', $item);
    });
}

function setNivel(_codigo, _label) {
    let $tag__nivel = document.querySelector('.tag__nivel');
    $tag__nivel.innerHTML = capitalize(_label);
    currentNivel = _codigo;
    if (dbOption === 3) {
        //Verificamos si el filtro está a nivel de departamento o provincia
        if ((currentProvinciaAuxiliar ?? '') === '') switchFunction('depa');
        else switchFunction('prov');
    }
}

function setPliego(_codigo, _label) {
    let $tag__pliego = document.querySelector('.tag__pliego');
    $tag__pliego.innerHTML = _label;
    currentPliego = _codigo;
    switchFunction();
}

function setActPro(_codigo, _label) {
    let $tag__actpro = document.querySelector('.tag__actpro');
    $tag__actpro.innerHTML = _label;
    currentActPro = _codigo;
    switchFunction();
}

function sortUbigeo(a, b) {
    const codigoA = a.codigo;
    const codigoB = b.codigo;

    if (codigoA < codigoB) {
        return -1;
    } else if (codigoA > codigoB) {
        return 1;
    } else {
        return 0;
    }
}



function setDepartamento(_ubigeo, _label) {
    let $tag__departamento = document.querySelector('.tag__departamento');
    $tag__departamento.innerHTML = capitalize(_label);
    currentDepartamento = _ubigeo;  //Por ahora colocaremos el nombre en vez del ubigeo
    currentDepartamentoAuxiliar = _label;  //Por ahora colocaremos el nombre en vez del ubigeo
    document.querySelector('.list__departamento').classList.add('displayNone');
    clearProvincia();
    clearDistrito();
    switchFunction('depa');
}

function setProvincia(_ubigeo, _label) {
    let $tag__provincia = document.querySelector('.tag__provincia');
    $tag__provincia.innerHTML = capitalize(_label);
    currentProvincia = _ubigeo;
    currentProvinciaAuxiliar = _label;
    document.querySelector('.list__provincia').classList.add('displayNone');
    clearDistrito();
    switchFunction('prov');
}

function clearProvincia() {
    let $tag__provincia = document.querySelector('.tag__provincia');
    $tag__provincia.innerHTML = '- Provincias -';
    currentProvincia = '';
    currentProvinciaAuxiliar = '';
    switchFunction('depa');
}

function setDistrito(_ubigeo, _label) {
    let $tag__distrito = document.querySelector('.tag__distrito');
    $tag__distrito.innerHTML = capitalize(_label);
    currentDistrito = _ubigeo;
    currentDistritoAuxiliar = _label;
    document.querySelector('.list__distrito').classList.add('displayNone');
    switchFunction('dist');
}

function clearDistrito() {
    let $tag__distrito = document.querySelector('.tag__distrito');
    $tag__distrito.innerHTML = '- Distritos -';
    currentDistrito = '';
    currentDistritoAuxiliar = '';
    switchFunction('prov');
}

function switchFunction(_type) {
    if (dbOption === 1) {
        getInfo()
    }
    else if (dbOption === 2) {
        getDataProyectos();
    }
    else if (dbOption === 3) {
        if (_type === 'depa') getMapaProvincia(currentDepartamentoAuxiliar, currentDepartamento);
        else if (_type === 'prov') getMapaDistrito(currentDepartamentoAuxiliar, currentProvinciaAuxiliar, currentProvincia);
        else closeModalFilterDB3();
    }
}

async function getInfo() {

    closeModalFilterDB3();
    const data = await fetch(`${URL_DB1}?dep=${currentDepartamentoAuxiliar}&pro=${currentProvinciaAuxiliar}&dis=${currentDistrito}&niv=${currentNivel}&eje=${currentPliego}`).then(resp => resp.json());

    if (Number(data.status) <= 0) return;

    const oData = data.data[0];

    document.getElementById('lblPimResumen').innerHTML = `${Math.floor(oData.pim / 1000000000)} MM`
    document.getElementById('lblPimCompleto').innerHTML = `S/ ${oData.pim?.toLocaleString() ?? 0}`

    document.getElementById('lblEjecucionAvance').innerHTML = `${oData.avance ?? 0}%`
    buildCardEjecucion(oData.avance);
    buildFuenteFinanciamiento(oData.fuente);
    buildTipoGobierno(oData.tipo_gobierno);
    buildCardPresupuestoFunciones(oData.funcion);

    let mCategoria = [], mData = [];
    if (oData.ambito === null) return;
    oData.ambito.forEach(amb => {
        if (amb.nom_dpto === null) return;
        mCategoria.push(capitalize(amb.nom_dpto.toLocaleLowerCase()));
        mData.push(amb.monto);
    })

    Highcharts.chart('container1', {
        chart: {
            type: 'bar',
            style: {
                fontFamily: 'Open Sans'
            }
        },
        title: {
            text: ''
        },
        plotOptions: {
            bar: {
                borderRadius: '0%',
                dataLabels: {
                    style: {
                        fontSize: '10px',
                    },
                    enabled: true
                },
                groupPadding: 0.2
            }
        },
        legend: {
            enabled: false
        },
        xAxis: {
            categories: mCategoria,
            title: {
                text: ''
            },
            labels: {
                style: {

                    fontSize: 12
                },

            }
        },
        yAxis: {
            categories: [0, 1000000],
            title: {
                text: ''
            },
            labels: {
                fontSize: '10px',
                step: 1
            }
        },
        series: [{
            data: mData
        }]
    });

}

function buildCardPresupuestoFunciones(_items) {

    if (_items === null) return;

    let $ppto__list = document.querySelector('.ppto__list');
    $ppto__list.innerHTML = '';

    _items.forEach(item => {
        let lengthMax = 20;
        let strTitulo = item.titulo.length > lengthMax ? (item.titulo.slice(0, lengthMax) + '...') : item.titulo;
        let $card = `<div class="ppto__item">
                        <img alt="${item.titulo}" src="${item.ruta}" />
                        <div>
                            <span class="ppto__title" title="${capitalize(item.titulo.toLocaleLowerCase())}">${capitalize(strTitulo.toLocaleLowerCase())}</span>
                            <span class="ppto__value">${item.valor}</span>
                            <span class="ppto__description">${item.descripcion}</span>
                        </div>
                    </div>`;

        $ppto__list.insertAdjacentHTML('beforeend', $card);
    })
}

function miles(str) {
    return new Intl.NumberFormat("es-PE").format(str);
}

function capitalize(str) {
    return str.toLowerCase().replace(/^(.)|\s(.)/g, function (match) {
        return match.toUpperCase();
    });
}

(function () {
    let routeCurrent = window.location.hash;
    router(routeCurrent);
})();

function bindMenuOptions() {
    let $options = document.querySelectorAll('.menu__option');
    $options.forEach($opt => {
        $opt.addEventListener('click', (e) => {
            window.location.href = `${$opt.dataset.route}`
        });
    });
}

function setMenuActive(_menu) {
    document.querySelector('.menu__option.active').classList.remove('active');
    document.getElementById(_menu).classList.add('active');
}

bindMenuOptions();