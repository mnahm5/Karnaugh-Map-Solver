/*
 Purpose: Solves the Karnaugh Map using the Quine-McCulskey Method
 Parameters: terms_dec is an array of the terms entered by the user,
             dont_cares_dec is an array of don't cares entered,
             min_or_max determines if the output will be min terms or max terms and (0 means min terms and 1 max terms)
             no_of_variables determines the length of the strings representing the binary numbers during calculation
 Pre-condition: terms_dec and dont_cares_dec are both arrays of decimals,
                min_or_max must be either 0 or 1 and
                no_of_variables must be a positive integer or null
 Post-condition: Returns a string representing the solution to the Karnaugh Map
 Test Case 1:
 - Parameters:  [1,2,4,5],[7],0,null
 - Result: Solution → f (A,B,C) = A C + ~B C + A ~B + ~A B ~C
 Test Case 2:
 - Parameters: [1,2,3,4],[0,10],1,null
 - Result: Solution → F (A,B,C,D) = (~A+~B) (~A+~C+~D)
 Test Case 3:
 - Parameters: [0,3],[2],0,2
 - Result: Solution → f (A,B) = ~B + A
 Test Case 4:
 - Parameters: [1,2,4],[3,6,7],1,3
 - Result: Solution → F (A,B,C) = (B) (A+~C) (~A+C)
*/
function main_calculator(terms_dec, dont_cares_dec, min_or_max, no_of_variables) {

    if (validator(terms_dec)) {
        if (terms_dec[0] == '') {
            if (min_or_max == 0) {
                return 'Solution → f = ' + min_or_max;
            }
            else if (min_or_max == 1) {
                return 'Solution → F = ' + min_or_max;
            }
        }
        return "Invalid Input";
    }
    else if (dont_cares_dec[0] != "") {
        if (validator(dont_cares_dec)) {
            return "Invalid Input";
        }
        else {
            if (has_common_value(terms_dec,dont_cares_dec))
            {
                return "Terms and Don't Cares cannot have the same value";
            }
            else
            {
                var all_terms_dec = terms_dec.concat(dont_cares_dec);
                var all_terms_bin = dec2bin_array(all_terms_dec,no_of_variables);

                var terms_bin = all_terms_bin.splice(0,terms_dec.length);
                var dont_cares_bin = all_terms_bin.slice();
                all_terms_bin = terms_bin.concat(dont_cares_bin);

                console.log(all_terms_bin);

                var possible_implicants = find_possible_implicants(all_terms_bin);
            }
        }
    }
    else {
        terms_bin = dec2bin_array(terms_dec,no_of_variables);
        possible_implicants = find_possible_implicants(terms_bin);
    }
    possible_implicants = change_from_2D_to_1D(possible_implicants);
    console.log(possible_implicants);
    var coverage = [];
    for (var i = 0; i < possible_implicants.length; i++)
    {
        coverage.push(find_coverage(possible_implicants[i]));
		console.log(coverage[i]);
    }

    selection_sort_2D(coverage);
    for (var i = 0; i < terms_dec.length; i++)
    {
        terms_dec[i] = Number(terms_dec[i]);
    }
    var solution = find_solution(coverage,terms_dec)
    console.log("solution = " + solution);
	
	if (min_or_max == 0) {
		var outString = "Solution &rarr; f ";
		var alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		alphabets = alphabets.split("");
		outString += "(";
		for (var i = 0; i < terms_bin[0].length; i++)
		{
			outString += alphabets[i];
			if (!(i == terms_bin[0].length-1))
			{
				outString += ",";
			}
		}
		outString += ") = ";
		for (var i = 0; i < solution.length; i++)
		{
			outString += bin2min_term(solution[i]);
			if (!(i == solution.length-1))
			{
				outString += "+";
			}
		}
		return outString;
	}
    else if (min_or_max == 1) {
        outString = "Solution &rarr; F ";
        alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        alphabets = alphabets.split("");
        outString += "(";
        for (var i = 0; i < terms_bin[0].length; i++)
        {
            outString += alphabets[i];
            if (!(i == terms_bin[0].length-1))
            {
                outString += ",";
            }
        }
        outString += ") = ";
        for (var i = 0; i < solution.length; i++)
        {
            var min_term = bin2min_term(solution[i]);
            if (min_term == 1) {
                outString += '0';
            }
            else {
                outString += min_term2max_term(min_term);
            }
            if (!(i == solution.length-1))
            {
                outString += " ";
            }
        }
        return outString;
    }
}