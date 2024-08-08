<?php
// Debugging
ini_set('error_reporting', E_ALL);

// DATABASE INFORMATION
define('DATABASE_HOST', getenv('IP'));
define('DATABASE_NAME', 'invoicemgsys');
define('DATABASE_USER', 'root');
define('DATABASE_PASS', '');

// COMPANY INFORMATION
define('COMPANY_LOGO', 'images/logo.png');
define('COMPANY_LOGO_WIDTH', '300');
define('COMPANY_LOGO_HEIGHT', '90');
define('COMPANY_NAME','Invoice Mg System');
define('COMPANY_ADDRESS_1','123 Something Street');
define('COMPANY_ADDRESS_2','Collierville, 3590 Lords Way');
define('COMPANY_ADDRESS_3','Paekinta');
define('COMPANY_COUNTY','US');
define('COMPANY_POSTCODE','10100');

define('COMPANY_NUMBER','Company No: 699400000'); // Company registration number
define('COMPANY_VAT', 'Company VAT: 690000007'); // Company TAX/VAT number

// EMAIL DETAILS
define('EMAIL_FROM', 'sales@inms.ccc'); // Email address invoice emails will be sent from
define('EMAIL_NAME', 'Invoice Mg System'); // Email from address
define('EMAIL_SUBJECT', 'Invoice default email subject'); // Invoice email subject
define('EMAIL_BODY_INVOICE', 'Invoice default body'); // Invoice email body
define('EMAIL_BODY_QUOTE', 'Quote default body'); // Invoice email body
define('EMAIL_BODY_RECEIPT', 'Receipt default body'); // Invoice email body

// OTHER SETTINFS
define('INVOICE_PREFIX', 'MD'); // Prefix at start of invoice - leave empty '' for no prefix
define('INVOICE_INITIAL_VALUE', '1'); // Initial invoice order number (start of increment)
define('INVOICE_THEME', '#222222'); // Theme colour, this sets a colour theme for the PDF generate invoice
define('TIMEZONE', 'America/Los_Angeles'); // Timezone - See for list of Timezone's http://php.net/manual/en/function.date-default-timezone-set.php
define('DATE_FORMAT', 'DD/MM/YYYY'); // DD/MM/YYYY or MM/DD/YYYY
define('CURRENCY', '$'); // Currency symbol
define('ENABLE_VAT', true); // Enable TAX/VAT
define('VAT_INCLUDED', false); // Is VAT included or excluded?
define('VAT_RATE', '10'); // This is the percentage value

define('PAYMENT_DETAILS', 'Invoice Mg System.<br>Sort Code: 00-00-00<br>Account Number: 12345678'); // Payment information
define('FOOTER_NOTE', 'Invoice Management System');

// CONNECT TO THE DATABASE
$mysqli = new mysqli(DATABASE_HOST, DATABASE_USER, DATABASE_PASS, DATABASE_NAME);

?>