/*
	Bubbles!
	Author: Atticus White
	Description: A bubble plugin for Alex Holden

*/




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
			y_dir: 1
		};
		
		/* extendable settings */
		var settings = {
			elipse_height: 300,
			start_height: 300, 
			right: 0,
			url: window.location,
			float_speed: 12
		};
		
		/* mutual exclusion */
		var lock = {
			click: false,
			hover: false
		};
	
		/* core methods */
		var methods = {
			init: function(){
				$(bubble).css('position', 'absolute');
				$(bubble).css('right', settings.right );
				$(bubble).css('top', settings.start_height  + 'px');
				$(bubble).click(methods.click);
				$(bubble).hover(methods.hover, methods.hoverOut);
				globals.bubbles.push(bubble);
				loops.float();
			},
			// clicking a bubble
			click: function(){
				loops.click(5);
			},
			// hoving a bubble
			hover: function(){
				lock.hover = true;
				loops.jiggle();
			},
			
			// hover out of a bubble
			hoverOut: function(){
				lock.hover = false;
				$(".bubble img").removeClass();
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
		
		var loops = {
			click: function(count){
				count--;
				loops.expand();
				//alert("CLICK, CYCLE " + count);
				if (count > 0){
					//setTimeout(loops.click(count), 15);
				}
			},
			float: function(reset){
				var x_current = $(bubble).offset().left;
				var y_current = $(bubble).offset().top;
				if (reset != null){
					if (reset){
						$(bubble).css("left", "800px");
					}
				}
				if (!lock.hover && !lock.click){
					var x_next = x_current - 2;
					
					
				$(bubble).css("left", x_next + "px");
				

					
					if ( (y_current < settings.start_height - settings.elipse_height/2) ||
						 (y_current < 120)){
						bubble_data.y_dir = 1;
					}
					if ( (y_current > settings.start_height + settings.elipse_height/2) ||
						 (y_current > $(window).height() - 120)){
						bubble_data.y_dir = -1;
					}
					
					var y_next = y_current + bubble_data.y_dir + "px";
				
					$(bubble).css("top", y_next);
				}
				if (x_current < -($(bubble).width())){
						
				
				}
				if (x_current > -120){
					setTimeout(loops.float, settings.float_speed+5);		
				} else {
					$(bubble).css("left", $(window).width() + $(bubble).width() + "px");
					setTimeout(loops.float(true), 1000);
				}
				
			},
			jiggle: function(){
				$(bubble_img).removeClass().addClass('shake')
				
			},
			launch: function(_speed, startHeight, y_int){
				var y_current = $(bubble).offset().top;
				var y_next = y_current - 1;
				var speed = 3;
				var bubbles = 1;
				
				
				if (_speed != null){
					speed = _speed;
				}
				if (startHeight != null){
					y_start = startHeight; 
				}
				
				if (Math.abs(y_start - y_current) > 100){
					if (speed > 10){
						speed -= 10;
					}
					bubbles = 6;
					y_next = y_current - 12;
					console.log('faster');
				}
				
				$(bubble).css('top', y_next + 'px');
				methods.shootBubble(bubbles);
				if (y_current > -140){
					setTimeout(loops.launch, speed);
				} else {
					setTimeout(function(){
						alert("pop! redirect to bubble's page");
						//window.location = settings.url;
					}, 1000);
				}
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
								loops.launch(40, $(bubble).offset().top, 1);
								
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