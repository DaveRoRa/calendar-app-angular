import { Component } from '@angular/core';
import { CalendarComponent } from './calendar/calendar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CalendarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'calendar-app-angular';
  meetings = {
    '2024-12-12': ['Drink Coffee', 'Learn React', 'Sleep'],
    '2024-12-20': ['Drink Coffee', 'Learn Angular', 'Sleep'],
  };
}
