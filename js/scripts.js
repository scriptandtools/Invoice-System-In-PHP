/*******************************************************************************
* Simplified PHP Invoice System                                                *
*                                                                              *
* Version: 1.1.1	                                                               *
* Author:  James Brandon                                    				   *
*******************************************************************************/

$(document).ready(function() {

	// Invoice Type
	$('#invoice_type').change(function() {
		var invoiceType = $("#invoice_type option:selected").text();
		$(".invoice_type").text(invoiceType);
	});

	// Load dataTables
	$("#data-table").dataTable();

	// add product
	$("#action_add_product").click(function(e) {
		e.preventDefault();
	    actionAddProduct();
	});

	// password strength
	var options = {
        onLoad: function () {
            $('#messages').text('Start typing password');
        },
        onKeyUp: function (evt) {
            $(evt.target).pwstrength("outputErrorList");
        }
    };
    $('#password').pwstrength(options);

	// add user
	$("#action_add_user").click(function(e) {
		e.preventDefault();
	    actionAddUser();
	});

	// update customer
	$(document).on('click', "#action_update_user", function(e) {
		e.preventDefault();
		updateUser();
	});

	// delete user
	$(document).on('click', ".delete-user", function(e) {
        e.preventDefault();

        var userId = 'action=delete_user&delete='+ $(this).attr('data-user-id'); //build a post data structure
        var user = $(this);

	    $('#delete_user').modal({ backdrop: 'static', keyboard: false }).one('click', '#delete', function() {
			deleteUser(userId);
			$(user).closest('tr').remove();
        });
   	});

   	// delete customer
	$(document).on('click', ".delete-customer", function(e) {
        e.preventDefault();

        var userId = 'action=delete_customer&delete='+ $(this).attr('data-customer-id'); //build a post data structure
        var user = $(this);

	    $('#delete_customer').modal({ backdrop: 'static', keyboard: false }).one('click', '#delete', function() {
			deleteCustomer(userId);
			$(user).closest('tr').remove();
        });
   	});

	// update customer
	$(document).on('click', "#action_update_customer", function(e) {
		e.preventDefault();
		updateCustomer();
	});

	// update product
	$(document).on('click', "#action_update_product", function(e) {
		e.preventDefault();
		updateProduct();
	});

	// login form
	$(document).bind('keypress', function(e) {
		e.preventDefault;
		
        if(e.keyCode==13){
            $('#btn-login').trigger('click');
        }
    });

	$(document).on('click','#btn-login', function(e){
		e.preventDefault;
		actionLogin();
	});

	// download CSV
	$(document).on('click', ".download-csv", function(e) {
		e.preventDefault;

		var action = 'action=download_csv'; //build a post data structure
        downloadCSV(action);

	});

	// email invoice
	$(document).on('click', ".email-invoice", function(e) {
        e.preventDefault();

        var invoiceId = 'action=email_invoice&id='+$(this).attr('data-invoice-id')+'&email='+$(this).attr('data-email')+'&invoice_type='+$(this).attr('data-invoice-type')+'&custom_email='+$(this).attr('data-custom-email'); //build a post data structure
		emailInvoice(invoiceId);
   	});

	// delete invoice
	$(document).on('click', ".delete-invoice", function(e) {
        e.preventDefault();

        var invoiceId = 'action=delete_invoice&delete='+ $(this).attr('data-invoice-id'); //build a post data structure
        var invoice = $(this);

	    $('#delete_invoice').modal({ backdrop: 'static', keyboard: false }).one('click', '#delete', function() {
			deleteInvoice(invoiceId);
			$(invoice).closest('tr').remove();
        });
   	});

	// delete product
	$(document).on('click', ".delete-product", function(e) {
        e.preventDefault();

        var productId = 'action=delete_product&delete='+ $(this).attr('data-product-id'); //build a post data structure
        var product = $(this);

	    $('#confirm').modal({ backdrop: 'static', keyboard: false }).one('click', '#delete', function() {
			deleteProduct(productId);
			$(product).closest('tr').remove();
        });
   	});

	// create customer
	$("#action_create_customer").click(function(e) {
		e.preventDefault();
	    actionCreateCustomer();
	});

	$(document).on('click', ".item-select", function(e) {

   		e.preventDefault;

   		var product = $(this);

   		$('#insert').modal({ backdrop: 'static', keyboard: false }).one('click', '#selected', function(e) {

		    var itemText = $('#insert').find("option:selected").text();
		    var itemValue = $('#insert').find("option:selected").val();

		    $(product).closest('tr').find('.invoice_product').val(itemText);
		    $(product).closest('tr').find('.invoice_product_price').val(itemValue);

		    updateTotals('.calculate');
        	calculateTotal();

   		});

   		return false;

   	});

   	$(document).on('click', ".select-customer", function(e) {

   		e.preventDefault;

   		var customer = $(this);

   		$('#insert_customer').modal({ backdrop: 'static', keyboard: false });

   		return false;

   	});

   	$(document).on('click', ".customer-select", function(e) {

		    var customer_name = $(this).attr('data-customer-name');
		    var customer_email = $(this).attr('data-customer-email');
		    var customer_phone = $(this).attr('data-customer-phone');

		    var customer_address_1 = $(this).attr('data-customer-address-1');
		    var customer_address_2 = $(this).attr('data-customer-address-2');
		    var customer_town = $(this).attr('data-customer-town');
		    var customer_county = $(this).attr('data-customer-county');
		    var customer_postcode = $(this).attr('data-customer-postcode');

		    var customer_name_ship = $(this).attr('data-customer-name-ship');
		    var customer_address_1_ship = $(this).attr('data-customer-address-1-ship');
		    var customer_address_2_ship = $(this).attr('data-customer-address-2-ship');
		    var customer_town_ship = $(this).attr('data-customer-town-ship');
		    var customer_county_ship = $(this).attr('data-customer-county-ship');
		    var customer_postcode_ship = $(this).attr('data-customer-postcode-ship');

		    $('#customer_name').val(customer_name);
		    $('#customer_email').val(customer_email);
		    $('#customer_phone').val(customer_phone);

		    $('#customer_address_1').val(customer_address_1);
		    $('#customer_address_2').val(customer_address_2);
		    $('#customer_town').val(customer_town);
		    $('#customer_county').val(customer_county);
		    $('#customer_postcode').val(customer_postcode);


		    $('#customer_name_ship').val(customer_name_ship);
		    $('#customer_address_1_ship').val(customer_address_1_ship);
		    $('#customer_address_2_ship').val(customer_address_2_ship);
		    $('#customer_town_ship').val(customer_town_ship);
		    $('#customer_county_ship').val(customer_county_ship);
		    $('#customer_postcode_ship').val(customer_postcode_ship);

		    $('#insert_customer').modal('hide');

	});

	// create invoice
	$("#action_create_invoice").click(function(e) {
		e.preventDefault();
	    actionCreateInvoice();
	});

	// update invoice
	$(document).on('click', "#action_edit_invoice", function(e) {
		e.preventDefault();
		updateInvoice();
	});

	// enable date pickers for due date and invoice date
	var dateFormat = $(this).attr('data-vat-rate');
	$('#invoice_date, #invoice_due_date').datetimepicker({
		showClose: false,
		format: dateFormat
	});

	// copy customer details to shipping
    $('input.copy-input').on("input", function () {
        $('input#' + this.id + "_ship").val($(this).val());
    });
    
    // remove product row
    $('#invoice_table').on('click', ".delete-row", function(e) {
    	e.preventDefault();
       	$(this).closest('tr').remove();
        calculateTotal();
    });

    // add new product row on invoice
    var cloned = $('#invoice_table tr:last').clone();
    $(".add-row").click(function(e) {
        e.preventDefault();
        cloned.clone().appendTo('#invoice_table'); 
    });
    
    calculateTotal();
    
    $('#invoice_table').on('input', '.calculate', function () {
	    updateTotals(this);
	    calculateTotal();
	});

	$('#invoice_totals').on('input', '.calculate', function () {
	    calculateTotal();
	});

	$('#invoice_product').on('input', '.calculate', function () {
	    calculateTotal();
	});

	$('.remove_vat').on('change', function() {
        calculateTotal();
    });

	function updateTotals(elem) {

        var tr = $(elem).closest('tr'),
            quantity = $('[name="invoice_product_qty[]"]', tr).val(),
	        price = $('[name="invoice_product_price[]"]', tr).val(),
            isPercent = $('[name="invoice_product_discount[]"]', tr).val().indexOf('%') > -1,
            percent = $.trim($('[name="invoice_product_discount[]"]', tr).val().replace('%', '')),
	        subtotal = parseInt(quantity) * parseFloat(price);

        if(percent && $.isNumeric(percent) && percent !== 0) {
            if(isPercent){
                subtotal = subtotal - ((parseFloat(percent) / 100) * subtotal);
            } else {
                subtotal = subtotal - parseFloat(percent);
            }
        } else {
            $('[name="invoice_product_discount[]"]', tr).val('');
        }

	    $('.calculate-sub', tr).val(subtotal.toFixed(2));
	}

	function calculateTotal() {
	    
	    var grandTotal = 0,
	    	disc = 0,
	    	c_ship = parseInt($('.calculate.shipping').val()) || 0;

	    $('#invoice_table tbody tr').each(function() {
            var c_sbt = $('.calculate-sub', this).val(),
                quantity = $('[name="invoice_product_qty[]"]', this).val(),
	            price = $('[name="invoice_product_price[]"]', this).val() || 0,
                subtotal = parseInt(quantity) * parseFloat(price);
            
            grandTotal += parseFloat(c_sbt);
            disc += subtotal - parseFloat(c_sbt);
	    });

        // VAT, DISCOUNT, SHIPPING, TOTAL, SUBTOTAL:
	    var subT = parseFloat(grandTotal),
	    	finalTotal = parseFloat(grandTotal + c_ship),
	    	vat = parseInt($('.invoice-vat').attr('data-vat-rate'));

	    $('.invoice-sub-total').text(subT.toFixed(2));
	    $('#invoice_subtotal').val(subT.toFixed(2));
        $('.invoice-discount').text(disc.toFixed(2));
        $('#invoice_discount').val(disc.toFixed(2));

        if($('.invoice-vat').attr('data-enable-vat') === '1') {

	        if($('.invoice-vat').attr('data-vat-method') === '1') {
		        $('.invoice-vat').text(((vat / 100) * finalTotal).toFixed(2));
		        $('#invoice_vat').val(((vat / 100) * finalTotal).toFixed(2));
	            $('.invoice-total').text((finalTotal).toFixed(2));
	            $('#invoice_total').val((finalTotal).toFixed(2));
	        } else {
	            $('.invoice-vat').text(((vat / 100) * finalTotal).toFixed(2));
	            $('#invoice_vat').val(((vat / 100) * finalTotal).toFixed(2));
		        $('.invoice-total').text((finalTotal + ((vat / 100) * finalTotal)).toFixed(2));
		        $('#invoice_total').val((finalTotal + ((vat / 100) * finalTotal)).toFixed(2));
	        }
		} else {
			$('.invoice-total').text((finalTotal).toFixed(2));
			$('#invoice_total').val((finalTotal).toFixed(2));
		}

		// remove vat
    	if($('input.remove_vat').is(':checked')) {
	        $('.invoice-vat').text("0.00");
	        $('#invoice_vat').val("0.00");
            $('.invoice-total').text((finalTotal).toFixed(2));
            $('#invoice_total').val((finalTotal).toFixed(2));
	    }

	}

	function actionAddUser() {

		var errorCounter = validateForm();

		if (errorCounter > 0) {
		    $("#response").removeClass("alert-success").addClass("alert-warning").fadeIn();
		    $("#response .message").html("<strong>Error</strong>: It appear's you have forgotten to complete something!");
		    $("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
		} else {

			$(".required").parent().removeClass("has-error");

			var $btn = $("#action_add_user").button("loading");

			$.ajax({

				url: 'response.php',
				type: 'POST',
				data: $("#add_user").serialize(),
				dataType: 'json',
				success: function(data){
					$("#response .message").html("<strong>" + data.status + "</strong>: " + data.message);
					$("#response").removeClass("alert-warning").addClass("alert-success").fadeIn();
					$("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
					$btn.button("reset");
				},
				error: function(data){
					$("#response .message").html("<strong>" + data.status + "</strong>: " + data.message);
					$("#response").removeClass("alert-success").addClass("alert-warning").fadeIn();
					$("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
					$btn.button("reset");
				}

			});
		}

	}

	function actionAddProduct() {

		var errorCounter = validateForm();

		if (errorCounter > 0) {
		    $("#response").removeClass("alert-success").addClass("alert-warning").fadeIn();
		    $("#response .message").html("<strong>Error</strong>: It appear's you have forgotten to complete something!");
		    $("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
		} else {

			$(".required").parent().removeClass("has-error");

			var $btn = $("#action_add_product").button("loading");

			$.ajax({

				url: 'response.php',
				type: 'POST',
				data: $("#add_product").serialize(),
				dataType: 'json',
				success: function(data){
					$("#response .message").html("<strong>" + data.status + "</strong>: " + data.message);
					$("#response").removeClass("alert-warning").addClass("alert-success").fadeIn();
					$("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
					$btn.button("reset");
				},
				error: function(data){
					$("#response .message").html("<strong>" + data.status + "</strong>: " + data.message);
					$("#response").removeClass("alert-success").addClass("alert-warning").fadeIn();
					$("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
					$btn.button("reset");
				}

			});
		}

	}

	function actionCreateCustomer(){

		var errorCounter = validateForm();

		if (errorCounter > 0) {
		    $("#response").removeClass("alert-success").addClass("alert-warning").fadeIn();
		    $("#response .message").html("<strong>Error</strong>: It appear's you have forgotten to complete something!");
		    $("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
		} else {

			var $btn = $("#action_create_customer").button("loading");

			$(".required").parent().removeClass("has-error");

			$.ajax({

				url: 'response.php',
				type: 'POST',
				data: $("#create_customer").serialize(),
				dataType: 'json',
				success: function(data){
					$("#response .message").html("<strong>" + data.status + "</strong>: " + data.message);
					$("#response").removeClass("alert-warning").addClass("alert-success").fadeIn();
					$("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
					$("#create_customer").before().html("<a href='./customer-add.php' class='btn btn-primary'>Add New Customer</a>");
					$("#create_cuatomer").remove();
					$btn.button("reset");
				},
				error: function(data){
					$("#response .message").html("<strong>" + data.status + "</strong>: " + data.message);
					$("#response").removeClass("alert-success").addClass("alert-warning").fadeIn();
					$("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
					$btn.button("reset");
				} 

			});
		}

	}

	function actionCreateInvoice(){

		var errorCounter = validateForm();

		if (errorCounter > 0) {
		    $("#response").removeClass("alert-success").addClass("alert-warning").fadeIn();
		    $("#response .message").html("<strong>Error</strong>: It appear's you have forgotten to complete something!");
		    $("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
		} else {

			var $btn = $("#action_create_invoice").button("loading");

			$(".required").parent().removeClass("has-error");
			$("#create_invoice").find(':input:disabled').removeAttr('disabled');

			$.ajax({

				url: 'response.php',
				type: 'POST',
				data: $("#create_invoice").serialize(),
				dataType: 'json',
				success: function(data){
					$("#response .message").html("<strong>" + data.status + "</strong>: " + data.message);
					$("#response").removeClass("alert-warning").addClass("alert-success").fadeIn();
					$("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
					$("#create_invoice").before().html("<a href='../invoice-add.php' class='btn btn-primary'>Create new invoice</a>");
					$("#create_invoice").remove();
					$btn.button("reset");
				},
				error: function(data){
					$("#response .message").html("<strong>" + data.status + "</strong>: " + data.message);
					$("#response").removeClass("alert-success").addClass("alert-warning").fadeIn();
					$("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
					$btn.button("reset");
				} 

			});
		}

	}

   	function deleteProduct(productId) {

        jQuery.ajax({

        	url: 'response.php',
            type: 'POST', 
            data: productId,
            dataType: 'json', 
            success: function(data){
				$("#response .message").html("<strong>" + data.status + "</strong>: " + data.message);
				$("#response").removeClass("alert-warning").addClass("alert-success").fadeIn();
				$("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
				$btn.button("reset");
			},
			error: function(data){
				$("#response .message").html("<strong>" + data.status + "</strong>: " + data.message);
				$("#response").removeClass("alert-success").addClass("alert-warning").fadeIn();
				$("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
				$btn.button("reset");
			} 
    	});

   	}

   	function deleteUser(userId) {

        jQuery.ajax({

        	url: 'response.php',
            type: 'POST', 
            data: userId,
            dataType: 'json', 
            success: function(data){
				$("#response .message").html("<strong>" + data.status + "</strong>: " + data.message);
				$("#response").removeClass("alert-warning").addClass("alert-success").fadeIn();
				$("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
				$btn.button("reset");
			},
			error: function(data){
				$("#response .message").html("<strong>" + data.status + "</strong>: " + data.message);
				$("#response").removeClass("alert-success").addClass("alert-warning").fadeIn();
				$("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
				$btn.button("reset");
			} 
    	});

   	}

	function deleteCustomer(userId) {

        jQuery.ajax({

        	url: 'response.php',
            type: 'POST', 
            data: userId,
            dataType: 'json', 
            success: function(data){
				$("#response .message").html("<strong>" + data.status + "</strong>: " + data.message);
				$("#response").removeClass("alert-warning").addClass("alert-success").fadeIn();
				$("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
			},
			error: function(data){
				$("#response .message").html("<strong>" + data.status + "</strong>: " + data.message);
				$("#response").removeClass("alert-success").addClass("alert-warning").fadeIn();
				$("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
			} 
    	});

   	}

   	function emailInvoice(invoiceId) {

        jQuery.ajax({

        	url: 'response.php',
            type: 'POST', 
            data: invoiceId,
            dataType: 'json', 
            success: function(data){
				$("#response .message").html("<strong>" + data.status + "</strong>: " + data.message);
				$("#response").removeClass("alert-warning").addClass("alert-success").fadeIn();
				$("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
			},
			error: function(data){
				$("#response .message").html("<strong>" + data.status + "</strong>: " + data.message);
				$("#response").removeClass("alert-success").addClass("alert-warning").fadeIn();
				$("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
			} 
    	});

   	}

   	function deleteInvoice(invoiceId) {

        jQuery.ajax({

        	url: 'response.php',
            type: 'POST', 
            data: invoiceId,
            dataType: 'json', 
            success: function(data){
				$("#response .message").html("<strong>" + data.status + "</strong>: " + data.message);
				$("#response").removeClass("alert-warning").addClass("alert-success").fadeIn();
				$("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
				$btn.button("reset");
			},
			error: function(data){
				$("#response .message").html("<strong>" + data.status + "</strong>: " + data.message);
				$("#response").removeClass("alert-success").addClass("alert-warning").fadeIn();
				$("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
				$btn.button("reset");
			} 
    	});

   	}

   	function updateProduct() {

   		var $btn = $("#action_update_product").button("loading");

        jQuery.ajax({

        	url: 'response.php',
            type: 'POST', 
            data: $("#update_product").serialize(),
            dataType: 'json', 
            success: function(data){
				$("#response .message").html("<strong>" + data.status + "</strong>: " + data.message);
				$("#response").removeClass("alert-warning").addClass("alert-success").fadeIn();
				$("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
				$btn.button("reset");
			},
			error: function(data){
				$("#response .message").html("<strong>" + data.status + "</strong>: " + data.message);
				$("#response").removeClass("alert-success").addClass("alert-warning").fadeIn();
				$("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
				$btn.button("reset");
			} 
    	});

   	}

   	function updateUser() {

   		var $btn = $("#action_update_user").button("loading");

        jQuery.ajax({

        	url: 'response.php',
            type: 'POST', 
            data: $("#update_user").serialize(),
            dataType: 'json', 
            success: function(data){
				$("#response .message").html("<strong>" + data.status + "</strong>: " + data.message);
				$("#response").removeClass("alert-warning").addClass("alert-success").fadeIn();
				$("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
				$btn.button("reset");
			},
			error: function(data){
				$("#response .message").html("<strong>" + data.status + "</strong>: " + data.message);
				$("#response").removeClass("alert-success").addClass("alert-warning").fadeIn();
				$("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
				$btn.button("reset");
			} 
    	});

   	}

   	function updateCustomer() {

   		var $btn = $("#action_update_customer").button("loading");

        jQuery.ajax({

        	url: 'response.php',
            type: 'POST', 
            data: $("#update_customer").serialize(),
            dataType: 'json', 
            success: function(data){
				$("#response .message").html("<strong>" + data.status + "</strong>: " + data.message);
				$("#response").removeClass("alert-warning").addClass("alert-success").fadeIn();
				$("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
				$btn.button("reset");
			},
			error: function(data){
				$("#response .message").html("<strong>" + data.status + "</strong>: " + data.message);
				$("#response").removeClass("alert-success").addClass("alert-warning").fadeIn();
				$("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
				$btn.button("reset");
			} 
    	});

   	}

   	function updateInvoice() {

   		var $btn = $("#action_update_invoice").button("loading");
   		$("#update_invoice").find(':input:disabled').removeAttr('disabled');

        jQuery.ajax({

        	url: 'response.php',
            type: 'POST', 
            data: $("#update_invoice").serialize(),
            dataType: 'json', 
            success: function(data){
				$("#response .message").html("<strong>" + data.status + "</strong>: " + data.message);
				$("#response").removeClass("alert-warning").addClass("alert-success").fadeIn();
				$("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
				$btn.button("reset");
			},
			error: function(data){
				$("#response .message").html("<strong>" + data.status + "</strong>: " + data.message);
				$("#response").removeClass("alert-success").addClass("alert-warning").fadeIn();
				$("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
				$btn.button("reset");
			} 
    	});

   	}

   	function downloadCSV(action) {

   		jQuery.ajax({

   			url: 'response.php',
   			type: 'POST',
   			data: action,
   			dataType: 'json',
   			success: function(data){
				$("#response .message").html("<strong>" + data.status + "</strong>: " + data.message);
				$("#response").removeClass("alert-warning").addClass("alert-success").fadeIn();
				$("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
			},
			error: function(data){
				$("#response .message").html("<strong>" + data.status + "</strong>: " + data.message);
				$("#response").removeClass("alert-success").addClass("alert-warning").fadeIn();
				$("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
			} 
   		});

   	}

   	// login function
	function actionLogin() {

		var errorCounter = validateForm();

		if (errorCounter > 0) {

		    $("#response").removeClass("alert-success").addClass("alert-warning").fadeIn();
		    $("#response .message").html("<strong>Error</strong>: Missing something are we? check and try again!");
		    $("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);

		} else {

			var $btn = $("#btn-login").button("loading");

			jQuery.ajax({
				url: 'response.php',
				type: "POST",
				data: $("#login_form").serialize(), // serializes the form's elements.
				dataType: 'json',
				success: function(data){
					$("#response .message").html("<strong>" + data.status + "</strong>: " + data.message);
					$("#response").removeClass("alert-warning").addClass("alert-success").fadeIn();
					$("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
					$btn.button("reset");

					window.location = "dashboard.php";
				},
				error: function(data){
					$("#response .message").html("<strong>" + data.status + "</strong>: " + data.message);
					$("#response").removeClass("alert-success").addClass("alert-warning").fadeIn();
					$("html, body").animate({ scrollTop: $('#response').offset().top }, 1000);
					$btn.button("reset");
				}

			});

		}
		
	}

   	function validateForm() {
	    // error handling
	    var errorCounter = 0;

	    $(".required").each(function(i, obj) {

	        if($(this).val() === ''){
	            $(this).parent().addClass("has-error");
	            errorCounter++;
	        } else{ 
	            $(this).parent().removeClass("has-error"); 
	        }


	    });

	    return errorCounter;
	}

});