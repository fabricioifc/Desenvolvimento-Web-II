from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager

db = SQLAlchemy()
jwt = JWTManager()

# Armazenamento de tokens revogados
# Na prática, você deveria usar Redis ou um banco de dados para armazenar tokens revogados
BLACKLIST = set()

# Callback para verificar se um token foi revogado
@jwt.token_in_blocklist_loader
def check_if_token_in_blacklist(jwt_header, jwt_payload):
    jti = jwt_payload['jti']
    return jti in BLACKLIST