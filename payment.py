import braintree
from flask import Flask
from flask import request


app = Flask(__name__)

gateway = braintree.BraintreeGateway(
    braintree.Configuration(
        braintree.Environment.Sandbox,
        merchant_id="h8ncjykptqvszj55",
        public_key="ydnjqj3zn4kp9t92",
        private_key="4ee549688dc7f2bcb90ed6c8447d700b"
    )
)



@app.route("/client_token", methods=["GET"])
def clientToken():
    return gateway.client_token.generate()

@app.route("/checkout", methods=["POST"])
def create_purchase():
    nonce_from_the_client = request.form["nonce"]
    amount = request.form["amount"]
    result = gateway.transaction.sale({
        "amount": amount,
        "payment_method_nonce": nonce_from_the_client,
        "options": {
            "submit_for_settlement": True
        }
    })
    return str(result)

if __name__ == "__main__":
    app.run(debug=True, port=5001)