# Normal Integration

### Pre-Requisite
1. Node Js installed(preferably latest version)
2. npm install md5
3. npm install request
4. npm install express
5. npm install body-parser
6. MOLPay Development or Production ID.
7. MOLPay General API.

### Installation
1. Download the app.js file
2. Put app.js file in same directory with your project files.
3. Open command prompt terminal,locate destination of app.js.
4. Remember to change name inside app.js of 'index.html' to your own html page. (There is only 1 line with index.html)
5. Run 'node app.js' to execute file.
6. Open localhost based on given localhost server to access your web page.

### Set Action in Demo html sample
In the html file of the demo sample, set the action method of the lines below using the following url:
```html
<form method="POST" action=" " role="molpayseamless">
```

For sandbox:
```Python
https://sandbox.molpay.com/MOLPay/pay/<your merchant_id>/
```

For production:
```Python
https://www.onlinepayment.com/MOLPay/pay/<your merchant_id>/
```

### Set Values in Demo html sample
In the html file of the demo sample, remember to set the values of the parameter below:

```html
<input type="hidden" name="orderid" value="" />
<input type="hidden" name="merchant_id" value="" />
<input type="hidden" name="vkey" value="" />
<input type="hidden" name="vcode" value="" />
<input type = "hidden" name = "returnurl" value = "http://localhost:8080/returnurl" />
<input type = "hidden" name = "callbackurl" value = "http://localhost:8080/callbackurl" />
```
Please request merchant ID, vkey and vcode from Merchant Technical Support / Customer Care : support@molpay.com .
The order ID can be anything. 
