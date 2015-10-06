/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        // P6-Comment: spec#1 tests if allFeeds variable has been defined 
        //and that it is not empty. 
         
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        // P6-Comment: spec#2 test loops through each feed in the allFeeds object 
        //and ensures it has a URL defined and that the URL is not empty.
         
        it('.url is defined & not empty', function() {
            for(var i=0; i<allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toBeNull();
                expect(allFeeds[i].url).not.toBe('');
            }
        });


        // P6-Comment: spec#3 test loops through each feed in allFeeds object 
        //and ensures it has a name defined and that the name is not empty.
         
        it('.name is defined & not empty', function() {
            for(var i=0; i<allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toBeNull();
                expect(allFeeds[i].name).not.toBe('');
            }
        });
    });


    // P6-Comment: a new test suite named "The menu" 
    describe('The menu', function() {
        var menuIcon = $('.menu-icon-link');
        var body = $('body');
        var menuIsHidden = body.hasClass('menu-hidden');
        
        // P6-Comment: spec#4 ensures the menu element is
        // hidden by default. 
        it('is hidden initially', function() {
            expect(menuIsHidden).toBeTruthy();
        });

        // P6-Comment: this test ensures the menu changes
        // visibility when the menu icon is clicked. This test
        // should have two expectations: First click displays the menu and
        // hides it when clicked again.

        describe('and when clicked', function() {
            //P6-Comment: trigger a click event to test menu-hidden class behavior
            beforeEach(function() {
                menuIcon.trigger('click');
            });
            
            //P6-Comment: spec#5
            it('it appears', function() {
                expect(body.hasClass('menu-hidden')).toBeFalsy();
            });

            //P6-Comment: spec#6
            it('and then with another click, it disappears', function() {
                expect(body.hasClass('menu-hidden')).toBeTruthy();
            });
        });
    });

    // P6-Comment: a new test suite named "Initial Entries" 
    describe('Initial Entries', function() {
    
        // P6-Comment: spec#7 ensures when the loadFeed function is called 
        // and completes its work, there is at least a single .entry element 
        // within the .feed container. Since loadFeed() is asynchronous, this 
        // test uses Jasmine's beforeEach() and asynchronous done() functions.
         
        beforeEach(function (done) {
            loadFeed(3, done);
        });

        it('have at least 1 .entry in .feed container', function() {
            //expect($('.feed').children().length).not.toBe(0);
            expect($('.feed .entry').length).not.toBe(0);
        });
    });

    // P6-Comment: a new test suite named "New Feed Selection"
    describe('New Feed Selection', function() {
        var entryBeforeIt, entryAfterIt;
        
        beforeEach(function(done) {
            $('.feed').empty();
            loadFeed(0, function() {
                entryBeforeIt = $('.feed').find("h2").text();
                loadFeed(1, function() {
                    entryAfterIt = $('.feed').find("h2").text();
                    done();
                });
            });
        });

        // P6-Comment: spec#8 ensures when a new feed is loaded by the 
        //loadFeed function that the content actually changes. loadFeed() is 
        // asynchronous, so Jasmine's done() is used.
        it('changes the content loaded earlier', function() {
            expect(entryBeforeIt).not.toMatch(entryAfterIt);
        });
    });
}());
