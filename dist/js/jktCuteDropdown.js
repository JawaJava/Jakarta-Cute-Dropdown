/*
 *
 * More info at https://github.com/JawaJava/Jakarta-Cute-Dropdown/blob/master/LICENSE
 *
 * Copyright (c) 2015, Jawa Java, Rudy Hermawan
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */

;(function($, window, document, undefined){
	if(typeof undefined !== "undefined") {
		undefined = void 0;
	}
	var n = 5000;

	$.fn.jktCD = function(options){
		var s = $.extend({
			cssName : 'jktCD',
			partClick : '.jktCD-click',
			partMain : '.jktCD-style-one',
			typeCursor : 'hover', // click | hover | both,
			triActive : true,
			mainLeft : 0,
			triLeft : 10
		}, options);
		
		//main name plugin
		var cssName_ = s.cssName;
		
		//temp data for replace data in style
		var temp_loop = '.data-loop-'+cssName_+'{}';
		
		//base in array data each declarate
		var base = $(this);
		var nameLeft;
		
		//n number of length, z_i for handle z-index per loop
		n -= base.length;
		var z_i = n--;
		
		//adding style area for plugin use
		if($('#hidden-part_'+cssName_).length == 0){
			$('body').append('<div id="hidden-part_'+cssName_+'" style="display:none"><style>'+temp_loop+'</style></div>');
		}	
			
		//to add new element css for plugin	usage
		function changeCss(css){
			var tg = $('#hidden-part_'+cssName_);
			var template = tg.html();

			//check exist of class
			var y = new RegExp(css);
			
			if( ! y.test(template)){
				template = template.replace(temp_loop, css+' '+temp_loop);
				tg.html(template);
			} 
		}		
				
		return this.each(function(e, y){			
			var this_click = $(this);
			
			//part element per loop
			var main_part = this_click.find('.'+cssName_+'-main');
			z_i--;
			
			if(e == 0) {
				nameLeft = cssName_+'-left-after-'+s.triLeft;
				
				//adding new css class element spesific of triangle on top of main box
				changeCss('.'+cssName_+'-main.'+nameLeft+':after{left:'+s.triLeft+'px !important;}');		
			}				
			
			//handle main box position
			if(s.mainLeft != 0) main_part.css({'left':s.mainLeft+'px'});			
			
			//adding with change display of triangle on main box
			if(s.triActive == false) main_part.toggleClass(cssName_+'-hide-after');
			
			//adding class on var nameLeft in main box for handle left from them
			if(s.triLeft != 10 && s.triLeft > 0) main_part.toggleClass(nameLeft);
		
			this_click.css({'position':'relative','z-index':z_i});
			
			var y = 'mouseenter click';
			
			//made change if desktop, option of click or mouseenter
			if( ! /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
				y = ((s.typeCursor == 'hover') ? 'mouseenter' : ((s.typeCursor == 'both') ? 'mouseenter click' : 'click'));
			}
		
			this_click.find(s.partClick).unbind(y);
			this_click.find(s.partClick).bind(y, function(e){
					e.stopPropagation();
					base.find('.'+cssName_+'-main').hide();
					var t = $(this).parent().find('.'+cssName_+'-main');
					t.toggle();					
				});
				
			$(document).unbind('click');
			$(document).bind('click', function(e){
					$(this).find('.'+cssName_+'-main').hide();
				});
		});
	};
})(jQuery, this, document);