import { Routes } from '@angular/router';

import { HomeComponent } from './home/home';
import { Dramas } from './dramas/dramas';
import { AddDrama } from './add-drama/add-drama';
import { DramaDetail } from './drama-detail/drama-detail';
import { EditDrama } from './edit-drama/edit-drama';
import { DeleteDrama } from './delete-drama/delete-drama';

export const routes: Routes = [

  {
    path: '',
    component: HomeComponent
  },

  {
    path: 'dramas',
    component: Dramas
  },

  {
    path: 'add-drama',
    component: AddDrama
  },

  // Detailseite mit dem Namen des Dramas
  {
    path: 'drama-detail/:name',
    component: DramaDetail
  },

  // Löschen mit der MongoDB-ID
  {
    path: 'delete-drama/:id',
    component: DeleteDrama
  },

  // Bearbeiten mit der MongoDB-ID
  {
    path: 'edit-drama/:id',
    component: EditDrama
  }

];
