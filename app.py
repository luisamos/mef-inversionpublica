from flask import Flask, request,render_template
from flask import jsonify,make_response
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
from sqlalchemy.engine import URL
import config
from flask.json import JSONEncoder
from models import *
from schema import *
import pandas as pd
from apscheduler.schedulers.background import BackgroundScheduler
import io

BASE_URL= config.BASE_URL

# Ejecución diaria
scheduler = BackgroundScheduler()
scheduler.add_job(Dptos.iniciar, 'cron', hour=5, minute=0)  # 5:00 am
scheduler.add_job(Provs.iniciar, 'cron', hour=5, minute=30) # 5:30 am
scheduler.add_job(Dists.iniciar, 'cron', hour=6, minute=0)  # 6:00 am

#scheduler.add_job(Dptos.iniciar, 'cron', hour=10, minute=6)  # 5:00 am
#scheduler.add_job(Provs.iniciar, 'cron', hour=10, minute=15) # 5:30 am
#scheduler.add_job(Dists.iniciar, 'cron', hour=10, minute=30) # 6:00 am
scheduler.start()

class MiniJSONEncoder(JSONEncoder):
    """Minify JSON output."""
    item_separator = ','
    key_separator = ':'

app = Flask(__name__, template_folder='templates', static_folder='static')
#app.json_encoder = MiniJSONEncoder
app.json_provider_class = MiniJSONEncoder
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = False

# Leer configuracion
app.config.from_object(config)

db.init_app(app)
ma.init_app(app)

#-------------------------- GENERAL ---------------------------------#
@app.route('/')
def inicio():
    return ''

@app.route('/iniciar')
def iniciarServicio():
    if not scheduler.running:
        scheduler.start()
        return "Servicio iniciado."
    return "El servicio ya está corriendo."

@app.route('/detener')
def detenerServicio(exception=None):
    if scheduler.running:
        scheduler.shutdown(wait=False)
        return "Servicio detenido."
    return "El servicio ya está detenido."

@app.route('/data/<op>/<ubigeo>', methods=['GET'])
def datade(ubigeo,op):
    r= Funciones.GetDataFinal(ubigeo,op)    
    return jsonify(r)

@app.route('/actual/<op>/<ubigeo>', methods=['GET', 'POST'])
def actual(ubigeo,op):
    r= DatosMaestros.GetDatSel(ubigeo,op)
    return jsonify(r)

@app.route('/data/hist/<ubigeo>', methods=['GET', 'POST'])
def hist(ubigeo):
    r= Funciones.GetDataFinal(ubigeo,'f')
    return jsonify(r)

@app.route('/<ubigeo>')
def home(ubigeo):
    #r= Funciones.GetDataFinal(ubigeo,'f')
    ub=DatosMaestros.GetUbigeo(ubigeo)
    update=DatosMaestros.GetUpdate(ubigeo)
    return render_template('general/layout.html',ubigeo=ubigeo,mef=update,u=ub,base=BASE_URL)

#-------------------------- END GENERAL ---------------------------------#

#-------------------------- FILTER --------------------------------------#
#@app.route('/filter/data/fronterizo', methods=['GET'])
def filter_ubigeos():
    r= DatosMaestros.getUbigeos()
    return  jsonify(r)

#@app.route('/filter/data/pb', methods=['GET'])
def filter_ubigeos_pb():
    r= DatosMaestros.getUbigeos_pb()
    return  jsonify(r)

#@app.route('/filter/data/<op>/<ubigeo>' ,methods=['GET'])
def filter_datade(ubigeo,op):
    r= Funciones.GetDataFinal(ubigeo,op)
    return  jsonify(r)

#@app.route("/filter/data/fronterizo/<op>/<ubigeo>", methods=['GET', 'POST'])
def filter_actual(ubigeo,op):
    r= Funciones.GetDataFinalTodo(ubigeo,op)
    return  jsonify(r)

# @app.route("/filter/data/hist/fronterizo/<op>", methods=['GET', 'POST'])
# def filter_hist():
#     r= Funciones.GetDataFinal_tipo('f','')
#     return jsonify(r)

#@app.route("/filter/data/hist/fronterizo/<op>/<t>",methods=['GET','POST'])
def filter_datade_front(op,t):
    r= Funciones.GetDataFinal_tipo(op,t)
    return  jsonify(r)

#@app.route("/filter/data/hist/fronterizo/total",methods=['GET','POST'])
def filter_datade_front_total():
    op = request.args.get("op") or None
    ubigeo = request.args.get("ubigeo") or None
    anio_a = request.args.get("anio_a") or None
    anio_d = request.args.get("anio_d") or None
    r= Funciones.GetDataFinal_Total(op,ubigeo,anio_a,anio_d)
    return  jsonify(r)

#@app.route("/region-fronterizo/")
def filter_home():
    #r= Funciones.GetDataFinal(ubigeo,'f')
    #ub=DatosMaestros.GetUbigeo()
    update=DatosMaestros.GetUpdate()
    return render_template('filter/layout.html',mef=update,base=BASE_URL)

#@app.route("/historico/")
def filter_home_pb():
    update=DatosMaestros.GetUpdate()
    return render_template('filter/layout.html',mef=update,base=BASE_URL)

#@app.route("/publica/")
def filter_home_publica():
    #  r= Funciones.GetDataFinal(ubigeo,'f')
    #  ub=DatosMaestros.GetUbigeo()
    update=DatosMaestros.GetUpdate()
    return render_template('filter/layout-publica.html',mef=update,base=BASE_URL)
#-------------------------- END FILTER ----------------------------------#

#--------------------------  PRESIDENCIA ----------------------------------#
#@app.route("/presidencia/")
def presidencia_home():
 #  r= Funciones.GetDataFinal(ubigeo,'f')
#  ub=DatosMaestros.GetUbigeo()
    # update=DatosMaestros.GetUpdate()
    return render_template('presidencia/layout.html',base=BASE_URL)

#@app.route("/presidencia1/")
def presidencia_home1():
    #r= Funciones.GetDataFinal(ubigeo,'f')
    #ub=DatosMaestros.GetUbigeo()
    #update=DatosMaestros.GetUpdate()
    return render_template('presidencia/layout1.html',base=BASE_URL)

#@app.route("/presidencia/api/ministerio")
def presidencia_api_ministerio():
    ubigeo = str(request.args.get("ubigeo")) or None
    op = str(request.args.get("op")) or None
    anio = str(request.args.get("anio")) or None   
    return make_response(jsonify({'data':Presidencia.FinalMinisterio(anio,op,ubigeo)[0],'status':1}),200)

#@app.route("/presidencia/api/ministerio-hist")
def presidencia_api_ministerio_hist():
    ubigeo = str(request.args.get("ubigeo")) or None
    op = str(request.args.get("op")) or None
    anio_i = str(request.args.get("anio_i")) or None
    anio_f = str(request.args.get("anio_f")) or None
    return make_response(jsonify({'data':Presidencia.FinalMinisterioHist(anio_i,anio_f,op,ubigeo)[0],'status':1}),200)

#@app.route("/presidencia/api/all")
def presidencia_api_all():
    ubigeo = str(request.args.get("ubigeo")) or None
    op = str(request.args.get("op")) or None
    anio = str(request.args.get("anio")) or None   
    return make_response(jsonify({'data':Presidencia.FinalTodo(anio,op,ubigeo)[0],'status':1}),200)

#@app.route("/presidencia/api/all-hist")
def presidencia_api_all_historico():
    ubigeo = request.args.get("ubigeo") or None
    op = str(request.args.get("op")) or None
    anio_i = str(request.args.get("anio_i")) or None
    anio_f = str(request.args.get("anio_f")) or None
    return make_response(jsonify({'data':Presidencia.FinalHistorico(anio_i,anio_f,op,ubigeo)[0],'status':1}),200)

#@app.route("/presidencia/api/censo")
def presidencia_api_censo():
    ubigeo = request.args.get("ubigeo") or None
    return make_response(jsonify({'data':Presidencia.FinalCenso(ubigeo)[0],'status':1}),200)

#@app.route("/presidencia/api/indeci")
def presidencia_api_indeci():
    ubigeo = request.args.get("ubigeo") or None
    op = request.args.get("op") or None
    anio = request.args.get("anio") or None
    return make_response(jsonify({'data':Presidencia.FinalIndeci(anio,op,ubigeo)[0],'status':1}),200)

#@app.route("/presidencia/api/ubigeo")
def presidencia_ubigeo():
    ubigeo = request.args.get("ubigeo") or None
    return make_response(jsonify({'data':Presidencia.GetUbigeo(ubigeo)[0],'status':1}),200)
#-------------------------- END PRESIDENCIA ----------------------------------#

#-------------------------- REPORTE SD ----------------------------------#
#@app.route("/descentralizacion/")
def descentralizacion_home():
    #  r= Funciones.GetDataFinal(ubigeo,'f')
    #  ub=DatosMaestros.GetUbigeo()
    # update=DatosMaestros.GetUpdate()
    return render_template('reporte-sd/layout.html',base=BASE_URL)
#@app.route("/descentralizacion-fidt/")
def descentralizacion_fidt_home():
    #  r= Funciones.GetDataFinal(ubigeo,'f')
    #  ub=DatosMaestros.GetUbigeo()
    # update=DatosMaestros.GetUpdate()
    return render_template('reporte-sd/layout-fidt.html',base=BASE_URL)

#@app.route("/descentralizacion/api/general")
def descentralizacion_general():
    ubigeo = request.args.get("ubigeo") or ''
    anio = request.args.get("anio") or ''
    sector = request.args.get("sector") or ''
    pliego = request.args.get("pliego") or ''
    ejecutora = request.args.get("ejecutora") or ''
    fuente = request.args.get("fuente") or ''
    recurso = request.args.get("recurso") or ''

    return make_response(jsonify({'data':Descentralizacion.FinalReporte(anio,ubigeo,sector,pliego,ejecutora,fuente,recurso)[0],'status':1}),200)

#@app.route("/descentralizacion/api/ubigeo")
def descentralizacion_ubigeo():
    ubigeo = request.args.get("ubigeo") or None
    return make_response(jsonify({'data':Presidencia.GetUbigeo(ubigeo)[0],'status':1}),200)

#@app.route("/descentralizacion/api/filtro")
def descentralizacion_filtro():
    sector=Descentralizacion.FSector()[0]
    fuente=Descentralizacion.FFuente()[0]
    rubro=Descentralizacion.FRubro()[0]
    funcion=Descentralizacion.FFuncion()[0]

    data={
        'sector': sector,
        'fuente':fuente,
        'rubro':rubro,
        'funcion':funcion
    }
    return make_response(jsonify({'data':data,'status':1}),200)

#@app.route("/descentralizacion/api/filtro/pliego")
def descentralizacion_filtro_pliego():
    sector = request.args.get("sector") or None
    return make_response(jsonify({'data':Descentralizacion.FPliego(sector)[0],'status':1}),200)

#@app.route("/descentralizacion/api/filtro/ejecutora")
def descentralizacion_filtro_ejecutora():
    sector = request.args.get("sector") or None
    pliego = request.args.get("pliego") or None
    return make_response(jsonify({'data':Descentralizacion.FEjecutora(sector,pliego)[0],'status':1}),200)

#@app.route("/descentralizacion/api/filtro/fidt/general")
def descentralizacion_fidt_general():
    ubigeo = request.args.get("ubigeo") or ''
    is_finan = request.args.get("is_finan") or ''
    tipo = request.args.get("tipo") or ''
    ambito = request.args.get("ambito") or ''

    s_finan=''
    s_tipo=''
    s_ambito=''
 
    if(is_finan=='1'):
        s_finan='''and "TIPO FIDT" = 'CON FINANCIAMIENTO' '''
    elif(is_finan=='2'):
        s_finan=''' and"TIPO FIDT" = 'NO ALCANZO FINANCIAMIENTO' '''
    elif(is_finan=='3'):
        s_finan='''and "TIPO FIDT" = 'OBSERVADO' '''

    if(tipo=='1'):
        s_tipo='and "CODIGO UNICO" is null'
    elif(tipo=='2'):
        s_tipo='and "CODIGO UNICO" is not null'

    if(ambito=='1'):
        s_ambito='''and "ZONA FRONTERA" = 'SI' '''
    elif(ambito=='2'):
        s_ambito='''and "ZONA CONFLICTO" = 'SI' '''
    elif(ambito=='3'):
        s_ambito='''and "ZONA VRAEM" = 'SI' '''  
    
    servicio=Descentralizacion.FIDT_servicio(ubigeo,s_finan,s_tipo,s_ambito)[0]
    objeto=Descentralizacion.FIDT_objeto(ubigeo,s_finan,s_tipo,s_ambito)[0]
    tipo=Descentralizacion.FIDT_tipo(ubigeo,s_finan,s_tipo,s_ambito)[0]
    propuesta=Descentralizacion.FIDT_propuesta(ubigeo,s_finan,s_tipo,s_ambito)[0]
    montos=Descentralizacion.FIDT_montos(ubigeo,s_finan,s_tipo,s_ambito)[0]

    data={
        'servicio': servicio,
        'objeto':objeto,
        'tipo':tipo,
        'propuesta':propuesta,
        'montos':montos
    }

    return make_response(jsonify({'data':data,'status':1}),200)

#@app.route("/descentralizacion/api/filtro/fidt/descarga")
def descentralizacion_fidt_descarga():
    ubigeo = request.args.get("ubigeo") or ''
    is_finan = request.args.get("is_finan") or ''
    tipo = request.args.get("tipo") or ''  # Function is defined somewhere else
    ambito = request.args.get("ambito") or ''

    s_finan=''
    s_tipo=''
    s_ambito=''
    
    if(is_finan=='1'):
        s_finan='''and "TIPO FIDT" = 'CON FINANCIAMIENTO' '''
    elif(is_finan=='2'):
        s_finan='''and "TIPO FIDT" = 'NO ALCANZO FINANCIAMIENTO' '''
    elif(is_finan=='3'):
        s_finan='''and "TIPO FIDT" = 'OBSERVADO' '''

    if(tipo=='1'):
        s_tipo='and "CODIGO UNICO" is null'
    elif(tipo=='2'):
        s_tipo='and "CODIGO UNICO" is not null'

    if(ambito=='1'):
        s_ambito='''and "ZONA FRONTERA" = 'SI' '''
    elif(ambito=='2'):
        s_ambito='''and "ZONA CONFLICTO" = 'SI' '''
    elif(ambito=='3'):
        s_ambito='''and "ZONA VRAEM" = 'SI' '''
            
    data = Descentralizacion.FIDT_descargar(ubigeo,s_finan,s_tipo,s_ambito)
   
    # Convert result set to pandas data frame and add columns

    df = pd.DataFrame(data)
        
    # Creating output and writer (pandas excel writer)
    out = io.BytesIO()
    writer = pd.ExcelWriter(out, engine='xlsxwriter')
   
    # Export data frame to excel
    df.to_excel(excel_writer=writer, index=False, sheet_name='Sheet1')
 
    writer.close()
   
    # Flask create response 
    r = make_response(out.getvalue())
    
    # Defining correct excel headers
    r.headers["Content-Disposition"] = "attachment; filename="+"fidt"+ubigeo+".xlsx"
    r.headers["Content-type"] = "application/x-xls"
    return r

#@app.route("/presidencia/api/descarga")
def presidencia_descarga():
    ubigeo = request.args.get("ubigeo") or ''
    tipo = request.args.get("tipo") or ''  # Function is defined somewhere else
    anio= request.args.get("anio") or ''

    s_finan=''
    s_tipo=''
    s_ambito=''
            
    data = Descentralizacion.PRESIDENCIA_descargar(ubigeo,tipo,anio)

    df = pd.DataFrame(data)
        
    out = io.BytesIO()
    writer = pd.ExcelWriter(out, engine='xlsxwriter')

    df.to_excel(excel_writer=writer, index=False, sheet_name='Sheet1')


    for column in df:
        column_width = max(df[column].astype(str).map(len).max(), len(column))
        col_idx = df.columns.get_loc(column)
        writer.sheets['Sheet1'].set_column(col_idx, col_idx, column_width)

    writer.close()
  
    r = make_response(out.getvalue())


    r.headers["Content-Disposition"] = "attachment; filename="+"Proyectos-"+ubigeo+".xlsx"
    r.headers["Content-type"] = "application/x-xls"


    return r

#@app.route("/descentralizacion/api/filtro/fidt/mapa")
def descentralizacion_fidt_mapa():

    ubigeo = request.args.get("ubigeo") or ''
    total=Descentralizacion.FIDT_mapa_total(ubigeo)[0]
    c_finan=Descentralizacion.FIDT_mapa_c_finan(ubigeo)[0]
    s_finan=Descentralizacion.FIDT_mapa_s_finan(ubigeo)[0]

    data={
        'total': total,
        'c_finan':c_finan,
        's_finan':s_finan
    }

    return make_response(jsonify({'data':data,'status':1}),200)
#-------------------------- END REPORTE SD ----------------------------------#


#-------------------------- modulo geo ----------------------------------#
#@app.route("/mod-geo/")
def geo_home():
 #  r= Funciones.GetDataFinal(ubigeo,'f')
#  ub=DatosMaestros.GetUbigeo()
    # update=DatosMaestros.GetUpdate()
    return render_template('modulo.geo/layout.html',base=BASE_URL)
#-------------------------- end modulo geo ------------------------------#

#-------------------------- Módulo dashboard BI----------------------------------#
#@app.route("/api-bi/p1")
def bi_1():
    dep = request.args.get("dep") or ''
    pro = request.args.get("pro") or ''
    dis = request.args.get("dis") or ''
    niv = request.args.get("niv") or ''
    eje = request.args.get("eje") or ''
    tip_pry = request.args.get("tip_pry") or ''
    r= BI_PR.p1(dep,pro,dis,niv,eje,tip_pry)[0]

    return make_response(jsonify({'data':r,'status':1}),200)

#@app.route("/api-bi/p2")
def bi_2():
    dep = request.args.get("dep") or ''
    pro = request.args.get("pro") or ''
    dis = request.args.get("dis") or ''
    niv = request.args.get("niv") or ''
    eje = request.args.get("eje") or ''
    tip_pry = request.args.get("tip_pry") or ''
    cat_pre = request.args.get("cat_pre") or ''
    r= BI_PR.p2(dep,pro,dis,niv,eje,tip_pry,cat_pre)[0]

    return make_response(jsonify({'data':r,'status':1}),200)

#@app.route("/api-bi/p3")
def bi_3():
    dep = request.args.get("dep") or ''
    pro = request.args.get("pro") or ''
    dis = request.args.get("dis") or ''
    niv = request.args.get("niv") or ''
    eje = request.args.get("eje") or ''
    tip_pry = request.args.get("tip_pry") or ''
    r= BI_PR.p3(dep,pro,dis,niv,eje,tip_pry)[0]

    return make_response(jsonify({'data':r,'status':1}),200)

#@app.route("/api-bi/p4")
def bi_4():
    dep = request.args.get("dep") or ''
    pro = request.args.get("pro") or ''
    dis = request.args.get("dis") or ''
    niv = request.args.get("niv") or ''
    eje = request.args.get("eje") or ''
    tip_pry = request.args.get("tip_pry") or ''
    r= BI_PR.p4(dep,pro,dis,niv,eje,tip_pry)[0]

    return make_response(jsonify({'data':r,'status':1}),200)

#@app.route("/api-bi/loc")
def bi_local():
    dep = request.args.get("dep") or ''
    pro = request.args.get("pro") or ''
    dis = request.args.get("dis") or ''
   
    r= BI_PR.local(dep,pro,dis)[0]

    return make_response(jsonify({'data':r,'status':1}),200)

#@app.route("/presidencia-dashboard/")
def presidencia_home_bi():
#  r= Funciones.GetDataFinal(ubigeo,'f')
#  ub=DatosMaestros.GetUbigeo()
    return render_template('presidencia-bi/index.html',base=BASE_URL)

#@app.route("/api-bi/config")
def presidencia_api_config():
   
    val= {
            "fecha":DatosMaestros.GetUpdate(),
            "leyenda":{
                "bajo":{"valor":[0,50], "descripcion":"0-49.9%"},
                "medio":{"valor":[50,70], "descripcion":"50-79.9%"},
                "alto":{"valor":[80,100], "descripcion":"80-100%"}
            }
          }
    return make_response(jsonify({'data':val,'status':1}),200)
#-------------------------- end modulo geo ------------------------------#

if __name__ == "__main__":
    app.run(debug=True,host="0.0.0.0", port=5000)