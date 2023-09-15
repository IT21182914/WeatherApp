# WeatherApp backend using Node js


I will add instructions and details about this
project.




Here is how you can test the backend using Postman,

1.add a user - POST - http://localhost:3000/users/add-user

{
  "email": "dilanshanuka999@gmail.com",
  "location": "USA"
}


2.update location - PUT-  http://localhost:3000/users/update-location/6501f955d4282e41e04d1f54

3.get whether data - GET - http://localhost:3000/weather/by-coordinates?lat=40.7128&lon=-74.0060


4.send whether reports to all in the database - http://localhost:3000/weather/send-weather-reports
