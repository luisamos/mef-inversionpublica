
from flask_marshmallow import Marshmallow
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from marshmallow_sqlalchemy.fields import Nested,fields
ma = Marshmallow()

class SubsistemaSchema(ma.SQLAlchemyAutoSchema):
    id_subsistema=fields.Str()
    ubigeo=fields.Str()
    tipo_subsistemas=fields.Str()
    nombre = fields.Str()

class TipoSchema(ma.SQLAlchemyAutoSchema):
    id=fields.Str()
    name=fields.Str()

class DataCrudaSchema(ma.SQLAlchemyAutoSchema):
    a=fields.Str()
    c=fields.Str()
    d=fields.Float()
    p=fields.Float()
    i=fields.Float()
    t=fields.Str()
    g=fields.Str()

class UbigeoSchema(ma.SQLAlchemyAutoSchema):
    d=fields.Str()
    p=fields.Str()
    i=fields.Str()

class FecMEFSchema(ma.SQLAlchemyAutoSchema):
    fec=fields.Str()
    fecha_mef=fields.Str()

class ListDistritosSchema(ma.SQLAlchemyAutoSchema):
    nom_dpto=fields.Str()
    nom_prov=fields.Str()
    nom_dist=fields.Str()
    cod_dpto=fields.Str()
    cod_prov=fields.Str()
    cod_dist=fields.Str()

class DataTotal(ma.SQLAlchemyAutoSchema):
    ano_eje=fields.Int()
    tipo_gobierno=fields.Str()
    tip_act_proy=fields.Str()
    pim=fields.Float()
    dev=fields.Float()
    gir=fields.Float()