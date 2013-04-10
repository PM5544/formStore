// from localStorage to JSON
var storage = "{",
    regex = /[{[]/;
for( var i in localStorage ) {

    var originalValue = localStorage[ i ],
        parsedValue
    ;
    if ( regex.test( originalValue.substring( 0, 1 ) ) ) {
        storage += "\"" + i + "\":" + originalValue + ",";
    }
};
copy( storage + "}" );



//from JSON to localStorage
(function ( ob ) {
    for ( var i in ob ) {
        if ( ob.hasOwnProperty( i ) ) {
            localStorage[ i ] = JSON.stringify( ob[ i ] );
        }
    }
}( replaceThisWithObject ) );