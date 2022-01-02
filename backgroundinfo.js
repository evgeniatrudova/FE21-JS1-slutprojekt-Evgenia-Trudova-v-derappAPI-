/**
 How to work with API- libraries.
___________ 
 API- test: 
 1. Key: "Insert key"
 2. One call API: https:// lat={}&lon={}&exclude={}&appid={}
 3. Insert data; google longitude and latitude.
 4. Remove {} tags
 5. Use apicall https as link; Error 404 if API call is bad; list with API data if call is working. 
 Example: 
 key: aea8811ce08d9fa322399c6d41422c47
 data: One call API: https://api.openweathermap.org/data/2.5/onecall?lat={}&lon={}&exclude={}&appid={}
 London API : https://api.openweathermap.org/data/2.5/onecall?lat=51.509865&lon=-0.118092&exclude=hourly,daily&appid=aea8811ce08d9fa322399c6d41422c47
 Status: OK 
____________
 API CALL, Reach into library for pieces of data:
 1. Positiv selection: find data goes into the file. (metric)
 2. Negative selection: exclude data from going into the file.(minutely,alert)
 3. Summorise positive and negative selection with apiOptions 

let apiPositive = "units=metric";
 let apiNegative = "exclude=minutely,alerts"; 
 let apiOptions ="units=metric&exclude=minutely,alerts";
 ___________
 FETCH, common method to request api-data from file. 
 1. Using fetch and catch, make a request into Api-file use .then/json/response. Using console.log bring out one data-value from API-file.

 fetch( Request1 + Request 2 + "APIhttps://" )
  .then(response => { 
   const contentType = response.headers.get('content-type');
   if (!contentType || !contentType.includes('application/json'))
      { throw new TypeError("Oops, we haven't got JSON!"); }
     return response.json();
  })
  .then(data => { })
  .catch(error => console.error(error));
____________
CONSTRUCTOR, common function added to classes in Java Script.
> Code that can, contain information about several items in class group; in this case UserONE and userTWO under User class. 
How is this code build? 
1. In class USER; there is a function called CONSTRUCTOR that created OBJECT { } that logs information. 
2. THIS. is used to log information in OBJECTs { this. name = ' '} however, it does not work with several users; instead CONSTRUCTOR adds variables of intrests and links {this.name = name}, variable.   
3. Class is used by CONST to informs USER class that GROUP userOne is equal to new User() GROUP;

class User{
constructor (email, name) {   this.name = name ; this.email = email ; }
}
const userOne = new User('userone@gmail.com','A-user');
const userTwo = newUser('usertwo@gmail.com','B-user');
_____________
CONSTRUCTOR IN API- Java Script
 class classname {
    constructor (){
     this. url
     this .method
     this .method.method
     this. control av data access
     this. DOM element = $('#id from HTML');
    }
     classfuntion (parameters) {
     this .method;
     this .method (html link);
     this .method .method (html link);
     this .classfunction .method; 
     this.${ #id}. method ('');
     }
 }
*/


/*
let weather = {}; class contains action of grabbing data from API; error message and return of value and deklaration of data needed, DOM link, link of search bar to data.
*/