FROM python:3
FROM nginx:1.21.1

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 80

CMD [ "python", "app.py" ]