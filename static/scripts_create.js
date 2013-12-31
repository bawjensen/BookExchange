$(function() {
	var dataStore = new Firebase('https://wubex.firebaseio.com/'); // instantiate Firebase object
	console.log('Created');

	$('#price').keypress(function (e) {
		if (e.keyCode == 13) {
			var className = $('#class').val();
			var title = $('#title').val();
			var price = $('#price').val();
			console.log('Pushing: ' + className + ' ' + title + ' ' + price + ' ');

			dataStore.push({
				'title': title,
				'class': className,
				'price': price,
				'added': new Date().getTime(),
				'owner': 'boomOne'
			});

			$('#class').val('');
			$('#title').val('');
			$('#price').val('');
		}
	});

	dataStore.on('child_added', function(dataSnapshot) {
		var data = dataSnapshot.val();

		console.log('Book loaded which was created at: ' + dataSnapshot.name());
	});
});