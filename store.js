;( function ( win, doc, undefined ) {

    if ( !win.JSON || !win.localStorage || !doc.querySelector )
        return;

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
    ,   styles      = doc.createElement( "style" )

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

            if ( form.clientWidth ) {

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


    head.appendChild( styles );
    removeThese.push( styles );

    var addStyleRule = ( function ( domStyle ){

    if ( domStyle.addRule ) {

        return function( selector, styleRule ) {
            domStyle.addRule( selector, styleRule );
        }

    } else {

        return function( selector, styleRule ) {
            domStyle.insertRule( selector + "{" + styleRule + "}", domStyle.length )
        }

    }
    } )( styles[ 'undefined' !== typeof styles.sheet ? 'sheet' : 'undefined' !== typeof styles.getSheet ? 'getSheet' : 'styleSheet' ] );

    gFont.href   = "//fonts.googleapis.com/css?family=Nova+Square&text=Saveformst";
    gFont.rel    = "stylesheet";
    gFont.type   = "text/css";
    doc.getElementsByTagName( "head" )[ 0 ].appendChild( gFont );
    removeThese.push( gFont );

    if ( "opacity" in background.style ) {

        addStyleRule( "#pm5544StoreBackground", "position:fixed; z-index:999999; top:0; left:0; right:0; bottom:0; background:rgba(255,255,255,0.6);" );

    } else {

        addStyleRule( "#pm5544StoreBackground", "position:fixed; z-index:999999; top:0; left:0; right:0; bottom:0; background:#fff; filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=60,Style=0);" );

    }

    addStyleRule( "#pm5544StoreContainer", "position:fixed; z-index:999999; width:500px; background:#fff; border: 1px solid #eee; border-radius:5px; padding:5px 20px 20px; left:50%; top:20px; margin-left:-250px; box-shadow:2px 3px 10px rgba(0,0,0,.4);" );
    addStyleRule( "#pm5544StoreContainer h1", "margin:0 0 10px 0; font:normal 32px/65px 'Nova Square'; text-shadow:2px 2px 3px rgba(0,0,0,0.3); border-bottom:1px solid #ccc; text-align:center;" );
    addStyleRule( "#pm5544StoreContainer input", "display:inline-block; box-shadow:inset 0 0 5px rgba(150,150,150,0.2); margin-top:20px; height:20px; padding:3px; width:492px; border-radius:5px; border:1px solid #ccc;" );
    addStyleRule( "#pm5544StoreContainer input[type='submit']", "box-shadow:0 0 5px rgba(150,150,150,0.2); text-align:center; height:auto; line-height:20px; background:#fff; width:500px;" );

    addHandler( background, "click", removeElements );
    background.id = "pm5544StoreBackground";
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