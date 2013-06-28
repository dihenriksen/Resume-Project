$(document).ready(function() {
	$.ajax('/api/resumes', {
		complete : function(response) {
			var resume = response.responseJSON[0];
		}
	});

	$('.education_block_add').click(add_education);
	$('.category_block_add').click(add_category);
	$('.skill_block_add').click(add_skill);
	$('.work_block_add').click(add_work);
	$('.greatness_block_add').click(add_greatness);
	$('.responsibility_add').click(add_responsibility);

	$('#user_data').submit(function() {
		var userData 		= {};
		userData.name_first = $('#name_first').val();
		userData.name_last 	= $('#name_last').val();

		userData.contact_info = {
			email : $('#email').val(),
			phone : $('#phone').val(),
			street_address : {
				city 	 : $('#city').val(),
				state 	 : $('#state').val(),
				street 	 : $('#street').val(),
				zip_code : $('#zip').val()
			}
		};

		userData.twitter 	= $('#twitter').val();
		userData.website 	= $('#personal_site').val();
		userData.linked_in	= $('#linked_in').val();

		userData.experience = [];
		$('.work_experience').find('.work_block').each(function(index, element) {
			if ($(element).find('.company').val()) {
				var responsibilities = [];
				$(element).find('.responsibilities').each(function(index1, element1) {
					responsibilities.push($(element1).val());
				});

				userData.experience.push({
					end_month_year 		: $(element).find('.work_end').val(),
					location 			: $(element).find('.location').val(),
					organization 		: $(element).find('.company').val(),
					project 			: $(element).find('.project').val(),
					role 				: $(element).find('.position').val(),
					start_month_year 	: $(element).find('.work_start').val(),
					responsibilities 	: responsibilities
				});
			}
		});

		userData.skill = [];
		$('.skills').find('.skill').each(function(index, element) {
			if ($(element).val()) {
				userData.skill.push({
					title 		: $(element).val(),
					experience 	: $(element).parent().next().children('.years_experience').val(),
					category 	: $(element).closest('.skills_container').prev().find('.category').val()
				});
			};
		});

		userData.schools = [];
		$('.education_block').each(function(index, element) {
			if ($(element).find('.school').val()) {
				userData.education.push({
					name		: $(element).find('.school').val(),
					degree		: $(element).find('.degree').val(),
					major		: $(element).find('.major').val(),
					minor		: $(element).find('.minor').val(),
					gpa			: $(element).find('.gpa').val(),
					// societies 	: $(element).find('.secret_societies').val(),
					end_month_year 	: $(element).find('.graduation_date').val(),
					start_month_year : $(element).find('.matriculation_date').val()
				});
			}
		});

		userData.accomplishments = [];
		$('.accomplishments_block').each(function(index, element) {
			if ($(element).find('.title').val()) {
				userData.accomplishments.push({
					title 		: $(element).find('.title').val(),
					month_year 	: $(element).find('.accomplishment_date').val(),
					description : $(element).find('.description').val()
				});
			}
		});
		console.log(userData);


		var the_data = JSON.stringify({ 'resume' : userData});
		console.log(the_data);
		$.ajax({
			type : 'POST',
			url : '/api/resumes',
			data : the_data
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

function add_greatness() {
	var html = $('.accomplishments_block').first().clone();
	html.css('display', 'none');
	$(this).parent().before(html);
	html.find('.title').val('');
	html.find('.accomplishment_date').val('');
	html.find('.description').val('');
	html.slideDown(500);
	return false;
}

function add_responsibility() {
	var html = $('.resp').first().clone();
	html.css({
		'display' : 'none',
		'margin-top' : '20px'
	});
	console.log('now here');
	$(this).parent().before(html);
	html.find('.responsibilities').val('');
	html.slideDown(500);
	return false;
}

function add_work() {
	var html = $('.work_block').first().clone();
	var button = html.find('.btn');
	button.click(add_responsibility);
	html.find('.resp').slice(1).remove();
	html.css('display', 'none');
	$(this).parent().before(html);
	html.find($('.company')).val('');
	html.find($('.location')).val('');
	html.find($('.position')).val('');
	html.find($('.work_start')).val('');
	html.find($('.work_end')).val('');
	html.find($('.project')).val('');
	html.find($('.responsibilities')).val('');
	html.slideDown(500);
	return false;
}








