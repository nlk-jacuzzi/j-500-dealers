<?php
/**
 * Jetpack Compatibility File
 * See: http://jetpack.me/
 *
 * @package J 500 Dealers
 */

/**
 * Add theme support for Infinite Scroll.
 * See: http://jetpack.me/support/infinite-scroll/
 */
function j_500_dealers_jetpack_setup() {
	add_theme_support( 'infinite-scroll', array(
		'container' => 'main',
		'footer'    => 'page',
	) );
}
add_action( 'after_setup_theme', 'j_500_dealers_jetpack_setup' );
