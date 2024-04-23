//tworzenie tabeli
function wstawTabelke(dystans) {
    document.getElementById("lokalizuj").innerHTML = '<div class="container-flex bg-success" style="text-align: center; border: none; border-radius: 10px; min-height: 40px;color: white;font-size: 15px;">Udało się<div class="col-12 text-center">Dystans: '+ (dystans).toFixed(2) + '</div></div>';
    var tabela = `
      <div id="tabelaDiv">
      <form action="mailto:emailid@example.com" method="post" enctype="text/plain">
            <table>
            <tbody>
                <tr>
                <td>Miasto:</td>
                <td><input type="text" id="miasto" placeholder="Lublin" required></td>
                <td><div id="miasto_error"></div></td>
                </tr>
                <tr>
                <td>Kod pocztowy:</td>
                <td><input type="text" id="kod_pocztowy" placeholder="12-345" pattern="[0-9]{2}-[0-9]{3}" required></td>
                <td><div id="kod_pocztowy_error"></div></td>
                </tr>
                <tr>
                <td>Ulica:</td>
                <td><input type="text" id="ulica" placeholder="Nadbystrzycka" required></td>
                <td><div id="ulica_error"></div></td>
                </tr>
                <tr>
                <td>Nr budynku:</td>
                <td><input type="text" id="nr_budynku" placeholder="12/8" required></td>
                <td><div id="nr_budynku_error"></div></td>
                </tr>
                <tr>
                <td>E-mail:</td>
                <td><input type="email" id="email" placeholder="name@email.com" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required></td>
                <td><div id="email_error"></div></td>
                </tr>
                <tr>
                <td>Nr telefonu:</td>
                <td><input type="text" id="nr_telefonu" placeholder="123456789" pattern="[0-9]{9}" required></td>
                <td><div id="nr_telefonu_error"></div></td>
                </tr>
                <tr>
                <td>Wybierz termin</td>
                <td><input type="datetime-local" id="termin" required></td>
                <td><div id="nr_data_error"></div></td>
                </tr>
                <tr>
                    <td><input type="submit" value="Zarezerwuj termin"><td>
                    <td></td>
                </tr>

            </tbody>
            </table>
        </form>
      </div>
    `;
    
    document.getElementById("wynik").innerHTML = tabela;
  }

function calculateDistance(lat1, lon1, lat2, lon2) {
    var earthRadius = 6371; // promień Ziemi w kilometrach
  
    var dLat = toRadians(lat2 - lat1);
    var dLon = toRadians(lon2 - lon1);
  
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var distance = earthRadius * c;
  
    return distance;
  }
  
  // Funkcja pomocnicza do zamiany stopni na radiany
  function toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

function showMap(x,y){
    var wspolrzedne = new google.maps.LatLng(x,y);
    var opcjeMapy = {
        zoom: 10,
        center: wspolrzedne,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var mapa = new google.maps.Map(document.getElementById("mapka"),opcjeMapy);
}
function showLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var odlegloscX = 51.250643;
    var odlegloscY = 22.5374186;
    dystans = calculateDistance(latitude, longitude, odlegloscX, odlegloscY)
    if(dystans<=100) {
        wstawTabelke(dystans);
    }
    else {
        document.getElementById("lokalizuj").innerHTML = '<div class="container-flex bg-danger" style="text-align: center; border: none; border-radius: 10px; min-height: 40px;color: white;font-size: 15px;">Nie udało się<div class="col-12 text-center">Dystans: '+ (dystans).toFixed(2) + '</div></div>';
    }
    
    
    showMap(latitude,longitude);
}
function errorHandler(error) {
    var output = document.getElementById("geo");
    switch (error.code) {
        case error.PERMISSION_DENIED:
            output.innerHTML = "Użytkownik nie udostępnił danych.";
        break;
        case error.POSITION_UNAVAILABLE:
            output.innerHTML = "Dane lokalizacyjne niedostępne.";
        break;
        case error.TIMEOUT:
            output.innerHTML = "Przekroczono czas żądania.";
        break;
        case error.UNKNOWN_ERROR:
            output.innerHTML = "Wystąpił nieznany błąd.";
        break;
    }
}
function getLocation() {
    if (navigator.geolocation) {
        var options = {timeout: 60000};
        navigator.geolocation.getCurrentPosition(
        showLocation,
        errorHandler,
        options);
    } else { alert("Twoja przeglądarka nie wspiera geolokalizacji!");}
}

