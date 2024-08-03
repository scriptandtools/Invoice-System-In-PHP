<?php
//Set default date timezone
date_default_timezone_set('Europe/London');
//Include Invoicr class
include('../invoice.php');
include('../includes/config.php');
//Create a new instance
$invoice = new invoicr("A4","£","en");
//Set number formatting
$invoice->setNumberFormat('.',',');
//Set your logo
$invoice->setLogo("images/ambient-lounge-logo.gif",356,95);
//Set theme color
$invoice->setColor("#222222");
//Set type
$invoice->setType("Invoice");
//Set reference
$invoice->setReference("AMBMN-000001");
//Set date
$invoice->setDate(date('d.m.Y',time()));
//Set due date
$invoice->setDue(date('d.m.Y',strtotime('+1 months')));
//Set from
$invoice->setFrom(array(COMPANY_NAME,COMPANY_ADDRESS_1,COMPANY_ADDRESS_2,COMPANY_COUNTY,COMPANY_POSTCODE,"Company No: ".COMPANY_NUMBER,"Company VAT: ".COMPANY_VAT));
//Set to
$invoice->setTo(array("EpicBrands Studios","1516 Holt Street","West Palm Beach","FL 33401 - USA","VAT 148 366 032"));
//Ship to
$invoice->shipTo(array("James Brandon","1516 Holt Street","West Palm Beach","FL 33401 - USA","VAT 148 366 032"));
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
$invoice->addParagraph("Make all cheques payable to Ambient Lounge Ltd.<br>If you have any questions concerning this invoice, contact our sales department at sales@ambientlounge.co.uk.com.<br><br>Thank you for your business.");
//Set footer note
$invoice->setFooternote("http://www.ambientlounge.co.uk");
//Render the PDF
$invoice->render('sample.pdf','I');
?>