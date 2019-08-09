from flask import Flask
from flask import request
import json
from twilio.rest import Client


app = Flask(__name__)

@app.route("/sms/<passwd>/<tel>")
def hello(passwd, tel):
    """"
    account_sid = 'ACaa5f1ea18f2df0d7044e4d66ea7a4626'
    auth_token = 'c89288a5a3a0466ea749fe1d264a1516'
    client = Client(account_sid, auth_token)
    body = "Bienvenue à Pharma, votre mot de passe est: " + passwd + \
             "\n Vous serez amené à le changer après votre première authentification"
    message = client.messages \
        .create(
        body= body,
        from_='+14387718110',
        to=tel
    )
    """
    return json.dumps(passwd + tel)

if __name__ == "__main__":
    app.run(debug=True)