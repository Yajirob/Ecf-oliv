let togg1 = document.getElementById("togg1");
let d1 = document.getElementById("d1");
togg1.addEventListener("click", () => {
  if(getComputedStyle(d1).display != "none"){
    d1.style.display = "none";
  } else {
    d1.style.display = "block";
  }
})



// A TEEEEEEEEEEEST

// var movies = [
//   {    titre: "Deadpool",    annee: 2016,    realisateur : "Tim Miller" },
//   {    titre: "Spiderman",    annee: 2002,    realisateur : "Sam Raimi" },
//   {    titre: "Scream",    annee: 1996,    realisateur : "Wes Craven" },
//   {    titre: "It: chapter 1",    annee: 2019,    realisateur : "Andy Muschietti" }
// ];



// function generateTableHead(table, data) {
// let thead = table.createTHead();
// let row = thead.insertRow();
// for (let key of data) {
//   let th = document.createElement("th");
//   let text = document.createTextNode(key);
//   th.appendChild(text);
//   row.appendChild(th);
// }
// }

// function generateTable(table, data) {
// for (let element of data) {
//   let row = table.insertRow();
//   for (key in element) {
//   let cell = row.insertCell();
//   let text = document.createTextNode(element[key]);
//   cell.appendChild(text);
//   }
// // }
// // }

// let table = document.querySelector("table");
// let data = Object.keys(films[0]);
// generateTable(table, films); // generate the table first
// generateTableHead(table, data); // then the head

// A TEEEEEST



// Film Class: Represents a Film
class Film {
  constructor(titre, annee, realisateur) {
    this.titre = titre;
    this.annee = annee;
    this.realisateur = realisateur;
  }
}

// UI Class: Handle UI Tasks
class UI {
  static displayFilms() {
    const films = Store.getFilms();

    films.forEach((film) => UI.addFilmToList(film));
  }

  static addFilmToList(film) {
    const list = document.querySelector('#film-list');

    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${film.titre}</td>
      <td>${film.annee}</td>
      <td>${film.realisateur}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">Supprimer</a></td>
    `;

    list.appendChild(row);
  }

  static deleteFilm(el) {
    if(el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#film-form');
    container.insertBefore(div, form);

    // Vanish in 3 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  static clearFields() {
    document.querySelector('#titre').value = '';
    document.querySelector('#annee').value = '';
    document.querySelector('#realisateur').value = '';
  }
}

// Store Class: Handles Storage
class Store {
  static getFilms() {
    let films;
    if(localStorage.getItem('films') === null) {
      films = [];
    } else {
      films = JSON.parse(localStorage.getItem('films'));
    }

    return films;
  }

  static addFilm(film) {
    const films = Store.getFilms();
    films.push(film);
    localStorage.setItem('films', JSON.stringify(films));
  }

  static removeFilm(realisateur) {
    const films = Store.getFilms();

    films.forEach((film, index) => {
      if(film.realisateur === realisateur) {
        films.splice(index, 1);
      }
    });

    localStorage.setItem('films', JSON.stringify(films));
  }
}

// Event: Display Films
document.addEventListener('DOMContentLoaded', UI.displayFilms);


// Event: Add a Film
document.querySelector('#film-form').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault();

  // Get form values
  const titre = document.querySelector('#titre').value;
  const annee = document.querySelector('#annee').value;
  const realisateur = document.querySelector('#realisateur').value;

  // Validate
  if(titre === '' || annee === '' || realisateur === '') {
    UI.showAlert('Veuillez remplir tous les champs', 'danger');
  } else {
    // Instatiate film
    const film = new Film(titre, annee, realisateur);

    // Add Film to UI
    UI.addFilmToList(film);

    // Add film to store
    Store.addFilm(film);

    // Show success message
    UI.showAlert('Film ajouté avec succès', 'success');

    // Clear fields
    UI.clearFields();
  }
});

// Event: Remove a Film
document.querySelector('#film-list').addEventListener('click', (e) => {
  // Remove film from UI
  UI.deleteFilm(e.target);

  // Remove film from store
  Store.removeFilm(e.target.parentElement.previousElementSibling.textContent);

  // Show success message
  UI.showAlert('Le film a bien été supprimé', 'success');
});
