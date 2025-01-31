const $DASHBOARD2_PAGE = `
    <div class="dashboard__content2">
        <div class="card__total">
            <span>TOTAL de presupuesto</span>
            <div class="card__amount">
                <span id="lblPimResumen"class="amount__primary">0 MM</span>
                <span id="lblPimCompleto" class="amount__secondary">S/ 0 millones</span>
            </div>
        </div>

        <div class="card__ejecucion">
            <div>
                <span>Nivel de ejecución</span>
                <p id="lblEjecucionAvance">0.00%</p>
            </div>
            
            <div class="ejecucion__gauge">
                <figure class="highcharts-figure">
                    <div id="container"></div>
                </figure>
            </div>
        </div>

        <div class="list__proyecto">
            <div class="proyecto__table">
                <div class="table__head">
                    <div class="item__row">
                        <div></div>
                        <div class="b700 center">Nombre de la obra</div>
                        <div class="b700 center text-center">PIA</div>
                        <div class="b700 center text-center">PIM</div>
                        <div class="b700 center text-center">Comprometido</div>
                        <div class="b700 center text-center">Certificado</div>
                        <div class="b700 center text-center">Devengado</div>
                        <div class="b700 center text-center">Girado</div>
                        <div class="b700 center text-center">% de avance</div>
                    </div>
                </div>
                <div class="table__body">
                </div>
            </div>
            <div class="table__paged">
                <select id="cboElementsPerPage" class="select__paged" title="Elementos por página" onchange="setItemsPage();">
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                </select>
                <span>Elementos por página</span>
                <p id="lblTotalRegistros"></p>
                <div></div>
                <select id="cboTotalPages" class="select__paged" title="Página actual" onchange="setPageCurrent();">
                </select>
                <p>de <span id="lblTotalPages">1</span> páginas</p>
                <div>
                    <img alt="Anterior" src="./src/images/fi_chevron-left.svg" class="clickeable" onclick="prevRankingPage();">
                    <img alt="Anterior" src="./src/images/fi_chevron-right.svg" class="clickeable" onclick="nextRankingPage();">
                </div>
            </div>
        </div>
    </div>
`;

let mDataProyectos;
let currentPage = 1;
let itemsPage = 10;
let pagesTotal = 0;

function prevRankingPage() {
    if (currentPage === 1) return;
    currentPage -= 1;
    fillDataProyectos();
}

function nextRankingPage() {
    if (currentPage >= document.getElementById('cboTotalPages').options.length) return;
    currentPage += 1;
    fillDataProyectos();
}

function setItemsPage() {
    itemsPage = parseInt(document.getElementById('cboElementsPerPage').value);
    fillDataProyectos();
}

function setPageCurrent() {
    currentPage = parseInt(document.getElementById('cboTotalPages').value);
    fillDataProyectos();
}

function calculateTotalPages() {

    var $cboTotalPages = document.getElementById('cboTotalPages');
    $cboTotalPages.innerHTML = '';
    document.getElementById('lblTotalRegistros').innerHTML = `${(currentPage - 1) * itemsPage + 1} - ${((currentPage * itemsPage) > mDataProyectos.length) ? mDataProyectos.length : (currentPage * itemsPage)} de ${mDataProyectos.length} elementos`;

    pagesTotal = Math.ceil(mDataProyectos.length / itemsPage);
    document.getElementById('lblTotalPages').innerHTML = pagesTotal;

    for (let i = 1; i <= pagesTotal; i++) {
        let $option = document.createElement('option');
        $option.value = i;
        $option.innerHTML = i;
        $cboTotalPages.appendChild($option);
    }

    $cboTotalPages.value = currentPage;
}


async function getDataProyectos() {
    
    const oData = await fetch(`${URL_DB2}?dep=${currentDepartamentoAuxiliar}&pro=${currentProvinciaAuxiliar ?? ''}&dis=${currentDistrito}&niv=${currentNivel}&eje=${currentPliego}&tip_pry=${currentActPro}`).then(resp => resp.json());

    if (oData.status <= 0) return;

    mDataProyectos = [...oData.data[0].proyectos];
    fillDataProyectos();

    document.getElementById('lblEjecucionAvance').innerHTML = `${oData.data[0].avance}%`;
    buildCardEjecucion(oData.data[0].avance);

    document.getElementById('lblPimResumen').innerHTML = `${Math.floor(oData.data[0].pim / 1000000000)} MM`
    document.getElementById('lblPimCompleto').innerHTML = `S/ ${oData.data[0].pim?.toLocaleString()}`
}

function fillDataProyectos() {
    let $body = document.querySelector('.proyecto__table .table__body');
    $body.innerHTML = '';

    calculateTotalPages();

    mDataProyectos.forEach((r, index) => {
        if (index >= ((currentPage - 1) * itemsPage) && index < (currentPage * itemsPage)) {
            let { className, flagImage } = getClassAvance(r.avance);

            let $row = `
            <div class="item__row">
                <div>${index + 1}</div>
                <div class="b700 center">${r.proyecto}</div>
                <div class="b700 center text-center">${miles(r.pia)}</div>
                <div class="b700 center text-center">${miles(r.pim)}</div>
                <div class="b700 center text-center">${miles(r.comprometido)}</div>
                <div class="b700 center text-center">${miles(r.cer)}</div>
                <div class="b700 center text-center">${miles(r.dev)}</div>
                <div class="b700 center text-center">${miles(r.gir)}</div>
                <div class="b700 column__avance">
                    <img alt="Imagen de avance" src="./src/images/avance-${flagImage}.png" />
                    <span class="${className}">${r.avance} %</span>
                </div>
            </div>
        `;

            $body.insertAdjacentHTML('beforeend', $row);
        }
    });
}

function getClassAvance(_value) {
    let className = 'text', flagImage = '';

    if (_value >= 0.00 && _value <= 29.99) {
        className = 'text-low';
        flagImage = 'low';
    }
    else if (_value >= 30.00 && _value <= 59.99) {
        className = 'text-mid';
        flagImage = 'mid';
    }
    else {
        className = 'text-high';
        flagImage = 'high';
    }

    return { className, flagImage }
}