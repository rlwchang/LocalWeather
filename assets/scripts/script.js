var googleAPIKey = "AIzaSyA0I2xX1mnirAlMaS8M-49tEHF-hbDxEcQ";
var weatherUndegroundAPIKey = "19d816e94a0f10ea"

function getAddress() {
    return $(".nav__search").val();
}

function toCelsius(num) {
    return num * 9 / 5 + 32;
}

function toFarenheit(num) {
    return (num - 32) * 5 / 9;
}

function updateWeather(lat, lng) {
    $.getJSON(`http://api.wunderground.com/api/${weatherUndegroundAPIKey}/conditions/forecast10day/q/${lat},${lng}.json`, function(json) {
        var cityName = json.current_observation.display_location.full;
        var daysArr = json.simpleforecast.forecastday;
        var day1 = daysArr[0],
            day2 = daysArr[1],
            day3 = daysArr[2],
            day4 = daysArr[3];

            // (use a foreach loop to go through the array and modify each of the elements of the card)
    })
}

function searchAndUpdateWeather() {
    var address = getAddress();

    $.getJSON(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${googleAPIKey}`, function(json) {
        if (json.status === "OK") {
            var lat = json.results[0].geometry.location.lat;
            var lng = json.results[0].geometry.location.lng;
        } else {
            console.log("Invalid Address") //Modify later
        }

        updateWeather(lat, lng);

        // $.getJSON(`https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lng}`, function(json) {
        //     var minTemp = json.main.temp_min,
        //         maxTemp = json.main.temp_max,
        //         type = json.weather.main,
        //         iconURL = json.weather.icon;
        //
        //     console.log(minTemp);
        // });
        // console.log(json);
        // console.log(json.results[0]);
    });
}

$(".nav__search-btn").on("click", searchAndUpdateWeather);
$(".nav__search").keypress(function(e) {
    if(e.which == 13) {searchAndUpdateWeather()}
});
