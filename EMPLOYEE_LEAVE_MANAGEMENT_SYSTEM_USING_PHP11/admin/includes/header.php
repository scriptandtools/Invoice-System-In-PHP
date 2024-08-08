        <div class="loader-bg"></div>
        <div class="loader">
            <div class="preloader-wrapper big active">
                <div class="spinner-layer spinner-blue">
                    <div class="circle-clipper left">
                        <div class="circle"></div>
                    </div><div class="gap-patch">
                    <div class="circle"></div>
                    </div><div class="circle-clipper right">
                    <div class="circle"></div>
                    </div>
                </div>
                <div class="spinner-layer spinner-spinner-teal lighten-1">
                    <div class="circle-clipper left">
                        <div class="circle"></div>
                    </div><div class="gap-patch">
                    <div class="circle"></div>
                    </div><div class="circle-clipper right">
                    <div class="circle"></div>
                    </div>
                </div>
                <div class="spinner-layer spinner-yellow">
                    <div class="circle-clipper left">
                        <div class="circle"></div>
                    </div><div class="gap-patch">
                    <div class="circle"></div>
                    </div><div class="circle-clipper right">
                    <div class="circle"></div>
                    </div>
                </div>
                <div class="spinner-layer spinner-green">
                    <div class="circle-clipper left">
                        <div class="circle"></div>
                    </div><div class="gap-patch">
                    <div class="circle"></div>
                    </div><div class="circle-clipper right">
                    <div class="circle"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mn-content fixed-sidebar">
            <header class="mn-header navbar-fixed">
                <nav class="cyan darken-1">
                    <div class="nav-wrapper row">
                        <section class="material-design-hamburger navigation-toggle">
                            <a href="#" data-activates="slide-out" class="button-collapse show-on-large material-design-hamburger__icon">
                                <span class="material-design-hamburger__layer"></span>
                            </a>
                        </section>
                        <div class="header-title col s3">      
                            <span class="chapter-title">ELMS | Admin</span>
                        </div>
                      
                        <ul class="right col s9 m3 nav-right-menu">
                        
                            <li class="hide-on-small-and-down"><a href="javascript:void(0)" data-activates="dropdown1" class="dropdown-button dropdown-right show-on-large"><i class="material-icons">notifications_none</i>
<?php 
$isread=0;
$sql = "SELECT id from tblleaves where IsRead=:isread";
$query = $dbh -> prepare($sql);
$query->bindParam(':isread',$isread,PDO::PARAM_STR);
$query->execute();
$results=$query->fetchAll(PDO::FETCH_OBJ);
$unreadcount=$query->rowCount();?>


                                <span class="badge"><?php echo htmlentities($unreadcount);?></span></a></li>
                            <li class="hide-on-med-and-up"><a href="javascript:void(0)" class="search-toggle"><i class="material-icons">search</i></a></li>
                        </ul>
                        
                        <ul id="dropdown1" class="dropdown-content notifications-dropdown">
                            <li class="notificatoins-dropdown-container">
                                <ul>
                                    <li class="notification-drop-title">Notifications</li>
<?php 
$isread=0;
$sql = "SELECT tblleaves.id as lid,tblemployees.FirstName,tblemployees.LastName,tblemployees.EmpId,tblleaves.PostingDate from tblleaves join tblemployees on tblleaves.empid=tblemployees.id where tblleaves.IsRead=:isread";
$query = $dbh -> prepare($sql);
$query->bindParam(':isread',$isread,PDO::PARAM_STR);
$query->execute();
$results=$query->fetchAll(PDO::FETCH_OBJ);
if($query->rowCount() > 0)
{
foreach($results as $result)
{               ?>  


                                    <li>
                                        <a href="leave-details.php?leaveid=<?php echo htmlentities($result->lid);?>">
                                        <div class="notification">
                                            <div class="notification-icon circle cyan"><i class="material-icons">done</i></div>
                                            <div class="notification-text"><p><b><?php echo htmlentities($result->FirstName." ".$result->LastName);?><br />(<?php echo htmlentities($result->EmpId);?>)</b> applied for leave</p><span>at <?php echo htmlentities($result->PostingDate);?></b</span></div>
                                        </div>
                                        </a>
                                    </li>
                                   <?php }} ?>
                                   
                                  
                        </ul>
                    </div>
                </nav>
            </header>