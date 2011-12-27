;( function ( win, doc, undefined ) {

    if ( !win.JSON || !win.localStorage ||doc.querySelector )
        return;

    var str         = doc.location.pathname.replace( /\W/g, '' )
    ,   obStr       = win.localStorage.getItem( str )
    ,   ob          = JSON.parse( obStr ) || []

    ,   frag        = doc.createDocumentFragment()
    ,   background  = doc.createElement( "div" )
    ,   container   = doc.createElement( "div" )

    ,   removeThese = [ "pm5544StoreScript", "pm5544RestoreScript" ]
    ,   url         = "https://raw.github.com/PM5544/formStore/master/"

    ,   gFont       = doc.createElement( "link" )
    ,   styles      = doc.createElement( "style" )

    ,   head        = doc.getElementsByTagName( "head" )[ 0 ]

    ,   aSelect
    ,   aRemove
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

    function selectRestore( _e ) {

        var e
        ,   node
        ,   selected
        ;

        if ( "number" === typeof _e ) {

            selected = ob[ _e ];

        } else {

            e = _e || win.event;
            node = e.target || e.srcElement;
            selected = ob[ parseInt( node.getAttribute( "data-item" ), 10 ) ];

        }

        restore( selected )
    }

    function restore( selectedOb ) {

        var selected = selectedOb || false
        ,   inputs
        ,   radios
        ,   checkboxes

        ,   curI
        ,   curR
        ,   curC
        ;

        if ( selected ) {

            radios      = selected.values.radios;
            inputs      = selected.values.inputs;
            checkboxes  = selected.values.checkboxes;

            for ( var i = 0, iLen = inputs.length; i < iLen; i++ ) {

                curI = doc.querySelector( "input[name='" + inputs[ i ][ 0 ] + "']" );
                if ( curI ) {
                    curI.value = inputs[ i ][ 1 ];
                }

            }

            for ( var c = 0, cLen = checkboxes.length; c < cLen; c++ ) {

                curC = doc.querySelector( "input[name='" + checkboxes[ c ][ 0 ] + "']" );
                if ( curC ) {
                    curC.checked = checkboxes[ c ][ 1 ];
                }

            }

            for ( var r = 0, rLen = radios.length; r < rLen; r++ ) {

                curR = doc.querySelector( "input[type='radio'][name='" + radios[ r ][ 0 ] + "'][value='" + radios[ r ][ 1 ] + "']" );
                if ( curR ) {
                    curR.selected = true;
                }

            }

        }

        removeElements();
    }

    function removeSelected( _e ) {

        var e = _e || win.event
        ,   node = e.target || e.srcElement
        ,   num = node.getAttribute( "data-item" )
        ;

        ob.splice( num, 1 );

        localStorage.setItem(
            str
        ,   JSON.stringify( ob )
        );

        removeElements();
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



    if ( !ob || 0 === ob.length ) {

        doc.body.appendChild(
            doc.createElement( "scr" + "ipt" )
        ).setAttribute( "src", url + "store.js" );

        removeElements();

    } else if ( 1 === ob.length ) {

        selectRestore( 0 );

    } else {

        gFont.href   = "//fonts.googleapis.com/css?family=Nova+Square&text=Restofrma";
        gFont.rel    = "stylesheet";
        gFont.type   = "text/css";
        head.appendChild( gFont );
        removeThese.push( gFont );

        if ( "opacity" in background.style ) {

            addStyleRule( "#pm5544RestoreBackground", "position:fixed; z-index:999999; top:0; left:0; right:0; bottom:0; background:rgba(255,255,255,0.6);" );

        } else {

            addStyleRule( "#pm5544RestoreBackground", "position:fixed; z-index:999999; top:0; left:0; right:0; bottom:0; background:#fff; filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=60,Style=0);" );

        }

        addStyleRule( "#pm5544RestoreContainer", "text-align:left; position:fixed; z-index:9999999; width:500px; background:#fff; border:1px solid #eee; border-radius:5px; padding:5px; left:50%; top:10%; font:normal 12px/30px Verdana,sans-serif; margin-left:-250px; min-height:60px; max-height:80%; overflow-y:auto; box-shadow:2px 3px 10px rgba(0,0,0,.4);" );
        addStyleRule( "#pm5544RestoreContainer a", "text-align:left; color:#000; display:inline-block; line-height:20px; padding:0 5px; width:445px; cursor:pointer; border:1px solid #e7e7e7; border-radius:5px; text-decoration:none;");
        addStyleRule( "#pm5544RestoreContainer a.select:hover", "background:#e7e7e7;" );
        addStyleRule( "#pm5544RestoreContainer a.select:hover:before", "content:'restore form with: ';" );
        addStyleRule( "#pm5544RestoreContainer a.remove", "text-align:center; color:#8e1111; font-weight:bold; border:1px solid #8e1111; line-height:18px; margin-left:5px; width:19px; padding:0; cursor:pointer;" );
        addStyleRule( "#pm5544RestoreContainer a.remove:hover", "background:#8e1111; color:#fff;" );

        addHandler( background, "click", removeElements );
        background.id = "pm5544RestoreBackground";
        frag.appendChild( background );
        removeThese.push( background );

        container.id = "pm5544RestoreContainer";
        container.innerHTML = "<h1>Restore form state:</h1>";

        for ( var i = 0, len = ob.length; i < len; i++ ) {

            aSelect = doc.createElement( "a" );
            aSelect.setAttribute( "data-item", i );
            aSelect.innerHTML = ob[ i ].description;
            aSelect.className = "select";
            container.appendChild( aSelect );
            addHandler( aSelect, "click", selectRestore );

            aRemove = doc.createElement( "a" );
            aRemove.setAttribute( "data-item", i );
            aRemove.className = "remove";
            aRemove.innerHTML = "-";
            container.appendChild( aRemove );
            addHandler( aRemove, "click", removeSelected );
        }

        frag.appendChild( container );
        removeThese.push( container );

        doc.body.appendChild( frag );

    }

} ) ( this, this.document );
