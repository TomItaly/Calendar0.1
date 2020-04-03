import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarEvents } from 'src/app/services/events.interface';
import { CalendarService } from 'src/app/services/calendar.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {
  sourceEvents: CalendarEvents[] = [];
  today = new Date();
  id: string;

  constructor(
    private calendarService: CalendarService,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = window.localStorage.getItem('user_id');
    this.getEvent(this.id);
  }

  getEvent(id) {
    if(!this.id) {
      return;
    }
    this.calendarService.userCalendarEvents(id)
    .subscribe((data: any) => {
      if(data && data.events.length > 0) {
        data.events.forEach((value) => {
          this.sourceEvents.push(value);
        });
      }
    });
  }

  viewEvent(event) {
    this.router.navigate(['/view-event', event.eventId]);
  }

}
