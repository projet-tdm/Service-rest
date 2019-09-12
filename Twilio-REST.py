from flask import Flask
from flask import request
import json
from twilio.rest import Client


app = Flask(__name__)

@app.route("/sms/<passwd>/<tel>")
def hello(passwd, tel):
    account_sid = 'AC2679246cd43760ebe8a17c6e76244cbf'
    auth_token = 'd51254ac78b1d2628475c194e1bc09c5'
    client = Client(account_sid, auth_token)
    body = "Bienvenue à Pharma, votre mot de passe est: " + passwd + \
             "\n Vous serez amené à le changer après votre première authentification"
    message = client.messages \
        .create(
        body= body,
        from_='+12017304599',
        to='+213794729812'
    )
    return json.dumps("mot de passe: "+passwd +" Téléphone: " +tel)

if __name__ == "__main__":
    app.run(debug=True)