
function CSV2JSON(csv) {
    var array = CSVToArray(csv);
    var objArray = [];
    for (var i = 1; i < array.length; i++) {
        objArray[i - 1] = {};
        for (var k = 0; k < array[0].length && k < array[i].length; k++) {
            var key = array[0][k];
            objArray[i - 1][key] = array[i][k]
        }
    }

    var json = JSON.stringify(objArray);
    var str = json.replace(/},/g, "},\r\n");

    return str;
}
function CSVToArray( strData, strDelimiter ){
    	// Check to see if the delimiter is defined. If not,
    	// then default to comma.
    	strDelimiter = (strDelimiter || ",");

    	// Create a regular expression to parse the CSV values.
    	var objPattern = new RegExp(
    		(
    			// Delimiters.
    			"(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

    			// Quoted fields.
    			"(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

    			// Standard fields.
    			"([^\"\\" + strDelimiter + "\\r\\n]*))"
    		),
    		"gi"
    		);


    	// Create an array to hold our data. Give the array
    	// a default empty first row.
    	var arrData = [[]];

    	// Create an array to hold our individual pattern
    	// matching groups.
    	var arrMatches = null;


    	// Keep looping over the regular expression matches
    	// until we can no longer find a match.
    	while (arrMatches = objPattern.exec( strData )){

    		// Get the delimiter that was found.
    		var strMatchedDelimiter = arrMatches[ 1 ];

    		// Check to see if the given delimiter has a length
    		// (is not the start of string) and if it matches
    		// field delimiter. If id does not, then we know
    		// that this delimiter is a row delimiter.
    		if (
    			strMatchedDelimiter.length &&
    			(strMatchedDelimiter != strDelimiter)
    			){

    			// Since we have reached a new row of data,
    			// add an empty row to our data array.
    			arrData.push( [] );

    		}


    		// Now that we have our delimiter out of the way,
    		// let's check to see which kind of value we
    		// captured (quoted or unquoted).
    		if (arrMatches[ 2 ]){

    			// We found a quoted value. When we capture
    			// this value, unescape any double quotes.
    			var strMatchedValue = arrMatches[ 2 ].replace(
    				new RegExp( "\"\"", "g" ),
    				"\""
    				);

    		} else {

    			// We found a non-quoted value.
    			var strMatchedValue = arrMatches[ 3 ];

    		}


    		// Now that we have our value string, let's add
    		// it to the data array.
    		arrData[ arrData.length - 1 ].push( strMatchedValue );
    	}

    	// Return the parsed data.
    	return( arrData );
}
//pull data from csv file to string
var t_name = "T_ABLE_NAME_HERE";
var drive = "C:/";
var path = drive.concat(t_name).concat(".csv");
var text = new java.util.Scanner( new java.io.File(path) ).useDelimiter("\\A").next();
//build array from csv:<Table Name, column name, attribute name>
var arrNames=CSVToArray(text)
var arrayLength = arrNames.length;
table = model.getTableSet().getByName(t_name);
//set var = 1 because the first row is column names 
for (var i = 1; i < arrayLength; i++) {
	var columnName=new java.lang.String(arrNames[i][0]);
	columnName=columnName.trim();
	if( column = table.getElementByName( columnName.toUpperCase() ) ){
		//set row comments 
		var comment=new java.lang.String(arrNames[i][1]);
		comment=comment.trim();
		column.setComment(comment);
		column.setNotes(comment);
		column.setCommentInRDBMS(comment);
		table.setDirty(true);
	}
}

tcolumns = table.getElements();
for (var i = 0; i < tcolumns.length; i++) {
		column = tcolumns[i];
		var str=column.getDataTypeSize();
		var res = str.split(" BYTE");
		column.setDataTypeSize(res[0]);
}
table.setDirty(true);