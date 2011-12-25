;( function ( win, doc, undefined ) {

    var str         = doc.location.pathname.replace( /\W/g, '' )
    ,   obStr       = win.localStorage.getItem( str )
    ,   ob          = JSON.parse( obStr ) || []

    ,   frag        = doc.createDocumentFragment()
    ,   background  = doc.createElement( "div" )
    ,   container   = doc.createElement( "div" )

    ,   removeThese = [ "pm5544StoreScript", "pm5544RestoreScript" ]
    ,   url         = "https://raw.github.com/PM5544/formStore/master/"

    ,   gFont       = doc.createElement( "link" )
    ,   styles      = doc.createElement( "link" )

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

    if ( !ob || 0 === ob.length ) {

        doc.body.appendChild(
            doc.createElement( "scr" + "ipt" )
        ).setAttribute( "src", url + "store.js" );

    } else if ( 1 === ob.length ) {

        selectRestore( 0 );

    } else {

        gFont.href   = "//fonts.googleapis.com/css?family=Nova+Square&text=Restofrma";
        gFont.rel    = "stylesheet";
        gFont.type   = "text/css";
        head.appendChild( gFont );
        removeThese.push( gFont );

        styles.href = url + "style.css";
        styles.rel = "stylesheet";
        styles.type = "text/css";
        head.appendChild( styles );
        removeThese.push( styles );

        if ( "opacity" in background.style ) {

            background.id = "pm5544RestoreBackground";

        } else {

            background.id = "pleaseDownloadADecentBrowserAsSoonAsPossible";

        }

        addHandler( background, "click", removeElements );
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
