/* j500.js */

(function($){

	$('.overhead-image').each(function(){
		var h = $(this).height();
		$(this).css({
			'top': '50%',
			'margin-top': '-' + h/2 + 'px'
		})
	})

})(jQuery);