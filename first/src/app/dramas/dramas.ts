import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dramas',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dramas.html',
  styleUrl: './dramas.css'
})
export class Dramas implements OnInit {

  // Dramas aus MongoDB
  dramas: any[] = [];

  // Standardmäßig werden alle Dramas angezeigt
  filter = 'alle';

  // ID des zuletzt hinzugefügten Dramas
  neuesDramaId: string | null = null;

  constructor(
    private http: HttpClient,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {

    // ID des zuletzt hinzugefügten Dramas aus dem Browser holen
    this.neuesDramaId = localStorage.getItem('neuesDramaId');

    // Dramas aus dem Backend laden
    this.http.get<any[]>('http://localhost:3000/dramas')
      .subscribe({
        next: (data) => {

          // Daten aus MongoDB speichern
          this.dramas = data;

          // Angular mitteilen, dass sich die Ansicht geändert hat
          this.changeDetector.markForCheck();

        },

        error: (error) => {
          console.log('Fehler:', error);
        }
      });
  }

  // Filter ändern
  setFilter(filter: string) {
    this.filter = filter;
  }

  // Prüfen, ob Drama angezeigt werden soll
  zeigeDrama(drama: any): boolean {

    // Alle Dramas anzeigen
    if (this.filter === 'alle') {
      return true;
    }

    // Nur bereits geschaute Dramas
    if (this.filter === 'geschaut') {
      return drama.status === 'Geschaut';
    }

    // Nur Dramas, die gerade geschaut werden
    if (this.filter === 'dabei') {
      return drama.status === 'Schaue ich gerade';
    }

    // Nur noch offene Dramas
    if (this.filter === 'offen') {
      return drama.status === 'Noch offen';
    }

    return false;
  }

  // Prüfen, ob dieses Drama das neu hinzugefügte Drama ist
  istNeu(drama: any): boolean {
    return drama._id === this.neuesDramaId;
  }
}