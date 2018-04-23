# Node_JS-SDK
MOLPay Node_JS SDK

### Pre-Requisite
1. Node Js installed(preferably latest version)
2. Install package md5
3. Install package request
4. Install package express
5. Install package body-pareser
6. MOLPay Development or Production ID.
7. MOLPay General API.

The packages can be easily installed on windows via npm install <packagename> 
or you can just refer here https://www.npmjs.com/
  
### Installation
1. Download the app.js file
2. Put app.js file in same directory with your project files.
3. Open command prompt terminal,locate destination of app.js.
4. Run 'node app.js' to execute file.


### Usage
Set which type of enviroment with either sandbox or production
enviroment = "sandbox" #or "production"

### Payment Page integration
Set these needed objects that will send the buyer infromation to MOLPay hosted payment page.
```Python
#Value set are examples
merchant_id = '' #Insert merchant id here
vkey = '' #Insert Verify Key here
amount = '61.01' #Insert amount here
orderid = '601' #Insert order id here
```
It is not needed to set all the Endpoint URLs. If not set,by default the Endpoint URLs would be taken from Merchant Portal's End Point settings.
```html
<!-- Value set are examples -->
<input type="hidden" name="returnurl" id="returnurl" value="http://127.0.0.1:5000/returnurl">
```
### Payment endpoint integration
Set the values received from MOLPay's payment page.
```Python
amount = req.body.amount;
orderid = req.body.orderid;
tranID  = req.body.tranID ;
domain  = req.body.domain ;
status = req.body.status;
appcode = req.body.appcode;
paydate = req.body.paydate;
currency = req.body.currency;
skey = req.body.skey;
error_code = req.body.error_code;
error_desc = req.body.error_desc;
channel = req.body.channel;
```

### IPN(Instant Payment Notification)
Additional object must be set when using IPN

treq = "1" #Value is always 1. Do not change


#### Notification & Callback URL with IPN 
Set additional object for Notification & Callback URL 
```Python
nbcb=req.body.nbcb;
```

Support
-------
Merchant Technical Support / Customer Care : support@molpay.com 
Marketing Campaign : marketing@molpay.com 
Channel/Partner Enquiry : channel@molpay.com 
Media Contact : media@molpay.com 
R&D and Tech-related Suggestion : technical@molpay.com 
Abuse Reporting : abuse@molpay.com

### Disclaimer
Any amendment by your end is at your own risk.

Changelog
----------
1. 2018-04-23 - v1.0.1 - Initial Release
