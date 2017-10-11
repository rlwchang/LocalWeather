var googleAPIKey = "AIzaSyA0I2xX1mnirAlMaS8M-49tEHF-hbDxEcQ";
var openweatherAPIKey = "7fc03f537002416f0d00fc3c16a783b3"

function getAddress() {
    return $(".nav__search").val();
}

function toCelsius(num) {
    return num * 9 / 5 + 32;
}

function toFarenheit(num) {
    return (num - 32) * 5 / 9;
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

        // $.getJSON(`https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lng}&cnt=5&appid=${openweatherAPIKey}`, function(json) {
        //     var day1 = json.list[0],
        //         day2 = json.list[1],
        //         day3 = json.list[2],
        //         day4 = json.list[3],
        //         day5 = json.list[4];
        // });

        $.getJSON(`https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lng}`, function(json) {
            var minTemp = json.main.temp_min,
                maxTemp = json.main.temp_max,
                type = json.weather.main,
                iconURL = json.weather.icon;

            console.log(minTemp);
        });
        // console.log(json);
        // console.log(json.results[0]);
    });
}

$(".nav__search-btn").on("click", searchAndUpdateWeather);
$(".nav__search").keypress(function(e) {
    if(e.which == 13) {searchAndUpdateWeather()}
});
