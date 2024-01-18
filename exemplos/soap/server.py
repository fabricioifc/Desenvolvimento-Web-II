from spyne import Application, rpc, ServiceBase, Unicode, Integer
from spyne.protocol.soap import Soap11, Soap12
from spyne.server.wsgi import WsgiApplication
from wsgiref.simple_server import make_server

class HelloWorldService(ServiceBase):

    # O decorator @rpc define que o método say_hello é um método remoto
    @rpc(Unicode, Integer, _returns=Unicode)
    def say_hello(ctx, name, times):
        ip_address = ctx.transport.req["REMOTE_ADDR"]

        for i in range(times):
            print(f"Hello {name} from {ip_address} #{i+1}")
        
        return f"Hello {name} from {ip_address}!"

# Criando uma aplicação Spyne com o serviço HelloWorldService
soap_app = Application([HelloWorldService], 'spyne.examples.hello.soap',
                       in_protocol=Soap11(validator='lxml'),
                       out_protocol=Soap12())

# Criando um aplicativo WSGI a partir da aplicação SOAP
# WSGI: Web Server Gateway Interface é uma especificação padrão para a 
# interface entre servidores web e aplicações web em Python
wsgi_app = WsgiApplication(soap_app)

if __name__ == '__main__':
    server = make_server('0.0.0.0', 8000, wsgi_app)
    server.serve_forever()
