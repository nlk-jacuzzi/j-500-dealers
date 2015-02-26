<?php
/**
 * The header for our theme.
 *
 * Displays all of the <head> section and everything up till <div id="content">
 *
 * @package J 500 Dealers
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?> ng-app="myApp">
<head>
<base href="/hot-tubs/j-500/">	
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="profile" href="http://gmpg.org/xfn/11">
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
	
	<link href="<?php bloginfo('template_url'); ?>/css/bootstrap.min.css" rel="stylesheet">
	<link href="<?php bloginfo('template_url'); ?>/css/jquery.bxslider.css" rel="stylesheet">
	<link href="<?php bloginfo('template_url'); ?>/css/styles.css" rel="stylesheet">

	<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
	<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
	<!--[if lt IE 9]>
		<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
		<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
	<![endif]-->

	<link rel="apple-touch-icon" href="<?php bloginfo('template_url'); ?>/images/apple-touch-icon.png"/>
<?php wp_head(); ?>
</head>

<body ng-controller="MainCtrl as main" class="container-fluid">
	<?php if ( function_exists( 'gtm4wp_the_gtm_tag' ) ) { gtm4wp_the_gtm_tag(); } ?>
	<nav class="navbar navbar-default" role="navigation">
		<div class="">
			<!-- Brand and toggle get grouped for better mobile display -->
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="Introduction" ng-click="showForm = false">
					<img alt="Jacuzzi" src="<?php bloginfo('template_url'); ?>/images/logo.png">
				</a>
				<?php /* <h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>*/?>
			</div>

			<!-- Collect the nav links, forms, and other content for toggling -->
			<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
				<ul class="nav navbar-nav">
					<li ng-class="{ active: isActive('/Introduction')}"><a href="Introduction">Introduction</a></li>
					<li ng-class="{ active: isActive('/Design')}"><a href="Design">Design</a></li>
					<li ng-class="{ active: isActive('/Hydromassage')}"><a href="Hydromassage">Hydromassage</a></li>
					<li ng-class="{ active: isActive('/Technology')}"><a href="Technology">Technology</a></li>
					<li ng-class="{ active: isActive('/Specifications')}"><a href="Specifications">Specifications</a></li>
					<li><a href="/hot-tubs/dealer-locator/">Locate a Dealer</a></li>
				</ul>
				<ul class="nav navbar-nav navbar-right">
					<li><a class="btn btn-primary navbar-btn" role="button" href="Order">Be the first to own the J-500&trade;</a></li>
				</ul>
			</div><!-- /.navbar-collapse -->
		</div><!-- /.container-fluid -->
	</nav>
