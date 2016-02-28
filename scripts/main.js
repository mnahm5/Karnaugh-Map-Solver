$('#SOP').on('click', '.calculate', function() {
    $('#SOP_solution').html('Loading.....');
	var terms_dec = $('#SOP_terms').val().split(',');
    var dont_cares_dec = $('#SOP_dont_cares').val().split(',');
    $('#SOP_solution').html(main_calculator(terms_dec,dont_cares_dec,0,null));
});

$('#POS').on('click', '.calculate', function() {
    $('#POS_solution').html('Loading.......');
    var terms_dec = $('#POS_terms').val().split(',');
    var dont_cares_dec = $('#POS_dont_cares').val().split(',');
    $('#POS_solution').html(main_calculator(terms_dec,dont_cares_dec,1,null));
});

var no_of_variables;
$('#truth_table').on('click', '#create_table', function() {
	$('#truth_table_calculate').remove();
    no_of_variables = $('#no_of_variables').val();
    if (isNaN(no_of_variables)) {
        $('#truth_table_input').html('Invalid Input');
    }
    else {
        no_of_variables = Number(no_of_variables);
        if (no_of_variables < 0) {
            $('#truth_table_input').html('Invalid Input');
        }
        else {
            $('#truth_table_input').html(create_truth_table(no_of_variables));
        }
    }
    $(this).closest('.modal-footer').append('<button type="button" class="btn btn-primary" id="truth_table_calculate">Calculate</button>');
});

$('#truth_table').on('click', '#truth_table_calculate', function() {
    $('#truth_table_solution').html('Loading....');
    var terms_dec = [];
    var dont_cares_dec = [];
    var selected_type = $('.table_body').find('input[name=type]:checked').parent().text();
    var no_of_rows = Math.pow(2,no_of_variables);

    if (selected_type == ' Get Min Terms') {
        for (var i = 0; i < no_of_rows; i++) {
            var inputted_value = $('#'+i).val();
            if (inputted_value == "1") {
                terms_dec.push(''+i);
            }
            else if (inputted_value == "X"){
                dont_cares_dec.push(''+i);
            }
        }
        if (terms_dec.length == 0) {
            terms_dec.push('');
        }
        if (dont_cares_dec.length == 0) {
            dont_cares_dec.push('');
        }
        $('#truth_table_solution').html(main_calculator(terms_dec, dont_cares_dec,0,no_of_variables));
    }
    else if (selected_type == ' Get Max Terms') {
        for (i = 0; i < no_of_rows; i++) {
            inputted_value = $('#'+i).val();
            if (inputted_value == "0") {
                terms_dec.push(''+i);
            }
            else if (inputted_value == "X"){
                dont_cares_dec.push(''+i);
            }
        }
        if (terms_dec.length == 0) {
            terms_dec.push('');
        }
        if (dont_cares_dec.length == 0) {
            dont_cares_dec.push('');
        }
        $('#truth_table_solution').html(main_calculator(terms_dec, dont_cares_dec,1,no_of_variables));
    }
});

