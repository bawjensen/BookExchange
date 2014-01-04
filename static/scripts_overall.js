$(function() {
	var currentUser;
	var template;

	var initialFadeInTime = 1250;

	var dataStore = new Firebase('https://wubex.firebaseio.com/'); // instantiate Firebase object
	var auth = new FirebaseSimpleLogin(dataStore, function(err, user) {
		if (err) {
			switch(err.code) {
				case 'INVALID_USER':
				case 'INVALID_PASSWORD': alert('Email-password pair was invalid.'); break;
			}
			console.log(err);
			$('.displayLink').hide().html('Log In | Sign Up').fadeIn(initialFadeInTime);
		}
		else if (user) {
			currentUser = user.email.split(/@/g)[0];
			var names = currentUser.split(/_/);

			currentUser = toTitleCase(names[1] + ' ' + names[0]);

			// console.log(currentUser + ' logged in.');

			$('.displayLink').html( 'Welcome, ' + currentUser ).hide().fadeIn(initialFadeInTime);
		}
		else {
			// console.log('User logged out.');

			currentUser = undefined;
			
			$('.displayLink').hide().html('Log In | Sign Up').fadeIn(initialFadeInTime);
		}

		clearDisplayAreas();

		$.get('/static/template.html', function(data) {
			template = data;

			setUpFirebaseCallbacks();
		});
	});

	// ------------------------------------------------------------------------------------

	$('.displayLink').click(function() {
		$(this).siblings('.logInArea').slideToggle(400);
	});

	$('input[type=submit]#logIn').click(function() {
		event.preventDefault();

		var username = $(this).siblings('#username').val();
		var password = $(this).siblings('#password').val();

		auth.login('password', {
			email: username,
			password: password
		});
	});

	$('input[type=submit]#signUp').click(function() {
		event.preventDefault();

		var username = $(this).siblings('#username').val();
		var password = $(this).siblings('#password').val();

		var emailDomain = username.split(/@/)[1];

		if (emailDomain != 'wheatoncollege.edu' && emailDomain != 'wheatonma.edu') {
			alert('The email format was incorrect (it has to be a Wheaton email)');
			return;
		}

		auth.createUser(username, password, function(err, user) {
			if (!err) {
				console.log(user.email + ' signed up.');
				auth.login('password', {
					email: $('#username').val(),
					password: $('#password').val()
				});
			}
			else {
				if (err.code == 'EMAIL_TAKEN') {
					alert('Email already in use.');
				}
				else {
					alert('Error creating user.');
					alert(err);
					console.log(err);
				}
			}
		});
	});

	$('input[type=submit]#logOut').click(function() {
		event.preventDefault();

		auth.logout();
	});

	if (window.location.pathname == '/create') {
		$.get('/static/classes.html', function(data) {
			$('#class').append(data);
		});

		$('#price').keypress(function (e) {
			if (e.keyCode == 13) {
				var className = $('#class').val().substring(0, 8).replace(/ /g, '-');
				var title = $('#title').val();
				var price = $('#price').val();
				var type = $('#type option:selected').attr('id');

				dataStore.push({
					'title' : title,
					'class' : className,
					'price' : price,
					'added' : new Date().getTime(),
					'owner' : currentUser,
					'type'  : type
				});

				$('#class').val('');
				$('#title').val('');
				$('#price').val('');
			}
		});
	}

	// ------------------------------------------------------------------------------------

	function clearDisplayAreas() {
		$('.displayArea').html('').fadeIn(initialFadeInTime);
	}

	function setUpFirebaseCallbacks() {
		dataStore.on('child_added', function(dataSnapshot) {
			var data = dataSnapshot.val();

			if (data.owner == currentUser) {
				$('.personalDisplayArea').append( fillTemplate(template, data, dataSnapshot.name()) );
			}

			else if (data.type == 'offer' && $('.sellDisplayArea').length) {
				$('.sellDisplayArea').append( fillTemplate(template, data, dataSnapshot.name()) );
			}

			else if (data.type == 'request' && $('.buyDisplayArea').length) {
				$('.buyDisplayArea').append( fillTemplate(template, data, dataSnapshot.name()) );
			}
		});

		dataStore.on('child_removed', function(dataSnapshot) {
			var data = dataSnapshot.val();

			$('#'+dataSnapshot.name()).remove();

			console.log('Book removed which was created at: ' + data.added);
		});

		dataStore.on('child_changed', function(dataSnapshot) {
			var data = dataSnapshot.val();

			// $('#'+dataSnapshot.name()).css('background-color', '#BBBBBB');

			console.log('Book modified which was created at: ' + data.added);
		});
	}

	function fillTemplate(template, data, id) {
		template = template.replace("{id}", id);
		template = template.replace("{title}", data.title);
		template = template.replace("{class}", data.class);
		template = template.replace("{price}", data.price);
		template = template.replace("{added}", timeAgo(data.added));
		template = template.replace("{seller}", data.owner);

		return template;

	}

	function cookieGet(name) {
		var value = "; " + document.cookie;
		var parts = value.split("; " + name + "=");
		if (parts.length == 2) return parts.pop().split(";").shift();
	}

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