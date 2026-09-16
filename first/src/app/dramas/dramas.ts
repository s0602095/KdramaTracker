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

  dramas: any[] = [];

  filter = 'alle';

  neuesDramaId: string | null = null;

  constructor(
    private http: HttpClient,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {

    // ID des neu hinzugefügten Dramas holen
    this.neuesDramaId = localStorage.getItem('neuesDramaId');

    // Alle Dramas vom Backend laden
    this.http.get<any[]>('http://localhost:3000/dramas')
      .subscribe({

        next: (data) => {

          // Alle Dramas übernehmen
          this.dramas = data;

          // Die bisherige Reihenfolge umdrehen
          // Das Drama ganz unten kommt dadurch nach oben
          this.dramas.reverse();

          // Neues Drama ganz oben anzeigen
          if (this.neuesDramaId) {

            const neuesDrama = this.dramas.find(
              drama => drama._id === this.neuesDramaId
            );

            if (neuesDrama) {

              // Neues Drama aus der normalen Liste entfernen
              this.dramas = this.dramas.filter(
                drama => drama._id !== this.neuesDramaId
              );

              // Neues Drama ganz oben einfügen
              this.dramas.unshift(neuesDrama);
            }
          }

          // Angular über die Änderung informieren
          this.changeDetector.markForCheck();
        },

        error: (error) => {
          console.log('Fehler:', error);
        }

      });
  }


  // Filter auswählen
  setFilter(filter: string) {
    this.filter = filter;
  }


  // Prüft, ob ein Drama zum ausgewählten Filter gehört
  zeigeDrama(drama: any): boolean {

    if (this.filter === 'alle') {
      return true;
    }

    if (this.filter === 'geschaut') {
      return drama.status === 'Geschaut';
    }

    if (this.filter === 'dabei') {
      return drama.status === 'Schaue ich gerade';
    }

    if (this.filter === 'offen') {
      return drama.status === 'Noch offen';
    }

    return false;
  }


  // Prüft, ob dieses Drama neu hinzugefügt wurde
  istNeu(drama: any): boolean {
    return drama._id === this.neuesDramaId;
  }

}



