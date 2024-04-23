function zapisz(nazwa,cena,N) {
    var produkt = {};
    produkt.nazwa = nazwa;
    produkt.ilosc = document.getElementById('ilosc'+N).value;
    produkt.cena = cena;

    var itemIndex = 1;
    while (localStorage.getItem('item_' + itemIndex)) {
      itemIndex++;
    }
  
    // Zapisz nowy element w sessionStorage pod odpowiednim kluczem
    localStorage.setItem('item_' + itemIndex, JSON.stringify(produkt));

  }

  function wyswietlKoszyk() {
    var tabelaKoszyka = document.getElementById('koszyk');
    tabelaKoszyka.innerHTML = '';
  
    var liczbaProduktow = localStorage.length;
    if (liczbaProduktow === 0) {
      tabelaKoszyka.textContent = 'Koszyk jest pusty.';
    } else {
      var tabela = document.createElement('table');
      tabela.classList.add('koszyk-table');
  
      var naglowek = tabela.createTHead();
      var wierszNaglowka = naglowek.insertRow();
      wierszNaglowka.innerHTML = '<th style="width: 300px;">Nazwa produktu</th><th>Cena</th><th>Ilość</th><th>Razem</th><th>Usuń</th>';
  
      var cialo = tabela.createTBody();
      var sumaRazem = 0;
  
      for (var i = 0; i < liczbaProduktow; i++) {
        var klucz = localStorage.key(i);
        if (klucz.includes('item_')) {
          var produkt = JSON.parse(localStorage.getItem(klucz));
          var wiersz = cialo.insertRow();
          var razem = produkt.ilosc * produkt.cena;
          sumaRazem += razem;
          wiersz.innerHTML = `<td>${produkt.nazwa}</td><td>${produkt.cena}</td><td>${produkt.ilosc}</td><td>${razem}</td style="text-align: center;"><button type="button" onclick="usun('${produkt.nazwa}')")>Usuń</button>`;
        }
      }
  
      var wierszSumy = cialo.insertRow();
      wierszSumy.innerHTML = `<td colspan="4">Suma:</td><td>${sumaRazem}</td>`;
  
      tabelaKoszyka.appendChild(tabela);
    }
  }

  function usun(nazwa) {
    // Iteruj przez zapisane produkty w localStorage
    for (var i = 0; i < localStorage.length; i++) {
      var klucz = localStorage.key(i);
      if (klucz.includes('item_')) {
        var produkt = JSON.parse(localStorage.getItem(klucz));
        if (produkt.nazwa === nazwa) {
          // Usuń produkt o zadanej nazwie
          localStorage.removeItem(klucz);
          break; // Przerwij pętlę po usunięciu produktu
        }
      }
    }
    wyswietlKoszyk();
  }

  function wyczysc(){
    sessionStorage.clear();
    localStorage.clear();
  }

  function sprawdz(id, pattern) {
    var wartosc = $('#' + id).val();
    if (wartosc === null) {
        $('#' + id + '-error').html('Wpisz wartość ').css('color', 'red');
        return false;
    } else if (!pattern.test(wartosc)) {
        $('#' + id + '-error').html('Niepoprawne ' + id).css('color', 'red');
        return false;
    } else {
        $('#' + id + '-error').html('Poprawne ').css('color', 'green');
        return wartosc;
    }
}
  function sprawdzRadio(){
    var platnosci = document.querySelectorAll('input[name="karta"]:checked');
    
    if (platnosci.length === 0) {
        document.getElementById('karta-error').innerHTML = 'Wybierz sposób płatności';
        document.getElementById('karta-error').style.color = 'red';
        return false;
    } else {
        var radioErrorDiv = document.getElementById('karta-error');
        
        document.getElementById('karta-error').style.color = 'black';
        //radioErrorDiv.innerHTML = platnosci[0].value;
        return platnosci[0].value;
    }
}

  function walidacja(event){
    event.preventDefault();
    var wiadomosc = "Imie: " + sprawdz("imie",/^[A-Za-z][a-z]+$/) +
                    " Nazwisko: " + sprawdz("nazwisko",/^[A-Za-z][a-z]+$/) + 
                    " Nr-tel: " + sprawdz("nr-tel", /^[0-9]{9}$/) + 
                    " E-mail: " + sprawdz("email",/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/) + 
                    " Miejscowość: " + sprawdz("miejscowosc", /^[a-zA-Z a-zA-Z]+$/) + 
                    " Kod pocztowy: " + sprawdz("kod-pocztowy",/^[0-9]{2}-[0-9]{3}$/) + 
                    " Ulica: " + sprawdz("ulica",/^[A-Za-z][a-z]+$/) + 
                    " Karta: " + sprawdzRadio() + " Nr karty: " +
                     sprawdz("nr-karty",/^[0-9]{16}$/) + " CCV: " +
                      sprawdz("kod-ccv",/^[0-9]{3}$/);
    if (
        sprawdz("imie", /^[A-Za-z][a-z]+$/) !== false &&
        sprawdz("nazwisko", /^[A-Za-z][a-z]+$/) !== false &&
        sprawdz("nr-tel", /^[0-9]{9}$/) !== false &&
        sprawdz("email", /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/) !== false &&
        sprawdz("miejscowosc", /^[a-zA-Z a-zA-Z]+$/) !== false &&
        sprawdz("kod-pocztowy", /^[0-9]{2}-[0-9]{3}$/) !== false &&
        sprawdz("ulica", /^[A-Za-z][a-z]+$/) !== false &&
        sprawdzRadio() !== false &&
        sprawdz("nr-karty", /^[0-9]{16}$/) !== false &&
        sprawdz("kod-ccv", /^[0-9]{3}$/) !== false
      ) {
        alert(wiadomosc);
    }
}
  