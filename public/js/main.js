$(document).ready(function() {
	console.log('with a little jiggery-pokery...');
	$.ajax('/api/resumes/51c20838496a9d577d000001',{
		complete : function(response) {
			console.log(response.responseJSON);
			$('#first_name').html(response.responseJSON.name_first);
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


























