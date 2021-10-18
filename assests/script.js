var apiKey = 'b748bb5e0d9a2b21227f16e116293fbd';
var userInput = document.querySelector('#cityinput');
var submitButton = document.getElementById("submitbutton");
var messagebox = document.getElementById("messagebox");
var cityList = $('#citylist');
var citycontainer = document.getElementById("citycontainer");
var searchHistory = [];
var weatherbox = document.getElementById("weatherbox");
var icon = document.getElementById("icon");
var five = document.getElementById("five");
var fiveday = document.getElementById("fiveday");
var resetButton = document.getElementById("reset");
buildsearchHistory();
// This Function grabs Search History from Local Storage
function buildsearchHistory() {
    var storedCities = JSON.parse(localStorage.getItem("searchHistory"));
    if (storedCities !== null) {
        searchHistory = storedCities;
    };
    for (i = 0; i < searchHistory.length; i++) {
        var buttonlistEl = $('<button>').attr({
            class: "buttonclass",
        })
        var buttonlistDetail = searchHistory[i];
        buttonlistEl.text(buttonlistDetail);
        buttonlistEl.appendTo(cityList);
    }
};
//Submit Button Saves City Selected by User
submitButton.addEventListener('click', function(event) {
    fiveday.removeAttribute("style", "display:none");
    event.preventDefault();
    city = $(cityinput).val()
    var checkArray = searchHistory.includes(city);
    if (checkArray == true) {
        $("#cityinput").val("");
        messagebox.textContent = "Please Choose A Different City";
        return
    } else {
        if (searchHistory.length === 8) { searchHistory.shift() };
        searchHistory.push(city);
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
        var citylistButton = $('<button>').attr({
            class: "buttonclass",
        });
        var citybuttonDetail = $(cityinput).val()
        citylistButton.text(citybuttonDetail);
        citylistButton.appendTo(cityList);
        $("#cityinput").val("");
        getData(city);
    }
});
function getData(city) {
    five.removeAttribute("style", "display:none");
    fiveday.removeAttribute("style", "display:none");
    var currentWeatherURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=" + apiKey;
    fetch(currentWeatherURL)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    $("#citychosen").text(city);
                    $("#humid").text("Current Humidity : " + data.main.humidity + "%");
                    $("#wind").text("Current Windspeed: " + data.wind.speed + " Knots");
                    $("#temp").text("Current Tempature: " + data.main.temp + "° Fahrenheit");
                    var latitude = data.coord.lat;
                    var longitude = data.coord.lon;
                    console.log(latitude);
                    console.log(longitude);
                    setDate();
                    getmoreData(latitude, longitude);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function(error) {
            alert('Unable to connect to OpenWeather');
        });
};
//This function Sets the Current Date and next Five Days
function setDate() {
    var weatherDay = moment().format('(MM/DD/YYYY)');
    $("#todaydate").text(weatherDay);
    var oneDay = moment().add(01, 'days').format('MM/DD/YYYY')
    $("#forecastdate").text(oneDay);
    var twoDay = moment().add(02, 'days').format('MM/DD/YYYY')
    $("#forecastdate2").text(twoDay);
    var threeDay = moment().add(03, 'days').format('MM/DD/YYYY')
    $("#forecastdate3").text(threeDay);
    var fourDay = moment().add(04, 'days').format('MM/DD/YYYY')
    $("#forecastdate4").text(fourDay);
    var fiveDay = moment().add(05, 'days').format('MM/DD/YYYY')
    $("#forecastdate5").text(fiveDay);
}
function getmoreData(latitude, longitude) {
    const latLonURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&exclude=minutely,hourly,alerts&units=imperial&appid=' + apiKey;
    fetch(latLonURL)
        .then(response => response.json())
        .then(data2 => {
            console.log(data2);
            $("#UV").text("Current UV: " + data2.current.uvi);
            var icon1 = data2.daily[0].weather[0].icon;
            var iconImg1 = 'http://openweathermap.org/img/wn/' + icon1 + '.png';
            icon.setAttribute('src', iconImg1);
            var iconF = data2.daily[0].weather[0].icon
            $("#forecasticon").attr("src", "http://openweathermap.org/img/wn/" + iconF + "@2x.png")
            var iconF2 = data2.daily[1].weather[0].icon
            $("#forecasticon2").attr("src", "http://openweathermap.org/img/wn/" + iconF2 + "@2x.png")
            var iconF3 = data2.daily[2].weather[0].icon
            $("#forecasticon3").attr("src", "http://openweathermap.org/img/wn/" + iconF3 + "@2x.png")
            var iconF4 = data2.daily[3].weather[0].icon
            $("#forecasticon4").attr("src", "http://openweathermap.org/img/wn/" + iconF4 + "@2x.png")
            var iconF5 = data2.daily[4].weather[0].icon
            $("#forecasticon5").attr("src", "http://openweathermap.org/img/wn/" + iconF5 + "@2x.png")
                //5-day temp
            var temp = parseInt(data2.daily[0].temp.max)
            $("#forecasttemp").text(temp + "° Fahrenheit")
            var temp2 = parseInt(data2.daily[1].temp.max)
            $("#forecasttemp2").text(temp2 + "° Fahrenheit")
            var temp3 = parseInt(data2.daily[2].temp.max)
            $("#forecasttemp3").text(temp3 + "° Fahrenheit")
            var temp4 = parseInt(data2.daily[3].temp.max)
            $("#forecasttemp4").text(temp4 + "° Fahrenheit")
            var temp5 = parseInt(data2.daily[4].temp.max)
            $("#forecasttemp5").text(temp5 + "° Fahrenheit")
                // 5-day wind


            var wind = data2.daily[0].wind_speed;
            $("#forecastwind").text("Windspeed: " + wind + " Knots");
            var wind2 = data2.daily[1].wind_speed
            $("#forecastwind2").text("Windspeed: " + wind2 + " Knots");
            var wind3 = data2.daily[2].wind_speed
            $("#forecastwind3").text("Windspeed: " + wind3 + " Knots");
            var wind4 = data2.daily[3].wind_speed
            $("#forecastwind4").text("Windspeed: " + wind4 + " Knots");
            var wind5 = data2.daily[4].wind_speed
            $("#forecastwind5").text("Windspeed: " + wind5 + " Knots");
            //5-day Humidity
            var hum = data2.daily[0].humidity
            $("#forecasthumidity").text("Humidity " + hum + "%");
            var hum2 = data2.daily[1].humidity
            $("#forecasthumidity2").text("Humidity " + hum2 + "%");
            var hum3 = data2.daily[2].humidity
            $("#forecasthumidity3").text("Humidity " + hum3 + "%");
            var hum4 = data2.daily[3].humidity
            $("#forecasthumidity4").text("Humidity " + hum4 + "%");
            var hum5 = data2.daily[4].humidity
            $("#forecasthumidity5").text("Humidity " + hum5 + "%");

        })
}
//This Function Allows Users to Select City from Local Storage
cityList.on("click", function(event) {
    getData(event.target.innerText)
});

//This Function Clears Local Storage and Returns User to Homepage
resetButton.addEventListener("click", function(event) {
    event.preventDefault();
    searchHistory.length = 0;
    localStorage.clear();
    citycontainer.innerText = "";
    weatherbox.innerText = "";
    $("#cityinput").val("");
    $("#messagebox").val("");
})
//Autocomplete Function Runs when User Searches for a City
$(function() {
    var cityNames = [
        'Abidjan',
        'Addis Ababa',
        'Ahmedabad',
        'Albuquerque',
        'Alexandria',
        'Ankara',
        'Arlington',
        'Atlanta',
        'Austin',
        'Baghdad',
        'Baltimore',
        'Bangalore',
        'Bangkok',
        'Barcelona',
        'Beijing',
        'Belo Horizonte',
        'Bogota',
        'Boston',
        'Brasilia',
        'Buenos Aires',
        'Cairo',
        'Cape Town',
        'Changchun',
        'Changsha',
        'Charlotte',
        'Chengdu',
        'Chennai',
        'Chicago',
        'Chittagong',
        'Chongqing',
        'Colorado Springs',
        'Columbus',
        'Dalian',
        'Dallas',
        'Dar Es Salaam',
        'Delhi',
        'Denver',
        'Detroit',
        'Dhaka',
        'Dongguan',
        'El Paso',
        'Fort Worth',
        'Foshan',
        'Fresno',
        'Fukuoka',
        'Guadalajara',
        'Guangzhou',
        'Haerbin',
        'Hangzhou',
        'Hanoi',
        'Hefei',
        'Ho Chi Minh City',
        'Hong Kong',
        'Houston',
        'Hyderabad',
        'Indianapolis',
        'Istanbul',
        'Jacksonville',
        'Jakarta',
        'Ji Nan Shandong',
        'Jiddah ',
        'Johannesburg',
        'Kabul',
        'Kansas City',
        'Karachi',
        'Khartoum',
        'Kinshasa',
        'Kolkata',
        'Kuala Lumpur',
        'Kunming',
        'Lagos',
        'Lahore',
        'Las Vegas',
        'Lima',
        'London',
        'Long Beach',
        'Los Angeles',
        'Louisville',
        'Luanda',
        'Madrid',
        'Manila',
        'Melbourne',
        'Memphis',
        'Mesa',
        'Mexico City',
        'Miami',
        'Milwaukee',
        'Minneapolis',
        'Monterrey',
        'Montreal',
        'Moscow',
        'Mumbai',
        'Nagoya',
        'Nairobi',
        'Nanjing',
        'Nashville',
        'New York City',
        'Ningbo',
        'Oakland',
        'Oklahoma City',
        'Omaha',
        'Osaka',
        'Paris',
        'Philadelphia',
        'Phoenix',
        'Portland',
        'Pune',
        'Qingdao',
        'Raleigh',
        'Recife',
        'Rio De Janeiro',
        'Riyadh',
        'Rome',
        'Sacramento',
        'Saint Petersburg',
        'San Antonio',
        'San Diego',
        'San Francisco',
        'San Jose',
        'Santiago',
        'Sao Paulo',
        'Seattle',
        'Seoul',
        'Shanghai',
        'Shantou',
        'Shenyang',
        'Shenzhen',
        'Shijiazhuang ',
        'Singapore',
        'Surat ',
        'Suzhou',
        'Sydney',
        'Tampa',
        'Tehran',
        'Tel Aviv',
        'Tianjin',
        'Tokyo',
        'Toronto',
        'Tucson',
        'Tulsa ',
        'Urumqi',
        'Virginia Beach ',
        'Washington DC',
        'Wuhan',
        'Xi An Shaanxi',
        'Xinbei',
        'Yangon ',
        'Zhengzhou'
    ];
    $("#cityinput").autocomplete({
        source: cityNames,
    });
});