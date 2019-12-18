# Project 4
+ By: *claudio bustamante*
+ Production URL: <http://p4.claudiovirginia.com>

## Outside resources
* I borrowed the images from google images
* I borrowed the videos from youtube.com
* I borrowed the biographies text from https://www.allmusic.com
* In terms of the pages created I got ideas by visiting different music venues here is DC


## Notes for instructor
* In order to run the application execute the following commands

* npm install and npm start

## Within netlify, I am using

* cd p4 && npm install && npm run build && npm start
* p4/dist

## To run test cases and e2e, use the following command

npm run serve
* npm test

  I created 3 test cases 
  Login
    √ check email, password are required fields with invalid data (12ms)
    √ check valid email address with invalid email (3ms)
    √ check password is required with invalid password (2ms)	


* npm run test:e2e

 I created 10 cases
 Music Hall
 √ Test - First page URL without Login
 √ Test - Login page Authorization
 √ Test - Home page
 √ Test - FAQ Page
 √ Test - FoodMenu Page
 √ Test - Merch Page
 √ Test - Interview Page
 √ Test - Create Show, View show , Buy ticket & Cart Page
 √ Test - Favorite List
 √ Test - Logout


## Functionality of the Application

* User has the ability to login and logout. Created and id /pasword to login in the application: Email: admin@admin.com and Password: abcd@1234
* I loaded predefined data where each musician folder contains	Pictures (4), Videos (playable), Biography
	
Pages 

* 3.1) Music Hall (ficticious Music Hall) and Home (ficticious Music Hall)
* 3.2) Create/ Post a Show (Having six fields) that are mandatory ( Show name, Description, Show Date, Ticket price, Genre and Artist.
 I have populated 4 genres (Jazz / Pop / Rock / Electronic). I have populated 4 musician under Jazz, 5 musicians under Rock, 4 musicians under pop and 4 musicians under Electronic.
 Musicians are populated under genre selected
* 3.3) SHOWS/CALENDAR. Users have the ability to filter musicians by Genre, by selecting a day and clicking on the musician name.
 Once the musician is selected (Under the 'Heart' symbol you can create a 'Favourites' list, from there you can go back to the post.
 Or eliminate records from the favorite list. You have the ability to 'iterate' between each post (first, next, back, last)
* 3.4) Under INFO, you can see 2 pages FAQ and FOOD MENU
* 3.5) Favourites page 	
* 3.6) Merchandise
* 3.7) Interview
* 3.6) Logout page

* Having the ability to Adding shows to the cart / removing shows to the cart and calculating the price accordingly
* Having the ability to create favorites		  
