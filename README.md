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

For ease of use, a demo version has been uploaded along with a sample html file and all required node modules in a zip file.
If there is any trouble in using the uploaded package modules, the packages can be easily installed on windows via npm install <packagename> 
or you can just refer here https://www.npmjs.com/ .

  
### Installation
1. Download the app.js file
2. Put app.js file in same directory with your project files.
3. Open command prompt terminal,locate destination of app.js.
4. Remember to change name inside app.js of 'index.html' to your own html page. (There is only 1 line with index.html)
5. Run 'node app.js' to execute file.
6. Open localhost based on given localhost server to access your web page.

### Usage
Set which type of enviroment with either sandbox or production
enviroment = "sandbox" #or "production"

### Payment Page integration
Set these needed objects that will send the buyer infromation to MOLPay hosted payment page.
```Javascript
#Value set are examples
merchant_id = ''; //Insert merchant id here
vkey = ''; //Insert Verify Key here
amount = '61.01'; //Insert amount here
orderid = 'OD601'; //Insert order id here, order ID shoud be random generated value by merchant developer side
```
It is not needed to set all the Endpoint URLs. If not set,by default the Endpoint URLs would be taken from Merchant Portal's End Point settings.
```html
<!-- Value set are examples -->
<input type="hidden" name="returnurl" id="returnurl" value="http://127.0.0.1:8000/returnurl">
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

treq = "1" //Value is always 1. Do not change


#### Notification & Callback URL with IPN 
Get additional object for Notification & Callback URL 
```Python
nbcb=req.body.nbcb;
```

#### Sample of all 3 endpoints
E.G return & notification & callback URL (all 3 url are using this structure)
```Javascript
//invalid transaction if the key is different. Merchant might issue a requery to MOLPay to double check payment status with MOLPay. 
 if(skey != key1){
        status = -1; // Invalid transaction
    }

    if ( status == "00" ) {
        if ( check_cart_amt(orderid, amount) ) {
             /*** NOTE : this is a user-defined function which should be prepared by merchant ***/
             // action to change cart status or to accept order
             // you can also do further checking on the paydate as well
            // write your script here .....
        }
    } else {
        // failure action. Write your script here .....
    }
```

### Additional Requirements for Seamless Integration
If you are using the Seamless version, please ensure that you include this line of code in your html
```html
<script type="text/javascript" src="app.js"></script>
```

Also, remember to set the environment that you want to work in by including the script src below.

For sandbox:
```html
<script src="https://sandbox.molpay.com/MOLPay/API/seamless/3.16/js/MOLPay_seamless.deco.js"></script>
```

For production:
```html
 <script src="https://www.onlinepayment.com.my/MOLPay/API/seamless/3.17/js/MOLPay_seamless.deco.js"></script>
```

### Requery
For ease of use,a requery feature is added separately as a different file(requery.js).
The requery feature can be used to check the transaction history. The status query is sent to MOLPay system. 
We have 5 type of requery method.
1. Query by unique transaction ID (recommended)
2. Query by order ID & get latest matched result (single output)
3. Query by order ID & get all matched results (batch output)
4. Query by multiple order ID (batch output)
5. Query by multiple transaction ID (batch output)

Set the values for requery. The following are variable names are fixed and should not be changed, however you only need to use variables that are needed for a specific requery. Other unused varibles can just be commented or left empty.

Further instructions about which variables to use for each query are written within the codes. It is advised for merchant to take a look at the API specification documentation provided to them as well.

#### Step 1: Insert values into variables that you want to use 
```Javascript

//****MANDATORY VARIABLES******//

var vkey = "******"; // //Replace ********** with your MOLPay Secret_Key(MUST HAVE)
var reqURL; // URL link for different requery request. See note below to know which URL to use
var skey; //This is the data integrity protection hash string. See note below to know which formula to use

var domain = ""; //Merchant ID in MOLPay system
var amount = "";// Transaction amount
var txID = "";//Unique transaction ID for tracking purpose.
var oID = ""; //Merchant order ID, which might be duplicated.
var oIDs = ""; //Merchant order ID, must be URLencoded. Please note that oIDS and oID is used for different purpose
var delimiter = "|"; //Default is “|”. Avoid using any symbol that might exist in order ID, and also any of these: “,%, *, <, >, ? , \, $, &, =
var tIDs = ""; //A group of transaction ID, must be URLencoded

//****OPTIONAL VARIABLES********//

var url = ""; // Merchant's URL web page to receive POST response from MOLPay
var type= "0"; // set to 0 = for plaintext result(default),  1 = for result via POST method
var format; //0 = result string with delimiter ( | ), 1 = result in array
var req4token; // 0 = No(default), 1 = yes

```

#### Step 2: Select the URL that you wish to use based on the query method that you want to get 

Chooese your link by uncommenting them. All URL links are commented within the codes. Below is a link to the sandbox version
```Javascript

reqURL = 'https://sandbox.molpay.com/MOLPay/q_by_tid.php';//Query by unique transaction ID (recommended)

```

#### Step 3: Select md5 method based on which query you wish to call

Chooese your md5 method by uncommenting them. The variables for the formula are the ones that would be used. Unused varibles can just be left blank as it is. 
```Javascript

skey = md5(txID+ domain + vkey + amount); //Query by unique transaction ID (recommended)

```

#### Step 4: Comment out the variables that are unused

```Javascript

form: {

        //Comment out those that are unused
        /**Mandatory Variables **/
        
        amount: amount,
        txID : txID,
        tIDs : tIDs,
        oID : oID,
        oIDs : oIDs,
        delimiter : delimiter,
        domain: domain,
        skey: skey

        /**Optional**/

        //url : url,
        //type : type,
        //format : format,
        //req4token: req4token

    }

```

#### Step 5 : Execute request.js via command promt: 'node request.js' or just run it from your IDE.
The output response will be displayed in the console terminal. Optionally, you can send the Post response to to your web page to display it out.



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
1. 2018-04-23 - v1.0.0 - Initial Release
2. 2018-04-23 - v1.0.1 
3. 2018-04-25 - v1.0.2 - Added Requery feature in separate file 
4. 2018-05-3 - v1.0.3 - Fixed IPN request 
5. 2018-05-7 - v1.0.4 - Uploaded demo version for both seamless and normal integration
