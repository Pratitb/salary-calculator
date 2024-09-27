$(document).ready(function () {
	const App = {
		$currentSalary: '',
		$increment_val: '',
		$increment_amt: '',
		$newSalary: '',
		$byAmtNewSalary: '',
	};

	// tab click
	$('.ha_tab').on('click', function () {
		$('.ha_tab').removeClass('tab_active');
		$(this).addClass('tab_active');
		if ($(this).hasClass('by_amt_tab')) {
			$('.hike_input_wrap').addClass('fadeOut');
			setTimeout(() => {
				$('.new_salary_input_wrap')
					.removeClass('d_n')
					.addClass('height_auto d_f');
				$('.hike_input_wrap').addClass('height_zero d_n');
			}, 500);
			setTimeout(() => {
				$('.new_salary_input_wrap').removeClass('fadeOut').addClass('fadeIn');
			}, 800);
			$('.by_hike').hide();
			$('.by_amt').show();
		} else {
			$('.new_salary_input_wrap').removeClass('fadeIn').addClass('fadeOut');
			setTimeout(() => {
				$('.hike_input_wrap')
					.removeClass('height_zero d_n')
					.addClass('height_auto d_f');
				$('.new_salary_input_wrap')
					.removeClass('height_auto d_f')
					.addClass('height_zero d_n');
			}, 500);
			setTimeout(() => {}, 1200);

			setTimeout(() => {
				$('.hike_input_wrap').removeClass('fadeOut').addClass('fadeIn');
			}, 800);
			$('.by_hike').show();
			$('.by_amt').hide();
		}
	});

	// get current salary
	$('#current_salary').on('keyup', function () {
		App.$currentSalary = $(this).val();
		console.log(App.$currentSalary, 'current');
		// checkInput(App.$currentSalary, '#curr_sal_err');
	});

	// percentage click
	$('.pre_d_percent').on('click', function () {
		$('.pre_d_percent').removeClass('tab_active');
		$(this).addClass('tab_active');

		App.$increment_val = $(this).attr('data-number');
		$('#increment_percent').val(App.$increment_val);
		console.log(App.$increment_val);
	});

	// percentage input change
	$('#increment_percent').on('keyup', function () {
		$('.pre_d_percent').removeClass('tab_active');
		App.$increment_val = $(this).val();
		console.log(App.$increment_val);
		// checkInput(App.$increment_val, '#hike_err');
	});

	// check inputs
	setInterval(() => {
		if (App.$currentSalary && App.$increment_val) {
			$('.calculate_btn').addClass('enable_btn');
		} else {
			$('.calculate_btn').removeClass('enable_btn');
		}
	}, 500);

	// calculate increment amt
	function IncreAmt() {
		App.$increment_amt = (
			(+App.$increment_val / 100) *
			+App.$currentSalary
		).toFixed(0);
		let formattedIncrementNum = formatNumber(+App.$increment_amt);
		// console.log(incrementAmt, 'increment amount');
		$('#increment_amt').html(formattedIncrementNum);
	}

	// calculate new salary
	function newSalary() {
		App.$newSalary = (+App.$currentSalary + +App.$increment_amt).toFixed(0);
		let formattedNewSal = formatNumber(+App.$newSalary);
		$('#new_salary').html(formattedNewSal);
	}

	// calculate daily
	function dailyAmt() {
		let dailyAmt = (+App.$newSalary / 365).toFixed(0);
		let formatDaily = formatNumber(+dailyAmt);
		// console.log(formatDaily);

		$('#daily_salary').html(formatDaily);
	}

	// calculate bi-weekly
	function biWeeklyAmt() {
		let biWeeklyAmt = (+App.$newSalary / 26).toFixed(0);
		let formatBiWeekly = formatNumber(+biWeeklyAmt);
		// console.log(formatBiWeekly);

		$('#biweekly_salary').html(formatBiWeekly);
	}

	// calculate monthly
	function monthlyAmt() {
		let monthlyAmt = (+App.$newSalary / 12).toFixed(0);
		let formatMontly = formatNumber(+monthlyAmt);
		// console.log(formatMontly);

		$('#monthly_salary').html(formatMontly);
	}

	// format output number
	function formatNumber(number) {
		return number.toLocaleString();
	}

	// by amt new salary
	$('#new_salary_inp').on('keyup', function () {
		App.$byAmtNewSalary = $(this).val();
		console.log(App.$byAmtNewSalary, 'by amt new');
		// checkInput(App.$currentSalary, '#curr_sal_err');
	});

	function calculateByAmt() {
		let diffSalary = +App.$byAmtNewSalary - +App.$currentSalary;
		console.log(+diffSalary);
		let hikePercent = ((+diffSalary / +App.$currentSalary) * 100).toFixed(0);
		$('#hike_percent').html(`${hikePercent}%`);
		// console.log(hikePercent);
	}

	// check by amt inputs
	setInterval(() => {
		if ($('.by_amt_tab').hasClass('tab_active')) {
			if (App.$currentSalary && App.$byAmtNewSalary) {
				$('.calculate_btn').addClass('enable_btn');
			} else {
				$('.calculate_btn').removeClass('enable_btn');
			}
		}
	}, 500);

	// calculate
	$('.calculate_btn').on('click', function () {
		console.log($(this));

		// checkInput(App.$currentSalary, '#curr_sal_err');
		// checkInput(App.$increment_val, '#hike_err');
		const byHikeBtn = $('.by_hike_tab');
		// const byAmtBtn = $('.by_amt_tab');
		if (byHikeBtn.hasClass('tab_active')) {
			IncreAmt();
			newSalary();
			dailyAmt();
			biWeeklyAmt();
			monthlyAmt();
		} else {
			calculateByAmt();
		}
	});

	$('.reset_btn_wrap')
		.on('mouseover', function () {
			setTimeout(() => {
				$('.reset_text').css('opacity', 1);
			}, 400);
		})
		.on('mouseout', function () {
			$('.reset_text').css('opacity', 0);
		})
		.on('click', function () {
			(App.$byAmtNewSalary = ''),
				(App.$currentSalary = ''),
				(App.$increment_amt = ''),
				(App.$increment_val = ''),
				(App.$newSalary = '');
			$('#current_salary, #increment_percent, #new_salary_inp').val('');
			$('.pre_d_percent').removeClass('tab_active');
			$(
				'#increment_amt, #new_salary, #daily_salary, #biweekly_salary, #monthly_salary, #hike_percent'
			).html('-- --');
		});
});
