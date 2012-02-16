/*
	Bubbles!
	Author: Atticus White
	Description: A bubble plugin for Alex Holden

*/


jQuery.easing.sin = function(p, n, firstNum, diff) {
    return Math.sin(p * Math.PI / 2) * diff + firstNum;
};

jQuery.easing.cos = function(p, n, firstNum, diff) {
    return firstNum + diff - Math.cos(p * Math.PI / 2) * diff;
};

(function($){

	var globals = {
		bubbles: new Array()
	};

	// load the boostrap and away we go...
	jQuery.fn.bubbles = function(options){
		
		// bubble (container)
		var bubble;
		
		// bubble graphic
		var bubble_img;
		
		// bubble meta data
		var bubble_data = {
			y_dir: 1,
			x_dir: -1,
			x: 0,
			y: 0
		};
		
		var key = {
			elipse: new Array(),
			speed: new Array()
		};
		key.elipse['small'] = 50;
		key.elipse['medium'] = 75;
		key.elipse['large'] = 100;
		key.speed['slow'] = 900000;
		key.speed['medium'] = 800000;
		key.speed['fast'] = 600000;
		key.speed['random'] = 600000 + Math.floor(Math.random()*600000)

		
		/* extendable settings */
		var settings = {
			elipse_height: 'large',
			start_height: 300, 
			right: 0,
			url: window.location,
			float_speed: 12
		};
		
		/* mutual exclusion */
		var lock = {
			click: false,
			hover: false,
			launch: false
		};
	
		/* core methods */
		var methods = {
			init: function(){
				$(bubble).css('position', 'absolute');
				$(bubble).css('right', settings.right );
				$(bubble).css('top', settings.start_height  + 'px');
				$(bubble).css('z-index', '9999999');
				$(bubble).click(methods.click);
				$(bubble).hover(methods.hover, methods.hoverOut);
				globals.bubbles.push(bubble);
				loops.float(false);
				methods.preload();
			},
			// clicking a bubble
			click: function(){
				lock.launch = true;
				loops.expand();
			},
			// hoving a bubble
			hover: function(){
				if (!lock.launch){
					lock.hover = true;
					$(bubble).stop();
					loops.jiggle();
				}
			},
			
			// hover out of a bubble
			hoverOut: function(){
				if (!lock.launch){
					lock.hover = false;
					$(".bubble img").removeClass();
					loops.float(false, {
						x: $(bubble).offset().left,
						y: $(bubble).offset().top
					});
				}
			},
			
			// fire the bubble upwards
			shootBubble: function(num){
				if (num == null){
					num = 100;
				}
				for (var i=0; i<num; i++){
					rocketBubble.init(
						$(bubble).offset().top,
						$(bubble).offset().left
					);
				}
			},
			preload: function(){
				var img_preload = new Image();
				img_preload.src = "bubble1.png";
			},
			
			// check if a bubble collides with another
			checkCollisions: function(){
				
			}
		};
		
		/* the jet stream of bubbles */
		var rocketBubble = {
			locals : {
				obj: null,
				init_top: 0,
				init_left: 0,
				height: "20px",
				width: "20px", 
				id: null
			},
			
			// propagate
			init : function(top, left){
				this.locals.init_top = top;
				this.locals.init_left = left;
				
				// funnel bubbles from one position
				var funnel = 35 + Math.floor(Math.random()* 10);
				
				var obj = null;
				this.locals.obj = document.createElement('img');
				this.locals.obj.src = "bubble1.png";
				$(this.locals.obj).addClass('bubbleStream');
				$(this.locals.obj).css('top', top + 97 + "px");
				$(this.locals.obj).css('left', left + funnel + 'px');
				$(this.locals.obj).css('z-index', '10');
				$("body").append($(this.locals.obj));
				this.loop();
			},
			
			
			// main rocketbubble loop
			loop : function(){
				var bub_x = $(bubble).offset().left - 200;
				var y = Math.floor(Math.random()*300);
				var b = bub_x + Math.floor(Math.random() *500);
				var from_top = $(window).height();
				var speed = 300 + Math.floor(Math.random() * 900);
				$(this.locals.obj).animate({
					left: b + "px",
					top: from_top + "px"
				}, speed, function(){
					$(this).remove();
				});
			}
			
		}
		var p_vals = Array();
		var count = 0;

		var loops = {
			p_vals: Array(),
			p_count: 0,
			click: function(){
				loops.expand();
			},
			float: function(reset, startpos){
				var SineWave = SineWave = function() {
				    this.css = function(p) {
				    	var push = 0;
				    	var push_y = 0;
				    	if (reset){
				    		push = -100;
				    	}
				    	if (startpos != null){
				    			push = $(window).width() - startpos.x - settings.right - $(bubble).width();
				    			push_y =  startpos.y - settings.start_height;
				    	}
				        s = Math.sin((p-1)*500);  // 1
				        x = (5000 - p*5000) * 10; // 2
				        //y = s * 100 + 0;
				        y = s * key.elipse[settings.elipse_height];
				        var new_y = push_y + settings.start_height + y;
				        var new_x = push + settings.right + x;
						if (x < $(window).width() + push){
							bubble_data.y = new_y;
							bubble_data.x = new_x;
					        return {top: new_y + "px", right: new_x + "px"};
				        } else{
				        	$(bubble).stop();
				        	$(bubble).css('right', '-100px');
				        	$(bubble).delay(500);
				        	loops.float(true, startpos);
				        }
				    } 
				}
				var speed = 600000 + Math.floor(Math.random()*600000);
				$(bubble).stop().animate(
				    {path: new SineWave}, 
				    speed, // 3
				    "linear",
				    function(){
				    	$(bubble).css('right', '-200px');
				    	loops.float(false, startpos);
				    }
				);
			},
			jiggle: function(){
				$(bubble_img).removeClass().addClass('shake');
			},
			launch2: function(){
				$(bubble).stop().animate({
					top: "-150px"
				}, {
					duration: 1000,
					/*easing: "ease",*/
					step: function(t){
						methods.shootBubble(3);
					},
					complete: function(){
						setTimeout(function(){
							alert('pop! redirect to the bubble\'s page');
						}, 1000);
					}
				});
			},
			expand: function(){
				lock.click = true;
				var speed = 100;
				var change = "10px";
				$(bubble_img).animate({
					width: "+=" + change
				}, speed, function(){
					$(bubble_img).animate({
						width: "-=" + change
					}, speed, function(){
						$(bubble_img).animate({ 
							width: "+=" + change
						}, speed, function(){
							$(bubble_img).animate({
								width: "-=" + change
							}, speed, function(){
								// fire that bubble!
								//loops.launch(40, $(bubble).offset().top, 1);
								loops.launch2();
								
							});
						});
					});
				});
				
				
			}
		};
	
		
		if ( options ) { 
	        $.extend( settings, options );
	      }
		this.each(function(i,item){
			bubble = item;
			bubble_img =  $(item).find('.bubble-img');
			methods.init();
		});
		
		
	};
	
	
})(jQuery);