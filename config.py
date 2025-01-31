from dotenv import load_dotenv
import os
load_dotenv()

DB_USER= os.getenv('DB_USER')
DB_PASS= os.getenv('DB_PASS')
DB_HOST= os.getenv('DB_HOST')
DB_PORT= os.getenv('DB_PORT')
DB_NAME= os.getenv('DB_NAME')
# USER_MAIL = os.getenv('USER_MAIL')
# PASS_MAIL = os.getenv('PASS_MAIL')

BASE_URL= os.getenv('BASE_URL')
#URL_MEF= os.getenv('URL_MEF')

URL_MEF= 'https://apps5.mineco.gob.pe/transparencia/Navegador/Navegar_7.aspx'

DB_URL= f"postgresql://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}?client_encoding=utf8"

SQLALCHEMY_DATABASE_URI= DB_URL
SQLALCHEMY_TRACK_MODIFICATIONS= False
