const $DASHBOARD3_PAGE = `
    <div class="dashboard__content3">
        <div class="content__gauge">
            <div class="card__gauge">
                <div>
                    <span class="gauge__title">Gobierno Nacional</span>
                    <div>
                        <span class="gauge__value">0</span>
                        <p>N° Proyectos</p>
                    </div>
                </div>
                
                <div>
                    <figure class="highcharts-figure">
                        <div id="container__nacional"></div>
                    </figure>
                </div>
            </div>
            <div class="card__gauge">
                <div>
                    <span class="gauge__title">Gobierno Regional</span>
                    <div>
                        <span class="gauge__value">0</span>
                        <p>N° Proyectos</p>
                    </div>
                </div>
                
                <div>
                    <figure class="highcharts-figure">
                        <div id="container__regional"></div>
                    </figure>
                </div>
            </div>
            <div class="card__gauge">
                <div>
                    <span class="gauge__title">Gobierno Local</span>
                    <div>
                        <span class="gauge__value">0</span>
                        <p>N° Proyectos</p>
                    </div>
                </div>
                
                <div>
                    <figure class="highcharts-figure">
                        <div id="container__local"></div>
                    </figure>
                </div>
            </div>
        </div>
        <div class="content__map">
            <span class="map__title">Avance de ejecución según el territorio</span>
            <div id="map"></div>
            <div class="map__legend">
                <span class="legend">Nivel de ejecución</span>
                <div>
                    <div class="legend__circle low"></div>
                    <label>Nivel bajo</label>
                </div>
                <div>
                    <div class="legend__circle medium"></div>
                    <label>Nivel medio</label>
                </div>
                <div>
                    <div class="legend__circle high"></div>
                    <label>Nivel alto</label>
                </div>
            </div>
        </div>
    </div>
`;


const LATITUD_DEFAULT = -9.29304018812353;
const LONGITUD_DEFAULT = -75.7311368775799;
const ZOOM_DEFAULT = 5.45;
const ZOOM_MIN = 4.8;
const optionsMaps = {
    zoomControl: false,
    doubleClickZoom: false,
    maxZoom: 23.4,
    minZoom: 4.25,
    zoomDelta: 0.10,
    zoomSnap: 0.10,
    zoom: 6,
}

var map, layerGroup;

//Función iniciar para mostrar el mapa
function setMap() {
    map = L.map('map', optionsMaps).setView([LATITUD_DEFAULT, LONGITUD_DEFAULT], ZOOM_DEFAULT);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        minZoom: 4.8,
        attribution: '&copy; <a href="http://www.visor.geoperu.gob.pe/">Geo Perú</a>'
    }).addTo(map);

    layerGroup = new L.layerGroup().addTo(map);

    map.createPane('defaultPane');
    map.getPane('defaultPane').style.zIndex = 400;

    map.createPane('ubigeoPane');
    map.getPane('ubigeoPane').style.zIndex = 600;

    map.on('zoomend', function () {
        var currentZoom = map.getZoom();
        if (currentZoom < ZOOM_MIN) map.setZoom(ZOOM_MIN);
    });
}

function buildAvanceGauge(_container, _value, _nro) {

    let $element = document.getElementById(_container).parentElement.parentElement.parentElement.querySelector('.gauge__value');
    let $divParent = document.getElementById(_container).parentElement.parentElement.parentElement;

    if (_value === 0 && _nro === 0) $divParent.classList.add('disabled');
    else $divParent.classList.remove('disabled');

    $element.innerHTML = _nro;

    Highcharts.chart(_container, {

        chart: {
            type: 'gauge',
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false,
            height: '58%'
        },

        title: {
            text: ''
        },

        pane: {
            startAngle: -90,
            endAngle: 89.9,
            background: null,
            center: ['50%', '75%'],
            size: '110%'
        },

        // the value axis
        yAxis: {
            min: 0,
            max: 100,
            tickPixelInterval: 72,
            tickPosition: 'inside',
            tickColor: Highcharts.defaultOptions.chart.backgroundColor || '#FFFFFF',
            tickLength: 0,
            tickWidth: 2,
            minorTickInterval: null,
            labels: {
                distance: 0,
                style: {
                    fontSize: '0'
                }
            },
            lineWidth: 0,
            plotBands: [
                {
                    from: 0,
                    to: 10,
                    color: '#FE4533',
                    thickness: 20
                },
                {
                    from: 10,
                    to: 65,
                    color: '#FFC93F',
                    thickness: 20
                },
                {
                    from: 65,
                    to: 100,
                    color: '#00B71D',
                    thickness: 20
                },

            ]
        },

        series: [{
            name: 'Avance',
            data: [_value],
            tooltip: {
                valueSuffix: ' %'
            },
            dataLabels: {
                format: '{y} %',
                borderWidth: 0,
                color: (
                    Highcharts.defaultOptions.title &&
                    Highcharts.defaultOptions.title.style &&
                    Highcharts.defaultOptions.title.style.color
                ) || '#333333',
                style: {
                    fontSize: '16px'
                }
            },
            dial: {
                radius: '60%',
                backgroundColor: 'black',
                baseWidth: 12,
                baseLength: '0%',
                rearLength: '0%'
            },
            pivot: {
                backgroundColor: 'black',
                radius: 6
            }

        }]

    });
}

function getColorByAvance(_avance) {
    let color = '';

    if (_avance >= 0.0 && _avance <= 29.99) color = '#DD2222'
    else if (_avance >= 30.00 && _avance <= 59.99) color = '#DDDD00';
    else if (_avance >= 60.00) color = '#6FCF59'
    else color = '#BDBDBBD'

    return { color }
}

var oFiltroUbigeo = new Object();
var filtroUbigeo;
async function getDepartamentoDefault() {

    // const oDataAPI = await fetch(`${URL_DB3}?dep=AMAZONAS&pro=&dis=&niv=R&eje&tip_pry`).then(resp => resp.json());
    const oDataAPI = URL_MAPA_DEMO;

    let nro = 0;
    const oDataGeoJSON = await fetch(URL_DEPARTAMENTO).then(resp => resp.json());
    oDataGeoJSON.features.forEach(i => {

        nro += 1;
        //Obtenemos el color de la Data del API
        let mPlace = oDataAPI.feature.filter(r => r.ubigeo === i.id);
        if (mPlace.length === 0) return;

        let { color } = getColorByAvance(mPlace[0].avance);

        let oFiltro = new Object();
        let iFiltro;

        oFiltro =
        {
            type: 'FeatureCollection',
            name: 'GeoPerú',
            crs: { type: 'name', properties: { name: 'urn:ogc:def:crs:OGC:1.3:CRS84' } },
            features: [{ properties: { cod: i.id }, geometry: i.geometry, type: "Feature" }]
        }

        iFiltro = L.geoJSON(oFiltro,
            {
                style: { color: color, weight: 1, fillOpacity: .8, opacity: 1, pane: 'ubigeoPane' }, filter: function (feature, layer) {
                    return feature.properties.cod == i.id;
                }
            });

        layerGroup.addLayer(iFiltro);

    });
}

function clearPane(_pane) {
    var pane = map.getPane(_pane);
    if (pane) {
        while (pane.firstChild) {
            pane.removeChild(pane.firstChild);
        }
    }
}

async function getMapaProvincia(_departamento, _ubigeodepa) {

    layerGroup.clearLayers();

    const oDataAPI = await fetch(`${URL_DB3}?dep=${_departamento}&pro=&dis=&niv=R&eje&tip_pry`).then(resp => resp.json());
    const oDataGeoJSON = await fetch(URL_PROVINCIA).then(resp => resp.json());

    oDataGeoJSON.features.forEach(i => {
        let mPlace = oDataAPI.data.feature.filter(r => r.ubigeo === i.id);
        if (mPlace.length === 0) return;
        let { color } = getColorByAvance(mPlace[0].avance);

        let oFiltro = new Object();
        let iFiltro;

        oFiltro =
        {
            type: 'FeatureCollection',
            name: 'GeoPerú',
            crs: { type: 'name', properties: { name: 'urn:ogc:def:crs:OGC:1.3:CRS84' } },
            features: [{ properties: { cod: i.id }, geometry: i.geometry, type: "Feature" }]
        }

        iFiltro = L.geoJSON(oFiltro,
            {
                style: { color: color, weight: 1, fillOpacity: .8, opacity: 1, pane: 'ubigeoPane' }, filter: function (feature, layer) {
                    return feature.properties.cod == i.id;
                }
            });

        layerGroup.addLayer(iFiltro);
    });

    const oDataFocus = await fetch(URL_DEPARTAMENTO).then(resp => resp.json());
    const oDataFocusFilter = oDataFocus.features.filter(item => item.id === _ubigeodepa)[0];
    
    oFocus =
    {
        type: 'FeatureCollection',
        name: 'GeoPerú',
        crs: { type: 'name', properties: { name: 'urn:ogc:def:crs:OGC:1.3:CRS84' } },
        features: [{ properties: { cod: _ubigeodepa }, geometry: oDataFocusFilter.geometry, type: "Feature" }]
    }

    iFocus = L.geoJSON(oFocus,
        {
            // style: ubigeoStyle, 
            filter: function (feature, layer) {
                return feature.properties.cod == _ubigeodepa;
            }
        });
    map.flyToBounds(iFocus.getBounds(), { 'duration': .5 });

    setGaugeValues(oDataAPI.data.card);
}

async function getMapaDistrito(_departamento, _provincia, _ubigeoprov) {

    layerGroup.clearLayers();

    const oDataAPI = await fetch(`${URL_DB3}?dep=${_departamento}&pro=${_provincia}&dis=&niv=R&eje&tip_pry`).then(resp => resp.json());
    const oDataGeoJSON = await fetch(URL_DISTRITO).then(resp => resp.json());

    oDataGeoJSON.features.forEach(i => {
        let mPlace = oDataAPI.data.feature.filter(r => r.ubigeo === i.id);
        if (mPlace.length === 0) return;
        let { color } = getColorByAvance(mPlace[0].avance);

        let oFiltro = new Object();
        let iFiltro;

        oFiltro =
        {
            type: 'FeatureCollection',
            name: 'GeoPerú',
            crs: { type: 'name', properties: { name: 'urn:ogc:def:crs:OGC:1.3:CRS84' } },
            features: [{ properties: { cod: i.id }, geometry: i.geometry, type: "Feature" }]
        }

        iFiltro = L.geoJSON(oFiltro,
            {
                style: { color: color, weight: 1, fillOpacity: .8, opacity: 1, pane: 'ubigeoPane' }, filter: function (feature, layer) {
                    return feature.properties.cod == i.id;
                }
            });

        layerGroup.addLayer(iFiltro);
    });

    const oDataFocus = await fetch(URL_PROVINCIA).then(resp => resp.json());
    const oDataFocusFilter = oDataFocus.features.filter(item => item.id === _ubigeoprov)[0];
    
    oFocus =
    {
        type: 'FeatureCollection',
        name: 'GeoPerú',
        crs: { type: 'name', properties: { name: 'urn:ogc:def:crs:OGC:1.3:CRS84' } },
        features: [{ properties: { cod: _ubigeoprov }, geometry: oDataFocusFilter.geometry, type: "Feature" }]
    }

    iFocus = L.geoJSON(oFocus,
        {
            // style: ubigeoStyle, 
            filter: function (feature, layer) {
                return feature.properties.cod == _ubigeoprov;
            }
        });
    map.flyToBounds(iFocus.getBounds(), { 'duration': .5 });

    setGaugeValues(oDataAPI.data.card);

}

function setGaugeValues(_cards) {

    let oDataN = _cards.filter(item => item.tipo_gobierno === 'N');
    if (oDataN.length > 0) buildAvanceGauge('container__nacional', oDataN[0].avance, oDataN[0].n_obras);
    else buildAvanceGauge('container__nacional', 0, 0);

    let oDataR = _cards.filter(item => item.tipo_gobierno === 'R');
    if (oDataR.length > 0) buildAvanceGauge('container__regional', oDataR[0].avance, oDataR[0].n_obras);
    else buildAvanceGauge('container__regional', 0, 0);

    let oDataL = _cards.filter(item => item.tipo_gobierno === 'L');
    if (oDataL.length > 0) buildAvanceGauge('container__local', oDataL[0].avance, oDataL[0].n_obras);
    else buildAvanceGauge('container__local', 0, 0);
}