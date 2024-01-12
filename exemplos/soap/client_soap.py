from zeep import Client
from zeep.plugins import HistoryPlugin
from lxml import etree

# Criar um cliente Zeep com base no URL do WSDL
history = HistoryPlugin()
client = Client(f'http://localhost:8000/?wsdl', plugins=[history])

# Chamar o método do serviço
response = client.service.say_hello(name='Professor', times=3)

# Exibir a resposta
for hist in [history.last_sent, history.last_received]:
    print(etree.tostring(hist["envelope"], encoding="unicode", pretty_print=True))