<?php
/**
 * J 500 Dealers functions and definitions
 *
 * @package J 500 Dealers
 */

/**
 * Set the content width based on the theme's design and stylesheet.
 */
if ( ! isset( $content_width ) ) {
	$content_width = 640; /* pixels */
}

if ( ! function_exists( 'j_500_dealers_setup' ) ) :
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function j_500_dealers_setup() {

	/*
	 * Make theme available for translation.
	 * Translations can be filed in the /languages/ directory.
	 * If you're building a theme based on J 500 Dealers, use a find and replace
	 * to change 'j-500-dealers' to the name of your theme in all the template files
	 */
	load_theme_textdomain( 'j-500-dealers', get_template_directory() . '/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/*
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 */
	add_theme_support( 'title-tag' );

	/*
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * @link http://codex.wordpress.org/Function_Reference/add_theme_support#Post_Thumbnails
	 */
	//add_theme_support( 'post-thumbnails' );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus( array(
		'primary' => __( 'Primary Menu', 'j-500-dealers' ),
	) );

	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support( 'html5', array(
		'search-form', 'comment-form', 'comment-list', 'gallery', 'caption',
	) );

	/*
	 * Enable support for Post Formats.
	 * See http://codex.wordpress.org/Post_Formats
	 */
	add_theme_support( 'post-formats', array(
		'aside', 'image', 'video', 'quote', 'link',
	) );

	// Set up the WordPress core custom background feature.
	add_theme_support( 'custom-background', apply_filters( 'j_500_dealers_custom_background_args', array(
		'default-color' => 'ffffff',
		'default-image' => '',
	) ) );
}
endif; // j_500_dealers_setup
add_action( 'after_setup_theme', 'j_500_dealers_setup' );

/**
 * Register widget area.
 *
 * @link http://codex.wordpress.org/Function_Reference/register_sidebar
 */
function j_500_dealers_widgets_init() {
	register_sidebar( array(
		'name'          => __( 'Sidebar', 'j-500-dealers' ),
		'id'            => 'sidebar-1',
		'description'   => '',
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h1 class="widget-title">',
		'after_title'   => '</h1>',
	) );
	
	register_sidebar( array(
		'name'          => __( 'Sidebar', 'j-500-dealers' ),
		'id'            => 'sidebar-1',
		'description'   => '',
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h1 class="widget-title">',
		'after_title'   => '</h1>',
	) );
}
add_action( 'widgets_init', 'j_500_dealers_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function j_500_dealers_scripts() {
	wp_enqueue_style( 'j-500-dealers-style', get_stylesheet_uri() );
	
	wp_enqueue_script('angular-core', '//ajax.googleapis.com/ajax/libs/angularjs/1.3.4/angular.min.js', array('jquery'), null, false);
	wp_enqueue_script('angular-route', '//ajax.googleapis.com/ajax/libs/angularjs/1.3.4/angular-route.js', array('angular-core'), null, false);
	wp_enqueue_script('angular-animate', '//ajax.googleapis.com/ajax/libs/angularjs/1.3.4/angular-animate.js', array('angular-core'), null, false);
	wp_enqueue_script('angular-touch', '//ajax.googleapis.com/ajax/libs/angularjs/1.3.4/angular-touch.js', array('angular-core'), null, false);
	wp_enqueue_script('angular-sanitize', '//ajax.googleapis.com/ajax/libs/angularjs/1.0.3/angular-sanitize.js', array('angular-core'), null, false);
	wp_enqueue_script('appj500',  get_template_directory_uri() . '/js/app.js', array('angular-core'), null, false);
	wp_enqueue_script('bxslider', get_template_directory_uri() . '/js/jquery.bxslider.min.js', array('jquery'), null, false);
	wp_enqueue_script('controllerj500',  get_template_directory_uri() . '/js/controllers.js', array('angular-core'), null, false);
	wp_enqueue_script('bootstrap',  get_template_directory_uri() . '/js/bootstrap.min.js', array('jquery'), null, false);
	wp_enqueue_script('jsj500',  get_template_directory_uri() . '/js/j500.js', array('jquery'), null, false);
	
	//LOCALIZE
	wp_localize_script( 'angular-core', 'MyAjax', array( 'ajaxurl' => admin_url( 'admin-ajax.php' ), 'resturl' => get_bloginfo('wpurl').'/wp-json' ) );
	wp_localize_script( 'angular-core', 'Directory', array( 'url' => get_bloginfo('template_directory'), 'site' => get_bloginfo('wpurl')) );
	wp_localize_script( 'angular-core', 'wpApiOptions', array( 'base' => json_url(), 'nonce' => wp_create_nonce( 'wp_json' ), 'pagenonce' => wp_create_nonce( 'get_page_data' ),  'tubnonce' => wp_create_nonce( 'get_tub_data' )  ) );
		
	
}
add_action( 'wp_enqueue_scripts', 'j_500_dealers_scripts' );

/**
 * Implement the Custom Header feature.
 */
//require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Custom functions that act independently of the theme templates.
 */
require get_template_directory() . '/inc/extras.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
require get_template_directory() . '/inc/jetpack.php';

//GET NAV
add_action("wp_ajax_get_header_nav", "GetNav");
add_action("wp_ajax_nopriv_get_header_nav", "GetNav");

function GetNav(){
	$NavData = array();
	$menu_items = wp_get_nav_menu_items('Main Nav');
	foreach( $menu_items as $menu_item){
		//$NavData['title'] = $menu_item->title;
		//$NavData['id'] = url_to_postid($menu_item->ID);
		$NavData[] = array('id' => url_to_postid($menu_item->url), 'title' => $menu_item->title, 'type' => $menu_item->type_label, 'url' => $menu_item->url); 
	}
	//echo print_r($NavData);
	echo json_encode($NavData);
	die();
}


//GET POST ITEM
add_action("wp_ajax_get_page_data", "GetPostContent");
add_action("wp_ajax_nopriv_get_page_data", "GetPostContent");

function GetPostContent(){
		
		if ( !wp_verify_nonce( $_REQUEST['nonce'], "get_page_data")) {
		      exit("No naughty business please");
		}   

		$pagename = trim($_POST['pagename']);
				
		// call the function "get_post_by_name"
		$content_post = get_page_by_name($pagename);
		if($content_post)
		{
		    $post_id = $content_post->ID;
			$main_title = get_post_meta($post_id, 'wpcf-heading',true);
			$description = get_post_meta($post_id, 'wpcf-description',true);
			$learnmore = get_post_meta($post_id, 'wpcf-learn-more',true);
			$sliderimages = get_post_meta($post_id, 'wpcf-slider-images',false);
			
			$postData['heading'] = $main_title;
			$postData['desc'] = apply_filters('the_content', $description);
			$postData['learnmore'] = apply_filters('the_content', $learnmore);
			
			$sliders = array();
			
			if(isset($sliderimages) && is_array($sliderimages))
			{
				$count = 0;
				
				foreach($sliderimages as $sliderimage)
				{
					$count += 1;
					
					$temp = array();
					$temp['src'] = $sliderimage;
					
					$sliders[] = $temp;
				}
			}
			
			$postData['sliderimages'] = $sliders;
			
			
			$postData['post_content'] = apply_filters('the_content', $content);
			echo json_encode($postData);
		    
		}
				
		die();
}

function get_page_by_name($post_name, $post_type = 'page', $output = OBJECT) {
    global $wpdb;
    $post = $wpdb->get_var( $wpdb->prepare( "SELECT ID FROM $wpdb->posts WHERE post_name = %s AND post_type= %s", $post_name, $post_type ));
    if ( $post ) return get_post($post, $output);
    return null;
}


//GET POST ITEM
add_action("wp_ajax_get_tub_data", "GetTubContent");
add_action("wp_ajax_nopriv_get_tub_data", "GetTubContent");

function GetTubContent(){
		
		if ( !wp_verify_nonce( $_REQUEST['nonce'], "get_tub_data")) {
		      exit("No naughty business please");
		}   
		
		 $args = array('post_type' => 'tub', 'posts_per_page' => 2, 'orderby' => 'menu_order', 'order' => 'asc');
		 $the_query = new WP_Query( $args );
		
		 $tubs = array();
		 				
		 while ( $the_query->have_posts() ) : $the_query->the_post();
			$temp = array();
		 	$temp['name'] = get_the_title();
			$temp['id'] = get_post_meta(get_the_ID(), 'wpcf-id', true);
			$temp['seating'] = get_post_meta(get_the_ID(), 'wpcf-seating', true);
			$temp['lounge'] = get_post_meta(get_the_ID(), 'wpcf-lounge', true);
			$temp['jets'] = get_post_meta(get_the_ID(), 'wpcf-jets', true);
			
			$image_id = get_post_thumbnail_id();
			$image_url = wp_get_attachment_image_src($image_id,'full', true);
			$image_url[0];
			 
			$temp['image'] = $image_url[0];
			$tubs[] = $temp;
         endwhile;  wp_reset_postdata();
		 echo json_encode($tubs);		
		die();
}


