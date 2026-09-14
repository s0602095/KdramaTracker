import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

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

  constructor(private http: HttpClient){}

  addDrama(){
  
  const drama = {
      name: this.name,
      genre: this.genre,
      bewertung: this.bewertung

  };
    this.http.post('http://localhost:3000/dramas', drama)
    .subscribe(() => {
      console.log('Drama wurde hinzugefügt');
    });

  }
  
}
