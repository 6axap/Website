// Global namespace
var app = app || {};


/**
 * Basic useful function
 * @param  {something} arg Arguments to be passed to the function
 */
app.something = function(arg) {

  // Do something

}



/**
 * Print a tooltip with the image size (useful for bLazy breakpoints)
 * @param  {string}  	selector 	The targetted images
 * @param  {boolean} 	resize   	If set to true, update sizes on $window.resize();
 * @param  {boolean} 	scroll   	If set to true, update sizes on $window.scroll();
 */
app.imgSize = function(selector, resize, scroll) {

	var timer;

	$(selector).each(function(i, e) {

		var $this = $(this),
				width = $this.outerWidth(),
				height = $this.outerHeight();

		if ( $this.next('.size-tooltip').length ) {
			$this.next('.size-tooltip').html(width +' x '+ height);
		} else {
			$this.parent().append('<div class="size-tooltip">'+ width +' x '+ height +'</div>');
		}
	});

	if ( resize ) {
		$window.resize(function(event) {

			clearTimeout(timer);
			timer = setTimeout(function() {
				civa.imgSize(selector, true);
			}, 300);

		});
	}

	if ( scroll ) {
		$window.scroll(function(event) {

			clearTimeout(timer);
			timer = setTimeout(function() {
				civa.imgSize(selector, resize, true);
			}, 300);

		});
	}

}