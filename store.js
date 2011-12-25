;( function ( win, doc, undefined ) {

    var str         = doc.location.pathname.replace( /\W/g, "" )
    ,   obStr       = win.localStorage.getItem( str )
    ,   ob          = JSON.parse( obStr ) || []

    ,   frag        = doc.createDocumentFragment()
    ,   background  = doc.createElement( "div"   )
    ,   container   = doc.createElement( "form"  )
    ,   dInput      = doc.createElement( "input" )
    ,   button      = doc.createElement( "input" )

    ,   removeThese = [ "pm5544StoreScript", "pm5544RestoreScript" ]
    ,   url         = "https://raw.github.com/PM5544/formStore/master/"

    ,   gFont       = doc.createElement( "link"  )
    ,   styles      = doc.createElement( "link" )

    ,   head        = doc.getElementsByTagName( "head" )[ 0 ]
    ;

    function addHandler( node, type, fn ) {

        if ( node.addEventListener ) {

            node.addEventListener( type, fn );

        } else {

            node.attachEvent( 'on' + type, fn );

        }
    }

    function triggerHandler( node, type ) {

        if ( doc.createEvent ) {

            switch ( type ) {

                case "click" :

                    var evt = doc.createEvent( "MouseEvents" );
                    evt.initMouseEvent( "click", true, true, win, 0, 0, 0, 0, 0, false, false, false, false, 0, null );
                    node.dispatchEvent( evt );

                    break;

                case "submit":

                    var evt = doc.createEvent( "HTMLEvents" );
                    evt.initEvent( "submit", true, true );
                    node.dispatchEvent( evt );

                    break;
            }

        } else {

            node.fireEvent( "on" + type );

        }
    }

    function stopEvent( e ) {

        if ( e.stopPropagation ) {

            e.preventDefault();
            e.stopPropagation();

        } else {

            e.cancelBubble = true;
            e.returnValue = false;

        }
    }

    function removeElements() {

        var elements = removeThese
        ,   len = elements.length
        ,   cur
        ;

        while ( len-- ) {

            cur = "string" === typeof elements[ len ] ? doc.getElementById( elements[ len ] ) : elements[ len ];

            if ( cur ) {

                cur.parentNode.removeChild( cur );

            }
        }
    }

    function getAllInputValues() {

        var returnOb = {
            inputs: []
        ,   radios: []
        ,   checkboxes: []
        }
        ,   forms = doc.forms
        ,   form
        ,   named
        ,   cur
        ,   name
        ,   radios
        ,   type
        ;

        for ( var i = 0, len = forms.length; i < len; i++ ) {

            form = forms[ i ];

            if ( form.clientWidth && ( !form.id || -1 === form.id.indexOf( "heleen" ) ) ) {

                named = form.querySelectorAll( "[name]" );

                for ( var j = 0, jLen = named.length; j < jLen; j++ ) {

                    cur = named[ j ];
                    name = cur.getAttribute( "name" );
                    type = cur.getAttribute( "type" ) ? cur.getAttribute( "type" ).toLowerCase() : '';

                    if ( "textarea" === cur.nodeName.toLowerCase() ) {

                        if ( cur.value ) {
                            returnOb.inputs.push( [ name, cur.value ] );
                        }

                    } else {

                        switch ( type ) {

                            case "hidden":
                            case "text":
                            case "password":
                            case "":

                                if ( cur.value ) {
                                    returnOb.inputs.push( [ name, cur.value ] );
                                }

                                break;

                            case "checkbox":

                                returnOb.checkboxes.push( [ name, cur.checked ] );

                                break;

                            case "radio":

                                if ( cur.checked ) {
                                    returnOb.radios.push( [ name, cur.value ] );
                                }

                                break;

                            default:
                                continue;
                        }
                    }
                }
            }
        }

        if ( returnOb.inputs.length || returnOb.radios.length || returnOb.checkboxes.length ) {

            return returnOb;

        } else {

            return false;

        }

    }

    gFont.href   = "//fonts.googleapis.com/css?family=Nova+Square&text=Saveformst";
    gFont.rel    = "stylesheet";
    gFont.type   = "text/css";
    doc.getElementsByTagName( "head" )[ 0 ].appendChild( gFont );
    removeThese.push( gFont );

    styles.href = url + "style.css";
    styles.rel = "stylesheet";
    styles.type = "text/css";
    head.appendChild( styles );
    removeThese.push( styles );


    if ( "opacity" in background.style ) {

        background.id = "pm5544StoreBackground";

    } else {

        background.id = "pleaseDownloadADecentBrowserAsSoonAsPossible";

    }

    addHandler( background, "click", removeElements );
    frag.appendChild( background );
    removeThese.push( background );

    container.id = "pm5544StoreContainer";
    container.innerHTML = "<h1>Save form state as:</h1>";
    frag.appendChild( container );
    removeThese.push( container );

    dInput.type = "text";
    dInput.placeholder = "description";
    container.appendChild( dInput );

    button.type = "submit";
    button.value = "save...";
    container.appendChild( button );

    addHandler(
        container
    ,   "submit"
    ,   function( e ) {

            stopEvent( e );

            var inputObject = getAllInputValues();

            if ( dInput.value && inputObject ) {

                ob.push(
                    {
                        description: dInput.value
                    ,   values: inputObject
                    }
                )

                localStorage.setItem(
                    str
                ,   JSON.stringify( ob )
                );

            }

            removeElements();

        }
    ,   false
    );

    doc.body.appendChild( frag );

} ) ( this, this.document );