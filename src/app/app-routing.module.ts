import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'calendar', pathMatch: 'full' },
  {
    path: 'calendar', loadChildren: () => import('src/app/pages/calendar/calendar.module').then( m => m.CalendarPageModule)
  },
  {
    path: 'schedule', loadChildren: () => import('src/app/pages/schedule/schedule.module').then( m => m.SchedulePageModule)
  },
  {
    path: 'view-event/:id', loadChildren: () => import('src/app/pages/view-event/view-event.module').then( m => m.ViewEventPageModule)
  },
  { 
    path: 'add-event-modal', loadChildren: () => import('src/app/pages/add-event-modal/add-event-modal.module').then(m => m.AddEventModalPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppRoutingModule { }
