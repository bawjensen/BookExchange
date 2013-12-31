$(function() {
	var dataStore = new Firebase('https://wubex.firebaseio.com/'); // instantiate Firebase object
	console.log('Firebase datastore created');

	dataStore.on('child_added', function(dataSnapshot) {
		var data = dataSnapshot.val();
		var template = $("script[type='text/template']").html();

		template = template.replace("{title}", data.title);
		template = template.replace("{class}", data.class);
		template = template.replace("{price}", data.price);
		template = template.replace("{added}", timeAgo(data.added));
		template = template.replace("{seller}", data.owner);

		$("script[type='text/template']").parent().append(template);
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


		for (var i = 0; i < secondsArray.length - 1; i++) {
			var convertedUnits = elapsedTime / secondsArray[i];

			if (convertedUnits >= 1) {
				convertedUnits = Math.round(convertedUnits);
				return 'created ' + convertedUnits + ' ' + labelsArray[i] + (convertedUnits > 1 ? 's' : '') + ' ago';
			}
		}
	}
});