## Website Performance Optimization portfolio project##
#######################################################

PART 1: 
Analyze the following website on pagespeed insights: https://developers.google.com/speed/pagespeed/insights/
WEBSITE: http://saran689.github.io/mobile-portfolio/
Requirement: pagespeed insights score >90

RESULTS: 
Pagespeed Insights scores: 94(Mobile), 96(Desktop)

OTHER SITES USED:
To optimize images: 
https://tinypng.com/
http://www.freshpixels.net

NOTES:
Made JavaScript async for blocking scripts.Minified CSS and made inline; media queries added for print.
Made analytics js inline. Open Sans Web Fonts removed. Optimized Images (compressed/resized).
Moved all script tags to end of body tag.
pizzeria.jpg resized and made small-pizzeria.jpg for index.html.
*******
PARTS 2 & 3: 
Requirements: pizza.html 60FPS & Time to resize pizzas under 5s

RESULTS: 
Chrome Dev Tools(~60FPS on average) while scrolling and Time to resize pizzas = 1.01ms (4 resize events).

NOTES:
In views/js/mainCommented.js, search for "P4 comment:" This indicates where the code changes for Efficiency were made.

Main Changes/comments to main.js & pizza.html:
1. Inline-d the style.css into pizza.html
2. Added src, width, height of pizza.png, transform: translateZ(0); transform: translate3d(0,0,0);
  backface-visibility:hidden to .mover class CSS
3. Reduced number of moving pizzas from 200 to 40.
4. Reduced number of random pizzas from 100 to (more realistic count) 20.
5. Made requestAnimationFrame calls to updatePostions() via onScroll().
6. Replaced querySelectorAll with getElementsByClassName.
7. Populate moving pizzas in items[], and random pizzas in pList[], as part of DOMContentLoaded event.
8. Populate items[] length, and random pizzas in pList[] length into variables itemsLen and pListLen respectively, 
  as part of DOMContentLoaded event.
9. Populate windowwidth(ww) and one of the random pizza offsetWidth(oldwidth=elemOW) as part of DOMContentLoaded event.
10. A new variable winScrollTopCalc, is populated as document.body.scrollTop/1250. 
11. document.body.scrollTop/1250 is brought out of the loop to be executed once and divided by 1250. 
12. All computations, assignments that can be brought out of the for loops are brought outside.
13. All changes were tested using Dev Tools locally, before uploading to github.io repo.


***************************************
ORIGINAL UDACITY REQUIREMENTS/ RUBRIC:*
***************************************
Your challenge, if you wish to accept it (and we sure hope you will), is to optimize this online portfolio for speed! In particular, optimize the critical rendering path and make this page render as quickly as possible by applying the techniques you've picked up in the [Critical Rendering Path course](https://www.udacity.com/course/ud884).

To get started, check out the repository, inspect the code,

### Getting started

####Part 1: Optimize PageSpeed Insights score for index.html

Some useful tips to help you get started:

1. Check out the repository
1. To inspect the site on your phone, you can run a local server

  ```bash
  $> cd /path/to/your-project-folder
  $> python -m SimpleHTTPServer 8080
  ```

1. Open a browser and visit localhost:8080
1. Download and install [ngrok](https://ngrok.com/) to make your local server accessible remotely.

  ``` bash
  $> cd /path/to/your-project-folder
  $> ngrok 8080
  ```

1. Copy the public URL ngrok gives you and try running it through PageSpeed Insights! Optional: [More on integrating ngrok, Grunt and PageSpeed.](http://www.jamescryer.com/2014/06/12/grunt-pagespeed-and-ngrok-locally-testing/)

Profile, optimize, measure... and then lather, rinse, and repeat. Good luck!

####Part 2: Optimize Frames per Second in pizza.html

To optimize views/pizza.html, you will need to modify views/js/main.js until your frames per second rate is 60 fps or higher. You will find instructive comments in main.js. 

You might find the FPS Counter/HUD Display useful in Chrome developer tools described here: [Chrome Dev Tools tips-and-tricks](https://developer.chrome.com/devtools/docs/tips-and-tricks).

### Optimization Tips and Tricks
* [Optimizing Performance](https://developers.google.com/web/fundamentals/performance/ "web performance")
* [Analyzing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/analyzing-crp.html "analyzing crp")
* [Optimizing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/optimizing-critical-rendering-path.html "optimize the crp!")
* [Avoiding Rendering Blocking CSS](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-blocking-css.html "render blocking css")
* [Optimizing JavaScript](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript.html "javascript")
* [Measuring with Navigation Timing](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/measure-crp.html "nav timing api"). We didn't cover the Navigation Timing API in the first two lessons but it's an incredibly useful tool for automated page profiling. I highly recommend reading.
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/eliminate-downloads.html">The fewer the downloads, the better</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html">Reduce the size of text</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization.html">Optimize images</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching.html">HTTP caching</a>

### Customization with Bootstrap
The portfolio was built on Twitter's <a href="http://getbootstrap.com/">Bootstrap</a> framework. All custom styles are in `dist/css/portfolio.css` in the portfolio repo.

* <a href="http://getbootstrap.com/css/">Bootstrap's CSS Classes</a>
* <a href="http://getbootstrap.com/components/">Bootstrap's Components</a>

### Sample Portfolios

Feeling uninspired by the portfolio? Here's a list of cool portfolios I found after a few minutes of Googling.

* <a href="http://www.reddit.com/r/webdev/comments/280qkr/would_anybody_like_to_post_their_portfolio_site/">A great discussion about portfolios on reddit</a>
* <a href="http://ianlunn.co.uk/">http://ianlunn.co.uk/</a>
* <a href="http://www.adhamdannaway.com/portfolio">http://www.adhamdannaway.com/portfolio</a>
* <a href="http://www.timboelaars.nl/">http://www.timboelaars.nl/</a>
* <a href="http://futoryan.prosite.com/">http://futoryan.prosite.com/</a>
* <a href="http://playonpixels.prosite.com/21591/projects">http://playonpixels.prosite.com/21591/projects</a>
* <a href="http://colintrenter.prosite.com/">http://colintrenter.prosite.com/</a>
* <a href="http://calebmorris.prosite.com/">http://calebmorris.prosite.com/</a>
* <a href="http://www.cullywright.com/">http://www.cullywright.com/</a>
* <a href="http://yourjustlucky.com/">http://yourjustlucky.com/</a>
* <a href="http://nicoledominguez.com/portfolio/">http://nicoledominguez.com/portfolio/</a>
* <a href="http://www.roxannecook.com/">http://www.roxannecook.com/</a>
* <a href="http://www.84colors.com/portfolio.html">http://www.84colors.com/portfolio.html</a>
