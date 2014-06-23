$(function() {
	var currentUser;

	var dataStore = new Firebase('https://wubex.firebaseio.com/'); // instantiate Firebase object

	var auth = new FirebaseSimpleLogin(dataStore, function(err, user) {
		if (err) {
			// switch(err.code) {
			// 	case 'INVALID_USER':
			// 	case 'INVALID_PASSWORD': alert('The given email/password pair was invalid'); break;
			// }
			// console.log(err);
			// $('.displayLink').hide().html('Log In | Sign Up').fadeIn(initialFadeDelay);
		}
		else if (user) {
			// currentUser = user.email.split(/@/g)[0];
			// var names = currentUser.split(/_/);

			// currentUser = toTitleCase(names[1] + ' ' + names[0]);

			// $('.displayLink').html( 'Welcome, ' + currentUser ).hide().fadeIn(initialFadeDelay);
			// $('.logInArea').slideUp(logInSlideDelay);
		}
		else {
			// currentUser = undefined;
			
			// $('.displayLink').hide().html('Log In | Sign Up').fadeIn(initialFadeDelay);
		}

		// $.get('/static/offerTemplate.html', function(data) {
		// 	offerTemplate = data;

		// 	$.get('/static/requestTemplate.html', function(data) {
		// 		requestTemplate = data;

		// 		setUpFirebaseCallbacks();
		// 	});
		// });
	});

	// ------------------------------------------------------------------------------------

	$('input[type=submit]#logIn').click(function(event) {
		// event.preventDefault();

		// var username = $(this).siblings('#username').val();
		// var password = $(this).siblings('#password').val();

		// auth.login('password', {
		// 	email: username,
		// 	password: password
		// });
	});

	$('input[type=submit]#signUp').click(function(event) {
		// event.preventDefault();

		// var username = $(this).siblings('#username').val();
		// var password = $(this).siblings('#password').val();

		// var emailDomain = username.split(/@/)[1];

		// if (!(emailDomain == 'wheatoncollege.edu' || emailDomain == 'wheatonma.edu')) {
		// 	alert('The email format was incorrect (it has to be a Wheaton email)');
		// 	return;
		// }

		// auth.createUser(username, password, function(err, user) {
		// 	if (!err) {
		// 		console.log(user.email + ' signed up.');
		// 		auth.login('password', {
		// 			email: $('#username').val(),
		// 			password: $('#password').val()
		// 		});
		// 	}
		// 	else {
		// 		if (err.code == 'EMAIL_TAKEN') {
		// 			alert('Email already in use.');
		// 		}
		// 		else {
		// 			alert('Error creating user.');
		// 			alert(err);
		// 			console.log(err);
		// 		}
		// 	}
		// });
	});

	$('input[type=submit]#logOut').click(function(event) {
		// event.preventDefault();

		// auth.logout();
	});

	// ------------------------------------------------------------------------------------

	function toTitleCase(str) {
		return str.replace(/\w\S*/g, function(txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
	}


	function timeAgo (millisecondsSinceEpoch) {
		var elapsedTime = (new Date().getTime() - millisecondsSinceEpoch) / 1000;

		if (elapsedTime < 1) {
			return 'It\'s a newborn!';
		}

		var secondsArray = [ 60 * 60 * 24 * 30 * 12,
							 60 * 60 * 24 * 30,
							 60 * 60 * 24,
							 60 * 60,
							 60,
							 1 ]

		var labelsArray = [ 'year', 
							'month',
							'day',
							'hour',
							'minute',
							'second' ]


		for (var i = 0; i < secondsArray.length; i++) {
			var convertedUnits = elapsedTime / secondsArray[i];

			if (convertedUnits >= 1) {
				convertedUnits = Math.round(convertedUnits);
				return 'created ' + convertedUnits + ' ' + labelsArray[i] + (convertedUnits > 1 ? 's' : '') + ' ago';
			}
		}
	}

	// ------------------------------------------------------------------------------------
});