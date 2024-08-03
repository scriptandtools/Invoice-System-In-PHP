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
$invoice->setLogo("images/apple.png",100,88);
//Set theme color
$invoice->setColor("#222222");
//Set type
$invoice->setType("Invoice");
//Set reference
$invoice->setReference("20140904001");
//Set date
$invoice->setDate(date('m.d.Y',time()));
//Set due date
$invoice->setDue(date('m.d.Y',strtotime('+3 months')));
//Set from
$invoice->setFrom(array("Apple Inc","1 Infinite Loop","Cupertino, CA 95014","United States of America","IE9700053D"));
//Set to
$invoice->setTo(array("EpicBrands Studios","1516 Holt Street","West Palm Beach","FL 33401 - USA","VAT 148 366 032"));
//Add items
$invoice->addItem("Apple iPhone 5s","Verizon 2 year contract<br>Gold - 32GB",1,"21%",299,'5%',284.05);
$invoice->addItem("Apple iPad mini","Space Gray - 16GB",1,"21%",299,0,299);
//Add totals
$invoice->addTotal("Total",583.05);
$invoice->addTotal("VAT 21%",122.44);
$invoice->addTotal("Total due",705.5,true);
//Add Title
$invoice->addTitle("Payment information");
//Add Paragraph
$invoice->addParagraph("Make all cheques payable to Apple Inc.<br>If you have any questions concerning this invoice, contact our sales department at sales@apple.com.<br><br>Thank you for your business.");
//Set footer note
$invoice->setFooternote("http://www.apple.com");
//Render the PDF
$invoice->render('Apple.pdf','I');
?>