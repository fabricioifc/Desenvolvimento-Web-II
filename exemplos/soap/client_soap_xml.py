from zeep import Client
from zeep.plugins import HistoryPlugin
from lxml import etree
import http.client

# ler o arquivo xml com a requisição
with open("request.xml", "r") as f:
    xml_content = f.read()

# Criar um cliente Zeep com base no XML
connection = http.client.HTTPConnection("localhost", 8000)
connection.request("POST", "/", xml_content, headers={"Content-Type": "text/xml"})

# Exibir a resposta
response = connection.getresponse()
print(response.status, response.reason)
print(response.read().decode())

# Fechar a conexão
connection.close()

