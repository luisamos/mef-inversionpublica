# Usar una imagen base con Python
FROM python:3.11-slim

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el archivo requirements.txt
COPY requirements.txt .

# Instalar las dependencias de Python
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el resto del código (incluyendo app.py) al contenedor
COPY . .

# Exponer el puerto 5000
EXPOSE 5000

# Comando para iniciar Gunicorn con tu aplicación Flask
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "app:app"]