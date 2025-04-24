from flask import Flask, jsonify
from app.extensions import db, jwt
from app.config import Config

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    # Inicializa extensões
    db.init_app(app)
    jwt.init_app(app)
    
    # Registra blueprints
    from app.api import bp as api_bp
    app.register_blueprint(api_bp, url_prefix='/api/v1')
    
    # Rota raiz
    @app.route('/', methods=['GET'])
    def index():
        return jsonify({
            'message': 'Welcome to the Authentication API',
            'api_version': '/api/v1',
            'api_info': '/api'
        }), 200
    
    # Rota de informações da API
    @app.route('/api', methods=['GET'])
    def api_info():
        return jsonify({
            'api_name': 'Authentication API',
            'version': 'v1',
            'base_url': '/api/v1',
            'endpoints': [
                '/register', 
                '/login', 
                '/logout', 
                '/refresh', 
                '/protected', 
                '/profile'
            ],
            'documentation': '/api/docs'
        }), 200
    
    # Rota de documentação da API
    @app.route('/api/docs', methods=['GET'])
    def api_docs():
        return jsonify({
            'message': 'API documentation available at: https://example.com/docs'
        }), 200
    
    # Cria tabelas do banco de dados se não existirem
    with app.app_context():
        db.create_all()
    
    return app