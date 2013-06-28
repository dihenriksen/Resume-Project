function generate_html(data) {
	// data will always be an object with key-value pairs
	// i refers to the key
	var html = '';
	for (i in data) {
		html += '<div class="' + i + '">' + data[i] + '</div>';
	}
	return html;
}

function list_person(data) {
	var html = '';
	for ( i in data ) {
		html += '<li class="' + i + '">' + data[i].name_last;
		html += '<button type="button" class="btn" onclick="delete_this_person(\'' + data[i].id + '\')">Delete</button></li>';
	}
	return html;
}

function delete_this_person(id) {
	console.log('here');
	console.log(id);
	var link = 'api/resumes/' + id;
	$.ajax({
		url : link,
		type : 'DELETE',
		success: function(result) {
			console.log(result);
			console.log('deleted!!');
		}
	})
}


$(document).ready(function() {
	console.log('with a little jiggery-pokery...');

	$.ajax('api/resumes', {
		complete : function(response) {
			var all_resumes = response.responseJSON;
			$('.resume_list').append(list_person(all_resumes));
		}
	});



	$.ajax('/api/resumes/51c20838496a9d577d000001',{
		complete : function(response) {
			console.log(response.responseJSON);
			$('#first_name').html(response.responseJSON.name_first);
			if (response.responseJSON.name_middle) {
				$('#middle_name').html(response.responseJSON.name_middle);
			} else {
				$('#middle_name').html(response.responseJSON.name_middle);
			}
			$('#last_name').html(response.responseJSON.name_last);
			$('#street').html(response.responseJSON.contact_info.street_address.street);
			city = response.responseJSON.contact_info.street_address.city;
			city_proper = city[0];
			for (i = 1; i < city.length; i++) {
				if (city[i] == city[i].toLowerCase()) {
					city_proper += city[i];
				} else {
					city_proper += ' ' + city[i];
				}
			};


			state = response.responseJSON.contact_info.street_address.state;
			zip = response.responseJSON.contact_info.street_address.zip_code;
			cityStateZip = city_proper + ', ' + state + ', ' + zip;
			$('#cityStateZip').html(cityStateZip);
			$('#email').html(response.responseJSON.contact_info.email);


			phone_number = response.responseJSON.contact_info.phone;
			phone = '';
			for (i = 0; i < phone_number.length; i++) {
				x = phone_number[i];
				if (phone.length == 0) {
					phone += '(';
				}
				if (phone.length == 4) {
					phone += ') ';
				}
				if (phone.length == 9) {
					phone += '-';
				}
				if (x == 0 || x == 1 || x == 2 || x == 3 || x == 4 || x == 5 || x == 6 || x == 7 || x == 8 || x == 9) {
					phone += phone_number[i];
				}
				if (phone.length == 14) {
					break;
				}
			}
			$('#phone').html(phone);


			$('#linked_in').html(response.responseJSON.linked_in);
			full_name = response.responseJSON.name_first + ' ' + response.responseJSON.name_last;
			website = '<a href="' + response.responseJSON.website +'">' + full_name + '</a>';
			$('#website').html(website);


			skill_type = response.responseJSON.skill[0].category;
			$('.skills ul:first-child').html(skill_type);
		}
	});
});


// response.responseJSON[0];
// var doomed = response.responseJSON[0].id;
// "<button data-id='" + doomed + "'>";
// $('button.delete_button').data('id');
// $.ajax({ url: 'api/resumes/' + doomed, type : 'DELETE', success : function(res) { console.log('Done');} });
