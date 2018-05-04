var request = require("request");
var md5 = require('md5');

var enviroment = "sandbox"; //sandbox or production
var URL;

if (enviroment == "sandbox"){
    URL = 'https://sandbox.molpay.com'; //return ipn url
} else if(enviroment == "production"){
    URL = 'https://www.onlinepayment.com.my'; //return ipn url
}


//****MANDATORY VARIABLES******//

var vkey = "******"; // //Replace ********** with your MOLPay Secret_Key

var reqURL; // URL link for different requery request. See note below to know which URL to use
var domain = ""; //Merchant ID in MOLPay system
var skey = ""; //This is the data integrity protection hash string. See note below to know which formula to use

var amount = "";// Transaction amount
var txID = "";//Unique transaction ID for tracking purpose.
var oID = ""; //Merchant order ID, which might be duplicated.
var oIDs = ""; //Merchant order ID, must be URLencoded. Please note that oIDS and oID is used for different purpose
var delimiter = "|"; //Default is “|”. Avoid using any symbol that might exist in order ID, and also any of these: “,%, *, <, >, ? , \, $, &, =
var tIDs = ""; //A group of transaction ID, must be URLencoded


/**NOTE :
 * Below are different skey encryption formula for different query request
 * Use the skey formula accordingly with which requery link below
 * Please uncomment the lines that you wish to use and comments those that are not used
 **/

/**** SKEY ENCRYPTION ****/
skey = md5(txID+ domain + vkey + amount); //Query by unique transaction ID (recommended)
//skey =md5( oID + domain + vkey + amount ); //Query by order ID (single output)
//skey = md5(oID + domain + vkey);//Query by order ID (batch output)
//skey = md5( domain + oIDs + vkey ); //Query by multiple order ID (batch output)
//skey = md5( domain + tIDS + vkey ); //Query by multiple transaction ID (batch output)


/**** REQUEST URL FOR DIFFERENT STATUS REQUERY  ****/
reqURL = URL + '/MOLPay/q_by_tid.php';//Query by unique transaction ID (recommended)
//reqURL = URL '/MOLPay/query/q_by_oid.php'; //Query by order ID (single output)
//reqURL = URL '/MOLPay/query/q_oid_batch.php'; //Query by order ID (batch output)
//reqURL = URL '/MOLPay/query/q_by_oids.php';//Query by multiple order ID (batch output)
//reqURL = URL '/MOLPay/query/q_by_tids.php'; //Query by multiple transaction ID (batch output)


//****OPTIONAL VARIABLES********//

var url = ""; // Merchant's url web page to receive POST response from MOLPay
var type= "0"; // set to 0 = for plaintext result(default),  1 = for result via POST method
var format; //0 = result string with delimiter ( | ), 1 = result in array
var req4token; // 0 = No(default), 1 = yes

//If varibles are not used, can be left blank as it is

var options = {
    uri: reqURL, // send request to link
    headers: {"Content-Type": "application/x-www-form-urlencoded"},
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

        //url : url, //***NOTE: This url refers to merchant's page to receive POST response from MOLPay. Do not confuse with uri
        //type : type,
        //format : format,
        //req4token: req4token

    }
};

request.post(options, function(err, res, body) {
    if (err) {
        console.log(err);
    } else {
        console.log("done");
        console.log(body);// Display results to console
    }
});
