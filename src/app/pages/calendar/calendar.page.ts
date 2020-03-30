import { Router } from '@angular/router';
import {
  Component,
  ViewEncapsulation,
  OnInit,
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import {
  CalendarEvent,
  CalendarView,
  CalendarDateFormatter,
  CalendarMonthViewBeforeRenderEvent
} from 'angular-calendar';
import { Subject } from 'rxjs';
import * as _ from 'lodash';
import * as moment from 'moment';
import { CustomDateFormatter } from 'src/app/pages/calendar/custom-date-formatter';
import { AddEventModalPage } from 'src/app/pages/add-event-modal/add-event-modal.page';
import { CalendarService } from 'src/app/services/calendar.service';
import { CalendarEvents } from 'src/app/services/events.interface';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./calendar.page.scss'],
  providers:[
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ]
})
export class CalendarPage implements OnInit {
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];
  sourceEvents: CalendarEvent[] = [];
  eventSource: CalendarEvents[] = [];
  id: string;
  isIdPresent: boolean;

  constructor(
    private modalController: ModalController,
    private calendarService: CalendarService,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = window.localStorage.getItem('user_id');
    if (!this.id) {
      this.isIdPresent = false;
    }
    this.loadData(this.id, this.isIdPresent);
  }

  viewEvent(event) {
    this.router.navigate(['/view-event', event.eventId]);
  }

  loadData(id, idPresent?) {
    if (idPresent) {
      return;
    }
    const arrSource = []
    this.calendarService.getEvents()
      .subscribe((data: any) => {
        const userEvents = _.filter(data, ['id', id]);
        if (userEvents.length === 0) {
          return;
        }

        if(userEvents && userEvents[0].events.length > 0) {
          const result = userEvents[0].events;
          result.forEach((value) => {
            const start = this.formatDate(new Date(value.start));
            const curr = this.formatDate(new Date());
            const a = moment(curr, 'DD/MM/YYYY');
            const b = moment(start, 'DD/MM/YYYY');
            const diff = b.diff(a, 'days');
            if (diff === 0) {
              const todaysEvent = {
                start: new Date(value.start),
                end: new Date(value.end),
                title: value.title,
                allDay: value.allDay,
                description: value.description,
                eventId: value.eventId,
                resizable: {
                  beforeStart: true,
                  afterEnd: true
                },
                draggable: true
              };

              arrSource.push(value);
              this.eventSource = _.uniqBy(arrSource, 'eventId');
              this.events.push(todaysEvent);
              this.sourceEvents = _.uniqBy(this.events, 'eventId');
            } else if (diff >0) {
              const futureEvents = {
                start: new Date(value.start),
                end: new Date(value.end),
                title: value.title,
                allDay: value.allDay,
                description: value.description,
                eventId: value.eventId,
                resizable: {
                  beforeStart: true,
                  afterEnd: true
                },
                draggable: true
              };
              this.events.push(futureEvents);
              this.sourceEvents = _.uniqBy(this.events, 'eventId');
            }
        });
      }
      });
  }

  async presentModal(){
    const modal = await this.modalController.create({
      component: AddEventModalPage
    });
    // modal.onDidDismiss()
    //   .then((value) => {
    //     console.log(value);
    //   });

    await modal.present();
  }

  beforeMonthViewRender(renderEvent: CalendarMonthViewBeforeRenderEvent): void {
    renderEvent.body.forEach(day => {
      const dayOfMonth = day.date.getDate();
      const getMonth = day.date.getMonth();
      this.sourceEvents.forEach((value) => {
        if (dayOfMonth === new Date(value.start).getDate() 
        && getMonth === new Date(value.start).getMonth()) {
          day.cssClass = 'bg-pink';
        }
      });
    });
  } 

  setView(view: CalendarView) {
    this.view = view;
  }

  formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

}
