from flask_sqlalchemy import SQLAlchemy
#from sqlalchemy import cast, Numeric, String, literal, union, literal_column, extract, Integer, Text, func, select
import os, requests, json, urllib3, time
from pathlib import Path
from bs4 import BeautifulSoup
from schema import *
from config import URL_MEF
from datetime import datetime, timedelta
import locale
from concurrent.futures import ThreadPoolExecutor, as_completed

# Configurar la localización en español
locale.setlocale(locale.LC_TIME, "es_ES.utf8") 

db = SQLAlchemy()
urllib3.disable_warnings()
anio = datetime.now().year
pliegos = {
'01': 440,
'02': 441,
'03': 442,
'04': 443,
'05': 444,
'06': 445,
'07': 464,
'08': 446,
'09': 447,
'10': 448,
'11': 449,
'12': 450,
'13': 451,
'14': 452,
'15': 463,
#'1501': 465,
'16': 453,
'17': 454,
'18': 455,
'19': 456,
'20': 457,
'21': 458,
'22': 459,
'23': 460,
'24': 461,
'25': 462,
}
enQueGasta = ['30=', '8=']
actividadProyectos = ['', 'Proyecto', 'Actividad']
anio = datetime.now().year
datos = None

with open('./static/json/distritos.json', 'r') as archivo:
    datos = json.load(archivo)

def obtenerUbigeo(codigo):
    return pliegos.get(codigo)

def logError(mensaje, nombre):
    archivo= Path(f'./static/logs/error_{nombre}.log')
    os.makedirs(os.path.dirname(archivo), exist_ok=True)
    with open(archivo, 'a', encoding='utf-8') as f:
        f.write(mensaje + '\n')

def limpiarArchivos(nombre):
    rutaArchivo = Path(f'./static/logs/error_{nombre}.log')

    if os.path.exists(rutaArchivo):
        os.remove(rutaArchivo)

    if nombre:
        folderPath = Path(f'./static/json/{nombre}')        
        if os.path.exists(folderPath):
            if os.listdir(folderPath):
                for fileName in os.listdir(folderPath):
                    filePath = os.path.join(folderPath, fileName)
                    try:
                        if os.path.isfile(filePath) or os.path.islink(filePath):
                            os.unlink(filePath)
                    except Exception as e:
                        logError(f'Error al eliminar {filePath}: {e}', nombre)
        else:
            logError(f'La carpeta {folderPath} no existe.', nombre)            

def fetch(url): 
    r = requests.get(url, verify=False)
    return r.text

class Dptos():
    def procesarURL(pliego, gasto, ap):
        if ap == '':
            url = f'{URL_MEF}?_uhc=yes&0=&1=R&2=99&3={pliego}&{gasto}&y={anio}&cpage=1&psize=400'
        else:
            url = f'{URL_MEF}?_uhc=yes&0=&1=R&2=99&3={pliego}&{gasto}&y={anio}&ap={ap}&cpage=1&psize=400'

        try:
            r = fetch(url)
            soup = BeautifulSoup(r, 'lxml')

            htmlTabla = soup.find('table', {'class': 'Data'})
            if not htmlTabla:
                logError(f'No se encontró la tabla para el pliego {pliego}(gasto {gasto}, {ap}): {url}', 'dpto')
                return

            htmlTabla2 = htmlTabla.findAll('td')
            if not htmlTabla2:
                logError(f'No se encontró el td para el pliego {pliego}(gasto {gasto}, {ap}): {url}', 'dpto')
                return

            columnas = 10
            filas = []
            filaActual = []
            i = 0

            for td in htmlTabla2:
                valor = td.text.strip("\r\n").strip()

                if i in [0, 2, 4, 5, 6]:
                    i += 1
                    continue

                if i == 1:
                    if gasto == '30=':
                        partes1 = valor[:4]
                        filaActual.append('c')
                    elif gasto == '8=':
                        partes1 = valor[:2]
                        filaActual.append('f')
                    filaActual.append(partes1)

                elif i in [3, 7, 8]:
                    montos = valor.replace(",", "")
                    montos = montos.strip()
                    filaActual.append(float(montos) if montos else 0)

                i += 1

                if i == columnas:
                    filaActual.append({'': '1', 'Proyecto': '2', 'Actividad': '3'}.get(ap, '0'))
                    filas.append(filaActual)
                    filaActual = []
                    i = 0

            return filas
        except Exception as e:
            logError(f'Error procesando {pliego}, {gasto}, {ap}: {e}, {url}', 'dpto')
            return []

    def array2json(filas, pliego, nivelGobierno):
        rutaJson = Path(f'./static/json/dpto/{pliego}.json')

        try:
            os.makedirs('json', exist_ok=True)

            if os.path.exists(rutaJson):
                with open(rutaJson, 'r', encoding='utf-8') as archivo:
                    try:
                        datosExistentes = json.load(archivo)
                    except Exception:
                        datosExistentes = []
            else:
                datosExistentes = []

            for fila in filas:
                nuevaFila = {
                    'a': f'{anio}',
                    'g': nivelGobierno,
                    'op': fila[0],
                    'c': fila[1],
                    'p': fila[2],
                    'd': fila[3],
                    'i': fila[4],
                    't': fila[5]
                }
                if nuevaFila not in datosExistentes:
                    datosExistentes.append(nuevaFila)

            datosExistentes = sorted(datosExistentes, key=lambda x: (x['t'], x['c']))

            with open(rutaJson, 'w', encoding='utf-8') as archivo:
                json.dump(datosExistentes, archivo, indent=4, ensure_ascii=False)

        except PermissionError as e:
            logError(f'Error de permisos al escribir el archivo {rutaJson}: {e}', 'dpto')
        except Exception as e:
            logError(f'Error al guardar datos en {rutaJson}: {e}', 'dpto')

    def procesarJson(pliego, enQueGasta, actividadProyectos):
        filaSTotales = []
        for gasto in enQueGasta:
            for ap in actividadProyectos:
                filas = Dptos.procesarURL(pliego, gasto, ap)
                filaSTotales.extend(filas)
        Dptos.array2json(filaSTotales, pliego, 'R')

    def iniciar():
        pliegos= [440, 441, 442, 443, 444, 445, 446, 447, 448, 449, 450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461, 462, 463, 464]#, 465]
        try:
            fechaHora= datetime.now()
            formato = fechaHora.strftime("%Y-%m-%d %H:%M:%S")
            print("Ejecutando MEF(Departamentos) | ", formato)
            limpiarArchivos('dpto')
            tiempoInicial = time.time()  
            for pliego in pliegos:
                Dptos.procesarJson(pliego, enQueGasta, actividadProyectos)
            
            tiempoFinal = time.time()
            totalTiempo = (tiempoFinal - tiempoInicial) / 60
            print('Tiempo total de ejecución: {totalTiempo:.2f} minutos')
        except Exception as e:
            logError(f'Error general: {e}', 'dpto')

class Provs():
    def procesarURL(ubigeo, gasto, ap):
        departamento = ubigeo[:2]
        provincia = ubigeo[2:4]

        if ap == '':
            url = (f'{URL_MEF}?_uhc=yes&0=&1=M&37=M&5={departamento}&6={provincia}&{gasto}&_uhc=yes&y={anio}&cpage=1&psize=400')
        else:
            url = (f'{URL_MEF}?_uhc=yes&0=&1=M&37=M&5={departamento}&6={provincia}&{gasto}&_uhc=yes&y={anio}&ap={ap}&cpage=1&psize=400')

        try:
            r = fetch(url)
            soup = BeautifulSoup(r, 'lxml')

            htmlTabla = soup.find('table', {'class': 'Data'})
            if not htmlTabla:
                logError(f'No se encontró la tabla para el ubigeo {ubigeo}, gasto {gasto}, {ap}: {url}', 'prov')
                return

            htmlTabla2 = htmlTabla.findAll('td')
            if not htmlTabla2:
                logError(f'No se encontró el td para el ubigeo {ubigeo}, gasto {gasto}, {ap}: {url}', 'prov')
                return

            columnas = 10
            filas = []
            filaActual = []
            i = 0

            for td in htmlTabla2:
                valor = td.text.strip('\r\n').strip()

                if i in [0, 2, 4, 5, 6]:
                    i += 1
                    continue

                if i == 1:
                    if gasto == '30=':
                        partes1 = valor[:4]
                        filaActual.append('c')
                    elif gasto == '8=':
                        partes1 = valor[:2]
                        filaActual.append('f')
                    filaActual.append(partes1)

                elif i in [3, 7, 8]:
                    montos = valor.replace(",", "")
                    montos = montos.strip()
                    filaActual.append(float(montos) if montos else 0)

                i += 1

                if i == columnas:
                    filaActual.append({'': '1', 'Proyecto': '2', 'Actividad': '3'}.get(ap, '0'))
                    filas.append(filaActual)
                    filaActual = []
                    i = 0

            return filas
        except Exception as e:
            logError(f'Error procesando {ubigeo}, {gasto}, {ap}: {e}, {url}', 'prov')
            return []

    def array2json(filas, ubigeo):
        rutaJson = Path(f'./static/json/prov/{ubigeo}.json')

        try:
            os.makedirs('json', exist_ok=True)
            if os.path.exists(rutaJson):
                with open(rutaJson, 'r', encoding='utf-8') as archivo:
                    try:
                        datosExistentes = json.load(archivo)
                    except Exception:
                        datosExistentes = []
            else:
                datosExistentes = []

            for fila in filas:
                nueva_fila = {
                    'a': f'{anio}',
                    'g': 'M',
                    'op': fila[0],
                    'c': fila[1],
                    'p': fila[2],
                    'd': fila[3],
                    'i': fila[4],
                    't': fila[5]
                }
                if nueva_fila not in datosExistentes:
                    datosExistentes.append(nueva_fila)

            datosExistentes = sorted(datosExistentes, key=lambda x: (x['t'], x['c']))

            with open(rutaJson, 'w', encoding='utf-8') as archivo:
                json.dump(datosExistentes, archivo, indent=4, ensure_ascii=False)

        except PermissionError as e:
            logError(f'Error de permisos al escribir el archivo {rutaJson}: {e}', 'prov')
        except Exception as e:
            logError(f'Error al guardar datos en {rutaJson}: {e}', 'prov')

    def procesarJson(ubigeo, enQueGasta, actividadProyectos):
        filas_totales = []
        for gasto in enQueGasta:
            for ap in actividadProyectos:
                filas = Provs.procesarURL(ubigeo, gasto, ap)
                filas_totales.extend(filas)
        Provs.array2json(filas_totales, ubigeo)

    def iniciar():
        provincias= ['0101', '0102', '0103', '0104', '0105', '0106', '0107', '0201', '0202', '0203', '0204', '0205', '0206', '0207', '0208', '0209', '0210', '0211', '0212', '0213', '0214', '0215', '0216', '0217', '0218', '0219', '0220', '0301', '0302', '0303', '0304', '0305', '0306', '0307', '0401', '0402', '0403', '0404', '0405', '0406', '0407', '0408', '0501', '0502', '0503', '0504', '0505', '0506', '0507', '0508', '0509', '0510', '0511', '0601', '0602', '0603', '0604', '0605', '0606', '0607', '0608', '0609', '0610', '0611', '0612', '0613', '0701', '0801', '0802', '0803', '0804', '0805', '0806', '0807', '0808', '0809', '0810', '0811', '0812', '0813', '0901', '0902', '0903', '0904', '0905', '0906', '0907', '1001', '1002', '1003', '1004', '1005', '1006', '1007', '1008', '1009', '1010', '1011', '1101', '1102', '1103', '1104', '1105', '1201', '1202', '1203', '1204', '1205', '1206', '1207', '1208', '1209', '1301', '1302', '1303', '1304', '1305', '1306', '1307', '1308', '1309', '1310', '1311', '1312', '1401', '1402', '1403', '1501', '1502', '1503', '1504', '1505', '1506', '1507', '1508', '1509', '1510', '1601', '1602', '1603', '1604', '1605', '1606', '1607', '1608', '1701', '1702', '1703', '1801', '1802', '1803', '1901', '1902', '1903', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2101', '2102', '2103', '2104', '2105', '2106', '2107', '2108', '2109', '2110', '2111', '2112', '2113', '2201', '2202', '2203', '2204', '2205', '2206', '2207', '2208', '2209', '2210', '2301', '2302', '2303', '2304', '2401', '2402', '2403', '2501', '2502', '2503', '2504']
        fechaHora= datetime.now()
        formato = fechaHora.strftime("%Y-%m-%d %H:%M:%S")
        print('Ejecutando MEF(Provincias) | ', formato)
        limpiarArchivos('prov') 
        try:
            tiempoInicial = time.time()
            with ThreadPoolExecutor(max_workers=4) as executor:
                [executor.submit(Provs.procesarJson, ubigeo, enQueGasta, actividadProyectos) for ubigeo in provincias]

            tiempoFinal = time.time()
            totalTiempo = (tiempoFinal - tiempoInicial) / 60
            print(f'Tiempo total de ejecución: {totalTiempo:.2f} minutos')
        except Exception as e:
            logError(f'Error general: {e}', 'prov')        

class Dists():
    def procesarURL(ubigeo, gasto, ap, distrito):
        departamento = ubigeo[:2]
        provincia = ubigeo[2:4]

        if ap == '':
            url = (f'{URL_MEF}?_uhc=yes&0=&1=M&37=M&5={departamento}&6={provincia}&7={distrito}&{gasto}&y={anio}&cpage=1&psize=400')
        else:
            url = (f'{URL_MEF}?_uhc=yes&0=&1=M&37=M&5={departamento}&6={provincia}&7={distrito}&{gasto}&y={anio}&ap={ap}&cpage=1&psize=400')

        try:
            r = fetch(url)
            soup = BeautifulSoup(r, 'lxml')

            htmlTabla = soup.find('table', {'class': 'Data'})
            if not htmlTabla:
                logError(f'No se encontró la tabla para el ubigeo {ubigeo}, gasto {gasto}, {ap}: {url}','dist')
                return

            htmlTabla2 = htmlTabla.findAll('td')
            if not htmlTabla2:
                logError(f'No se encontró el td para el ubigeo {ubigeo}, gasto {gasto}, {ap}: {url}', 'dist')
                return

            columnas = 10
            filas = []
            filaActual = []
            i = 0

            for td in htmlTabla2:
                valor = td.text.strip("\r\n").strip()

                if i in [0, 2, 4, 5, 6]:
                    i += 1
                    continue

                if i == 1:
                    if gasto == '30=':
                        partes1 = valor[:4]
                        filaActual.append('c')
                    elif gasto == '8=':
                        partes1 = valor[:2]
                        filaActual.append('f')
                    filaActual.append(partes1)

                elif i in [3, 7, 8]:
                    montos = valor.replace(",", "")
                    montos = montos.strip()
                    filaActual.append(float(montos) if montos else 0)

                i += 1

                if i == columnas:
                    filaActual.append({'': '1', 'Proyecto': '2', 'Actividad': '3'}.get(ap, '0'))
                    filas.append(filaActual)
                    filaActual = []
                    i = 0

            return filas
        except Exception as e:
            logError(f'Error procesando {ubigeo}, {gasto}, {ap}: {e}, {url}', 'dist')
            return []

    def array2json(filas, ubigeo):
        rutaJson = Path(f'./static/json/dist/{ubigeo}.json')
        try:
            os.makedirs('json', exist_ok=True)

            if os.path.exists(rutaJson):
                with open(rutaJson, 'r', encoding='utf-8') as archivo:
                    try:
                        datosExistentes = json.load(archivo)
                    except Exception:
                        datosExistentes = []
            else:
                datosExistentes = []

            for fila in filas:
                nueva_fila = {
                    'a': f'{anio}',
                    'g': 'M',
                    'op': fila[0],
                    'c': fila[1],
                    'p': fila[2],
                    'd': fila[3],
                    'i': fila[4],
                    't': fila[5]
                }
                if nueva_fila not in datosExistentes:
                    datosExistentes.append(nueva_fila)

            datosExistentes = sorted(datosExistentes, key=lambda x: (x['t'], x['c']))

            with open(rutaJson, 'w', encoding='utf-8') as archivo:
                json.dump(datosExistentes, archivo, indent=4, ensure_ascii=False)

        except PermissionError as e:
            logError(f'Error de permisos al escribir el archivo {rutaJson}: {e}', 'dist')
        except Exception as e:
            logError(f'Error al guardar datos en {rutaJson}: {e}', 'dist')
        
    def procesarJson(ubigeo, enQueGasta, actividadProyectos):
        distrito= datos.get(ubigeo)
        if distrito:
            filasTotales = []
            for gasto in enQueGasta:
                for ap in actividadProyectos:
                    filas = Dists.procesarURL(ubigeo, gasto, ap, distrito)
                    filasTotales.extend(filas)
            Dists.array2json(filasTotales, ubigeo)

    def iniciar():
        distritos = ['010101', '010102', '010103', '010104', '010105', '010106', '010107', '010108', '010109', '010110', '010111', '010112', '010113', '010114', '010115', '010116', '010117', '010118', '010119', '010120', '010121', '010201', '010202', '010203', '010204', '010205', '010206', '010301', '010302', '010303', '010304', '010305', '010306', '010307', '010308', '010309', '010310', '010311', '010312', '010401', '010402', '010403', '010501', '010502', '010503', '010504', '010505', '010506', '010507', '010508', '010509', '010510', '010511', '010512', '010513', '010514', '010515', '010516', '010517', '010518', '010519', '010520', '010521', '010522', '010523', '010601', '010602', '010603', '010604', '010605', '010606', '010607', '010608', '010609', '010610', '010611', '010612', '010701', '010702', '010703', '010704', '010705', '010706', '010707', '020101', '020102', '020103', '020104', '020105', '020106', '020107', '020108', '020109', '020110', '020111', '020112', '020201', '020202', '020203', '020204', '020205', '020301', '020302', '020303', '020304', '020305', '020306', '020401', '020402', '020501', '020502', '020503', '020504', '020505', '020506', '020507', '020508', '020509', '020510', '020511', '020512', '020513', '020514', '020515', '020601', '020602', '020603', '020604', '020605', '020606', '020607', '020608', '020609', '020610', '020611', '020701', '020702', '020703', '020801', '020802', '020803', '020804', '020901', '020902', '020903', '020904', '020905', '020906', '020907', '021001', '021002', '021003', '021004', '021005', '021006', '021007', '021008', '021009', '021010', '021011', '021012', '021013', '021014', '021015', '021016', '021101', '021102', '021103', '021104', '021105', '021201', '021202', '021203', '021204', '021205', '021206', '021207', '021208', '021209', '021210', '021301', '021302', '021303', '021304', '021305', '021306', '021307', '021308', '021401', '021402', '021403', '021404', '021405', '021406', '021407', '021408', '021409', '021410', '021501', '021502', '021503', '021504', '021505', '021506', '021507', '021508', '021509', '021510', '021511', '021601', '021602', '021603', '021604', '021701', '021702', '021703', '021704', '021705', '021706', '021707', '021708', '021709', '021710', '021801', '021802', '021803', '021804', '021805', '021806', '021807', '021808', '021809', '021901', '021902', '021903', '021904', '021905', '021906', '021907', '021908', '021909', '021910', '022001', '022002', '022003', '022004', '022005', '022006', '022007', '022008', '030101', '030102', '030103', '030104', '030105', '030106', '030107', '030108', '030109', '030201', '030202', '030203', '030204', '030205', '030206', '030207', '030208', '030209', '030210', '030211', '030212', '030213', '030214', '030215', '030216', '030217', '030218', '030219', '030220', '030301', '030302', '030303', '030304', '030305', '030306', '030307', '030401', '030402', '030403', '030404', '030405', '030406', '030407', '030408', '030409', '030410', '030411', '030412', '030413', '030414', '030415', '030416', '030417', '030501', '030502', '030503', '030504', '030505', '030506', '030601', '030602', '030603', '030604', '030605', '030606', '030607', '030608', '030609', '030610', '030611', '030612', '030701', '030702', '030703', '030704', '030705', '030706', '030707', '030708', '030709', '030710', '030711', '030712', '030713', '030714', '040101', '040102', '040103', '040104', '040105', '040106', '040107', '040108', '040109', '040110', '040111', '040112', '040113', '040114', '040115', '040116', '040117', '040118', '040119', '040120', '040121', '040122', '040123', '040124', '040125', '040126', '040127', '040128', '040129', '040201', '040202', '040203', '040204', '040205', '040206', '040207', '040208', '040301', '040302', '040303', '040304', '040305', '040306', '040307', '040308', '040309', '040310', '040311', '040312', '040313', '040401', '040402', '040403', '040404', '040405', '040406', '040407', '040408', '040409', '040410', '040411', '040412', '040413', '040414', '040501', '040502', '040503', '040504', '040505', '040506', '040507', '040508', '040509', '040510', '040511', '040512', '040513', '040514', '040515', '040516', '040517', '040518', '040519', '040520', '040601', '040602', '040603', '040604', '040605', '040606', '040607', '040608', '040701', '040702', '040703', '040704', '040705', '040706', '040801', '040802', '040803', '040804', '040805', '040806', '040807', '040808', '040809', '040810', '040811', '050101', '050102', '050103', '050104', '050105', '050106', '050107', '050108', '050109', '050110', '050111', '050112', '050113', '050114', '050115', '050116', '050201', '050202', '050203', '050204', '050205', '050206', '050301', '050302', '050303', '050304', '050401', '050402', '050403', '050404', '050405', '050406', '050407', '050408', '050409', '050410', '050411', '050412', '050413', '050501', '050502', '050503', '050504', '050505', '050506', '050507', '050508', '050509', '050510', '050511', '050512', '050513', '050514', '050515', '050601', '050602', '050603', '050604', '050605', '050606', '050607', '050608', '050609', '050610', '050611', '050612', '050613', '050614', '050615', '050616', '050617', '050618', '050619', '050620', '050621', '050701', '050702', '050703', '050704', '050705', '050706', '050707', '050708', '050801', '050802', '050803', '050804', '050805', '050806', '050807', '050808', '050809', '050810', '050901', '050902', '050903', '050904', '050905', '050906', '050907', '050908', '050909', '050910', '050911', '051001', '051002', '051003', '051004', '051005', '051006', '051007', '051008', '051009', '051010', '051011', '051012', '051101', '051102', '051103', '051104', '051105', '051106', '051107', '051108', '060101', '060102', '060103', '060104', '060105', '060106', '060107', '060108', '060109', '060110', '060111', '060112', '060201', '060202', '060203', '060204', '060301', '060302', '060303', '060304', '060305', '060306', '060307', '060308', '060309', '060310', '060311', '060312', '060401', '060402', '060403', '060404', '060405', '060406', '060407', '060408', '060409', '060410', '060411', '060412', '060413', '060414', '060415', '060416', '060417', '060418', '060419', '060501', '060502', '060503', '060504', '060505', '060506', '060507', '060508', '060601', '060602', '060603', '060604', '060605', '060606', '060607', '060608', '060609', '060610', '060611', '060612', '060613', '060614', '060615', '060701', '060702', '060703', '060801', '060802', '060803', '060804', '060805', '060806', '060807', '060808', '060809', '060810', '060811', '060812', '060901', '060902', '060903', '060904', '060905', '060906', '060907', '061001', '061002', '061003', '061004', '061005', '061006', '061007', '061101', '061102', '061103', '061104', '061105', '061106', '061107', '061108', '061109', '061110', '061111', '061112', '061113', '061201', '061202', '061203', '061204', '061301', '061302', '061303', '061304', '061305', '061306', '061307', '061308', '061309', '061310', '061311', '070101', '070102', '070103', '070104', '070105', '070106', '070107', '080101', '080102', '080103', '080104', '080105', '080106', '080107', '080108', '080201', '080202', '080203', '080204', '080205', '080206', '080207', '080301', '080302', '080303', '080304', '080305', '080306', '080307', '080308', '080309', '080401', '080402', '080403', '080404', '080405', '080406', '080407', '080408', '080501', '080502', '080503', '080504', '080505', '080506', '080507', '080508', '080601', '080602', '080603', '080604', '080605', '080606', '080607', '080608', '080701', '080702', '080703', '080704', '080705', '080706', '080707', '080708', '080801', '080802', '080803', '080804', '080805', '080806', '080807', '080808', '080901', '080902', '080903', '080904', '080905', '080906', '080907', '080908', '080909', '080910', '080911', '080912', '080913', '080914', '080915', '080916', '080917', '080918', '081001', '081002', '081003', '081004', '081005', '081006', '081007', '081008', '081009', '081101', '081102', '081103', '081104', '081105', '081106', '081201', '081202', '081203', '081204', '081205', '081206', '081207', '081208', '081209', '081210', '081211', '081212', '081301', '081302', '081303', '081304', '081305', '081306', '081307', '090101', '090102', '090103', '090104', '090105', '090106', '090107', '090108', '090109', '090110', '090111', '090112', '090113', '090114', '090115', '090116', '090117', '090118', '090119', '090201', '090202', '090203', '090204', '090205', '090206', '090207', '090208', '090301', '090302', '090303', '090304', '090305', '090306', '090307', '090308', '090309', '090310', '090311', '090312', '090401', '090402', '090403', '090404', '090405', '090406', '090407', '090408', '090409', '090410', '090411', '090412', '090413', '090501', '090502', '090503', '090504', '090505', '090506', '090507', '090508', '090509', '090510', '090511', '090601', '090602', '090603', '090604', '090605', '090606', '090607', '090608', '090609', '090610', '090611', '090612', '090613', '090614', '090615', '090616', '090701', '090702', '090703', '090704', '090705', '090706', '090707', '090709', '090710', '090711', '090713', '090714', '090715', '090716', '090717', '090718', '090719', '090720', '090721', '090722', '090723', '090724', '090725', '100101', '100102', '100103', '100104', '100105', '100106', '100107', '100108', '100109', '100110', '100111', '100112', '100113', '100201', '100202', '100203', '100204', '100205', '100206', '100207', '100208', '100301', '100307', '100311', '100313', '100316', '100317', '100321', '100322', '100323', '100401', '100402', '100403', '100404', '100501', '100502', '100503', '100504', '100505', '100506', '100507', '100508', '100509', '100510', '100511', '100601', '100602', '100603', '100604', '100605', '100606', '100607', '100608', '100609', '100610', '100701', '100702', '100703', '100704', '100705', '100801', '100802', '100803', '100804', '100901', '100902', '100903', '100904', '100905', '101001', '101002', '101003', '101004', '101005', '101006', '101007', '101101', '101102', '101103', '101104', '101105', '101106', '101107', '101108', '110101', '110102', '110103', '110104', '110105', '110106', '110107', '110108', '110109', '110110', '110111', '110112', '110113', '110114', '110201', '110202', '110203', '110204', '110205', '110206', '110207', '110208', '110209', '110210', '110211', '110301', '110302', '110303', '110304', '110305', '110401', '110402', '110403', '110404', '110405', '110501', '110502', '110503', '110504', '110505', '110506', '110507', '110508', '120101', '120104', '120105', '120106', '120107', '120108', '120111', '120112', '120113', '120114', '120116', '120117', '120119', '120120', '120121', '120122', '120124', '120125', '120126', '120127', '120128', '120129', '120130', '120132', '120133', '120134', '120135', '120136', '120201', '120202', '120203', '120204', '120205', '120206', '120207', '120208', '120209', '120210', '120211', '120212', '120213', '120214', '120215', '120301', '120302', '120303', '120304', '120305', '120306', '120401', '120402', '120403', '120404', '120405', '120406', '120407', '120408', '120409', '120410', '120411', '120412', '120413', '120414', '120415', '120416', '120417', '120418', '120419', '120420', '120421', '120422', '120423', '120424', '120425', '120426', '120427', '120428', '120429', '120430', '120431', '120432', '120433', '120434', '120501', '120502', '120503', '120504', '120601', '120602', '120603', '120604', '120605', '120606', '120607', '120608', '120609', '120701', '120702', '120703', '120704', '120705', '120706', '120707', '120708', '120709', '120801', '120802', '120803', '120804', '120805', '120806', '120807', '120808', '120809', '120810', '120901', '120902', '120903', '120904', '120905', '120906', '120907', '120908', '120909', '130101', '130102', '130103', '130104', '130105', '130106', '130107', '130108', '130109', '130110', '130111', '130112', '130201', '130202', '130203', '130204', '130205', '130206', '130207', '130208', '130301', '130302', '130303', '130304', '130305', '130306', '130401', '130402', '130403', '130501', '130502', '130503', '130504', '130601', '130602', '130604', '130605', '130606', '130608', '130610', '130611', '130613', '130614', '130701', '130702', '130703', '130704', '130705', '130801', '130802', '130803', '130804', '130805', '130806', '130807', '130808', '130809', '130810', '130811', '130812', '130813', '130901', '130902', '130903', '130904', '130905', '130906', '130907', '130908', '131001', '131002', '131003', '131004', '131005', '131006', '131007', '131008', '131101', '131102', '131103', '131104', '131201', '131202', '131203', '140101', '140102', '140103', '140104', '140105', '140106', '140107', '140108', '140109', '140110', '140111', '140112', '140113', '140114', '140115', '140116', '140117', '140118', '140119', '140120', '140201', '140202', '140203', '140204', '140205', '140206', '140301', '140302', '140303', '140304', '140305', '140306', '140307', '140308', '140309', '140310', '140311', '140312', '150101', '150102', '150103', '150104', '150105', '150106', '150107', '150108', '150109', '150110', '150111', '150112', '150113', '150114', '150115', '150116', '150117', '150118', '150119', '150120', '150121', '150122', '150123', '150124', '150125', '150126', '150127', '150128', '150129', '150130', '150131', '150132', '150133', '150134', '150135', '150136', '150137', '150138', '150139', '150140', '150141', '150142', '150143', '150201', '150202', '150203', '150204', '150205', '150301', '150302', '150303', '150304', '150305', '150401', '150402', '150403', '150404', '150405', '150406', '150407', '150501', '150502', '150503', '150504', '150505', '150506', '150507', '150508', '150509', '150510', '150511', '150512', '150513', '150514', '150515', '150516', '150601', '150602', '150603', '150604', '150605', '150606', '150607', '150608', '150609', '150610', '150611', '150612', '150701', '150702', '150703', '150704', '150705', '150706', '150707', '150708', '150709', '150710', '150711', '150712', '150713', '150714', '150715', '150716', '150717', '150718', '150719', '150720', '150721', '150722', '150723', '150724', '150725', '150726', '150727', '150728', '150729', '150730', '150731', '150732', '150801', '150802', '150803', '150804', '150805', '150806', '150807', '150808', '150809', '150810', '150811', '150812', '150901', '150902', '150903', '150904', '150905', '150906', '151001', '151002', '151003', '151004', '151005', '151006', '151007', '151008', '151009', '151010', '151011', '151012', '151013', '151014', '151015', '151016', '151017', '151018', '151019', '151020', '151021', '151022', '151023', '151024', '151025', '151026', '151027', '151028', '151029', '151030', '151031', '151032', '151033', '160101', '160102', '160103', '160104', '160105', '160106', '160107', '160108', '160110', '160112', '160113', '160201', '160202', '160205', '160206', '160210', '160211', '160301', '160302', '160303', '160304', '160305', '160401', '160402', '160403', '160404', '160501', '160502', '160503', '160504', '160505', '160506', '160507', '160508', '160509', '160510', '160511', '160601', '160602', '160603', '160604', '160605', '160606', '160701', '160702', '160703', '160704', '160705', '160706', '160801', '160802', '160803', '160804', '170101', '170102', '170103', '170104', '170201', '170202', '170203', '170204', '170301', '170302', '170303', '180101', '180102', '180103', '180104', '180105', '180106', '180107', '180201', '180202', '180203', '180204', '180205', '180206', '180207', '180208', '180209', '180210', '180211', '180301', '180302', '180303', '190101', '190102', '190103', '190104', '190105', '190106', '190107', '190108', '190109', '190110', '190111', '190112', '190113', '190201', '190202', '190203', '190204', '190205', '190206', '190207', '190208', '190301', '190302', '190303', '190304', '190305', '190306', '190307', '190308', '200101', '200104', '200105', '200107', '200108', '200109', '200110', '200111', '200114', '200115', '200201', '200202', '200203', '200204', '200205', '200206', '200207', '200208', '200209', '200210', '200301', '200302', '200303', '200304', '200305', '200306', '200307', '200308', '200401', '200402', '200403', '200404', '200405', '200406', '200407', '200408', '200409', '200410', '200501', '200502', '200503', '200504', '200505', '200506', '200507', '200601', '200602', '200603', '200604', '200605', '200606', '200607', '200608', '200701', '200702', '200703', '200704', '200705', '200706', '200801', '200802', '200803', '200804', '200805', '200806', '210101', '210102', '210103', '210104', '210105', '210106', '210107', '210108', '210109', '210110', '210111', '210112', '210113', '210114', '210115', '210201', '210202', '210203', '210204', '210205', '210206', '210207', '210208', '210209', '210210', '210211', '210212', '210213', '210214', '210215', '210301', '210302', '210303', '210304', '210305', '210306', '210307', '210308', '210309', '210310', '210401', '210402', '210403', '210404', '210405', '210406', '210407', '210501', '210502', '210503', '210504', '210505', '210601', '210602', '210603', '210604', '210605', '210606', '210607', '210608', '210701', '210702', '210703', '210704', '210705', '210706', '210707', '210708', '210709', '210710', '210801', '210802', '210803', '210804', '210805', '210806', '210807', '210808', '210809', '210901', '210902', '210903', '210904', '211001', '211002', '211003', '211004', '211005', '211101', '211102', '211103', '211104', '211105', '211201', '211202', '211203', '211204', '211205', '211206', '211207', '211208', '211209', '211210', '211301', '211302', '211303', '211304', '211305', '211306', '211307', '220101', '220102', '220103', '220104', '220105', '220106', '220201', '220202', '220203', '220204', '220205', '220206', '220301', '220302', '220303', '220304', '220305', '220401', '220402', '220403', '220404', '220405', '220406', '220501', '220502', '220503', '220504', '220505', '220506', '220507', '220508', '220509', '220510', '220511', '220601', '220602', '220603', '220604', '220605', '220701', '220702', '220703', '220704', '220705', '220706', '220707', '220708', '220709', '220710', '220801', '220802', '220803', '220804', '220805', '220806', '220807', '220808', '220809', '220901', '220902', '220903', '220904', '220905', '220906', '220907', '220908', '220909', '220910', '220911', '220912', '220913', '220914', '221001', '221002', '221003', '221004', '221005', '221006', '230101', '230102', '230103', '230104', '230105', '230106', '230107', '230108', '230109', '230110', '230111', '230201', '230202', '230203', '230204', '230205', '230206', '230301', '230302', '230303', '230401', '230402', '230403', '230404', '230405', '230406', '230407', '230408', '240101', '240102', '240103', '240104', '240105', '240106', '240201', '240202', '240203', '240301', '240302', '240303', '240304', '250101', '250102', '250103', '250104', '250105', '250106', '250107', '250201', '250202', '250203', '250204', '250301', '250302', '250303', '250304', '250305', '250306', '250307', '250401']
        fechaHora= datetime.now()
        formato = fechaHora.strftime("%Y-%m-%d %H:%M:%S")
        print('Ejecutando MEF(Distritos) | ', formato)
        limpiarArchivos('dist')
        try:
            tiempoInicial = time.time()
            with ThreadPoolExecutor(max_workers=4) as executor:
                [executor.submit(Dists.procesarJson, ubigeo, enQueGasta, actividadProyectos) for ubigeo in distritos]
            
            tiempoFinal = time.time()
            totalTiempo = (tiempoFinal - tiempoInicial) / 60
            print(f'Tiempo total de ejecución: {totalTiempo:.2f} minutos')

        except Exception as e:
            logError(f'Error general: {e}')

class MEF():
    def obtenerFechaHoy(ubigeo):
        pliego= obtenerUbigeo(ubigeo)
        url = (f'{URL_MEF}?_uhc=yes&0=&1=R&2=99&3={pliego}&8=&y={anio}&ap=&cpage=1&psize=400')
        r = requests.get(url)
        soup = BeautifulSoup(r.text, 'lxml')
        fechaHtml = soup.find('span', {'id': 'ctl00_CPH1_LblLastUpdate'})
        fechaRegistro = fechaHtml.text.strip("\r\n").strip()
        fecha = fechaRegistro.rstrip('.')
        return fecha
    
    def obtenerFechaHoy():
        hoy = datetime.now()
        ayer = hoy - timedelta(days=1)
        fechaAyerFormateada = ayer.strftime("%d de %B del %Y")
        return fechaAyerFormateada
    
    def obtenerDatosJson(ubigeo, op):
        if len(ubigeo) == 2:
            pliego= obtenerUbigeo(ubigeo)
            archivoJson = Path(f"./static/json/dpto/{pliego}.json")
        elif len(ubigeo) == 4:            
            archivoJson = Path(f"./static/json/prov/{ubigeo}.json")
        elif len(ubigeo) == 6:            
            archivoJson = Path(f"./static/json/dist/{ubigeo}.json")
            
        if archivoJson.is_file():
            with archivoJson.open("r") as archivo:
                datos = json.load(archivo)

            datosFiltrados = [e for e in datos if e["op"] == op]
            for f in datosFiltrados:
                f.pop("op", None) 
            
            return datosFiltrados
        else:
            return None

class DatosMaestros():
    def getUbigeos():
        r=db.engine.execute('select * from get_distritos_fronterizos_')
        return ListDistritosSchema(many=True).dump(r)
    
    def getUbigeos_pb():
        r=db.engine.execute('select * from get_distritos_pb_')
        return ListDistritosSchema(many=True).dump(r)    
    
    def getFunciones():
        return db.engine.execute('select distinct idfuncion as id,nombre as name from mef_funcionxanio where anioeje>=2016;')
    
    def getSectores():
        return db.engine.execute("select distinct idsector as id, CASE idsector when '00' then 'GOBIERNOS LOCALES'  else nombre end as name from mef_sectorxanio where anioeje>=2016;")
    
    def getCategorias():
       #return db.engine.execute("select distinct idprograma_ppto as id,nombre as name from mef_programapptoxanio where anioeje>=2016;")
       return db.engine.execute("SELECT distinct codigo as id, descri as name FROM mef.consulta_ejecucion_gasto where tipo_gasto= 'c' order by 1;")

    def GetDataCrudo(ubigeo,op):
        return db.engine.execute("""select ano_eje as a,code as c,dev as d,pim as p,gir as i,tip_act_proy as t,tipo_gobierno as g from get_mef_ip_his('{0}','{1}')
                        UNION select ano_eje as a,code as c,sum(dev) as d,sum(pim) as p,sum(gir) as i,'1'as t,tipo_gobierno as g from get_mef_ip_his('{0}','{1}')
                        group by tipo_gobierno,code,ano_eje""".format(ubigeo,op))
    
    def getDataCrudo2(ubigeo, op):
        return db.engine.execute("""select ano_eje as a,code as c,dev as d,pim as p,gir as i,tip_act_proy as t,tipo_gobierno as g 
                from mef.get_consulta_ejecucion_gasto('{0}', '{1}')""".format(ubigeo, op))

    def GetDataCrudoTodo(ubigeo,op):
        return db.engine.execute("""select ano_eje as a,code as c,dev as d,pim as p,gir as i,tip_act_proy as t,tipo_gobierno as g from get_mef_ip_his_todo('{0}','{1}')
                        UNION select ano_eje as a,code as c,sum(dev) as d,sum(pim) as p,sum(gir) as i,'1'as t,tipo_gobierno as g from get_mef_ip_his_todo('{0}','{1}')
                        group by tipo_gobierno,code,ano_eje""".format(ubigeo,op))
    
    def GetDataCrudo_tipo(op,t):
        return db.engine.execute("""select ano_eje as a,code as c,dev as d,pim as p,gir as i,tip_act_proy as t,tipo_gobierno as g from get_mef_ip_his_tipo_per('{0}','{1}')
                        UNION select ano_eje as a,code as c,sum(dev) as d,sum(pim) as p,sum(gir) as i,'1'as t,tipo_gobierno as g from get_mef_ip_his_tipo_per('{0}','{1}')
                        group by tipo_gobierno,code,ano_eje""".format(op,t))
    
    def GetDataCrudo_tipo_total(op,ubigeo,anio_a,anio_d):
          return db.engine.execute("""select * from get_mef_ip_his_tipo_total('{0}','{1}','{2}','{3}')""".format(op,ubigeo,anio_a,anio_d))
    
    def GetDatSel(ubigeo,op):
         r=db.engine.execute("select * from get_mef_ip_act('{}','{}')".format(ubigeo,op))
         return DataCrudaSchema(many=True).dump(r)

    def GetUbigeo(ubigeo):
        r=db.engine.execute("""select (select distinct nom_dpto from peru_distritos where cod_dpto=substring('{0}',1,2)) as d,
        coalesce((select distinct nom_prov from peru_distritos where cod_prov=substring('{0}',1,4)),'-') as p,
        coalesce((select distinct nom_dist from peru_distritos where cod_dist=substring('{0}',1,6)),'-') as i""".format(ubigeo))
        return UbigeoSchema(many=True).dump(r)
 
    def GetUpdate():
        r= db.engine.execute("select 'Fuente: Ministerio de Economía y Finanzas, actualizado al '||TO_CHAR(fecha,'DD Month YYYY') as fecha_mef from mef_carga_ws where id='1343';")
        return FecMEFSchema(many=True).dump(r)
    
    def GetUpdate(ubigeo):
        #fechaActual = MEF.obtenerFechaHoy(ubigeo)
        fechaActual = MEF.obtenerFechaHoy()
        texto = {'fecha_mef': f'Fuente: Ministerio de Economía y Finanzas, actualizado al {fechaActual}'}
        return texto
    
class Funciones():
    anioActual = datetime.now().year
    mes = datetime.now().month
    if(mes > 2):
        anos = [str(año) for año in range(2016, anioActual + 1)]
    else:
        anioActual= anioActual -1
        anos = [str(año) for año in range(2016, anioActual + 1)]
    #anos=['2016','2017','2018','2019','2020','2021','2022','2023','2024']
    tip_act_proy=['3','2','1']
    tip_gob=['E','R','M']
    series=[]
    top=[]
    # Lista Data Top Historica
    d_top_hist=[]

    def GetDataFinalTodo(ubigeo,op):
        if op=='f':
            series=TipoSchema(many=True).dump(DatosMaestros.getFunciones()) 
        elif op=='s':
            series=TipoSchema(many=True).dump(DatosMaestros.getSectores()) 
        elif op=='c':
            series=TipoSchema(many=True).dump(DatosMaestros.getCategorias()) 

        #d= DataCrudaSchema(many=True).dump(DatosMaestros.GetDataCrudoTodo(ubigeo,op))   
        d= DataCrudaSchema(many=True).dump(DatosMaestros.getDataCrudo2(ubigeo,op))   
        # u=DatosMaestros.GetUbigeo(ubigeo)
        #x=MEF.obtenerDatosHoy(ubigeo, op)
        x=MEF.obtenerDatosJson(ubigeo, op)

        if x is not None: 
            d.extend(x) 

        inf={
            'series':series,
            'datas':d
        }
        return inf
    
    def GetDataFinal(ubigeo,op):
        if op=='f':
            series=TipoSchema(many=True).dump(DatosMaestros.getFunciones()) 
        elif op=='s':
            series=TipoSchema(many=True).dump(DatosMaestros.getSectores()) 
        elif op=='c':
            series=TipoSchema(many=True).dump(DatosMaestros.getCategorias()) 

        #d= DataCrudaSchema(many=True).dump(DatosMaestros.GetDataCrudo(ubigeo,op))
        d= DataCrudaSchema(many=True).dump(DatosMaestros.getDataCrudo2(ubigeo, op))
        
        #u=DatosMaestros.GetUbigeo(ubigeo)
        #x=MEF.obtenerDatosHoy(ubigeo, op)
        x=MEF.obtenerDatosJson(ubigeo, op)

        if x is not None: 
            d.extend(x)       

        inf={
            'series':series,
            'datas':d
        }        
        return inf
    
    def GetDataFinal_Total(op,ubigeo,anio_a,anio_d):
        d=DataTotal(many=True).dump(DatosMaestros.GetDataCrudo_tipo_total(op,ubigeo,anio_a,anio_d)) 

        return {'data':d}

    def GetDataFinal_tipo(op,t):
        if op=='f':
            series=TipoSchema(many=True).dump(DatosMaestros.getFunciones()) 
        elif op=='s':
            series=TipoSchema(many=True).dump(DatosMaestros.getSectores()) 
        elif op=='c':
            series=TipoSchema(many=True).dump(DatosMaestros.getCategorias()) 

        d= DataCrudaSchema(many=True).dump( DatosMaestros.GetDataCrudo_tipo(op,t))   
       # u=DatosMaestros.GetUbigeo(ubigeo)
        inf={
            'series':series,
            'datas':d
        }
        return inf

class Presidencia():
     def FinalMinisterio(anio,op,ubigeo):
        query='''select * from fn_reporte_presidencia_ministerio('{0}','{1}','{2}')'''.format(anio,op,ubigeo)

        r=db.session.execute(query)
        return r.fetchone()
     
     def FinalMinisterioHist(anio_i,anio_f,op,ubigeo):
        query='''select * from fn_reporte_presidencia_ministerio('{0}','{1}','{2}','{3}')'''.format(anio_i,anio_f,op,ubigeo)

        r=db.session.execute(query)
        return r.fetchone()
    
     def FinalTodo(anio,op,ubigeo):
        query='''select * from fn_reporte_presidencia('{0}','{1}','{2}')'''.format(anio,op,ubigeo)

        r=db.session.execute(query)
        return r.fetchone()
     
     def FinalHistorico(anio_a,anio_f,op,ubigeo):
        query='''select * from fn_reporte_presidencia('{0}','{1}','{2}','{3}')'''.format(anio_a,anio_f,op,ubigeo)

        r=db.session.execute(query)
        return r.fetchone()
     
     def FinalCenso(ubigeo):
        query='''select * from fn_reporte_presidencia_censo('{0}')'''.format(ubigeo)

        r=db.session.execute(query)
        return r.fetchone()
     
     def FinalIndeci(anio,op,ubigeo):
        query='''select * from fn_reporte_presidencia_indeci('{0}','{1}','{2}')'''.format(anio,op,ubigeo)

        r=db.session.execute(query)
        return r.fetchone()
    
     def GetUbigeo(ubigeo):
        r=db.session.execute("""
        select jsonb_agg(x) from( select * from (select * from
        (select distinct nom_dpto as departamento from peru_distritos 
        where cod_dpto=substring('{0}',1,2)),
            coalesce((select distinct nom_prov from peru_distritos
        where cod_prov=substring('{0}',1,4)),'-') as provincia,
                coalesce((select distinct nom_dist from peru_distritos
                where cod_dist=substring('{0}',1,6)),'-') as distrito)ubigeo, (select 
            case 
                    when  length('{0}')=6
                    then 'Distrito de '||(select nom_dist  from peru_distritos where cod_dist='{0}')
                    
                    when  length('{0}')=4
                    then 'Provincia de '||(select nom_prov  from peru_provincias  where cod_prov='{0}')
                
                    when  length('{0}')=2
                    then 'Departamento de '||(select nom_dpto  from peru_departamentos where cod_dpto ='{0}')
                    end as title)title) x
        """.format(ubigeo))
        return r.fetchone()
     
class Descentralizacion():
    def FinalReporte(anio,ubigeo,sector,pliego,ejecutora,fuente,recurso):
        query='''select * from fn_sd_reporte('{0}','{1}','{2}','{3}','{4}','{5}','{6}')'''.format(anio,ubigeo,sector,pliego,ejecutora,fuente,recurso)

        r=db.session.execute(query)
        return r.fetchone()
     
    def FSector():
        query='''
                    select jsonb_agg(x) from (select idsector as option ,nombre as name from mef_sectorxanio  where anioeje =2023
                    and  idsector not in(
                    '33', '32' ,'31' ,'22', '21' ,'20', '19' ,'04','28','88','99','98','00','97','24','27')  and estado ='A'
                    order by idsector asc)x
                    '''
        r=db.session.execute(query)
        return r.fetchone()
    
    def FFuente():
        query='''
                select jsonb_agg(x) from (select idfuente  as option ,nombre as name from mef_fuentexanio  where anioeje =2022
                and idfuente not in('A','B','C')
                order by idfuente asc)x
                    '''
        r=db.session.execute(query)
        return r.fetchone()
    
    def FRubro():
        query='''
                select jsonb_agg(x) from 
                (select idrubro as option, nombre  as name from mef_rubroxanio 
                where anioeje =2023 and estado ='A' and idrubro in ('00','04','07','08','09','13','15','18','19')
                order by idrubro  asc)x
                    '''
        r=db.session.execute(query)
        return r.fetchone()
    
    def FFuncion():
        query='''
            select jsonb_agg(x) from 
            (select idfuncion as option, nombre  as name from mef_funcionxanio 
            where anioeje =2023 and estado ='A' and idfuncion  not in ('00')
            order by idfuncion  asc)x
            '''
        r=db.session.execute(query)
        return r.fetchone()

    def FPliego(sector):
        query='''
            select jsonb_agg(x) from 
            (select idpliego as option, nombre  as name from mef_pliegoxanio  
            where anioeje =2023 and estado ='A' and idsector  ='{0}'
            order by idpliego  asc)x
            '''.format(sector)
        r=db.session.execute(query)
        return r.fetchone()
        
    def FEjecutora(sector,pliego):
        query='''
            select jsonb_agg(x) from 
            (select secejec as option, nombre  as name from mef_ejecutoraxanio 
            where anioeje =2023 and estado ='A' and idsector  ='{0}' and idpliego ='{1}'
            order by secejec  asc)x
            '''.format(sector,pliego)
        r=db.session.execute(query)
    
    def FIDT_servicio(ubigeo,is_finan,is_tipo,ambito):
        query='''
            select jsonb_agg(b) from (
            select array_agg(ct) as values,
            array_agg(name)categories  from
            (select  count(*) as ct,
            "SERVICIO PRIORIZADO"  as name
            from vw_sd_fidt_completo 
            where 
            (substring("UBIGEO",1,2)= substring('{0}',1,2) OR substring('{0}',1,2) = '' 
                OR substring('{0}',1,2) IS NULL) 
            AND (substring("UBIGEO",3,2) = substring('{0}',3,2) OR substring('{0}',3,2) = '' 
            OR substring('{0}',3,2) IS NULL) 
            AND (substring("UBIGEO",5,2) = substring('{0}',5,2) OR substring('{0}',5,2) = '' 
            OR substring('{0}',5,2) IS NULL) 
            {1}
            {2}
            {3}
            group by "SERVICIO PRIORIZADO"))b
            '''.format(ubigeo,is_finan,is_tipo,ambito)        
       
        r=db.session.execute(query)
        return r.fetchone()

    def FIDT_objeto(ubigeo,is_finan,is_tipo,ambito):
        query='''
                select jsonb_agg(b) from (
                select array_agg(ct) as values,array_agg(monto) as montos,
                array_agg(name)categories  from
                (select  count(*) as ct,sum("MONTO INVERSIÓN")monto	,
                "OBJETO FINANCIAMIENTO"  as name
                from vw_sd_fidt_completo 
                                where 
                (substring("UBIGEO",1,2)= substring('{0}',1,2) OR substring('{0}',1,2) = '' 
                    OR substring('{0}',1,2) IS NULL) 
                AND (substring("UBIGEO",3,2) = substring('{0}',3,2) OR substring('{0}',3,2) = '' 
                OR substring('{0}',3,2) IS NULL) 
                AND (substring("UBIGEO",5,2) = substring('{0}',5,2) OR substring('{0}',5,2) = '' 
                OR substring('{0}',5,2) IS NULL) 
                {1}
                    {2}
                    {3}
                group by "OBJETO FINANCIAMIENTO"))b

                '''.format(ubigeo,is_finan,is_tipo,ambito)
        r=db.session.execute(query)
        return r.fetchone()

    def FIDT_tipo(ubigeo,is_finan,is_tipo,ambito):
        query='''
            select jsonb_agg(b) from (
            select array_agg(ct) as values,
            array_agg(name)categories  from
            (select  count(*) as ct,
            "TIPO FINANCIAMIENTO"  as name
            from vw_sd_fidt_completo 
                            where 
            (substring("UBIGEO",1,2)= substring('{0}',1,2) OR substring('{0}',1,2) = '' 
                OR substring('{0}',1,2) IS NULL) 
            AND (substring("UBIGEO",3,2) = substring('{0}',3,2) OR substring('{0}',3,2) = '' 
            OR substring('{0}',3,2) IS NULL) 
            AND (substring("UBIGEO",5,2) = substring('{0}',5,2) OR substring('{0}',5,2) = '' 
            OR substring('{0}',5,2) IS NULL) 
            {1}
            {2}
            {3}
            group by "TIPO FINANCIAMIENTO"))b
            '''.format(ubigeo,is_finan,is_tipo,ambito)
        r=db.session.execute(query)
        return r.fetchone()

    def FIDT_propuesta(ubigeo,is_finan,is_tipo,ambito):
        query='''
            select jsonb_agg(b) from (
            select array_agg(ct) as values,
            array_agg(name)categories  from
            (select  count(*) as ct,
            "TIPO PROPUESTA"  as name
            from vw_sd_fidt_completo 
                            where 
            (substring("UBIGEO",1,2)= substring('{0}',1,2) OR substring('{0}',1,2) = '' 
                OR substring('{0}',1,2) IS NULL) 
            AND (substring("UBIGEO",3,2) = substring('{0}',3,2) OR substring('{0}',3,2) = '' 
            OR substring('{0}',3,2) IS NULL) 
            AND (substring("UBIGEO",5,2) = substring('{0}',5,2) OR substring('{0}',5,2) = '' 
            OR substring('{0}',5,2) IS NULL) 
            {1}
            {2}
            {3}
            group by "TIPO PROPUESTA"))b
            '''.format(ubigeo,is_finan,is_tipo,ambito)
        r=db.session.execute(query)
        return r.fetchone()

    def FIDT_montos(ubigeo,is_finan,is_tipo,ambito):
        query='''
            select jsonb_agg(x) from 
            (select sum("MONTO ACTUALIZADO")m_a,
            sum("MONTO A FINANCIAR")m_a_f ,sum("MONTO POR FINANCIAR")m_p_f
            from vw_sd_fidt_completo
                            where 
                (substring("UBIGEO",1,2)= substring('{0}',1,2) OR substring('{0}',1,2) = '' 
                    OR substring('{0}',1,2) IS NULL) 
                AND (substring("UBIGEO",3,2) = substring('{0}',3,2) OR substring('{0}',3,2) = '' 
                OR substring('{0}',3,2) IS NULL) 
                AND (substring("UBIGEO",5,2) = substring('{0}',5,2) OR substring('{0}',5,2) = '' 
                OR substring('{0}',5,2) IS NULL) 
                {1}
                {2}
                {3}
            )x    
            '''.format(ubigeo,is_finan,is_tipo,ambito)

        r=db.session.execute(query)
        return r.fetchone()

    def FIDT_descargar(ubigeo,is_finan,is_tipo,ambito):
        query='''
            select * from vw_sd_fidt_completo
              where 
                    (substring("UBIGEO",1,2)= substring('{0}',1,2) OR substring('{0}',1,2) = '' 
					 OR substring('{0}',1,2) IS NULL) 
					AND (substring("UBIGEO",3,2) = substring('{0}',3,2) OR substring('{0}',3,2) = '' 
					OR substring('{0}',3,2) IS NULL) 
					AND (substring("UBIGEO",5,2) = substring('{0}',5,2) OR substring('{0}',5,2) = '' 
					OR substring('{0}',5,2) IS NULL) 
                    {1}
                    {2}
                    {3}
        '''.format(ubigeo,is_finan,is_tipo,ambito)

        r=db.session.execute(query)
        return r.fetchall()

    def PRESIDENCIA_descargar(ubigeo,tipo,anio):
        if tipo=='pr-e':
            query='''
                    (select act_proy as "CODIGO PROYECTO" ,
                    case tipo_gobierno when 'E' then 'Gobierno Nacional' when 'M' then 'Gobierno Local' when 'R' then 'Gobierno Regional' end "TIPO GOBIERNO",
                    b.nombre as "NOMBRE PROYECTO" , sum(monto_pim)"PIM",
                    sum(monto_devengado)"DEVENGADO",sum(monto_girado)"GIRADO" from mef_itemgastospip2   a
                    left join mef_proyectoxanio b on a.act_proy =b.idproyecto and b.anioeje =2023
                    where (departamento =substring('{0}',1,2) OR substring('{0}',1,2) = '' OR substring('{0}',1,2) IS NULL) 
                    AND (provincia = substring('{0}',3,2) 
                    OR substring('{0}',3,2) = '' 
                    OR substring('{0}',3,2) IS NULL) 
                    AND (distrito = substring('{0}',5,2) 
                    OR substring('{0}',5,2) = '' OR substring('{0}',5,2) IS NULL)  and ano_eje ='{1}'::int and tip_act_proy =2
                    and monto_pim >0
                    group by act_proy ,b.nombre ,tipo_gobierno 
                    order by tipo_gobierno
                    )'''.format(ubigeo,anio)
        elif tipo=='pr-p':
            query='''
                (select act_proy  as "CODIGO PROYECTO", case tipo_gobierno when 'E' then 'Gobierno Nacional' when 'M' then 'Gobierno Local' when 'R' then 'Gobierno Regional' end "TIPO GOBIERNO",
                c.nombre as "NOMBRE PROYECTO",sum(monto_pim)"PIM",
                sum(monto_devengado)"DEVENGADO",sum(monto_girado)"GIRADO"  from
                mef_itemgastospip2 a 
                inner join vw_pip_paralizados b on a.act_proy =b.codigounico  and a.tipo_gobierno =b.tipo_gobierno_geoperu 
                left join mef_proyectoxanio c on a.act_proy =c.idproyecto and c.anioeje =2022 
                where (departamento =substring('{0}',1,2) OR substring('{0}',1,2) = '' OR substring('{0}',1,2) IS NULL) 
                AND (provincia = substring('{0}',3,2) 
                OR substring('{0}',3,2) = '' 
                OR substring('{0}',3,2) IS NULL) 
                AND (distrito = substring('{0}',5,2) 
                OR substring('{0}',5,2) = '' OR substring('{0}',5,2) IS NULL)  and ano_eje ='{1}'::int and tip_act_proy =2
                and monto_pim >0
                group by act_proy ,c.nombre,tipo_gobierno 
                order by tipo_gobierno
                )'''.format(ubigeo,anio)

        elif tipo=='pr-i':
            query='''
                    (select act_proy as "CODIGO PROYECTO" ,
                    case tipo_gobierno when 'E' then 'Gobierno Nacional' when 'M' then 'Gobierno Local' when 'R' then 'Gobierno Regional' end "TIPO GOBIERNO",
                    c.nombre as "NOMBRE PROYECTO",sum(monto_pim)"PIM",
                    sum(monto_devengado)"DEVENGADO",sum(monto_girado)"GIRADO"  from
                    mef_itemgastospip2 a 
                    inner join vw_pip_ioarr b on a.act_proy =b.codigounico  and a.tipo_gobierno =b.tipo_gobierno_geoperu
                    left join mef_proyectoxanio c on a.act_proy =c.idproyecto and c.anioeje =2022 
                    where (departamento =substring('{0}',1,2) OR substring('{0}',1,2) = '' OR substring('{0}',1,2) IS NULL) 
                    AND (provincia = substring('{0}',3,2) 
                    OR substring('{0}',3,2) = '' 
                    OR substring('{0}',3,2) IS NULL) 
                    AND (distrito = substring('{0}',5,2) 
                    OR substring('{0}',5,2) = '' OR substring('{0}',5,2) IS NULL)  and ano_eje ='{1}'::int and tip_act_proy =2
                    and monto_pim >0
                    group by act_proy ,c.nombre,tipo_gobierno 
                    order by tipo_gobierno
                    )'''.format(ubigeo,anio)
        elif tipo=='pr-r':
            query='''(select act_proy as "CODIGO PROYECTO" ,
                    case tipo_gobierno when 'E' then 'Gobierno Nacional' when 'M' then 'Gobierno Local' when 'R' 
                    then 'Gobierno Regional' end "TIPO GOBIERNO",
                    c.nombre as "NOMBRE PROYECTO",sum(monto_pim)"PIM",
                    sum(monto_devengado)"DEVENGADO",sum(monto_girado)"GIRADO"  from
                    mef_itemgastospip2 a 
        
                    left join mef_proyectoxanio c on a.act_proy =c.idproyecto and c.anioeje ={1}
                    where (departamento =substring('{0}',1,2) OR substring('{0}',1,2) = '' OR substring('{0}',1,2) IS NULL) 
                    AND (provincia = substring('{0}',3,2) 
                    OR substring('{0}',3,2) = '' 
                    OR substring('{0}',3,2) IS NULL) 
                    AND (distrito = substring('{0}',5,2) 
                    OR substring('{0}',5,2) = '' OR substring('{0}',5,2) IS NULL)  and ano_eje ={1}::int and tip_act_proy =2
                    and sector='01' and pliego='001' and sec_ejec='1677'
                    and monto_pim >0
                    group by act_proy ,c.nombre,tipo_gobierno 
                    order by tipo_gobierno
                    )'''.format(ubigeo,anio)
        r=db.session.execute(query)
        return r.fetchall()

    def FIDT_mapa_total(ubigeo):
        query='''
        select coalesce(jsonb_agg(x),'[]')  from (select "DEPARTAMENTO" as de ,"PROVINCIA" as prov , count(*)ct  from sd_fidt_aprobado sfa 
          where substring("UBIGEO",1,2) ='{0}'
            group by "DEPARTAMENTO" ,"PROVINCIA")x
        '''.format(ubigeo)
        r=db.session.execute(query)
        return r.fetchone()

    def FIDT_mapa_c_finan(ubigeo):
        query='''
            select coalesce(jsonb_agg(x),'[]')  from (select "MONTO INVERSIÓN"::numeric::money  ,
            "PROVINCIA" ,"NOMBRE DE LA PROPUESTA"   from sd_fidt_aprobado sfa 
            where substring("UBIGEO",1,2) ='{0}' and "FINANCIAMIENTO" ='SI')x
        '''.format(ubigeo)
        r=db.session.execute(query)
        return r.fetchone()
    
    def FIDT_mapa_s_finan(ubigeo):
        query='''
         select coalesce(jsonb_agg(x),'[]') from (select "MONTO INVERSIÓN" ::numeric::money ,
            "PROVINCIA" ,"NOMBRE DE LA PROPUESTA"   from sd_fidt_aprobado sfa 
            where substring("UBIGEO",1,2) ='{0}' and "FINANCIAMIENTO" ='NO')x
        '''.format(ubigeo)
        r=db.session.execute(query)
        return r.fetchone()
    
class BI_PR():
    def p1(dep,pro,dis,niv,eje,tip_pry):
        query='''select * from fn_dashboard_pr1('{0}','{1}','{2}','{3}','{4}','{5}')'''.format(dep,pro,dis,niv,eje,tip_pry)
        r=db.session.execute(query)
        return r.fetchone()
    
    def p2(dep,pro,dis,niv,eje,tip_pry,cat_pre):
        query='''select * from fn_dashboard_pr2('{0}','{1}','{2}','{3}','{4}','{5}','{6}')'''.format(dep,pro,dis,niv,eje,tip_pry,cat_pre)
        r=db.session.execute(query)
        return r.fetchone()
    
    def p3(dep,pro,dis,niv,eje,tip_pry):
        query='''select * from fn_dashboard_pr3('{0}','{1}','{2}','{3}','{4}','{5}')'''.format(dep,pro,dis,niv,eje,tip_pry)
        r=db.session.execute(query)
        return r.fetchone()
    
    def p4(dep,pro,dis,niv,eje,tip_pry):
        query='''select * from fn_dashboard_pr4('{0}','{1}','{2}','{3}','{4}','{5}')'''.format(dep,pro,dis,niv,eje,tip_pry)
        r=db.session.execute(query)
        return r.fetchone()
    
    def local(dep,pro,dis):
        query='''select * from fn_dashboard_local('{0}','{1}','{2}')'''.format(dep,pro,dis)
        r=db.session.execute(query)
        return r.fetchone()