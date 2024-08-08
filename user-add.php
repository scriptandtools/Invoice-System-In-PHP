<?php

include('header.php');

?>

<h1>Add User</h1>
<hr>

<div id="response" class="alert alert-success" style="display:none;">
	<a href="#" class="close" data-dismiss="alert">&times;</a>
	<div class="message"></div>
</div>
						
<div class="row">
	<div class="col-xs-12">
		<div class="panel panel-default">
			<div class="panel-heading">
				<h4>User Information</h4>
			</div>
			<div class="panel-body form-group form-group-sm">
				<form method="post" id="add_user">
					<input type="hidden" name="action" value="add_user">

					<div class="row">
						<div class="col-xs-4">
							<input type="text" class="form-control margin-bottom required" name="name" placeholder="Name">
						</div>
						<div class="col-xs-4">
							<input type="text" class="form-control margin-bottom required" name="username" placeholder="Enter username">
						</div>
						<div class="col-xs-4">
							<input type="text" class="form-control margin-bottom required" name="email" placeholder="Enter user's email address">
						</div>
					</div>

					<div class="row">
						<div class="col-xs-4">
							<input type="text" class="form-control" name="phone" placeholder="Enter user's phone number">
						</div>
						<div class="col-xs-4">
							<input type="password" class="form-control required" name="password" id="password" placeholder="Enter user's password">
						</div>
					</div>

					<div class="row">
						<div class="col-xs-12 margin-top btn-group">
							<input type="submit" id="action_add_user" class="btn btn-success float-right" value="Add user" data-loading-text="Adding...">
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
<div>

<?php
	include('footer.php');
?>