## Dubai Neighborhood Map project##
###################################

PART 1: 
Requirements: A Search bar with a text box to search a text for Location on the list below.

RESULTS: 
Typing in the search text box filters the locations in the listview and map for the 
locations matching the typed text.

NOTES:

*******
PART 2: 
Requirements: A List view of 16 locations in Dubai. 

RESULTS: 
Met target.

NOTES:

*******
PART 3: 
Requirements: 
1. A map object with markers for the 16 locations in the list view, with a tool tip on the marker 
   indicating the location. 
2. Additionally an AIRPORT location marker was added to the map to give an idea of how far the 
   location was to the airport. Airport is separate from the 16 locations in listview.
3. Typing in the Search bar should filter the locations in the list view and the map.
4. Clicking on the location in listview or the map marker should open an InfoWindow with 
   relevant information, obtained from at least one third-party API call.
5. The API call should be an asynchronous call.

RESULTS: 
Foursquare API call was made for this project. jQuery.getJSON() was used to return API results
in JSON format. Met target.

NOTES:

****************************************************************
Main Points:
1. Clicking on any map marker or location in listview opens an InfoWindow for the location. 
2. If the InfoWindow appears too high on the screen, the map may be dragged down to bring
   it in to view.
3. The API call may or may not return an url for the hotel website.
4. If a website url is returned on Foursquare API call, the Hotel title in InfoWindow can be 
   clicked on, which would proceed to open the Hotel webpage.
5. If a website url was not returned, the title would be displayed with a description.
6. If a photo was returned on the API call, it would be displayed in the InfoWindow.
7. If there was an error reaching the Foursquare site, a message will display in the 
   InfoWindow, "Additional information could not be obtained at this time. Please try later."
8. All changes were tested using Dev Tools locally, before uploading to github.io repo.

***************************************
ORIGINAL UDACITY REQUIREMENTS/ RUBRIC:*
***************************************
Evaluation

Your project will be evaluated by a Udacity reviewer according to the rubric below. Be sure to review it thoroughly before you submit. All criteria must "meet specifications" in order to pass. r1 r2 r3 r4

Submission

When you're ready to submit your project go back to your Nanodegree Portal, click on Project 5, and we'll walk you through the rest of the submission process.

If you are having any problems submitting your project or wish to check on the status of your submission, please email us at frontend-project@udacity.com or visit us in the discussion forums.

What's Next?

You will get an email as soon as your reviewer has feedback for you. In the meantime, review your next project and feel free to get started on it or the courses supporting it!