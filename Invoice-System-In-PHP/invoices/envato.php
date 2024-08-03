<?php
//Set default date timezone
date_default_timezone_set('America/Los_Angeles');
//Include Invoicr class
include('../invoicr.php');
//Create a new instance
$invoice = new invoicr("A4","$","en");
//Set number formatting
$invoice->setNumberFormat('.',',');
//Set your logo
$invoice->setLogo("images/envato.png");
//Set theme color
$invoice->setColor("#82b541");
//Set type
$invoice->setType("Invoice");
//Set reference
$invoice->setReference("20140904001");
//Set date
$invoice->setDate(date('m.d.Y',time()));
//Set due date
$invoice->setDue(date('m.d.Y',strtotime('+3 months')));
//Set from
$invoice->setFrom(array("Envato Inc","4146 Golden Hickory Woods","Glass Hill, Sydney","Australia","VAT 377 855 846"));
//Set to
$invoice->setTo(array("EpicBrands Studios","1516 Holt Street","West Palm Beach","FL 33401 - USA","VAT 148 366 032"));
//Add items
$invoice->addItem("Wordpress theme",false,2,"21%",9.99,false,19.98);
$invoice->addItem("Php invoice class","Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>Duis sodales, lorem quis aliquam sollicitudin, metus risus dignissim lorem.",1,"21%",4.95,false,4.95);
//Add totals
$invoice->addTotal("Total",24.93);
$invoice->addTotal("VAT 21%",5.23);
$invoice->addTotal("Total due",30.16,true);
//Set badge
$invoice->addBadge("paid");
//Add title
$invoice->addTitle("Payment information");
//Add Paragraph
$invoice->addParagraph("Make all cheques payable to Envato Inc.<br>If you have any questions concerning this invoice, contact our sales department at sales@envato.com.<br><br>Thank you for your business.");
//Set footer note
$invoice->setFooternote("http://www.envato.com");
//Render
$invoice->render('Envato.pdf','I');
?>