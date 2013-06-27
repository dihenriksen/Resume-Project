// $(document).ready(function() {
// 	console.log('with a little jiggery-pokery...');
// 	$.ajax('/api/resumes/51c20838496a9d577d000001',{
// 		complete : function(response) {
// 			console.log(response.responseJSON);
// 			$('#first_name').html(response.responseJSON.name_first);
// 			if (response.responseJSON.name_middle) {
// 				$('#middle_name').html(response.responseJSON.name_middle);
// 			} else {
// 				$('#middle_name').html(response.responseJSON.name_middle);
// 			}
// 			$('#last_name').html(response.responseJSON.name_last);
// 			$('#street').html(response.responseJSON.contact_info.street_address.street);
// 			city = response.responseJSON.contact_info.street_address.city;
// 			city_proper = city[0];
// 			for (i = 1; i < city.length; i++) {
// 				if (city[i] == city[i].toLowerCase()) {
// 					city_proper += city[i];
// 				} else {
// 					city_proper += ' ' + city[i];
// 				}
// 			};


// 			state = response.responseJSON.contact_info.street_address.state;
// 			zip = response.responseJSON.contact_info.street_address.zip_code;
// 			cityStateZip = city_proper + ', ' + state + ', ' + zip;
// 			$('#cityStateZip').html(cityStateZip);
// 			$('#email').html(response.responseJSON.contact_info.email);


// 			phone_number = response.responseJSON.contact_info.phone;
// 			phone = '';
// 			for (i = 0; i < phone_number.length; i++) {
// 				x = phone_number[i];
// 				if (phone.length == 0) {
// 					phone += '(';
// 				}
// 				if (phone.length == 4) {
// 					phone += ') ';
// 				}
// 				if (phone.length == 9) {
// 					phone += '-';
// 				}
// 				if (x == 0 || x == 1 || x == 2 || x == 3 || x == 4 || x == 5 || x == 6 || x == 7 || x == 8 || x == 9) {
// 					phone += phone_number[i];
// 				}
// 				if (phone.length == 14) {
// 					break;
// 				}
// 			}
// 			$('#phone').html(phone);


// 			$('#linked_in').html(response.responseJSON.linked_in);
// 			full_name = response.responseJSON.name_first + ' ' + response.responseJSON.name_last;
// 			website = '<a href="' + response.responseJSON.website +'">' + full_name + '</a>';
// 			$('#website').html(website);


// 			skill_type = response.responseJSON.skill[0].category;
// 			$('.skills ul:first-child').html(skill_type);
// 		}
// 	});
// });


$(document).ready(function() {

	$('.education_block_add').click(add_education);

	$('.category_block_add').click(add_category);

	$('.skill_block_add').click(add_skill);

	$('.work_block_add').click(add_work);

	$('#user_data').submit(function() {
		var userData 		= {};
		userData.name_first = $('#name_first').val();
		userData.name_last 	= $('#name_last').val();
		userData.phone 		= $('#phone').val();
		userData.email 		= $('#email').val();
		userData.twitter 	= $('#twitter').val();
		userData.site 		= $('#personal_site').val();
		userData.address 	= $('#address').val();
		userData.city 		= $('#city').val();
		userData.state 		= $('#state').val();
		userData.zip 		= $('#zip').val();

		userData.skills = [];
		$('.skills').find('.skill').each(function(index, element) {
			if ($(element).val() != '') {
				userData.skills.push({
					skill 		: $(element).val(),
					experience 	: $(element).parent().next().children('.years_experience').val(),
					category 	: $(element).closest('.skills_container').prev().find('.category').val()
				});
			};
			
		});
		console.log(userData.skills); 

		userData.education = [];
		$('.education_block').each(function(index, element) {
			userData.education.push({
				school		: $(element).find('.school').val(),
				degree		: $(element).find('.degree').val(),
				major		: $(element).find('.major').val(),
				minor		: $(element).find('.minor').val(),
				gpa			: $(element).find('.gpa').val(),
				societies 	: $(element).find('.secret_societies').val(),
				graduation 	: $(element).find('.graduation_date').val()
			})
		})


		console.log('The end of the submit function');
		return false;
	});
});

function add_skill() {
	var html = $('.skill_block').first().clone();
	html.css('display', 'none');
	$(this).parent().before(html);
	html.find($('.skill')).val('');
	html.slideDown(500);
	return false;
}

function add_category() {
	var html = $('.big_skills_template_block').first().clone();
	var button = html.find('.btn');
	button.click(add_skill);
	html.css({	'margin-top' : 0,
				'position'	 : 'relative'
			});
	$('.big_skills_template_block').last().after(html);
	html.slideDown(500);
	return false;
}

function add_work() {
	var html = $('.work_block').first().clone();
	html.css('display', 'none');
	$(this).parent().before(html);
	html.find($('.company')).val('');
	html.find($('.position')).val('');
	html.find($('.work_start')).val('');
	html.find($('.work_end')).val('');
	html.find($('.responsibilities')).val('');
	html.slideDown(500);
	return false;
}

function add_education() {
	var html = $('.education_block').first().clone();
	html.css('display', 'none');
	$(this).parent().before(html);
	html.find('.school').val('');
	html.find('.degree').val('--');
	html.find('.major').val('');
	html.find('.minor').val('');
	html.find('.gpa').val('');
	html.find('.secret_societies').val('');
	html.find('.graduation_date').val('');
	html.slideDown(500);
	return false;
}












