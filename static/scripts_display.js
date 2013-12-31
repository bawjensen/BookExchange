$(function() {
	var dataStore = new Firebase('https://wubex.firebaseio.com/'); // instantiate Firebase object
	var template;
	
	$.get('/static/template.html', function(data) {
		template = data;
	});

	dataStore.on('child_added', function(dataSnapshot) {
		var data = dataSnapshot.val();

		if (data.type == 'offer' && $('.sellDisplayArea').length) {
			var tempTemplate = template;

			tempTemplate = tempTemplate.replace("{title}", data.title);
			tempTemplate = tempTemplate.replace("{class}", data.class);
			tempTemplate = tempTemplate.replace("{price}", data.price);
			tempTemplate = tempTemplate.replace("{added}", timeAgo(data.added));
			tempTemplate = tempTemplate.replace("{seller}", data.owner);

			$('.sellDisplayArea').append(tempTemplate);
		}

		else if (data.type == 'request' && $('.buyDisplayArea').length) {
			var tempTemplate = template;

			tempTemplate = tempTemplate.replace("{title}", data.title);
			tempTemplate = tempTemplate.replace("{class}", data.class);
			tempTemplate = tempTemplate.replace("{price}", data.price);
			tempTemplate = tempTemplate.replace("{added}", timeAgo(data.added));
			tempTemplate = tempTemplate.replace("{seller}", data.owner);

			$('.buyDisplayArea').append(tempTemplate);
		}
	});

	dataStore.on('child_removed', function(dataSnapshot) {
		var data = dataSnapshot.val();

		console.log('Book removed which was created at: ' + data.added);
	});

	dataStore.on('child_changed', function(dataSnapshot) {
		var data = dataSnapshot.val();

		console.log('Book modified which was created at: ' + data.added);
	});

	function timeAgo (millisecondsSinceEpoch) {
		var elapsedTime = (new Date().getTime() - millisecondsSinceEpoch) / 1000;

		if (elapsedTime < 1) {
			return '0 seconds';
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
});