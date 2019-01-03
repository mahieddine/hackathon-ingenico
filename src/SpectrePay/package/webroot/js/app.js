var timer = 0;
var txId = 0;

$(document).ready(function() {
	// launch home page
	var swiper = new Swiper('.swiper-container', {
		pagination : '.swiper-pagination',
		paginationClickable : true,
		nextButton : '.swiper-button-next',
		prevButton : '.swiper-button-prev',
		spaceBetween : 30
	});

	$('#startPayment').click(function() {
		console.log('starting payment');
		var amount = $('#amountToPay').val();
		//@todo get TX ID
		$('#paymentScreen').html('');
		$('#qrCodeTitle').html("Génération du QR Code en cours...");
		$('#code').html('');
		//@todo call url with payment type and payment amount
		$.getJSON("http://www.cross-demo.com/team18/index.php?type=VISA&amount=" + amount, function(json) {
			console.log(json);
			txId = json.id;
			// generate QR Code
			generateQRCode('#code', 'http://www.pay-demo.com/team18/pay.php?id=' + json.id);
		});
	});

});

function generateQRCode(selector, text) {
	$(selector).qrcode({
		"render" : "div",
		"size" : 150,
		"color" : "#3a3",
		"text" : text,
		"left" : 80,
		"top" : 190
	});

	$('#code > div').css('top', '80px');
	$('#code > div').css('left', '80px');

	$('#qrCodeTitle').html("Veuillez scanner le QR Code avec votre smartphone");

	//setTimeout(transactionIsValid, 2000);
	timer = setInterval(transactionIsValid, 2000);
};

function transactionIsValid() {

	$.getJSON("http://www.cross-demo.com/team18/status.php?id=" + txId, function(json) {
		if (json.code == 1) {
			$('#code > div').css('top', '80px');
			$('#code > div').css('left', '80px');
			//$('#qrCodeTitle').html("<span style='font-size:21px'>Paiement accepté</span><br/><br/<br/<br/<br/");
			$('#qrCodeTitle').html('');
			clearInterval(timer);
			// print ticket 
			var strTicket="";
strTicket += "<div class=\"bodyTicket\" style=\"\background-color:#fff;color:#000\"> ";
strTicket += "       <img src=\"img\/love-paris.png\" class=\"logo\"\/>";
strTicket += "        <div class=\"name-f\">";
strTicket += "         <h2 >Reçu de paiement - LoveParis Merchant<\/h2>";
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

			$('#code').html(strTicket);
			window.print();
			$('#code').html('<div style="text-align:center;padding-left:30px"><img src="img/valid.png" width="180" height="180" /><br/><span style="font-size:19px">Merci</span></div>');
			
			
			setTimeout(function( ) {
			window.document.location.reload(); 
			}, 2000);
		}
	});

}

