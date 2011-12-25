# Bookmarklets to store and restore form input values
These bookmarklets can be used to store the input that is in the form at the time of loading the store bookmarklet and can be restored by loading the restore bookmarklet

# adding them to your browser
Go to [this project's page](http://pm5544.github.com/formStore/ "go here for instruction") and follow the instructions
Once added to your favorites, or better yet bookmarks bar, these bookmarklets will be very easy to use.
Just click them to let them do their work when you're on a page from which you would like to store or restore the values.

# Dependancies
* localStorage
* querySelector
* JSON (native or polyfilled)

So that basicaly means IE8 and up, Chrome, Firefox, Opera, Safari.

# Features
Store bookmarklet:
When loaded this will search through the visible &lt;form&gt;s of the page checking values of the &lt;input&gt; and &lt;textarea&gt; elements.
It stores them in localStorage using a description you can enter.
The data is stored in a way the data is linked to the page you saved it on so it will not provide you with restoring options for other pages.

restore bookmarklet:
When loaded it checks the available stored data and takes actiona ccording to the ammount of available data.
* no data is found, it loads the store bookmarklet to let you easilly store the data.
* one set of input data is found the data is filled into the form elements on the page.
* more than one sets of data is found, it shows a selection of the stored data with the options to select or delete them.  