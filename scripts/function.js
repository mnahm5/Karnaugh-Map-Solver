/*
 Purpose: Checks if two arrays contain any of the same values
 Parameters: Two arrays(i.e. A and B)
 Pre-condition: The parameters are arrays
 Post-condition: Returns true when the program finds any common values and false if it doesn't
 Test Case 1:
 - Parameters: [1,2,3],[4,5,6]
 - Result: false
 Test Case 2:
 - Parameters: [1,2,3],[4,3,6]
 - Result: true
 */
function has_common_value(A,B)
{
	for (var i = 0; i < A.length; i++) 
	{
		for (var j = 0; j < B.length; j++)
		{
			if (A[i] == B[j])
			{
				return true;
			}
		}
	}
	return false;
}

/*
 Purpose: Takes a decimal number as input and turns it into binary
 Parameters: An integer (i.e. decimal)
 Pre-condition: An integer value is entered
 Post-condition: Returns a string which contains the binary equivalent of the integer entered
 Test Case 1:
 - Parameters: 7
 - Result: 111
 Test Case 2:
 - Parameters: 12
 - Result: 1100
 */
function dec2bin(decimal) 
{
	var binary = "";
	while (decimal > 1)
	{
		binary = decimal % 2 + binary;
		decimal = Math.floor(decimal/2);
	}
	binary = decimal + binary;
	return binary;
}

/*
 Purpose: Takes a binary string and returns a decimal number
 Parameters: A string (i.e. binary)
 Pre-condition: The input is a valid binary string
 Post-condition: Returns a decimal that the inputted binary represents
 Test Case 1:
 - Parameters: 1110
 - Result: 14
 Test Case 2:
 - Parameters: 10101
 - Result: 21
 */
function bin2dec(binary)
{
	var decimal = 0;
	var size = binary.length - 1;
	while (size >= 0)
	{
		decimal += binary[(binary.length-1)-size] * Math.pow(2,size);
		size -= 1;
	}
	return decimal;
}

/*
 Purpose: Makes sure that all the strings that represent binary numbers all have the same string
 Parameters: array and no_of_variables
 Pre-condition: 'array' is an array of strings representing binary numbers and 'no_of_variables' is either null or an integer
 Post-condition: The array is converted into a array of strings where all the strings have the same length
 Test Case 1:
 - Parameters: ['111','1010'] , null
 - Result: ['0111', '1010']
 Test Case 2:
 - Parameters: ['111','1010'],7
 - Result: ['0000111', '0001010']
 */
function fix_size(array, no_of_variables)
{
	var size_array = [];
	for (var i = 0; i < array.length; i++)
	{
		size_array.push(array[i].length);
	}
	if (no_of_variables == null) {
		var max_size = find_max(size_array);
	}
	else {
		max_size = no_of_variables;
	}
	for (var i = 0; i < array.length; i++)
	{
		while (array[i].length < max_size)
		{
			array[i] = "0" + array[i];
		}
	}
}

/*
 Purpose: Finds the biggest number in the array
 Parameters: array
 Pre-condition: 'array' is an array of positive integers
 Post-condition: Returns the biggest number in the array
 Test Case 1:
 - Parameters: [4,5,7,22]
 - Result: 22
 Test Case 2:
 - Parameters: [4,95,17,22]
 - Result: 95
 */
function find_max(array) 
{
	var max = 0;
	for (var i = 0; i < array.length; i++)
	{
		if (array[i] > max)
		{
			max = array[i];
		}
	}
	return max;
}

/*
 Purpose: Takes an array of decimal numbers as input and coverts all of them into a string representing their binary representation
 Parameters: An array of decimals 'array' and 'no_of_variables' which determines the length of the binary string
 Pre-condition: 'array' is an array of positive integers and 'no_of_variables' is either null or a positive integer
 Post-condition: Returns an array of strings each representing a binary representation of the decimal in the array
 Test Case 1:
 - Parameters: [5,6,7,9],null
 - Result: ['0101', '0110', '0111', '1001']
 Test Case 2:
 - Parameters: [5,6,7,9],7
 - Result: ['0000101', '0000110', '0000111', '0001001']
 Test Case 3:
 - Parameters: [5,6,7,9],2
 - Result: ['101', '110', '111', '1001']
 */
function dec2bin_array(array,no_of_variables)
{
	var bin_array = [];
	for (var i = 0; i < array.length; i++)
	{
		bin_array.push(dec2bin(array[i]));
	}
	fix_size(bin_array,no_of_variables);
	return bin_array;
}

/*
 Purpose: Takes an array of string representing binary numbers as input and coverts all of them into decimals
 Parameters: An array of binary numbers 'array'
 Pre-condition: Each item in the 'array' array is a string representing a valid binary number
 Post-condition: Returns an array with positive decimal integers
 Test Case 1:
 - Parameters: ['111','1010','10000']
 - Result: [7, 10, 16]
 Test Case 2:
 - Parameters: ['111','1010','10000','0000']
 - Result: [7, 10, 16, 0]
 */
function bin2dec_array(array)
{
	var dec_array = [];
	for (var i = 0; i < array.length; i++)
	{
		dec_array.push(bin2dec(array[i]));
	}
	return dec_array;
}

/*
 Purpose: Finds all possible implicants from an array of strings representing binary numbers
 Parameters: 'array' is the array of strings representing binary numbers
 Pre-condition: 'array' must be an array of strings representing binary numbers
 Post-condition: Returns an array with all possible implicants
 Test Case 1:
 - Parameters: [001,010,011,100,101]
 - Result: [0X1,X01,01X,10X]
 Test Case 2:
 - Parameters: [000,001,010,101]
 - Result: [00X,0X0,X01]
 */
function find_possible_implicants(array)
{
	var implicants = [];
	implicants[0] = array.slice();
	for (var x = 0; x < array[0].length; x++)
	{
		remove_duplicates(implicants[x]);
		var current_coloumn = implicants[x].slice();
		var next_coloumn = [];
		for (var i = 0; i < implicants[x].length; i++)
		{
			for (var j = i+1; j < implicants[x].length; j++)
			{
				remove_duplicates(implicants[x]);
				var implicant = find_implicant(implicants[x][i],implicants[x][j]);
				if (implicant)
				{
					remove_item(current_coloumn,implicants[x][i]);
					remove_item(current_coloumn,implicants[x][j]);
					next_coloumn.push(implicant);
				}
			}
		}
		remove_duplicates(next_coloumn);
		implicants[x] = current_coloumn.slice();
		if (next_coloumn.length)
		{
			implicants[x+1] = next_coloumn;
		}
		else
		{
			return implicants;
		}
	}
	return implicants;
}

/*
 Purpose: Finds the implicant of two strings representing binary numbers
 Parameters: bin1 and bin2 are two strings representing binary numbers
 Pre-condition: bin1 and bin2 are valid binary numbers
 Post-condition: Returns thee implicant (X means don't care) and if implicant is not found it returns false
 Test Case 1:
 - Parameters: '111','101'
 - Result: 1X1
 Test Case 2:
 - Parameters: '111','000'
 - Result: false
 */
function find_implicant(bin1,bin2)
{
	var differences = 0;
	for (var i = 0; i < bin1.length; i++)
	{
		if (!(bin1[i] == bin2[i]))
		{
			differences += 1;
			var indexOfDifference = i;
		}
		if (differences > 1)
		{
			return false;
		}
	}
	return replace_item(bin1,indexOfDifference,"X");
}

/*
 Purpose: Used to replace a certain part of a string with a new item
 Parameters: 'string' is the string on which the operation will be done, 'index' is the index of the string on which the new item will be placed, 'new_item' is the new item
 Pre-condition: 'string' is a string and 'index' is an integer and less than the length of the string
 Post-condition: Returns a new string after the replacement is done
 Test Case 1:
 - Parameters: '1111',2,'X'
 - Result: 11X1
 Test Case 2:
 - Parameters: '1111000',0,'X'
 - Result: X111000
 */
function replace_item(string,index,new_item)
{
	return string.slice(0,index) + new_item + string.slice(index+1);
}

/*
 Purpose: To remove certain item in an array
 Parameters: 'array' is the array from the removal will be done, 'item' is the item to be removed from the string
 Pre-condition: 'array' must be an array
 Post-condition: The array will be converted to version with the 'item' specified
 Test Case 1:
 - Parameters: [12,16,8],9
 - Result: [12, 16, 8]
 Test Case 2:
 - Parameters: [12,16,8],8
 - Result: [12, 16]
 */
function remove_item(array,item)
{
	var index_for_removal = array.indexOf(item);
	if (index_for_removal != -1)
	{
		array.splice(index_for_removal,1);
	}
	return array;
}

/*
 Purpose: Removes the duplicates from an array
 Parameters: 'array' is the array from which duplicates will be removed from
 Pre-condition: 'array' is a valid array
 Post-condition: All duplicates are removed from the array
 Test Case 1:
 - Parameters: [1,1,1,5,6,8]
 - Result: [1, 5, 6, 8]
 Test Case 2:
 - Parameters: [1,5,6,8]
 - Result: [1, 5, 6, 8]
 */
function remove_duplicates(array)
{
	for (var i = 0; i < array.length; i++)
	{
		while (array.slice(i+1,array.length).indexOf(array[i]) != -1)
		{
			array.splice(i,1);
		}
	}
	return array;
}

/*
 Purpose: Changes a 2D (2 dimensional) array into a 1D (1 dimensional) array
 Parameters: 'array' is the 2D array that has to be converted
 Pre-condition: 'array' has to be a 2D array
 Post-condition: Returns a 1D array with all the items of the 2D array
 Test Case 1:
 - Parameters: [[1,2,3],[4,5,6],[7,8,9],[10]]
 - Result: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 Test Case 2:
 - Parameters: [[1,2,3],[4,5,6],[7,8,9],[10,11]]
 - Result: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
 */
function change_from_2D_to_1D(array)
{
	var new_array = [];
	for (var i = 0; i < array.length; i++)
	{
		for (var j = 0; j < array[i].length; j++)
		{
			new_array.push(array[i][j]);
		}
	}
	return new_array;
}

/*
 Purpose: Converts a binary number to a min term
 Parameters: 'string' is a string representing a binary number
 Pre-condition: 'string' represents a valid binary number
 Post-condition: The min term equivalent is returned
 Test Case 1:
 - Parameters: '11110'
 - Result: A  B  C  D  ~E
 Test Case 2:
 - Parameters: '11X10'
 - Result: A  B  D  ~E
 */
function bin2min_term(string)
{
	var alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	alphabets = alphabets.split("");
	var alphabet_index = 0;
	var min_term = "";
	var dont_cares = 0;
	for (var i = 0; i < string.length; i++)
	{
		if (string[i] == 1)
		{
			min_term += " " + alphabets[alphabet_index] + " ";
		}
		else if (string[i] == 0)
		{
			min_term += " ~" + alphabets[alphabet_index] + " ";
		}
		else if (string[i] == "X")
		{
			dont_cares += 1;
		}
		alphabet_index += 1;
	}
	if (dont_cares == string.length)
	{
		min_term = 1;
	}
	return min_term;
}

/*
 Purpose: Converts a min term to a max term
 Parameters: 'string' is a string representing a min_term
 Pre-condition: 'string' is a valid min term formatted in the correct way
 Post-condition: Returns the max term
 Test Case 1:
 - Parameters: 'A  B  D  ~E '
 - Result: (A+B+D+~E)
 Test Case 2:
 - Parameters: A  B  C  D  ~E
 - Result: (A+B+C+D+~E)
 */
function min_term2max_term(string) {
	var terms = string.split(' ');
	var outString = '(';
	for (var i = 0; i < terms.length; i++) {
		if (terms[i] != '') {
			if (i != terms.length-1) {
				outString += terms[i] + '+';
			}
			else {
				outString += terms[i];
			}
		}
	}
	if (outString[outString.length - 1] == "+") {
		outString = outString.slice(0, -1);
	}

	outString += ')';
	return outString;
}

/*
 Purpose: To find all the binary numbers the implicant represents
 Parameters: 'string' which represents an implicant
 Pre-condition: 'string' represents a valid binary implicant
 Post-condition: Returns an array with the first item being the implicant and the rest the decimal representations of the binary numbers the implicant represents
 Test Case 1:
 - Parameters: 'XXXX1'
 - Result: ['XXXX1', 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31]
 Test Case 2:
 - Parameters: 'X10X1'
 - Result: ['X10X1', 9, 11, 25, 27]
 */
function find_coverage(string)
{
	var coverage = [];
	coverage.push(string);
	var no_dont_cares = no_of_dont_cares(string);
	for (var i = 0; i < no_dont_cares; i++)
	{
		var coverage_aux = [];
		for (var j = 0; j < coverage.length; j++)
		{
			var selected_string = coverage[j];
			coverage_aux.push(replace_item(selected_string,selected_string.indexOf("X"),0));
			coverage_aux.push(replace_item(selected_string,selected_string.indexOf("X"),1));
		}
		coverage = coverage_aux.slice();
	}
	coverage = bin2dec_array(coverage);
	coverage.unshift(string);
	return coverage;
}

/*
 Purpose: Finds the number of don't cares (represented by X ) in an implicant
 Parameters: 'string' which is an implicant
 Pre-condition: 'string' is a valid implicant
 Post-condition:
 Test Case 1:
 - Parameters: 'XXXX1'
 - Result: 4
 Test Case 2:
 - Parameters: 'X10X1'
 - Result: 2
 */
function no_of_dont_cares(string)
{
	var dont_cares = 0;
	for (var i = 0; i < string.length; i++)
	{
		if (string[i] == "X")
		{
			dont_cares += 1;
		}
	}
	return dont_cares;
}

/*
 Purpose: Sorts a 2D (2 dimensional) array in descending order of the length of each array
 Parameters: 'array' is the 2D array
 Pre-condition: 'array' is 2D array
 Post-condition: Sorts the array in descending order of length
 Test Case 1:
 - Parameters: [[1,2,3,4],[5,6,7,8,9]]
 - Result: [[ 5, 6, 7, 8, 9 ], [ 1, 2, 3, 4 ]]
 Test Case 2:
 - Parameters: [[1,2,3,4],[5,8,9],[10,11,12,13,14,15]]
 - Result: [[ 10, 11, 12, 13, 14, 15 ], [ 1, 2, 3, 4 ], [ 5, 8, 9 ]]
 */
function selection_sort_2D(array)
{
	for (var i = 0; i < array.length; i++)
	{
		var max_index = find_largest_array(array.slice(i))+i;
		swap(array,max_index,i);
	}
}

/*
 Purpose: Finds the largest array in a 2D (2 dimensional array)
 Parameters: 'array' is the 2D array
 Pre-condition: 'array' is a 2D array
 Post-condition: Returns the index of the largest array in the 2D array
 Test Case 1:
 - Parameters: [[1,2,3,4],[5,6,7,8,9]]
 - Result: 1
 Test Case 2:
 - Parameters: [[1,2,3,4],[5,8,9],[10,11,12,13,14,15]]
 - Result: 2
 */
function find_largest_array(array)
{
	var index = 0;
	for (var i = 0; i < array.length; i++)
	{
		if (array[i].length > array[0].length)
		{
			index = i;
		}
	}
	return index;
}

/*
 Purpose: Swaps the position of 2 arrays in a 2D array according to the index specified
 Parameters: 'array' is the 2D array, x and y are indexes that you wish to swap
 Pre-condition: 'array' is a 2D array, x and y are positive integers less than the length of the 2D array
 Post-condition: Changes the position of the arrays in the 2D array
 Test Case 1:
 - Parameters: [[1,2,3],[5,6,7,8],[9,10]],1,2
 - Result: [[ 1, 2, 3 ], [ 9, 10 ], [ 5, 6, 7, 8 ]]
 Test Case 2:
 - Parameters: [[1,2,3],[5,6,7,8],[9,10]],0,1
 - Result: [ [ 5, 6, 7, 8 ], [ 1, 2, 3 ], [ 9, 10 ] ]
 */
function swap(array,x,y)
{
	var temp = array[x];
	array[x] = array[y];
	array[y] = temp;
}

/*
 Purpose: Finds the solution from implicants and terms entered by the user
 Parameters: coverage is a 2D with each array containing an implicant and the binary numbers they represent, terms_dec are the terms entered by the user
 Pre-condition: coverage is a 2D with each array containing an implicant and the binary numbers they represent, terms_dec is an array
 Post-condition: Returns implicants that are part of the final solution
 Test Case 1:
 - Parameters: [[00X,0,1],[0X0,0,2],[X01,1,5]], [0,1,2]
 - Result: [00X,0X0]
 Test Case 2:
 - Parameters: [[01X1,5,7],[X111,7,15],[0000,0]], [0,7,15]
 - Result: [01X1,X111,0000]
 */
function find_solution(coverage,terms_dec)
{
	var solution = [];
	var i = 0;
	while (terms_dec.length != 0)
	{
		for (var j = 0; j < terms_dec.length; j++)
		{
			if (coverage[i].indexOf(terms_dec[j]) != -1)
			{
				terms_dec.splice(j,1);
				j = -1;
				if (solution.indexOf(coverage[i][0]) == -1)
				{
					solution.push(coverage[i][0]);
				}
			}
		}
		i += 1;
	}
	return solution;
}

/*
 Purpose: Checks if there are any errors inputted by the user
 Parameters: terms_array is the array inputted by the user
 Pre-condition: terms_array is an array
 Post-condition: Returns true if error is found else returns false
 Test Case 1:
 - Parameters: ['1','2','3']
 - Result: false
 Test Case 2:
 - Parameters: ['1','B','3']
 - Result: true
 */
function validator(terms_array) {
	for (var i = 0; i < terms_array.length; i++) {
		if (isNaN(terms_array[i]) || terms_array[i].length == 0) {
			return true;
		}
	}
	return false;
}

/*
 Purpose: Create a truth table of a specific size with all the initial values set to 0 (false/off)
 Parameters: no_of_variables is positive integer that determines the size of the truth table
 Pre-condition: no_of_variables is positive integer
 Post-condition:
 Test Case 1:
 - Parameters: 2
 - Result:
 '<table>
 <tr>
 	<th>A</th>
 	<th>B</th>
 	<th>Output</th>
 </tr>
 <tr>
 	<td>0</td>
 	<td>0</td>
 	<td><select id="0">
 		<option>0</option>
 		<option>1</option>
 		<option>X</option>
 		</select>
 	</td>
 </tr>
 <tr>
 	<td>0</td>
 	<td>1</td>
 	<td><select id="1">
 		<option>0</option>
 		<option>1</option>
 		<option>X</option>
 	</select></td>
 </tr>
 <tr>
 	<td>1</td>
 	<td>0</td>
 	<td><select id="2">
 		<option>0</option>
 		<option>1</option>
 		<option>X</option>
 	</select></td>
 	</tr>
 	<tr>
 		<td>1</td>
 		<td>1</td>
 		<td><select id="3">
 			<option>0</option>
 			<option>1</option>
 			<option>X</option>
 		</select></td>
 		</tr>
 </table>'
 Test Case 2:
 - Parameters: 1
 - Result:
 '<table>
 	<tr>
 		<th>A</th>
 		<th>Output</th>
 	</tr>
 	<tr>
 		<td>0</td>
 		<td><select id="0">
 			<option>0</option>
 			<option>1</option>
 			<option>X</option>
 		</select></td>
 	</tr>
 	<tr>
 		<td>1</td>
 		<td><select id="1">
 			<option>0</option>
 			<option>1</option>
 			<option>X</option>
 		</select></td>
 	</tr>
 </table>'
 */
function create_truth_table(no_of_variables) {
	var outString = '';
	var alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	alphabets = alphabets.split("");

	var no_of_rows = Math.pow(2,no_of_variables);
	var dec_array = [];
	for (var i = 0; i < no_of_rows; i++) {
		dec_array.push(i);
	}
	var bin_array = dec2bin_array(dec_array,null);
	outString += '<table>';
	outString += '<tr>';
	for (i = 0; i < no_of_variables; i++) {
		outString += '<th>' + alphabets[i] + '</th>';
	}
	outString += '<th>Output</th>';
	outString += '</tr>';

	for (i = 0; i < no_of_rows; i++) {
		outString += '<tr>';
		var binary_for_row = bin_array[i];
		for (var j = 0; j < no_of_variables; j++) {
			outString += '<td>' + binary_for_row[j] + '</td>';
		}
		outString += '<td><select id="' + dec_array[i] + '"><option>0</option><option>1</option><option>X</option></select></td>';
		outString += '</tr>';
	}
	outString += '</table>';
	return outString;
}