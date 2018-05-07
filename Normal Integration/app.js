//*******NORMAL INTEGRATION**********//

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var request = require("request");
var EventEmitter = require("events").EventEmitter;
var IPN = new EventEmitter();
var urlencodedParser = bodyParser.urlencoded({extended: true});
var md5 = require('md5');

app.use(bodyParser.json());

//***NOTE: The app.use codes below are used to call static items if you are using css and images.
//This will allow you to access your css and images when you execute this codes in localhost
//Alternately you can create public a folder/directory '/public'  and put all your files there

app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/images', express.static(path.join(__dirname, 'images')));

// The '/' below can just ignore. Just make sure your codes are in the same folder or directory
app.get('/',  function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));// Opens your main html file
});

//var merchant_id = '';//Insert merchant id here
var vkey = "**********"; //Replace ********** with your MOLPay Secret_Key
var key0;
var key1;


var enviroment = "sandbox"; //sandbox or production
var URL;


//choose your environment
if (enviroment == "sandbox"){
    URL = "https://sandbox.molpay.com/MOLPay/API/chkstat/returnipn.php"; //return ipn url
} else if(enviroment == "production"){
    URL = "https://www.onlinepayment.com.my/MOLPay/API/chkstat/returnipn.php"; //return ipn url
}

//****MANDATORY VARIABLES********//
var nbcb; //Would always equal to 2 , which indicates this is a notification from MOLPay.
var amount;
var orderid;
var tranID;
var domain;
var status;
var appcode;
var paydate;
var currency;
var skey;
var error_code;
var error_desc;
var channel;

var treq = 1;



//Handles post data, a directory '/returnurl' is created to receive post data
//Make sure you have a hidden input in your main html that includes your return url link
//The '/returnurl' below can be changed to your own return url link name/directory
//This is the same if you want to use it for your callback url

app.post('/returnurl', urlencodedParser, function(req, res){

    //nbcb = req.body.nbcb; //Optional, needed for callback url script only
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

    //The following response codes are used to display the output in '/returnurl'  and in the console
    //This can also be used as a receipt, you can change the way the output is displayed if you like
    response = {
        amount,
        orderid,
        tranID,
        domain,
        status,
        appcode,
        paydate,
        currency,
        skey,
        error_code,
        error_desc,
        channel

    };

    console.log(response);

    //convert the response in JSON format and print it to '/returnurl'
    res.end(JSON.stringify(response));


    /***********************************************************
     * To verify the data integrity sending by MOLPay
     ************************************************************/
    //md5 encryption
    key0 = md5( tranID+orderid+status+domain+amount+currency );
    key1 = md5( paydate+domain+key0+appcode+vkey );

    //control statement for verification
    //invalid transaction if the key is different. Merchant might issue a requery to MOLPay to double check payment status with MOLPay. 
    if(skey != key1){
        status = -1; // Invalid transaction
        console.log('Invalid');
    }else
    {
        console.log('Approved');
    }

    //If payment success
    if ( status == "00" ) {
        if ( check_cart_amt(orderid, amount) ) {
           /*** NOTE : this is a user-defined function which should be prepared by merchant ***/
            // action to change cart status or to accept order
            // you can also do further checking on the paydate as well
            // write your script here .....
        }
    } else {
        // failure action. Write your script here .....
        // Merchant might send query to MOLPay using Merchant requery
        // to double check payment status for that particular order.
    }
    

    /*
    if ( nbcb==1 ) {
        //callback IPN feedback to notified MOLPay
        console.log("CBTOKEN:MPSTATOK")
    }else{
        //normal IPN and redirection
    }
    */
    // The commented step above is for callback url script and can be ignored, otherwise you are advised to put the code below into the else statement
   
    IPN.emit("update");// Trigger request to post back to IPN

});


//calls request to post back data for IPN (Instant Payment Notification)
IPN.on('update', function () {

    request.post({
        uri: URL,
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        form:  {

            treq : treq,
            amount : amount,
            orderid : orderid,
            tranID : tranID,
            domain : domain,
            status : status,
            appcode : appcode,
            paydate : paydate,
            currency : currency,
            skey : skey,
            error_code :error_code,
            error_desc : error_desc,
            channel : channel

        }

    }, function(err, res, body) {
        if (err) {
            console.log(err);
        } else {
            console.log("done");
            console.log(body);
        }
    });


});


//Listen to server at port 8080, Default IP 127.0.0.1
var server = app.listen(8080, '127.0.0.1',function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});
