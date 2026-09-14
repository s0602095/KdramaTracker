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

}
