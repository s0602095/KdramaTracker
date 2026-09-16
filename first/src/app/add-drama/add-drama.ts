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

  // Eingaben aus dem Formular
  name = '';
  genre = '';
  bewertung = 0;
  status = 'Noch offen';
  folgen = 1;

  // Hier wird das ausgewählte Bild gespeichert
  bild: File | null = null;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  // Wird aufgerufen, wenn ein Bild ausgewählt wird
  bildAuswaehlen(event: Event) {

    // Das HTML-Input-Feld holen
    const input = event.target as HTMLInputElement;

    // Prüfen, ob eine Datei ausgewählt wurde
    if (input.files && input.files.length > 0) {
      this.bild = input.files[0];
    }
  }

  addDrama() {

    // FormData wird benutzt, weil wir auch eine Datei senden
    const formData = new FormData();

    // Normale Formulardaten hinzufügen
    formData.append('name', this.name);
    formData.append('genre', this.genre);
    formData.append('bewertung', this.bewertung.toString());
    formData.append('status', this.status);
    formData.append('folgen', this.folgen.toString());

    // Bild hinzufügen, wenn eines ausgewählt wurde
    if (this.bild) {
      formData.append('bild', this.bild);
    }

    // Daten an das Backend senden
    this.http.post<any>('http://localhost:3000/dramas', formData)
      .subscribe({
        next: (data) => {

          // ID des neu erstellten Dramas speichern
          localStorage.setItem('neuesDramaId', data.insertedId);

          // Danach zu "Meine Dramas" wechseln
          this.router.navigate(['/dramas']);
        },

        error: (error) => {
          console.log('Fehler beim Hinzufügen:', error);
        }
      });
  }
}
