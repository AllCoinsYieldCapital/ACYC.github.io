$(function() {

	"use strict";


	$(document).ready(function(){

		// clock
		var countDownDate = new Date("April 4, 2019 15:37:25").getTime();
        var x = setInterval(function() {

            // Get todays date and time
            var now = new Date().getTime();

            // Find the distance between now an the count down date
            var distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Display the result in the element with id="timer"
            document.getElementById("timer").innerHTML = "<div class='timer__item'><div class='timer__value'>" + days + "</div><div class='timer__item-title'>Days</div></div> <div class='timer__item'><div class='timer__value'>" + hours + "</div><div class='timer__item-title'>Hours</div></div> <div class='timer__item'><div class='timer__value'>"
            + minutes + "</div><div class='timer__item-title'>Minutes</div></div> <div class='timer__item'><div class='timer__value'>" + seconds + "</div><div class='timer__item-title'>Seconds</div></div> ";

            // If the count down is finished, write some text 
            if (distance < 0) {
                clearInterval(x);
                document.getElementById("timer").innerHTML = "EXPIRED";
            }
        }, 1000);

		// preloader 
		setTimeout(function(){
			$('.preloader').fadeOut();
		}, 500);

		// show first screen animation
		setTimeout(function(){
			$('.header').addClass('active');
			$('.promo').addClass('active');
		}, 600);

		// menu toggle btn 
		$('.btn-menu').click(function(){
			$('.fixed-menu').addClass('open');
		});

		$('.btn-close').click(function(){
			$('.fixed-menu').removeClass('open');
		});

		$(window).resize(function(){
			var ww = $(window).width();
			if(ww > 1200) {
				$('.fixed-menu').removeClass('open');
			}
		});

		


		// custom select
		$('.select').each(function(){
			var $this = $(this), numberOfOptions = $(this).children('option').length;
		  
			$this.addClass('select-hidden'); 
			$this.wrap('<div class="select"></div>');
			$this.after('<div class="select-styled"></div>');

			var $styledSelect = $this.next('div.select-styled');
			$styledSelect.text($this.children('option').eq(0).text());
		  
			var $list = $('<ul />', {
				'class': 'select-options'
			}).insertAfter($styledSelect);
		  
			for (var i = 0; i < numberOfOptions; i++) {
				$('<li />', {
					text: $this.children('option').eq(i).text(),
					rel: $this.children('option').eq(i).val()
				}).appendTo($list);
			}
		  
			var $listItems = $list.children('li');
		  
			$styledSelect.click(function(e) {
				e.stopPropagation();
				$('div.select-styled.active').not(this).each(function(){
					$(this).removeClass('active').next('ul.select-options').hide();
				});
				$(this).toggleClass('active').next('ul.select-options').fadeToggle();
			});
		  
			$listItems.click(function(e) {
				e.stopPropagation();
				$styledSelect.text($(this).text()).removeClass('active');
				$this.val($(this).attr('rel'));
				$list.fadeOut();
				//console.log($this.val());
			});
		  
			$(document).click(function() {
				$styledSelect.removeClass('active');
				$list.fadeOut();
			});
		 
		});

		

		// press  carousel 

		$(".press-carousel").owlCarousel({
			items: 1,
			dots: true,
		});
		
		// news carousel 

		$(".news-carousel").owlCarousel({
			items: 3,
			margin: 30,
			dots: true,
			responsive : {
				0 : {
					items: 1,
				},
				768 : {
					items: 2,
				},
				992 : {
					items: 3,
				}
			}
		});
	
		// counter up values
		$('.counter').countUp({
			'time': 2000,
			'delay': 10
		});

		$('.popup-youtube').magnificPopup({
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,

			fixedContentPos: false
		});

		// scroll 
		$('.menu__link').on('click', function(event) {
				   
			var target = $(this.getAttribute('href'));
			if( target.length ) {
				event.preventDefault();

				$('html, body').stop().animate({
					scrollTop: target.offset().top - 90
				}, 1000);


			} 
			
		});
		
		$('.mob-menu__link').on('click', function(event) {
			var target = $(this.getAttribute('href'));
			if( target.length ) {
				event.preventDefault();
				$('html, body').stop().animate({
					scrollTop: target.offset().top - 100
				}, 1000);
				$('.fixed-menu').removeClass('open');
			}
		});

		// scroll down btn

		$('.scroll-down').on('click', function(e) {
			$('html, body').animate({
				scrollTop: getHeight()
			}, 1000);
		});

		// accordion
		$('.accordion > li:eq(0) a').addClass('active').next().slideDown();

		$('.accordion a').click(function(j) {
			var dropDown = $(this).closest('li').find('p');

			$(this).closest('.accordion').find('p').not(dropDown).slideUp();

			if ($(this).hasClass('active')) {
				$(this).removeClass('active');
			} else {
				$(this).closest('.accordion').find('a.active').removeClass('active');
				$(this).addClass('active');
			}

			dropDown.stop(false, true).slideToggle();

			j.preventDefault();
		});

		// check inputs
		$(".form__input, .form__textarea").focus(function(){
			$(this).addClass("in");
		});
		$(".form__input, .form__textarea").focusout(function(){
			if($.trim($(this).val()) == ''){
		      $(this).removeClass('in')
		   } 
		});
		
		// form validation
        $("#contact-form").validate({
			rules: {
				 Email: {
					  required: true,
				 },
			},
			messages: {
				Email: {
				 required: "",
			   },
			 },
			submitHandler: function (form) {
				$.ajax({
					type: "POST",
					url: "/mail.php",
					data: $(form).serialize(),
					success: function () {
					  alert('Message sent');
					}
				});
				return false; // required to block normal submit since you used ajax
			}
		});

		$("#subscribe-form").validate({
			rules: {
				subscribe_email: {
					  required: true,
				 },
			},
			messages: {
				subscribe_email: {
				 required: "",
			   },
			 },
			submitHandler: function (form) {
				$.ajax({
					type: "POST",
					url: "/mail.php",
					data: $(form).serialize(),
					success: function () {
					  alert('Message sent');
					}
				});
				return false; // required to block normal submit since you used ajax
			}
		});

		// charts

		var ctx = document.getElementById("myChart");
		var myChart = new Chart(ctx, {
			type: 'doughnut',
			data: {
				labels: ["Red", "Blue", "Yellow", "Green", "Purple"],
				datasets: [{
					label: '# of Votes',
					data: [15, 18, 13, 9, 10],
					backgroundColor: [
						'#5874cf',
						'#f09790',
						'#8761a8',
						'#16bf86',
						'#ffae57',
					],
					
				}]
			},
			options: {
				legend: {
					display: false
				}
			}
		});

		// jarallax
		$('.jarallax').jarallax({
			speed: 0.6
		});

		// animation
		AOS.init({
			disable: 'mobile',
			duration: 1000,
			once: true
		});


	});

});

// sticky header
var $window = $(window);

function getHeight(){
    return $('.promo').outerHeight();
}

$window.on('scroll', function () {
	if ($window.scrollTop() > 1) {
		$('.header').addClass('sticky');
	} else {
		$('.header').removeClass('sticky');
	}
});



