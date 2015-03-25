<?php
/**
 * The main template file.
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 *
 * @package J 500 Dealers
 */

get_header(); ?>

<div class="container-fluid container-frame">
		<div class="col-xs-16 full-height page {{page.name}} {{page.styles}}" ng-view></div>
</div>
		
<?php get_footer(); ?>
