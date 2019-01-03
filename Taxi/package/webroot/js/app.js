window.app = {};

window.app.home = function() {
	
	var bitcoinPrice = 0;
	
	// show two main button where the user select if he wants cash or bitcoin
	//$('#mainView').html("<input type='image' src='img/icon-bitcoin.png' class='atmButton bitcoinButton' /><input type='image' src='img/icon-cash.png'  class='atmButton cashButton' />");
	$('#cashButton').click(function() {
		window.document.url = 'cash.html';
	});

	$('#bitcoinButton').click(function() {
		window.document.url = 'bitcoin.html';
	});

	/*******withdraw cash methods*********/
	$('#withdraw10').click(function(e) {
		console.log('10', 'euro');
		pay(10);
	});

	$('#withdraw50').click(function() {
		console.log('50','euro');
		pay(50);
	});

	$('#withdraw200').click(function() {
		console.log('200', 'euro');
		pay(200);
	});

	$('#withdraw20').click(function() {
		console.log('20', 'euro');
		pay(20);
	});

	$('#withdraw100').click(function() {
		console.log('100', 'euro');
		pay(100);
	});
	
	
	/*******withdraw bitcoin methods*********/
	$('#withdrawBTCMic5').click(function(e) {
		console.log('10','bitcoin');
		pay(0.05*bitcoinPrice);
	});

	$('#withdrawBTCMic10').click(function() {
		console.log('10', 'bitcoin');
		pay(0.10*bitcoinPrice);
	});

	$('#withdrawBTCMic25').click(function() {
		console.log('200', 'bitcoin');
		pay(0.25*bitcoinPrice);
	});

	$('#withdrawBTCMic50').click(function() {
		console.log('20', 'bitcoin');
		pay(0.5*bitcoinPrice);
	});

	$('#withdrawBTC1').click(function() {
		console.log('100', 'bitcoin');
		pay(1*bitcoinPrice);
	});
	
	
  	setInterval(update, 30000);
  	update();
	
};

/***
 * this function launch a payment of the specified amount
 * @param {Object} amount
 */
function pay(amount, currency) {
	
	tetra.weblet.hide();
	//
	tetra.service({
		service : 'local.transaction.engine',
		namespace : 'ingenico.transaction'
	}).reset().connect().call('ManageTransaction', {
		hide : true,
		data : {
			transaction : {
				currency : {
					code : 'EUR',
					numCode : 978,
					minorUnit : 2,
					minorUnitSeparator : ",",
					thousandSeparator : "",
					position : "CURRENCY_BEFORE_AMOUNT",
					symbol : "&amp;euro;"
				},
				value : parseInt(amount)*100,
				transactionType : "Payment"
			},
			mean : "CHIP_CARD"
		}
	}).success(function(e) {
		tetra.weblet.show();
		var strTicket="";
strTicket += "<div class=\"bodyTicket\" style=\"\background-color:#fff;color:#000\"> ";
strTicket += "       <img src=\"img\/love-paris.png\" class=\"logo\"\/>";
strTicket += "        <div class=\"name-f\">";
strTicket += "         <h2 >Retrait d'argent - LoveParis Merchant<\/h2>";
strTicket += "      <\/div> ";
strTicket += "       <p>79 Rue Quincampoix, 75003 Paris<\/p>";
strTicket += "       <p> Tel: 01 73 73 10 74<\/p>";
strTicket += "       <div ><hr class=\"hrdash\"\/><\/div>";
strTicket += "       <p>N° Transaction:05<\/p>";
strTicket += "       <p>Date: 08\/11\/2015<\/p>";
strTicket += "       <p>05:24 pm<\/p>";
strTicket += "       <div ><hr class=\"hrdash\"\/><\/div>";
strTicket += "       <br \/> <br \/>";
strTicket += "       <p>Merci de votre visite<\/p> ";
strTicket += "         <p>A Bientôt<\/p>";
strTicket += "";
strTicket += "       <\/div>";

		$('#zoneForPrintTicket').html(strTicket);
		window.print();
		setInterval(function() {window.location.replace("index.html");}, 1000);		
		// once finished show our app again 
		console.log('All is finished').error(function(e) {
			console.log('ERROR: ' + e.response.transactionDetails);
		}).disconnect();
	}).error(function(e) {
		console.log('canceled');
		window.location.replace("index.html");
		
		
		tetra.weblet.show();
	});
}

// monitor bitcoin prices 
	 function update() {
	 	bitcoinPrice = 353;
	 	$('#liveBitcoinPrice').text(bitcoinPrice);
      $.getJSON("http://api.coindesk.com/v1/bpi/currentprice.json", 
      function(json){
        bitcoinPrice = Math.round(json.bpi.EUR.rate * 100) / 100;
        $('#liveBitcoinPrice').text(bitcoinPrice);  
    });
  }


$(document).ready(function() {
	// launch home page
	window.app.home();
});

