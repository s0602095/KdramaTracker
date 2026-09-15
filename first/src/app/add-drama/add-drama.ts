import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-drama',
  imports: [FormsModule],
  templateUrl: './add-drama.html',
  styleUrl: './add-drama.css',
})
export class AddDrama {

  name = '';
  genre = '';
  bewertung = 0;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  addDrama() {

    const drama = {
      name: this.name,
      genre: this.genre,
      bewertung: this.bewertung
    };

    this.http.post('http://localhost:3000/dramas', drama)
      .subscribe(() => {

         // Speichern, welches Drama gerade hinzugefügt wurde
        localStorage.setItem('neuesDrama', this.name);

         // Danach zu "Meine Dramas" wechseln
        this.router.navigate(['/dramas']);
      });

  }

}