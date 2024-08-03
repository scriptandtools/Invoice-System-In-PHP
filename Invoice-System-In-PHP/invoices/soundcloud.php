<?php
//Set default date timezone
date_default_timezone_set('America/Los_Angeles');
//Include Invoicr class
include('../invoicr.php');
//Create a new instance
$invoice = new invoicr("A4","€","en");
//Set number format
$invoice->setNumberFormat(',','.');
//Set your logo
$invoice->setLogo("images/soundcloud.png",180,100);
//Set theme color
$invoice->setColor("#f7540e");
//Set type
$invoice->setType("Quote");
//Set reference
$invoice->setReference("20140904001");
//Set date
$invoice->setDate(date('m.d.Y',time()));
//Set from
$invoice->setFrom(array("SoundCloud Ltd.","4146 Golden Hickory Woods","11000 Berlin","Germany","VAT 377 855 846"));
//Set to
$invoice->setTo(array("EpicBrands Studios","1516 Holt Street","West Palm Beach","FL 33401 - USA","VAT 148 366 032"));
//Add items
$invoice->addItem("Premium account",false,1,"21%",100,20,80);
//Add totals
$invoice->addTotal("Total",80);
$invoice->addTotal("VAT 21%",16.8);
$invoice->addTotal("Total",96.8,true);
//Add badge
$invoice->addBadge("Copy");
//Add title
$invoice->addTitle("Extra notes");
//Add paragraph
$invoice->addParagraph("Thanks for your interest in our products!<br>Send me an email if you have any questions about this quotation.<br><br>Kind regards,<br>Jane Doe<br>jane@soundcloud.com");
//Set footernote
$invoice->setFooternote("http://www.soundcloud.com");
//Render
$invoice->render('Envato.pdf','I');
?>