//activate tooltip
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip(); 
});

//switch the navbar animation
var flag = true;
var navAnimationOn;
var scrollHandler = function() {
	if ( $(window).scrollTop() > 54 && flag ==true ) {
		$('#page-header nav').css({
			'position': 'fixed',
			'top': '-54px',
			'width': '100%',
			'z-index': '1000'
		})
		.animate({
			top: '+=54px'
		}, 500);
		flag = false;
	} else if ( $(window).scrollTop() === 0 ) {
		flag = true;
	}
}

$(document).ready(function() {
	if ( $(window).width() >= 768 ) {
		$(window).on('scroll.myPlugin', scrollHandler);
		navAnimationOn = true;
	} else {
		$('#page-header nav').css({
			'position': 'fixed',
			'top': '0px',
			'width': '100%',
			'z-index': '1000'
		});
	}
});

$(window).resize(function() {
	if ( $(window).width() < 768 ) {
		$(window).off('scroll.myPlugin', scrollHandler);
		navAnimationOn = false;
	} else if ( $(window).width() >= 768 ) {
		if ( navAnimationOn === false ) {
			$(window).on('scroll.myPlugin', scrollHandler);
			navAnimationOn = true;
		} else return;
	}
});

//responsive button and menu
$('#nav-toggle').on('click', function() {
  this.classList.toggle('active');
});
$('#nav-toggle').click(function() {
  $('nav ul.nav-list').slideToggle(270);
});


//Login form Validation text
var username_fill = 'Please fill in your username.';
var username_match = 'This username is not registered';
var password_fill = 'Please fill in your password.';
var password_match = 'Your password does not match.';

//navbar form validation
var inputUsername1 = document.getElementById('topnav-username');
var inputPassword1 = document.getElementById('topnav-password');
checkValid(inputUsername1, username_fill, username_match);
checkValid(inputPassword1, password_fill, password_match);

//bottom form validation
var inputUsername2 = document.getElementById('bottom-username');
var inputPassword2 = document.getElementById('bottom-password');
checkValid(inputUsername2, username_fill, username_match);
checkValid(inputPassword2, password_fill, password_match);

//Check input element
function checkValid ( elem, notfilled, notmatch ) {
	elem.addEventListener('invalid', function (event) {
		if (elem.validity.valueMissing) {
			event.target.setCustomValidity(notfilled);
		} else if (elem.validity.patternMismatch) {
			event.target.setCustomValidity(notmatch);
		}
	}, false);

}

// Scroll to top
$(document).ready(function() {
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			$('#to-top').fadeIn();
		} else {
			$('#to-top').fadeOut();
		}
	});
	$('#to-top').click(function () {
		$('#to-top').tooltip('hide');
		scrollToTop();
		return false;
	});

	function scrollToTop(callback) {
	    if ($('html').scrollTop()) {
	        $('html').animate({ scrollTop: 0 }, 600, callback);
	        return;
	    }

	    if ($('body').scrollTop()) {
	        $('body').animate({ scrollTop: 0 }, 600, callback);
	        return;
	    }
	}
});

$(document).ready(function () {
	$('.modal').on('show.bs.modal', function () {
	    if ($(document).height() > $(window).height()) {
	        // no-scroll
	        $('body').addClass("modal-open-noscroll");
	    }
	    else {
	        $('body').removeClass("modal-open-noscroll");
	    }
	});
	$('.modal').on('hide.bs.modal', function () {
	    $('body').removeClass("modal-open-noscroll");
	});
});


//Clock
function updateClock ( )
 	{
 	var currentTime = new Date ( );
  	var currentHours = currentTime.getHours ( );
  	var currentMinutes = currentTime.getMinutes ( );
  	var currentSeconds = currentTime.getSeconds ( );

  	// Pad the seconds with leading zeros
  	currentSeconds = ( currentSeconds < 10 ) ? '0' + currentSeconds : currentSeconds;

  	// Pad the minutes with leading zeros
  	currentMinutes = ( currentMinutes < 10 ) ? '0' + currentMinutes : currentMinutes;

  	// Convert an hours component of "0" to "12"
  	currentHours = ( currentHours == 0 ) ? 12 : currentHours;

  	// Compose the string for display
  	var currentTimeString = currentHours + ":" + currentMinutes + ":" + currentSeconds + " ";
  	
  	
   	$("#time-text").html(currentTimeString);
   	  	
 }

$(document).ready(function()
{
   setInterval('updateClock()', 1000);
});