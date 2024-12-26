
const API_BASE = `https://visor.geoperu.gob.pe/inversion/api-bi`
const URL_DB1 = `${API_BASE}/p1`
const URL_DB2 = `${API_BASE}/p2`
const URL_DB3 = `${API_BASE}/p3`

const API = {
    "data": [
        {
            "ambito": [
                {
                    "monto": 107516282316,
                    "nom_dpto": "LIMA"
                },
                {
                    "monto": 12483537668,
                    "nom_dpto": "CUSCO"
                },
                {
                    "monto": 10835958790,
                    "nom_dpto": "ANCASH"
                },
                {
                    "monto": 10628237976,
                    "nom_dpto": "PIURA"
                },
                {
                    "monto": 9010846208,
                    "nom_dpto": "LA LIBERTAD"
                },
                {
                    "monto": 8502382383,
                    "nom_dpto": "CAJAMARCA"
                },
                {
                    "monto": 8301514837,
                    "nom_dpto": "AREQUIPA"
                },
                {
                    "monto": 6973789465,
                    "nom_dpto": "PUNO"
                },
                {
                    "monto": 6744895153,
                    "nom_dpto": "JUNIN"
                },
                {
                    "monto": 6729454399,
                    "nom_dpto": "CALLAO"
                },
                {
                    "monto": 5895835334,
                    "nom_dpto": "LORETO"
                },
                {
                    "monto": 5715893734,
                    "nom_dpto": "ICA"
                },
                {
                    "monto": 5459614313,
                    "nom_dpto": "LAMBAYEQUE"
                },
                {
                    "monto": 4892141844,
                    "nom_dpto": "AYACUCHO"
                },
                {
                    "monto": 4566564565,
                    "nom_dpto": "HUANUCO"
                },
                {
                    "monto": 4556202662,
                    "nom_dpto": "SAN MARTIN"
                },
                {
                    "monto": 3738693088,
                    "nom_dpto": "APURIMAC"
                },
                {
                    "monto": 3313271088,
                    "nom_dpto": "TACNA"
                },
                {
                    "monto": 3310930254,
                    "nom_dpto": "AMAZONAS"
                },
                {
                    "monto": 3229648847,
                    "nom_dpto": "HUANCAVELICA"
                },
                {
                    "monto": 3164645929,
                    "nom_dpto": "UCAYALI"
                },
                {
                    "monto": 2384153741,
                    "nom_dpto": "MOQUEGUA"
                },
                {
                    "monto": 2127526454,
                    "nom_dpto": "PASCO"
                },
                {
                    "monto": 1928027632,
                    "nom_dpto": "TUMBES"
                },
                {
                    "monto": 1306479133,
                    "nom_dpto": "MADRE DE DIOS"
                },
                {
                    "monto": 829097386,
                    "nom_dpto": null
                }
            ],
            "avance": 61.34,
            "dev": 149767597889.001,
            "fuente": [
                {
                    "monto": 151027440370,
                    "nombre_fuente": "RECURSOS ORDINARIOS"
                },
                {
                    "monto": 50688802428,
                    "nombre_fuente": "RECURSOS DETERMINADOS"
                },
                {
                    "monto": 29591688501,
                    "nombre_fuente": "RECURSOS POR OPERACIONES OFICIALES DE CREDITO"
                },
                {
                    "monto": 7348120466,
                    "nombre_fuente": "RECURSOS DIRECTAMENTE RECAUDADOS"
                },
                {
                    "monto": 5489573434,
                    "nombre_fuente": "DONACIONES Y TRANSFERENCIAS"
                }
            ],
            "funcion": [
                {
                    "descripcion": "mil millones",
                    "monto": 4389840276,
                    "ruta": "demo.png",
                    "titulo": "VIVIENDA Y DESARROLLO URBANO",
                    "valor": 4
                },
                {
                    "descripcion": "millones",
                    "monto": 806125033,
                    "ruta": "demo.png",
                    "titulo": "TURISMO",
                    "valor": 806
                },
                {
                    "descripcion": "mil millones",
                    "monto": 24394159254,
                    "ruta": "demo.png",
                    "titulo": "TRANSPORTE",
                    "valor": 24
                },
                {
                    "descripcion": "mil millones",
                    "monto": 1695625326,
                    "ruta": "demo.png",
                    "titulo": "TRABAJO",
                    "valor": 1
                },
                {
                    "descripcion": "mil millones",
                    "monto": 7448926236,
                    "ruta": "demo.png",
                    "titulo": "SANEAMIENTO",
                    "valor": 7
                },
                {
                    "descripcion": "mil millones",
                    "monto": 30537389742,
                    "ruta": "demo.png",
                    "titulo": "SALUD",
                    "valor": 30
                },
                {
                    "descripcion": "millones",
                    "monto": 938325895,
                    "ruta": "demo.png",
                    "titulo": "RELACIONES EXTERIORES",
                    "valor": 938
                },
                {
                    "descripcion": "mil millones",
                    "monto": 9262133018,
                    "ruta": "demo.png",
                    "titulo": "PROTECCION SOCIAL",
                    "valor": 9
                },
                {
                    "descripcion": "mil millones",
                    "monto": 14188966047,
                    "ruta": "demo.png",
                    "titulo": "PREVISION SOCIAL",
                    "valor": 14
                },
                {
                    "descripcion": "mil millones",
                    "monto": 25453245416,
                    "ruta": "demo.png",
                    "titulo": "PLANEAMIENTO, GESTION Y RESERVA DE CONTINGENCIA",
                    "valor": 25
                },
                {
                    "descripcion": "millones",
                    "monto": 438959316,
                    "ruta": "demo.png",
                    "titulo": "PESCA",
                    "valor": 438
                },
                {
                    "descripcion": "mil millones",
                    "monto": 14637399898,
                    "ruta": "demo.png",
                    "titulo": "ORDEN PUBLICO Y SEGURIDAD",
                    "valor": 14
                },
                {
                    "descripcion": "millones",
                    "monto": 408926700,
                    "ruta": "demo.png",
                    "titulo": "MINERIA",
                    "valor": 408
                },
                {
                    "descripcion": "millones",
                    "monto": 892117963,
                    "ruta": "demo.png",
                    "titulo": "LEGISLATIVA",
                    "valor": 892
                },
                {
                    "descripcion": "mil millones",
                    "monto": 8093043988,
                    "ruta": "demo.png",
                    "titulo": "JUSTICIA",
                    "valor": 8
                },
                {
                    "descripcion": "millones",
                    "monto": 562025244,
                    "ruta": "demo.png",
                    "titulo": "INDUSTRIA",
                    "valor": 562
                },
                {
                    "descripcion": "mil millones",
                    "monto": 4175133761,
                    "ruta": "demo.png",
                    "titulo": "ENERGIA",
                    "valor": 4
                },
                {
                    "descripcion": "mil millones",
                    "monto": 43401028401,
                    "ruta": "demo.png",
                    "titulo": "EDUCACION",
                    "valor": 43
                },
                {
                    "descripcion": "mil millones",
                    "monto": 23523024503,
                    "ruta": "demo.png",
                    "titulo": "DEUDA PUBLICA",
                    "valor": 23
                },
                {
                    "descripcion": "mil millones",
                    "monto": 7904686914,
                    "ruta": "demo.png",
                    "titulo": "DEFENSA Y SEGURIDAD NACIONAL",
                    "valor": 7
                },
                {
                    "descripcion": "mil millones",
                    "monto": 3361950435,
                    "ruta": "demo.png",
                    "titulo": "CULTURA Y DEPORTE",
                    "valor": 3
                },
                {
                    "descripcion": "mil millones",
                    "monto": 1586374405,
                    "ruta": "demo.png",
                    "titulo": "COMUNICACIONES",
                    "valor": 1
                },
                {
                    "descripcion": "millones",
                    "monto": 800314192,
                    "ruta": "demo.png",
                    "titulo": "COMERCIO",
                    "valor": 800
                },
                {
                    "descripcion": "mil millones",
                    "monto": 5123140080,
                    "ruta": "demo.png",
                    "titulo": "AMBIENTE",
                    "valor": 5
                },
                {
                    "descripcion": "mil millones",
                    "monto": 10122763156,
                    "ruta": "demo.png",
                    "titulo": "AGROPECUARIA",
                    "valor": 10
                }
            ],
            "pim": 244145625199,
            "tipo_gobierno": [
                {
                    "monto": 144691962241,
                    "tipo_gobierno": "E"
                },
                {
                    "monto": 53461672801,
                    "tipo_gobierno": "R"
                },
                {
                    "monto": 45991990157,
                    "tipo_gobierno": "M"
                }
            ]
        }
    ],
    "status": 1
}

const API_PROYECTOS = [
    {
        "cer": 13118093.75,
        "dev": 10013204.330000002,
        "gir": 9944462.780000001,
        "pia": 12652706,
        "pim": 13922758,
        "ruta": "demo.png",
        "avance": 71.92,
        "proyecto": "ACCIONES COMUNES",
        "comprometido": 10298733.230000002
    },
    {
        "cer": 644102.12,
        "dev": 0,
        "gir": 0,
        "pia": 0,
        "pim": 660205,
        "ruta": "demo.png",
        "avance": 0,
        "proyecto": "ADQUISICION DE EQUIPOS DE LABORATORIO; EN EL(LA) FACULTAD DE INGENIERIA AGRARIA, INDUSTRIAS ALIMENTARIAS Y AMBIENTAL DE LA UNIVERSIDAD NACIONAL JOSE FAUSTINO SANCHEZ CARRION DISTRITO DE HUACHO, PROVINCIA HUAURA, DEPARTAMENTO LIMA",
        "comprometido": 0
    },
    {
        "cer": 157310.77000000002,
        "dev": 140360.77000000002,
        "gir": 140360.77000000002,
        "pia": 0,
        "pim": 173103,
        "ruta": "demo.png",
        "avance": 81.09,
        "proyecto": "ADQUISICION DE HARDWARE GENERAL, MOBILIARIO DE OFICINA Y TELEVISOR; EN EL(LA) SALAS SUPERIORES DE LA CORTE SUPERIOR DE JUSTICIA DE HUAURA DISTRITO DE HUACHO, PROVINCIA HUAURA, DEPARTAMENTO LIMA",
        "comprometido": 140360.77
    },
    {
        "cer": 66943.09,
        "dev": 45693.090000000004,
        "gir": 45693.090000000004,
        "pia": 0,
        "pim": 88308,
        "ruta": "demo.png",
        "avance": 51.74,
        "proyecto": "ADQUISICION DE HARDWARE GENERAL Y MOBILIARIO DE OFICINA; EN EL(LA) JUZGADOS DE PAZ LETRADO DE HUACHO, DE LA CORTE SUPERIOR DE JUSTICIA DE HUAURA, DISTRITO DE HUACHO, PROVINCIA HUAURA, DEPARTAMENTO LIMA",
        "comprometido": 45693.090000000004
    },
    {
        "cer": 431720.79000000004,
        "dev": 8354.4,
        "gir": 0,
        "pia": 0,
        "pim": 442824,
        "ruta": "demo.png",
        "avance": 1.89,
        "proyecto": "ADQUISICION DE HARDWARE GENERAL Y MOBILIARIO DE OFICINA; EN EL(LA) JUZGADOS PENALES DE HUACHO DE LA CORTE SUPERIOR DE JUSTICIA DE HUAURA, DISTRITO DE HUACHO, PROVINCIA HUAURA, DEPARTAMENTO LIMA",
        "comprometido": 278270.79000000004
    },
    {
        "cer": 52703.52,
        "dev": 0,
        "gir": 0,
        "pia": 0,
        "pim": 100298,
        "ruta": "demo.png",
        "avance": 0,
        "proyecto": "ADQUISICION DE IMPRESORA PLOTTER; EN EL(LA) OFICINA REGISTRAL HUACHO DISTRITO DE HUACHO, PROVINCIA HUAURA, DEPARTAMENTO LIMA",
        "comprometido": 52703.52
    },
    {
        "cer": 1543185.17,
        "dev": 0,
        "gir": 0,
        "pia": 0,
        "pim": 1543186,
        "ruta": "demo.png",
        "avance": 0,
        "proyecto": "ADQUISICION DE MAMOGRAFO, EQUIPO ECOGRAFO Y CABINA DE FLUJO LAMINAR VERTICAL; EN EL(LA) EESS HOSPITAL GENERAL DE HUACHO - HUACHO DISTRITO DE HUACHO, PROVINCIA HUAURA, DEPARTAMENTO LIMA",
        "comprometido": 1507185.17
    },
    {
        "cer": 2486.25,
        "dev": 2486.25,
        "gir": 2486.25,
        "pia": 0,
        "pim": 2500,
        "ruta": "demo.png",
        "avance": 99.45,
        "proyecto": "ADQUISICION DE MOBILIARIO DE AMBIENTES COMPLEMENTARIOS; EN EL(LA) MERCADO NUEVA PARADA, DISTRITO DE HUACHO, PROVINCIA DE HUAURA, DEPARTAMENTO DE LIMA EN LA LOCALIDAD HUACHO, DISTRITO DE HUACHO, PROVINCIA HUAURA, DEPARTAMENTO LIMA",
        "comprometido": 2486.25
    },
    {
        "cer": 90000,
        "dev": 81000,
        "gir": 81000,
        "pia": 0,
        "pim": 90000,
        "ruta": "demo.png",
        "avance": 90,
        "proyecto": "ADQUISICION DE MOTOCICLETA; EN EL(LA) JUZGADOS DE PAZ LETRADO DE LA CORTE SUPERIOR DE JUSTICIA DE HUAURA DISTRITO DE HUACHO, PROVINCIA HUAURA, DEPARTAMENTO LIMA",
        "comprometido": 90000
    },
    {
        "cer": 16500,
        "dev": 13200,
        "gir": 13200,
        "pia": 0,
        "pim": 60000,
        "ruta": "demo.png",
        "avance": 22,
        "proyecto": "ADQUISICION DE TERRENO; EN EL(LA) OFICINA ZONAL DE HUACHO DISTRITO DE HUACHO, PROVINCIA HUAURA, DEPARTAMENTO LIMA",
        "comprometido": 16500
    },
    {
        "cer": 30000,
        "dev": 30000,
        "gir": 30000,
        "pia": 0,
        "pim": 2273926,
        "ruta": "demo.png",
        "avance": 1.32,
        "proyecto": "AMPLIACION Y MEJORAMIENTO DE LAS AREAS DE CIRCULACION INTERNA DE LA UNIVERSIDAD NACIONAL JOSE FAUSTINO SANCHEZ CARRION, HUACHO-HUAURA-LIMA",
        "comprometido": 30000
    },
    {
        "cer": 35000,
        "dev": 0,
        "gir": 0,
        "pia": 5502480,
        "pim": 5502480,
        "ruta": "demo.png",
        "avance": 0,
        "proyecto": "AMPLIACION Y MEJORAMIENTO DE LOS SERVICIOS ACADEMICOS Y ADMINISTRATIVOS DE LA FACULTAD DE BROMATOLOGIA Y NUTRICION DE LA UNIVERSIDAD NACIONAL JOSE FAUSTINO SANCHEZ CARRION, HUACHO-HUAURA-LIMA",
        "comprometido": 0
    },
    {
        "cer": 270029.99,
        "dev": 234895.75,
        "gir": 234895.74999999997,
        "pia": 248543,
        "pim": 285230,
        "ruta": "demo.png",
        "avance": 82.35,
        "proyecto": "AREAS NATURALES PROTEGIDAS CON CONTROL Y VIGILANCIA PERMANENTE",
        "comprometido": 237019.91
    },
    {
        "cer": 366997,
        "dev": 366997,
        "gir": 366997,
        "pia": 1991165,
        "pim": 366997,
        "ruta": "demo.png",
        "avance": 100,
        "proyecto": "ATENCION DE LA EMERGENCIA O URGENCIA EN ESTABLECIMIENTO DE SALUD",
        "comprometido": 366997
    },
    {
        "cer": 603,
        "dev": 603,
        "gir": 603,
        "pia": 603,
        "pim": 603,
        "ruta": "demo.png",
        "avance": 100,
        "proyecto": "ATENCION DE LA LEUCEMIA QUE INCLUYE: DIAGNOSTICO Y TRATAMIENTO",
        "comprometido": 603
    },
    {
        "cer": 1407,
        "dev": 1407,
        "gir": 1407,
        "pia": 1407,
        "pim": 1407,
        "ruta": "demo.png",
        "avance": 100,
        "proyecto": "ATENCION DE LA LINFOMA QUE INCLUYE: DIAGNOSTICO Y TRATAMIENTO",
        "comprometido": 1407
    },
    {
        "cer": 782,
        "dev": 782,
        "gir": 782,
        "pia": 782,
        "pim": 782,
        "ruta": "demo.png",
        "avance": 100,
        "proyecto": "ATENCION DEL CANCER DE COLON Y RECTO QUE INCLUYE: DIAGNOSTICO, ESTADIAJE Y TRATAMIENTO",
        "comprometido": 782
    },
    {
        "cer": 1742,
        "dev": 1742,
        "gir": 1742,
        "pia": 1742,
        "pim": 1742,
        "ruta": "demo.png",
        "avance": 100,
        "proyecto": "ATENCION DEL CANCER DE ESTOMAGO PARA EL ESTADIAJE Y TRATAMIENTO",
        "comprometido": 1742
    },
    {
        "cer": 223,
        "dev": 223,
        "gir": 223,
        "pia": 223,
        "pim": 223,
        "ruta": "demo.png",
        "avance": 100,
        "proyecto": "ATENCION DEL CANCER DE HIGADO QUE INCLUYE: DIAGNOSTICO, ESTADIAJE Y TRATAMIENTO",
        "comprometido": 223
    },
    {
        "cer": 2747,
        "dev": 2747,
        "gir": 2747,
        "pia": 2747,
        "pim": 2747,
        "ruta": "demo.png",
        "avance": 100,
        "proyecto": "ATENCION DEL CANCER DE MAMA PARA EL ESTADIAJE Y TRATAMIENTO",
        "comprometido": 2747
    },
    {
        "cer": 194,
        "dev": 194,
        "gir": 194,
        "pia": 194,
        "pim": 194,
        "ruta": "demo.png",
        "avance": 100,
        "proyecto": "ATENCION DEL CANCER DE PIEL NO MELANOMAS QUE INCLUYE: DIAGNOSTICO, ESTADIAJE Y TRATAMIENTO",
        "comprometido": 194
    },
    {
        "cer": 201,
        "dev": 201,
        "gir": 201,
        "pia": 201,
        "pim": 201,
        "ruta": "demo.png",
        "avance": 100,
        "proyecto": "ATENCION DEL CANCER DE PROSTATA PARA EL DIAGNOSTICO, ESTADIAJE Y TRATAMIENTO",
        "comprometido": 201
    },
    {
        "cer": 156,
        "dev": 156,
        "gir": 156,
        "pia": 156,
        "pim": 156,
        "ruta": "demo.png",
        "avance": 100,
        "proyecto": "ATENCION DEL CANCER DE PULMON QUE INCLUYE: DIAGNOSTICO, ESTADIAJE Y TRATAMIENTO",
        "comprometido": 156
    },
    {
        "cer": 13832,
        "dev": 13832,
        "gir": 13832,
        "pia": 13832,
        "pim": 13832,
        "ruta": "demo.png",
        "avance": 100,
        "proyecto": "ATENCION DEL PARTO COMPLICADO NO QUIRURGICO",
        "comprometido": 13832
    },
    {
        "cer": 72095,
        "dev": 72095,
        "gir": 72095,
        "pia": 72095,
        "pim": 72095,
        "ruta": "demo.png",
        "avance": 100,
        "proyecto": "ATENCION DEL PARTO COMPLICADO QUIRURGICO",
        "comprometido": 72095
    },
    {
        "cer": 125315,
        "dev": 125315,
        "gir": 125315,
        "pia": 125315,
        "pim": 125315,
        "ruta": "demo.png",
        "avance": 100,
        "proyecto": "ATENCION DEL PARTO NORMAL",
        "comprometido": 125315
    },
    {
        "cer": 197411,
        "dev": 197411,
        "gir": 197411,
        "pia": 197411,
        "pim": 197411,
        "ruta": "demo.png",
        "avance": 100,
        "proyecto": "ATENCION DEL PUERPERIO",
        "comprometido": 197411
    },
    {
        "cer": 1379,
        "dev": 1379,
        "gir": 1379,
        "pia": 1379,
        "pim": 1379,
        "ruta": "demo.png",
        "avance": 100,
        "proyecto": "ATENCION DEL PUERPERIO CON COMPLICACIONES",
        "comprometido": 1379
    },
    {
        "cer": 232490,
        "dev": 232490,
        "gir": 232490,
        "pia": 232490,
        "pim": 232490,
        "ruta": "demo.png",
        "avance": 100,
        "proyecto": "ATENCION DEL RECIEN NACIDO CON COMPLICACIONES",
        "comprometido": 232490
    },
    {
        "cer": 21297,
        "dev": 21297,
        "gir": 21297,
        "pia": 21297,
        "pim": 21297,
        "ruta": "demo.png",
        "avance": 100,
        "proyecto": "ATENCION DEL RECIEN NACIDO CON COMPLICACIONES QUE REQUIERE UNIDAD DE CUIDADOS INTENSIVOS NEONATALES - UCIN",
        "comprometido": 21297
    },
    {
        "cer": 33619,
        "dev": 33619,
        "gir": 33619,
        "pia": 566904,
        "pim": 33619,
        "ruta": "demo.png",
        "avance": 100,
        "proyecto": "ATENCION DEL RECIEN NACIDO NORMAL",
        "comprometido": 33619
    },
    {
        "cer": 63370,
        "dev": 63370,
        "gir": 63370,
        "pia": 63370,
        "pim": 63370,
        "ruta": "demo.png",
        "avance": 100,
        "proyecto": "ATENCION DE NI?OS Y NI?AS CON PARASITOSIS INTESTINAL",
        "comprometido": 63370
    },
    {
        "cer": 117978,
        "dev": 117978,
        "gir": 117978,
        "pia": 117978,
        "pim": 117978,
        "ruta": "demo.png",
        "avance": 100,
        "proyecto": "ATENCION DE OTRAS ENFERMEDADES PREVALENTES",
        "comprometido": 117978
    },
    {
        "cer": 67367,
        "dev": 67367,
        "gir": 67367,
        "pia": 224945,
        "pim": 67367,
        "ruta": "demo.png",
        "avance": 100,
        "proyecto": "ATENCION ENFERMEDADES DIARREICAS AGUDAS E INFECCIONES RESPIRATORIAS AGUDAS",
        "comprometido": 67367
    },
    {
        "cer": 5833,
        "dev": 5833,
        "gir": 5833,
        "pia": 5833,
        "pim": 5833,
        "ruta": "demo.png",
        "avance": 100,
        "proyecto": "ATENCION ENFERMEDADES DIARREICAS AGUDAS E INFECCIONES RESPIRATORIAS AGUDAS CON COMPLICACIONES",
        "comprometido": 5833
    },
    {
        "cer": 70947,
        "dev": 70947,
        "gir": 70947,
        "pia": 70947,
        "pim": 70947,
        "ruta": "demo.png",
        "avance": 100,
        "proyecto": "ATENCION ESTOMATOLOGICA ESPECILIZADA",
        "comprometido": 70947
    },
    {
        "cer": 113360,
        "dev": 113360,
        "gir": 113360,
        "pia": 179634,
        "pim": 113360,
        "ruta": "demo.png",
        "avance": 100,
        "proyecto": "ATENCION ESTOMATOLOGICA RECUPERATIVA",
        "comprometido": 113360
    },
    {
        "cer": 66026,
        "dev": 66026,
        "gir": 66026,
        "pia": 66026,
        "pim": 66026,
        "ruta": "demo.png",
        "avance": 100,
        "proyecto": "ATENCION OBSTETRICA EN UNIDAD DE CUIDADOS INTENSIVOS",
        "comprometido": 66026
    },
    {
        "cer": 128784,
        "dev": 128784,
        "gir": 128784,
        "pia": 390721,
        "pim": 290721,
        "ruta": "demo.png",
        "avance": 44.3,
        "proyecto": "ATENCION PRENATAL REENFOCADA",
        "comprometido": 128784
    },
    {
        "cer": 11876585,
        "dev": 0,
        "gir": 0,
        "pia": 13366697,
        "pim": 11876585,
        "ruta": "demo.png",
        "avance": 0,
        "proyecto": "CAMINO NACIONAL CON MANTENIMIENTO VIAL",
        "comprometido": 0
    },
    {
        "cer": 39743.46,
        "dev": 32241.809999999998,
        "gir": 32241.809999999998,
        "pia": 0,
        "pim": 43000,
        "ruta": "demo.png",
        "avance": 74.98,
        "proyecto": "CAPACIDAD INSTALADA PARA LA PREPARACION Y RESPUESTA FRENTE A EMERGENCIAS Y DESASTRES",
        "comprometido": 32241.81
    },
    {
        "cer": 23862044,
        "dev": 17716632.279999997,
        "gir": 17640905.520000003,
        "pia": 21954523,
        "pim": 24249037,
        "ruta": "demo.png",
        "avance": 73.06,
        "proyecto": "CASOS RESUELTOS EN PRIMERA Y SEGUNDA INSTANCIA CON EL CODIGO PROCESAL PENAL",
        "comprometido": 17892471.569999997
    },
    {
        "cer": 11348690.640000002,
        "dev": 8408568.049999997,
        "gir": 8402396.549999997,
        "pia": 9454079,
        "pim": 11354887,
        "ruta": "demo.png",
        "avance": 74.05,
        "proyecto": "CASOS RESUELTOS POR LOS JUZGADOS DE INVESTIGACION PREPARATORIA, JUZGADOS DE JUZGAMIENTO Y SALAS PENALES DE APELACIONES",
        "comprometido": 8438024.329999996
    },
    {
        "cer": 3542042,
        "dev": 3170361.43,
        "gir": 3170361.4299999997,
        "pia": 0,
        "pim": 3542042,
        "ruta": "demo.png",
        "avance": 89.51,
        "proyecto": "CONSTRUCCION DEL PASO A DESNIVEL A LA CARRETERA PANAMERICANA NORTE, RUTA PE-1N, KM 148+700",
        "comprometido": 3170361.43
    },
    {
        "cer": 748363,
        "dev": 693632.32,
        "gir": 693632.32,
        "pia": 0,
        "pim": 748363,
        "ruta": "demo.png",
        "avance": 92.69,
        "proyecto": "CONSTRUCCION DEL PASO A DESNIVEL INFERIOR SANTA ISABEL EN LA CARRETERA PANAMERICANA NORTE KM 165+173",
        "comprometido": 706997.94
    },
    {
        "cer": 573194,
        "dev": 531273.03,
        "gir": 531273.03,
        "pia": 0,
        "pim": 573194,
        "ruta": "demo.png",
        "avance": 92.69,
        "proyecto": "CONSTRUCCION DEL PASO A DESNIVEL SAN FELIPITO EN LA CARRETERA PANAMERICANA NORTE KM 170+230",
        "comprometido": 541510.64
    },
    {
        "cer": 0,
        "dev": 0,
        "gir": 0,
        "pia": 0,
        "pim": 370490,
        "ruta": "demo.png",
        "avance": 0,
        "proyecto": "CREACION (CONSTRUCCION) DEL INTERCAMBIO VIAL PRIMAVERA EN LA CARRETERA PANAMERICANA NORTE, RUTA PE-1N, KM 160+935 DISTRITO DE VEGUETA - PROVINCIA DE HUAURA - DEPARTAMENTO DE LIMA",
        "comprometido": 0
    },
    {
        "cer": 3903483.2199999997,
        "dev": 177720.96,
        "gir": 177720.96,
        "pia": 0,
        "pim": 4914868,
        "ruta": "demo.png",
        "avance": 3.62,
        "proyecto": "CREACION DEL PABELLON DE AULAS DE LA UNIVERSIDAD NACIONAL JOSE FAUSTINO SANCHEZ CARRION DE HUACHO DEL DISTRITO DE HUACHO - PROVINCIA DE HUAURA - DEPARTAMENTO DE LIMA",
        "comprometido": 177720.96
    },
    {
        "cer": 72638487.04999998,
        "dev": 59987402.730000004,
        "gir": 59987402.73000001,
        "pia": 63515700,
        "pim": 74003132,
        "ruta": "demo.png",
        "avance": 81.06,
        "proyecto": "CREACION DEL SERVICIO DE PROTECCION EN LAS RIBERAS DEL RIO HUAURA VULNERABLE ANTE PELIGRO DE INUNDACIONES EN LAS LOCALIDADES DE 5 DISTRITOS DE LA PROVINCIA DE OYON Y 6 DISTRITOS DE LA PROVINCIA DE HUAURA - DEPARTAMENTO DE LIMA",
        "comprometido": 72166535.55
    },
    {
        "cer": 265550,
        "dev": 257399.21,
        "gir": 257399.21,
        "pia": 0,
        "pim": 265550,
        "ruta": "demo.png",
        "avance": 96.93,
        "proyecto": "DESARROLLO DE MEDIDAS DE INTERVENCION PARA LA PROTECCION FISICA FRENTE A PELIGROS",
        "comprometido": 257399.21
    },
    {
        "cer": 57449.64000000001,
        "dev": 0,
        "gir": 0,
        "pia": 0,
        "pim": 60000,
        "ruta": "demo.png",
        "avance": 0,
        "proyecto": "DESPACHOS JUDICIALES DEBIDAMENTE IMPLEMENTADOS",
        "comprometido": 57449.64
    },
    {
        "cer": 23865,
        "dev": 23865,
        "gir": 23865,
        "pia": 23865,
        "pim": 23865,
        "ruta": "demo.png",
        "avance": 100,
        "proyecto": "DETECCION - DIAGNOSTICO - TRATAMIENTO Y CONTROL DE PERSONAS CON ENFERMEDADES EXTERNAS DEL OJO",
        "comprometido": 23865
    },
    {
        "cer": 8432,
        "dev": 8432,
        "gir": 8432,
        "pia": 8432,
        "pim": 8432,
        "ruta": "demo.png",
        "avance": 100,
        "proyecto": "DETECCION - DIAGNOSTICO - TRATAMIENTO Y CONTROL DE PERSONAS CON RETINOPATIA DIABETICA",
        "comprometido": 8432
    },
    {
        "cer": 70607.72,
        "dev": 67047.09,
        "gir": 67047.09,
        "pia": 313754,
        "pim": 70609,
        "ruta": "demo.png",
        "avance": 94.96,
        "proyecto": "DIAGNOSTICO Y TRATAMIENTO DE CASOS DE ENFERMEDADES ZOONOTICAS",
        "comprometido": 70607.72
    },
    {
        "cer": 10517.5,
        "dev": 5728,
        "gir": 5728,
        "pia": 19320,
        "pim": 10518,
        "ruta": "demo.png",
        "avance": 54.46,
        "proyecto": "DIAGNOSTICO Y TRATAMIENTO DE ENFERMEDADES METAXENICAS",
        "comprometido": 10517.5
    },
    {
        "cer": 44056140.57000001,
        "dev": 34604925.64,
        "gir": 34353678.55,
        "pia": 45402741,
        "pim": 49888273,
        "ruta": "demo.png",
        "avance": 69.36,
        "proyecto": "DOCENTES CON ADECUADAS COMPETENCIAS",
        "comprometido": 34659804.35
    },
    {
        "cer": 28955086.19,
        "dev": 21222733.720000006,
        "gir": 21222733.72,
        "pia": 26198995,
        "pim": 28955165,
        "ruta": "demo.png",
        "avance": 73.3,
        "proyecto": "ESCOLARES DE LAS INSTITUCIONES EDUCATIVAS PUBLICAS EN EL NIVEL DE EDUCACION INICIAL A PARTIR DE LOS TRES A?OS DE EDAD, EN EL NIVEL DE EDUCACION PRIMARIA, EN EL NIVEL DE EDUCACION SECUNDARIA, RECIBEN SERVICIO ALIMENTARIO",
        "comprometido": 24306651.55
    },
    {
        "cer": 313200,
        "dev": 64000,
        "gir": 64000,
        "pia": 0,
        "pim": 364000,
        "ruta": "demo.png",
        "avance": 17.58,
        "proyecto": "ESTUDIOS DE PRE-INVERSION",
        "comprometido": 64000
    },
    {
        "cer": 122335,
        "dev": 4101,
        "gir": 4101,
        "pia": 0,
        "pim": 400516,
        "ruta": "demo.png",
        "avance": 1.02,
        "proyecto": "EXPEDIENTES TECNICOS, ESTUDIOS DE PRE-INVERSION Y OTROS ESTUDIOS - PLAN INTEGRAL PARA LA RECONSTRUCCION CON CAMBIOS",
        "comprometido": 108735
    },
    {
        "cer": 2361,
        "dev": 2361,
        "gir": 2361,
        "pia": 2361,
        "pim": 2361,
        "ruta": "demo.png",
        "avance": 100,
        "proyecto": "FAMILIA CON PRACTICAS SALUDABLES PARA LA PREVENCION DE ENFERMEDADES METAXENICAS Y ZOONOTICAS",
        "comprometido": 2361
    },
    {
        "cer": 1362,
        "dev": 1362,
        "gir": 1362,
        "pia": 1362,
        "pim": 1362,
        "ruta": "demo.png",
        "avance": 100,
        "proyecto": "FAMILIA CON PRACTICAS SALUDABLES PARA LA PREVENCION DE VIH/SIDA Y TUBERCULOSIS",
        "comprometido": 1362
    },
    {
        "cer": 7885,
        "dev": 7885,
        "gir": 7885,
        "pia": 7885,
        "pim": 7885,
        "ruta": "demo.png",
        "avance": 100,
        "proyecto": "FAMILIA EN ZONAS DE RIESGO INFORMADA QUE REALIZAN PRACTICAS HIGIENICAS SANITARIAS PARA PREVENIR LAS ENFERMEDADES NO TRANSMISIBLES ( MENTAL, BUCAL, OCULAR, METALES PESADOS, HIPERTENSION ARTERIAL Y DIABETES MELLITUS )",
        "comprometido": 7885
    },
    {
        "cer": 5289,
        "dev": 5289,
        "gir": 5289,
        "pia": 5289,
        "pim": 5289,
        "ruta": "demo.png",
        "avance": 100,
        "proyecto": "FAMILIAS CON CONOCIMIENTOS DE PRACTICAS SALUDABLES PARA PREVENIR LOS TRANSTOTRNOS MENTALES Y PROBLEMAS PSICOSOCIALES",
        "comprometido": 5289
    },
    {
        "cer": 331,
        "dev": 331,
        "gir": 331,
        "pia": 331,
        "pim": 331,
        "ruta": "demo.png",
        "avance": 100,
        "proyecto": "FAMILIAS SALUDABLES CON CONOCIMIENTO DE LA PREVENCION DEL CANCER DE CUELLO UTERINO, MAMA, ESTOMAGO, PROSTATA, PULMON COLON, RECTO, HIGADO, LEUCEMIA, LINFOMA, PIEL Y OTROS",
        "comprometido": 331
    },
    {
        "cer": 16661,
        "dev": 16661,
        "gir": 16661,
        "pia": 449704,
        "pim": 16661,
        "ruta": "demo.png",
        "avance": 100,
        "proyecto": "FAMILIAS SALUDABLES CON CONOCIMIENTOS PARA EL CUIDADO INFANTIL, LACTANCIA MATERNA EXCLUSIVA Y LA ADECUADA ALIMENTACION Y PROTECCION DEL MENOR DE 36 MESES",
        "comprometido": 16661
    },
    {
        "cer": 25456,
        "dev": 25456,
        "gir": 25456,
        "pia": 25456,
        "pim": 25456,
        "ruta": "demo.png",
        "avance": 100,
        "proyecto": "FAMILIAS SALUDABLES INFORMADAS RESPECTO DE SU SALUD SEXUAL Y REPRODUCTIVA",
        "comprometido": 25456
    },
    {
        "cer": 1776000,
        "dev": 1775200,
        "gir": 1775200,
        "pia": 1768560,
        "pim": 1776000,
        "ruta": "demo.png",
        "avance": 99.95,
        "proyecto": "HOGARES RURALES EN ECONOMIAS DE SUBSISTENCIA RECIBE ASISTENCIA TECNICA Y CAPACITACION PARA EL DESARROLLO DE CAPACIDADES PRODUCTIVAS",
        "comprometido": 1775200
    },
    {
        "cer": 266787.11,
        "dev": 199111.93,
        "gir": 199111.93000000005,
        "pia": 3804946,
        "pim": 429399,
        "ruta": "demo.png",
        "avance": 46.37,
        "proyecto": "INFRAESTRUCTURA DEPORTIVA EN ADECUADAS CONDICIONES PARA LA PRACTICA DE ACTIVIDADES FISICAS, DEPORTIVAS Y RECREATIVAS.",
        "comprometido": 221723.23
    },
    {
        "cer": 3375134.0199999996,
        "dev": 294616.22,
        "gir": 294616.22,
        "pia": 618863,
        "pim": 3746961,
        "ruta": "demo.png",
        "avance": 7.86,
        "proyecto": "INFRAESTRUCTURA Y EQUIPAMIENTO ADECUADOS",
        "comprometido": 387689.94999999995
    },
    {
        "cer": 0,
        "dev": 0,
        "gir": 0,
        "pia": 99808,
        "pim": 500,
        "ruta": "demo.png",
        "avance": 0,
        "proyecto": "INSTALACION DEL SISTEMA DE ELECTRIFICACION EN EL SECTOR PAMPA DE ANIMAS Y ANEXOS, DISTRITO DE SANTA MARIA - HUAURA - LIMA",
        "comprometido": 0
    },
    {
        "cer": 78103,
        "dev": 45567,
        "gir": 45567,
        "pia": 852243,
        "pim": 310567,
        "ruta": "demo.png",
        "avance": 14.67,
        "proyecto": "INSTALACION DE SERVICIOS TECNOLOGICOS PARA EL DESARROLLO DE CADENAS PRODUCTIVAS AGROINDUSTRIALES DE LOS PRODUCTOS DE LA CHIRIMOYA, DURAZNO, PALTA Y VID DISTRITO DE SANTA MARIA, PROVINCIA DE HUAURA, REGION LIMA",
        "comprometido": 78103
    },
    {
        "cer": 3114532.13,
        "dev": 2047661.2100000007,
        "gir": 2047661.2100000007,
        "pia": 2746969,
        "pim": 3116001,
        "ruta": "demo.png",
        "avance": 65.71,
        "proyecto": "INSTITUCIONES FISCALIZADAS SEGUN LA NORMATIVA LABORAL",
        "comprometido": 2071694.19
    },
    {
        "cer": 171916,
        "dev": 159342.43,
        "gir": 159342.43,
        "pia": 0,
        "pim": 171916,
        "ruta": "demo.png",
        "avance": 92.69,
        "proyecto": "MEJORAMIENTO DEL DISE?O GEOMETRICO DE LA CURVA EN LA PANAMERICANA NORTE, RUTA PE-1N KM 108+000",
        "comprometido": 162413.1
    },
    {
        "cer": 227920,
        "dev": 227920,
        "gir": 227920,
        "pia": 227920,
        "pim": 227920,
        "ruta": "demo.png",
        "avance": 100,
        "proyecto": "MEJORAMIENTO DE LOS SERVICIOS ACADEMICOS Y ADMINISTRATIVOS DE LA FACULTAD DE INGENIERIA CIVIL DE LA UNIVERSIDAD NACIONAL JOSE FAUSTINO SANCHEZ CARRION, DISTRITO DE HUACHO, PROVINCIA DE HUAURA, DEPARTAMENTO DE LIMA",
        "comprometido": 227920
    },
    {
        "cer": 4040212,
        "dev": 1956203.03,
        "gir": 1956203.03,
        "pia": 17593221,
        "pim": 4227022,
        "ruta": "demo.png",
        "avance": 46.28,
        "proyecto": "MEJORAMIENTO DE LOS SERVICIOS DE ADMINISTRACION DE JUSTICIA DE LOS ORGANOS JURISDICCIONALES DE LA PROVINCIA DE HUAURA DE LA CORTE SUPERIOR DE JUSTICIA DE HUAURA",
        "comprometido": 1974703.03
    },
    {
        "cer": 258958.97,
        "dev": 258958.96,
        "gir": 258958.96,
        "pia": 0,
        "pim": 258959,
        "ruta": "demo.png",
        "avance": 100,
        "proyecto": "MEJORAMIENTO DEL SERVICIO ACADEMICO DE LA FACULTAD DE CIENCIAS DE LA UNIVERSIDAD NACIONAL JOSE FAUSTINO SANCHEZ CARRION, DISTRITO HUACHO, PROVINCIA HUAURA, REGION LIMA.",
        "comprometido": 258958.96
    },
    {
        "cer": 11978152.98,
        "dev": 7320882.929999999,
        "gir": 7320882.930000001,
        "pia": 8285760,
        "pim": 12039734,
        "ruta": "demo.png",
        "avance": 60.81,
        "proyecto": "MEJORAMIENTO INTEGRAL DEL DESEMBARCADERO PESQUERO ARTESANAL DE HUACHO, REGION LIMA, PROVINCIA DE HUAURA, DISTRITO DE HUACHO",
        "comprometido": 7667660.070000001
    },
    {
        "cer": 3727990.38,
        "dev": 3437784.18,
        "gir": 3437784.18,
        "pia": 4322822,
        "pim": 4322822,
        "ruta": "demo.png",
        "avance": 79.53,
        "proyecto": "MEJORAMIENTO Y AMPLIACION DE LOS SERVICIOS ACADEMICOS Y ADMINISTRATIVOS DE LA FACULTAD DE MEDICINA HUMANA DE LA UNIVERSIDAD NACIONAL JOSE FAUSTINO SANCHEZ CARRION DEL DISTRITO DE HUACHO - PROVINCIA DE HUAURA - DEPARTAMENTO DE LIMA",
        "comprometido": 3437784.18
    },
    {
        "cer": 1642697.24,
        "dev": 167503.5,
        "gir": 167503.5,
        "pia": 0,
        "pim": 1734152,
        "ruta": "demo.png",
        "avance": 9.66,
        "proyecto": "MEJORAMIENTO Y AMPLIACION DE LOS SERVICIOS DE AGUA POTABLE, ALCANTARILLADO Y TRATAMIENTO DE AGUAS RESIDUALES EN EL CERCADO SAYAN, ASOCIACIONES DE VIVIENDA VILLA EL SOL, CRUZ DEL JIRON PORTACHUELO Y TRABAJANDO POR EL FUTURO DE PORTACHUELO 4 LOCALIDADES DEL DISTRITO DE SAYAN - PROVINCIA DE HUAURA - DEPARTAMENTO DE LIMA",
        "comprometido": 233043.5
    },
    {
        "cer": 33000,
        "dev": 33000,
        "gir": 33000,
        "pia": 0,
        "pim": 33000,
        "ruta": "demo.png",
        "avance": 100,
        "proyecto": "MEJORAMIENTO Y AMPLIACION DE LOS SERVICIOS DE AGUA POTABLE, ALCANTARILLADO Y TRATAMIENTO DE AGUAS RESIDUALES EN LOS SECTORES VEGUETA, SAN ISIDRO Y PRIMAVERA EN EL DISTRITO DE VEGUETA - PROVINCIA DE HUAURA - DEPARTAMENTO DE LIMA",
        "comprometido": 33000
    },
    {
        "cer": 0,
        "dev": 0,
        "gir": 0,
        "pia": 8287580,
        "pim": 686425,
        "ruta": "demo.png",
        "avance": 0,
        "proyecto": "MEJORAMIENTO Y AMPLIACION DEL SERVICIO EDUCACIONAL COMPLEMENTARIO DE ACTIVIDADES DEPORTIVAS, CULTURALES Y ARTISTICAS PARA LOS ESTUDIANTES DE PRE GRADO DE LA UNIVERSIDAD NACIONAL JOSE FAUSTINO SANCHEZ CARRION, DISTRITO DE HUACHO - PROVINCIA DE HUAURA - DEPARTAMENTO DE LIMA",
        "comprometido": 0
    },
    {
        "cer": 2618337,
        "dev": 30000,
        "gir": 30000,
        "pia": 2749254,
        "pim": 2749254,
        "ruta": "demo.png",
        "avance": 1.09,
        "proyecto": "MEJORAMIENTO Y DESARROLLO DE LAS CAPACIDADES DE LOS SERVICIOS ADMINISTRATIVOS DEL ALMACEN CENTRAL DE LA UNIVERSIDAD NACIONAL JOSE FAUSTINO SANCHEZ CARRION, DISTRITO DE HUACHO - HUAURA - LIMA.",
        "comprometido": 30000
    },
    {
        "cer": 27636,
        "dev": 27636,
        "gir": 27636,
        "pia": 28635,
        "pim": 27636,
        "ruta": "demo.png",
        "avance": 100,
        "proyecto": "MUJERES GESTANTES REACTIVAS A SIFILIS Y SUS CONTACTOS Y RECIEN NACIDOS EXPUESTOS RECIBEN TRATAMIENTO OPORTUNO",
        "comprometido": 27636
    },
    {
        "cer": 7608,
        "dev": 7608,
        "gir": 7608,
        "pia": 7608,
        "pim": 7608,
        "ruta": "demo.png",
        "avance": 100,
        "proyecto": "MUJERES GESTANTES REACTIVAS Y NI?OS EXPUESTOS AL VIH/SIDA RECIBEN TRATAMIENTO OPORTUNO",
        "comprometido": 7608
    },
    {
        "cer": 633038.18,
        "dev": 398980.68999999994,
        "gir": 398980.68999999994,
        "pia": 290108,
        "pim": 633039,
        "ruta": "demo.png",
        "avance": 63.03,
        "proyecto": "MUJERES VICTIMAS CON MEDIDAS DE PROTECCION EFECTIVAS",
        "comprometido": 398980.69
    },
    {
        "cer": 28401,
        "dev": 28401,
        "gir": 28401,
        "pia": 28401,
        "pim": 28401,
        "ruta": "demo.png",
        "avance": 100,
        "proyecto": "MUJER TAMIZADA EN CANCER DE CUELLO UTERINO",
        "comprometido": 28401
    },
    {
        "cer": 24438,
        "dev": 24438,
        "gir": 24438,
        "pia": 24438,
        "pim": 24438,
        "ruta": "demo.png",
        "avance": 100,
        "proyecto": "MUJER TAMIZADA EN CANCER DE MAMA",
        "comprometido": 24438
    },
    {
        "cer": 129741,
        "dev": 129741,
        "gir": 129741,
        "pia": 129741,
        "pim": 129741,
        "ruta": "demo.png",
        "avance": 100,
        "proyecto": "NI?OS Y NI?AS CON ATENCION DE LA ANEMIA POR DEFICIENCIA DE HIERRO",
        "comprometido": 129741
    },
    {
        "cer": 10329710.08,
        "dev": 10329710.08,
        "gir": 10329710.08,
        "pia": 11280690,
        "pim": 10455140,
        "ruta": "demo.png",
        "avance": 98.8,
        "proyecto": "NI?OS Y NI?AS CON VACUNA COMPLETA",
        "comprometido": 10329710.08
    },
    {
        "cer": 5247,
        "dev": 5247,
        "gir": 5247,
        "pia": 5247,
        "pim": 5247,
        "ruta": "demo.png",
        "avance": 100,
        "proyecto": "PACIENTES CON COMORBILIDAD CON DESPISTAJE Y DIAGNOSTICO DE TUBERCULOSIS",
        "comprometido": 5247
    },
    {
        "cer": 156,
        "dev": 156,
        "gir": 156,
        "pia": 156,
        "pim": 156,
        "ruta": "demo.png",
        "avance": 100,
        "proyecto": "PERSONA ATENDIDA CON LESIONES PREMALIGNAS DE CUELLO UTERINO",
        "comprometido": 156
    },
    {
        "cer": 1656,
        "dev": 1656,
        "gir": 1656,
        "pia": 1656,
        "pim": 1656,
        "ruta": "demo.png",
        "avance": 100,
        "proyecto": "PERSONA CON CONSEJERIA PARA LA PREVENCION Y CONTROL DEL CANCER",
        "comprometido": 1656
    },
    {
        "cer": 5671.08,
        "dev": 3402.64,
        "gir": 3402.64,
        "pia": 100050,
        "pim": 10000,
        "ruta": "demo.png",
        "avance": 34.03,
        "proyecto": "PERSONA QUE ACCEDE AL EESS Y RECIBE TRATAMIENTO OPORTUNO PARA TUBERCULOSIS EXTREMADAMENTE DROGO RESISTENTE (XDR)",
        "comprometido": 5671.08
    },
    {
        "cer": 29385,
        "dev": 29385,
        "gir": 29385,
        "pia": 29385,
        "pim": 29385,
        "ruta": "demo.png",
        "avance": 100,
        "proyecto": "PERSONA QUE ACCEDE AL ESTABLECIMIENTO DE SALUD Y RECIBE TRATAMIENTO OPORTUNO PARA TUBERCULOSIS Y SUS COMPLICACIONES",
        "comprometido": 29385
    },
    {
        "cer": 3369714.17,
        "dev": 1858582.9300000002,
        "gir": 1857917.93,
        "pia": 2406964,
        "pim": 3674147,
        "ruta": "demo.png",
        "avance": 50.59,
        "proyecto": "PERSONAS ATENDIDAS POR EL SERVICIO DE DEFENSA PUBLICA",
        "comprometido": 1981895.7200000002
    },
    {
        "cer": 12660,
        "dev": 12660,
        "gir": 12660,
        "pia": 21522,
        "pim": 12660,
        "ruta": "demo.png",
        "avance": 100,
        "proyecto": "PERSONAS CON DISCAPACIDAD RECIBEN SERVICIOS DE REHABILITACION BASADA EN LA COMUNIDAD",
        "comprometido": 12660
    },
    {
        "cer": 7753.599999999999,
        "dev": 7753.599999999999,
        "gir": 7753.599999999999,
        "pia": 15000,
        "pim": 11000,
        "ruta": "demo.png",
        "avance": 70.49,
        "proyecto": "PERSONAS CON FORMACION Y CONOCIMIENTO EN GESTION DEL RIESGO DE DESASTRES Y ADAPTACION AL CAMBIO CLIMATICO",
        "comprometido": 7753.6
    },
    {
        "cer": 1600,
        "dev": 1600,
        "gir": 1600,
        "pia": 1600,
        "pim": 1600,
        "ruta": "demo.png",
        "avance": 100,
        "proyecto": "PERSONAS CON TRASTORNOS AFECTIVOS Y DE ANSIEDAD TRATADAS OPORTUNAMENTE",
        "comprometido": 1600
    },
    {
        "cer": 118,
        "dev": 118,
        "gir": 118,
        "pia": 118,
        "pim": 118,
        "ruta": "demo.png",
        "avance": 100,
        "proyecto": "PERSONAS CON TRASTORNOS MENTALES Y DEL COMPORTAMIENTO DEBIDO AL CONSUMO DEL ALCOHOL Y TABACO TRATADA OPORTUNAMENTE",
        "comprometido": 118
    },
    {
        "cer": 18741,
        "dev": 18741,
        "gir": 18741,
        "pia": 25898,
        "pim": 18741,
        "ruta": "demo.png",
        "avance": 100,
        "proyecto": "PERSONAS CON TRASTORNOS MENTALES Y PROBLEMAS PSICOSOCIALES DETECTADAS",
        "comprometido": 18741
    },
    {
        "cer": 695,
        "dev": 695,
        "gir": 695,
        "pia": 1509,
        "pim": 1509,
        "ruta": "demo.png",
        "avance": 46.06,
        "proyecto": "PERSONAS CON TRASTORNOS Y SINDROMES PSICOTICOS TRATADAS OPORTUNAMENTE",
        "comprometido": 695
    },
    {
        "cer": 61731.81999999999,
        "dev": 38099.950000000004,
        "gir": 38099.950000000004,
        "pia": 44100,
        "pim": 67410,
        "ruta": "demo.png",
        "avance": 56.52,
        "proyecto": "PERSONAS CUENTAN CON ORIENTACION Y ASISTENCIA TECNICA EN MATERIA DE NORMATIVIDAD LABORAL Y BUENAS PRACTICAS LABORALES",
        "comprometido": 48143.53999999999
    },
    {
        "cer": 543799.1,
        "dev": 517903,
        "gir": 517903,
        "pia": 695691,
        "pim": 596892,
        "ruta": "demo.png",
        "avance": 86.77,
        "proyecto": "PERSONAS DIAGNOSTICADAS CON VIH/SIDA QUE ACUDEN A LOS SERVICIOS Y RECIBEN ATENCION INTEGRAL",
        "comprometido": 539521.56
    },
    {
        "cer": 58695,
        "dev": 58695,
        "gir": 58695,
        "pia": 58695,
        "pim": 58695,
        "ruta": "demo.png",
        "avance": 100,
        "proyecto": "PERSONA TAMIZADA PARA DETECCION DE OTROS CANCERES PREVALENTES",
        "comprometido": 58695
    },
    {
        "cer": 804294,
        "dev": 804294,
        "gir": 804294,
        "pia": 1221252,
        "pim": 804294,
        "ruta": "demo.png",
        "avance": 100,
        "proyecto": "POBLACION ACCEDE A METODOS DE PLANIFICACION FAMILIAR",
        "comprometido": 804294
    },
    {
        "cer": 1258,
        "dev": 1258,
        "gir": 1258,
        "pia": 1258,
        "pim": 1258,
        "ruta": "demo.png",
        "avance": 100,
        "proyecto": "POBLACION CON PROBLEMAS PSICOSOCIALES QUE RECIBEN ATENCION OPORTUNA Y DE CALIDAD",
        "comprometido": 1258
    },
    {
        "cer": 4239816.050000001,
        "dev": 4114428.4200000013,
        "gir": 4114428.4200000004,
        "pia": 4336064,
        "pim": 4239817,
        "ruta": "demo.png",
        "avance": 97.04,
        "proyecto": "POBLACION PENITENCIARIA CON CONDICIONES DE VIDA ADECUADAS",
        "comprometido": 4123626.420000001
    },
    {
        "cer": 3953.02,
        "dev": 3953.02,
        "gir": 3953.0200000000004,
        "pia": 3050,
        "pim": 4315,
        "ruta": "demo.png",
        "avance": 91.61,
        "proyecto": "POBLACION PENITENCIARIA EXTRAMUROS CON ATENCION PARA SU REINSERCION SOCIAL POSITIVA",
        "comprometido": 3953.02
    },
    {
        "cer": 58517.28999999999,
        "dev": 55379.009999999995,
        "gir": 55379.009999999995,
        "pia": 19700,
        "pim": 67245,
        "ruta": "demo.png",
        "avance": 82.35,
        "proyecto": "POBLACION PENITENCIARIA INTRAMUROS DISPONE DE TRATAMIENTO PARA INCREMENTAR SUS CAPACIDADES DE REINSERCION SOCIAL POSITIVA",
        "comprometido": 55400.25
    },
    {
        "cer": 624000,
        "dev": 624000,
        "gir": 624000,
        "pia": 631680,
        "pim": 624000,
        "ruta": "demo.png",
        "avance": 100,
        "proyecto": "POBLACION RURAL EN ECONOMIAS DE SUBSISTENCIA RECIBE ASISTENCIA TECNICA, CAPACITACION Y PORTAFOLIO DE ACTIVOS PARA LA GESTION DE EMPRENDIMIENTOS RURALES",
        "comprometido": 624000
    },
    {
        "cer": 6735277.719999999,
        "dev": 4755659.4799999995,
        "gir": 4708277.819999998,
        "pia": 6028183,
        "pim": 6799993,
        "ruta": "demo.png",
        "avance": 69.94,
        "proyecto": "PROCESO JUDICIAL TRAMITADO Y CALIFICADO",
        "comprometido": 4953584.629999999
    },
    {
        "cer": 14595,
        "dev": 13583.37,
        "gir": 13583.37,
        "pia": 0,
        "pim": 15935,
        "ruta": "demo.png",
        "avance": 85.24,
        "proyecto": "PRODUCTORES AGROPECUARIOS MEJORAN SUS CAPACIDADES COMERCIALES GESTIONANDO EMPRESARIALMENTE HACIA EL MERCADO",
        "comprometido": 13583.37
    },
    {
        "cer": 76699.87,
        "dev": 52699.869999999995,
        "gir": 52699.869999999995,
        "pia": 328354,
        "pim": 351479,
        "ruta": "demo.png",
        "avance": 14.99,
        "proyecto": "PROGRAMAS CURRICULARES ADECUADOS",
        "comprometido": 52699.869999999995
    },
    {
        "cer": 7373169.8,
        "dev": 4038582.71,
        "gir": 4038582.71,
        "pia": 8415074,
        "pim": 10132364,
        "ruta": "demo.png",
        "avance": 39.86,
        "proyecto": "RECUPERACION DEL AREA DEGRADADA POR RESIDUOS SOLIDOS PAMPA LAS SALINAS, DISTRITO DE HUACHO, PROVINCIA DE HUAURA, DEPARTAMENTO DE LIMA",
        "comprometido": 7358934.6
    },
    {
        "cer": 1437459.98,
        "dev": 512762.04999999993,
        "gir": 512762.04999999993,
        "pia": 2730919,
        "pim": 1704601,
        "ruta": "demo.png",
        "avance": 30.08,
        "proyecto": "RECUPERACION DE LOS SECTORES A Y B DE LA ZONA ARQUEOLOGICA MONUMENTAL DE PE?ICO EN EL VALLE DE SUPE, DISTRITO DE HUAURA, HUAURA - LIMA",
        "comprometido": 539731.98
    },
    {
        "cer": 0,
        "dev": 0,
        "gir": 0,
        "pia": 0,
        "pim": 257356,
        "ruta": "demo.png",
        "avance": 0,
        "proyecto": "REHABILITACION INFRAESTRUCTURA DE CAPTACION HUACAN GRANDE, SECTOR SANTA MARIA, DISTRITO DE SANTA MARIA, PROVINCIA DE HUAURA, DEPARTAMENTO DE LIMA",
        "comprometido": 0
    },
    {
        "cer": 34676972.35,
        "dev": 0,
        "gir": 0,
        "pia": 5778056,
        "pim": 34887686,
        "ruta": "demo.png",
        "avance": 0,
        "proyecto": "REHABILITACION Y MEJORAMIENTO DE LA CARRETERA HUAURA - SAYAN - CHURIN",
        "comprometido": 0
    },
    {
        "cer": 146324.6,
        "dev": 37532.26,
        "gir": 37532.26,
        "pia": 140799,
        "pim": 146325,
        "ruta": "demo.png",
        "avance": 25.65,
        "proyecto": "REHABILITACION Y REMODELACION DE LA INFRAESTRUCTURA EDUCATIVA Y EQUIPAMIENTO DE LA INSTITUCION EDUCATIVA N? 20318 - JOSE A. MACNAMARA UBICADA EN LA REGION DE LIMA, PROVINCIA DE HUAURA Y DISTRITO DE HUACHO",
        "comprometido": 37532.26
    },
    {
        "cer": 209618.75,
        "dev": 53767.21,
        "gir": 53767.21,
        "pia": 1495970,
        "pim": 209619,
        "ruta": "demo.png",
        "avance": 25.65,
        "proyecto": "REHABILITACION Y REMODELACION DE LA INFRAESTRUCTURA EDUCATIVA Y EQUIPAMIENTO DE LA INSTITUCION EDUCATIVA N? 20821 LUIS FABIO XAMMAR JURADO UBICADA EN LA REGION LIMA, PROVINCIA DE HUAURA Y DISTRITO DE SANTA MARIA",
        "comprometido": 53767.21
    },
    {
        "cer": 0,
        "dev": 0,
        "gir": 0,
        "pia": 0,
        "pim": 141600,
        "ruta": "demo.png",
        "avance": 0,
        "proyecto": "REPARACION DE AMBIENTE ADMINISTRATIVO; RENOVACION DE PTAR; ADQUISICION DE EQUIPO DE ALMACENAMIENTO; EN EL(LA) UNIDAD TECNICA AGROINDUSTRIAL HUAURA DISTRITO DE SANTA MARIA, PROVINCIA HUAURA, DEPARTAMENTO LIMA",
        "comprometido": 0
    },
    {
        "cer": 7640635.18,
        "dev": 4012847.8700000006,
        "gir": 4011132.87,
        "pia": 7525378,
        "pim": 8416366,
        "ruta": "demo.png",
        "avance": 47.68,
        "proyecto": "SERVICIOS ADECUADOS DE APOYO AL ESTUDIANTE",
        "comprometido": 4049717.1
    },
    {
        "cer": 651222.0900000002,
        "dev": 510481.2500000003,
        "gir": 507743.4300000002,
        "pia": 1210499,
        "pim": 691385,
        "ruta": "demo.png",
        "avance": 73.83,
        "proyecto": "SERVICIOS E INSTRUMENTOS PARA LA TRANSFERENCIA DE TECNOLOGIA E INNOVACION EN LA MIPYME",
        "comprometido": 536280.4900000003
    },
    {
        "cer": 134251058.39,
        "dev": 100022314.88,
        "gir": 99735759.38999999,
        "pia": 140253553,
        "pim": 148339377,
        "ruta": "demo.png",
        "avance": 67.43,
        "proyecto": "SIN PRODUCTO",
        "comprometido": 102537250.44999994
    },
    {
        "cer": 14976,
        "dev": 14976,
        "gir": 14976,
        "pia": 234413,
        "pim": 14976,
        "ruta": "demo.png",
        "avance": 100,
        "proyecto": "SINTOMATICOS RESPIRATORIOS CON DESPISTAJE DE TUBERCULOSIS",
        "comprometido": 14976
    },
    {
        "cer": 9112,
        "dev": 9112,
        "gir": 9112,
        "pia": 9112,
        "pim": 9112,
        "ruta": "demo.png",
        "avance": 100,
        "proyecto": "TAMIZAJE Y DIAGNOSTICO DE PACIENTES CON CATARATAS",
        "comprometido": 9112
    },
    {
        "cer": 178315,
        "dev": 178315,
        "gir": 178315,
        "pia": 178315,
        "pim": 178315,
        "ruta": "demo.png",
        "avance": 100,
        "proyecto": "TAMIZAJE Y DIAGNOSTICO DE PERSONAS CON GLAUCOMA",
        "comprometido": 178315
    },
    {
        "cer": 1823,
        "dev": 1823,
        "gir": 1823,
        "pia": 1823,
        "pim": 1823,
        "ruta": "demo.png",
        "avance": 100,
        "proyecto": "TAMIZAJE Y DIAGNOSTICO DE RECIEN NACIDO CON RETINOPATIA DE LA PREMATURIDAD (ROP)",
        "comprometido": 1823
    },
    {
        "cer": 6894,
        "dev": 6894,
        "gir": 6894,
        "pia": 6894,
        "pim": 6894,
        "ruta": "demo.png",
        "avance": 100,
        "proyecto": "TAMIZAJE Y TRATAMIENTO DE PACIENTES AFECTADOS POR METALES PESADOS",
        "comprometido": 6894
    },
    {
        "cer": 2054,
        "dev": 2054,
        "gir": 2054,
        "pia": 2054,
        "pim": 2054,
        "ruta": "demo.png",
        "avance": 100,
        "proyecto": "TRANSPORTE ASISTIDO DE LA EMERGENCIA Y URGENCIA INDIVIDUAL",
        "comprometido": 2054
    },
    {
        "cer": 22796,
        "dev": 22796,
        "gir": 22796,
        "pia": 110808,
        "pim": 22796,
        "ruta": "demo.png",
        "avance": 100,
        "proyecto": "TRATAMIENTO Y CONTROL DE PACIENTES CON CATARATAS",
        "comprometido": 22796
    },
    {
        "cer": 15237,
        "dev": 15237,
        "gir": 15237,
        "pia": 15237,
        "pim": 15237,
        "ruta": "demo.png",
        "avance": 100,
        "proyecto": "TRATAMIENTO Y CONTROL DE PERSONAS CON GLAUCOMA",
        "comprometido": 15237
    },
    {
        "cer": 20993.75,
        "dev": 20993.75,
        "gir": 20993.75,
        "pia": 255556,
        "pim": 35994,
        "ruta": "demo.png",
        "avance": 58.33,
        "proyecto": "VACUNACION DE ANIMALES DOMESTICOS",
        "comprometido": 20993.75
    },
    {
        "cer": 395901,
        "dev": 305726.3399999999,
        "gir": 302726.3399999999,
        "pia": 322045,
        "pim": 447406,
        "ruta": "demo.png",
        "avance": 68.33,
        "proyecto": "VICTIMAS, TESTIGOS, PERITOS Y COLABORADORES CON ASISTENCIA Y PROTECCION",
        "comprometido": 305726.3399999999
    },
    {
        "cer": 0,
        "dev": 0,
        "gir": 0,
        "pia": 3431,
        "pim": 3431,
        "ruta": "demo.png",
        "avance": 0,
        "proyecto": "VIVIENDAS PROTEGIDAS DE LOS PRINCIPALES CONDICIONANTES DEL RIESGO EN LAS AREAS DE ALTO Y MUY ALTO RIESGO DE ENFERMEDADES METAXENICAS Y ZOONOSIS",
        "comprometido": 0
    }
]

const API_NIVEL = [
    
    {
        "codigo":"",
        "nombre":"Todos"
    },
    {
        "codigo": "E",
        "nombre": "Nacional",
        "data": [
            { 'codigo': '01', 'nombre': 'PRESIDENCIA CONSEJO MINISTROS' },
            { 'codigo': '03', 'nombre': 'CULTURA' },
            { 'codigo': '04', 'nombre': 'PODER JUDICIAL' },
            { 'codigo': '05', 'nombre': 'AMBIENTAL' },
            { 'codigo': '06', 'nombre': 'JUSTICIA' },
            { 'codigo': '07', 'nombre': 'INTERIOR' },
            { 'codigo': '08', 'nombre': 'RELACIONES EXTERIORES' },
            { 'codigo': '09', 'nombre': 'ECONOMIA Y FINANZAS' },
            { 'codigo': '10', 'nombre': 'EDUCACION' },
            { 'codigo': '11', 'nombre': 'SALUD' },
            { 'codigo': '12', 'nombre': 'TRABAJO Y PROMOCION DEL EMPLEO' },
            { 'codigo': '13', 'nombre': 'AGRICULTURA' },
            { 'codigo': '16', 'nombre': 'ENERGIA Y MINAS' },
            { 'codigo': '19', 'nombre': 'CONTRALORIA GENERAL' },
            { 'codigo': '20', 'nombre': 'DEFENSORIA DEL PUEBLO' },
            { 'codigo': '21', 'nombre': 'CONSEJO NACIONAL DE LA MAGISTRATURA' },
            { 'codigo': '22', 'nombre': 'MINISTERIO PUBLICO' },
            { 'codigo': '24', 'nombre': 'TRIBUNAL CONSTITUCIONAL' },
            { 'codigo': '26', 'nombre': 'DEFENSA' },
            { 'codigo': '27', 'nombre': 'FUERO MILITAR POLICIAL' },
            { 'codigo': '28', 'nombre': 'CONGRESO DE LA REPUBLICA' },
            { 'codigo': '31', 'nombre': 'JURADO NACIONAL DE ELECCIONES' },
            { 'codigo': '32', 'nombre': 'OFICINA NACIONAL DE PROCESOS ELECTORALES' },
            { 'codigo': '33', 'nombre': 'REGISTRO NACIONAL DE IDENTIFICACION Y ESTADO CIVIL' },
            { 'codigo': '35', 'nombre': 'COMERCIO EXTERIOR Y TURISMO' },
            { 'codigo': '36', 'nombre': 'TRANSPORTES Y COMUNICACIONES' },
            { 'codigo': '37', 'nombre': 'VIVIENDA CONSTRUCCION Y SANEAMIENTO' },
            { 'codigo': '38', 'nombre': 'PRODUCCION' },
            { 'codigo': '39', 'nombre': 'MUJER Y POBLACIONES VULNERABLES' },
            { 'codigo': '40', 'nombre': 'DESARROLLO E INCLUSION SOCIAL' }
        ]
    },
    {
        "codigo": "R",
        "nombre": "Regional",
        "data": [
            { 'codigo': '440', 'nombre': 'GR AMAZONAS' },
            { 'codigo': '441', 'nombre': 'GR ANCASH' },
            { 'codigo': '442', 'nombre': 'GR APURIMAC' },
            { 'codigo': '443', 'nombre': 'GR AREQUIPA' },
            { 'codigo': '444', 'nombre': 'GR AYACUCHO' },
            { 'codigo': '445', 'nombre': 'GR CAJAMARCA' },
            { 'codigo': '446', 'nombre': 'GR CUSCO' },
            { 'codigo': '447', 'nombre': 'GR HUANCAVELICA' },
            { 'codigo': '448', 'nombre': 'GR HUANUCO' },
            { 'codigo': '449', 'nombre': 'GR ICA' },
            { 'codigo': '450', 'nombre': 'GR JUNIN' },
            { 'codigo': '451', 'nombre': 'GR LA LIBERTAD' },
            { 'codigo': '452', 'nombre': 'GR LAMBAYEQUE' },
            { 'codigo': '453', 'nombre': 'GR LORETO' },
            { 'codigo': '454', 'nombre': 'GR MADRE DE DIOS' },
            { 'codigo': '455', 'nombre': 'GR MOQUEGUA' },
            { 'codigo': '456', 'nombre': 'GR PASCO' },
            { 'codigo': '457', 'nombre': 'GR PIURA' },
            { 'codigo': '458', 'nombre': 'GR PUNO' },
            { 'codigo': '459', 'nombre': 'GR SAN MARTIN' },
            { 'codigo': '460', 'nombre': 'GR TACNA' },
            { 'codigo': '461', 'nombre': 'GR TUMBES' },
            { 'codigo': '462', 'nombre': 'GR UCAYALI' },
            { 'codigo': '463', 'nombre': 'GR LIMA' },
            { 'codigo': '464', 'nombre': 'GOBIERNO REGIONAL DE LA PROVINCIA CONSTITUCIONAL DEL CALLAO' },
        ]
    },
    {
        "codigo": "M",
        "nombre": "Local"
    }
]

const API_ACTPRO = [
    {
        "codigo": "3",
        "nombre": "Actividad"
    },
    {
        "codigo": "2",
        "nombre": "Proyecto"
    },
    {
        "codigo": "",
        "nombre": "Actividad/Proyecto"
    },
]

const URL_DEPARTAMENTO = './src/js/data/departamento.geojson';
const URL_PROVINCIA = './src/js/data/provincia.geojson';
const URL_DISTRITO = './src/js/data/distrito.geojson';

const URL_MAPA_DEMO = {
    "card": [
      {
        "dev": 33896933436.659927,
        "pim": 53461672801,
        "avance": 63.4,
        "n_obras": 10,
        "tipo_gobierno": "R"
      },
      {
        "dev": 22384634379.6899,
        "pim": 45991990157,
        "avance": 48.67,
        "n_obras": 10,
        "tipo_gobierno": "M"
      },
      {
        "dev": 93486030072.6497,
        "pim": 144691962241,
        "avance": 64.61,
        "n_obras": 10,
        "tipo_gobierno": "E"
      }
    ],
    "feature": [
      {
        "avance": 59.23,
        "ubigeo": "03",
        "nom_dpto": "APURIMAC"
      },
      {
        "avance": 55.06,
        "ubigeo": "08",
        "nom_dpto": "CUSCO"
      },
      {
        "avance": 64.03,
        "ubigeo": "12",
        "nom_dpto": "JUNIN"
      },
      {
        "avance": 60.04,
        "ubigeo": "04",
        "nom_dpto": "AREQUIPA"
      },
      {
        "avance": 54.77,
        "ubigeo": "11",
        "nom_dpto": "ICA"
      },
      {
        "avance": 61.85,
        "ubigeo": "06",
        "nom_dpto": "CAJAMARCA"
      },
      {
        "avance": 55.26,
        "ubigeo": "14",
        "nom_dpto": "LAMBAYEQUE"
      },
      {
        "avance": 59.65,
        "ubigeo": "10",
        "nom_dpto": "HUANUCO"
      },
      {
        "avance": 64.97,
        "ubigeo": "16",
        "nom_dpto": "LORETO"
      },
      {
        "avance": 61.75,
        "ubigeo": "22",
        "nom_dpto": "SAN MARTIN"
      },
      {
        "avance": 60.8,
        "ubigeo": "05",
        "nom_dpto": "AYACUCHO"
      },
      {
        "avance": 57.64,
        "ubigeo": "17",
        "nom_dpto": "MADRE DE DIOS"
      },
      {
        "avance": 54.1,
        "ubigeo": "02",
        "nom_dpto": "ANCASH"
      },
      {
        "avance": 52.61,
        "ubigeo": "18",
        "nom_dpto": "MOQUEGUA"
      },
      {
        "avance": 54.91,
        "ubigeo": "19",
        "nom_dpto": "PASCO"
      },
      {
        "avance": 52.99,
        "ubigeo": "23",
        "nom_dpto": "TACNA"
      },
      {
        "avance": 55.65,
        "ubigeo": "25",
        "nom_dpto": "UCAYALI"
      },
      {
        "avance": 60.64,
        "ubigeo": "09",
        "nom_dpto": "HUANCAVELICA"
      },
      {
        "avance": 59.71,
        "ubigeo": "21",
        "nom_dpto": "PUNO"
      },
      {
        "avance": 64.3,
        "ubigeo": "15",
        "nom_dpto": "LIMA"
      },
      {
        "avance": 57.73,
        "ubigeo": "01",
        "nom_dpto": "AMAZONAS"
      },
      {
        "avance": 57.53,
        "ubigeo": "13",
        "nom_dpto": "LA LIBERTAD"
      },
      {
        "avance": 63.66,
        "ubigeo": "24",
        "nom_dpto": "TUMBES"
      },
      {
        "avance": 70.35,
        "ubigeo": "07",
        "nom_dpto": "CALLAO"
      },
      {
        "avance": 58.58,
        "ubigeo": "20",
        "nom_dpto": "PIURA"
      }
    ]
  }