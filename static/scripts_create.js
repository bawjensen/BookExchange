$(function() {
	var dataStore = new Firebase('https://wubex.firebaseio.com/'); // instantiate Firebase object

	$.get('/static/classes.html', function(data) {
		$('#class').append(data);
	});

	$('#price').keypress(function (e) {
		if (e.keyCode == 13) {
			var className = $('#class').val().substring(0, 8);
			var title = $('#title').val();
			var price = $('#price').val();
			var type = $('#type option:selected').attr('id');

			dataStore.push({
				'title' : title,
				'class' : className,
				'price' : price,
				'added' : new Date().getTime(),
				'owner' : 'boomOne',
				'type'  : type
			});

			$('#class').val('');
			$('#title').val('');
			$('#price').val('');
		}
	});
});