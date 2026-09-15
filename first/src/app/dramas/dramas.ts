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

  constructor(
    private http: HttpClient,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {

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
}