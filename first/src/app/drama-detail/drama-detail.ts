import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-drama-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './drama-detail.html',
  styleUrl: './drama-detail.css'
})
export class DramaDetail implements OnInit {

  name = '';
  status = '';
  bewertung = '';
  folgen = '';
  genre = '';
  beschreibung = '';
  bild = '';
  dramaId = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {

    // Namen des Dramas aus der URL holen
    const name = this.route.snapshot.paramMap.get('name');

    console.log('URL:', name);

    // Alle Dramas aus MongoDB laden
    this.http.get<any[]>('http://localhost:3000/dramas')
      .subscribe(data => {

        console.log('ALLE DATEN:', data);

        // Passendes Drama suchen
        const drama = data.find(
          d => d.name === name
        );

        console.log('DRAMA GEFUNDEN:', drama);

        if (drama) {

          // MongoDB-ID speichern
          this.dramaId = drama._id;

          // =========================
          // DRAMA DATEN
          // =========================

          this.name = drama.name;

          this.status = drama.status;

          // Bewertung sicher anzeigen
          const rating = Number(drama.bewertung);

          this.bewertung =
            '⭐'.repeat(
              Math.max(0, Math.min(10, rating))
            );

          this.folgen = String(drama.folgen);

          this.genre = drama.genre;

          this.beschreibung =
            drama.beschreibung ||
            'Noch keine Beschreibung vorhanden.';


          // =========================
          // POSTER LADEN
          // =========================

          if (drama.bild) {

            // Neue Bilder aus backend/uploads
            if (drama.bild.startsWith('/uploads/')) {

              this.bild =
                'http://localhost:3000' + drama.bild;

            } else {

              // Alte Bilder
              this.bild =
                'bilder/' + drama.bild;

            }

          } else {

            this.bild = '';

          }


          // =========================
          // KONTROLLE
          // =========================

          console.log('Name:', this.name);
          console.log('Status:', this.status);
          console.log('Bewertung:', this.bewertung);
          console.log('Folgen:', this.folgen);
          console.log('Genre:', this.genre);
          console.log('Beschreibung:', this.beschreibung);
          console.log('Bild:', this.bild);

          // Angular Anzeige aktualisieren
          this.cd.detectChanges();

        }

      });

  }

}

