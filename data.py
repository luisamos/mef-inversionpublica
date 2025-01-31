# from conexion import Postgres
# import json

# q=Postgres()
# anos=['2015','2016','2017','2018','2019','2020','2021','2022']
# tip_act_proy=['3','2','1']
# tip_gob=['E','R','M']
# series=[]
# top=[]
# # Lista Data Top Historica
# d_top_hist=[]


# def GetDataFinal(ubigeo,op):
#     series= GetValues(op)
#     d=GetDataCrudo(ubigeo,op)
#     u=GetUbigeo(ubigeo)
#     inf={
#         'series':series,
#         'datas':d
#     }
#     return inf

# def GetValues(op):
#     if op=='f':
#         r=q.querySelect("select distinct idfuncion as id,nombre as name from mef_funcionxanio where anioeje>=2015;")
#     elif op=='s':
#         r=q.querySelect("select distinct idsector as id, CASE idsector when '00' then 'GOBIERNOS LOCALES'  else nombre end as name from mef_sectorxanio where anioeje>=2015;")
#     elif op=='c':
#         r=q.querySelect("select distinct idprograma_ppto as id,nombre as name from mef_programapptoxanio where anioeje>=2015;")
#     return r

# def GetDataCrudo(ubigeo,op):
#     r= q.querySelect("""select ano_eje as a,code as c,dev as d,pim as p,gir as i,tip_act_proy as t,tipo_gobierno as g from get_mef_ip_his('{0}','{1}')
#                         UNION select ano_eje as a,code as c,sum(dev) as d,sum(pim) as p,sum(gir) as i,'1'as t,tipo_gobierno as g from get_mef_ip_his('{0}','{1}')
#                         group by tipo_gobierno,code,ano_eje""".format(ubigeo,op))
#     return r
    
# def GetUbigeo(ubigeo):
#     r=q.querySelect("""select (select distinct nom_dpto from peru_distritos where cod_dpto=substring('{0}',1,2)) as d,
#        coalesce((select distinct nom_prov from peru_distritos where cod_prov=substring('{0}',1,4)),'-') as p,
#         coalesce((select distinct nom_dist from peru_distritos where cod_dist=substring('{0}',1,6)),'-') as i""".format(ubigeo))
#     return r

# def GetUpdate():
#     r=q.querySelect("select TO_CHAR(fecha,'DD-MM-YYYY') as fec from mef_carga_ws where id='1343';")
#     return r