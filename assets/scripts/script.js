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
        $(`#city-name`).text(cityName);

        var daysArr = json.forecast.simpleforecast.forecastday;

        daysArr.forEach((day, index) => {
            var weekday = day.date.weekday_short,
                iconURL = day.icon_url,
                condition = day.conditions,
                highF = day.high.fahrenheit,
                lowF = day.low.fahrenheit,
                date = day.date.month + "/" + day.date.day;
            $(`#day${index}-day`).text(weekday);
            $(`#day${index}-icon`).attr("src", iconURL);
            $(`#day${index}-condition`).text(condition);
            $(`#day${index}-high`).text(highF + "\u00b0F");
            $(`#day${index}-low`).text(lowF + "\u00b0F");
            $(`#day${index}-date`).text(date);
        });

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
$(".card").hover(function() {$(this).toggleClass("opacity")});
