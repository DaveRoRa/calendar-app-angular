import { NgClass } from '@angular/common';
import {
  Component,
  computed,
  input,
  Input,
  InputSignal,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { DateTime, Info, Interval } from 'luxon';
import { MeetingsInterface } from './meetings.interface';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [NgClass],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
})
export class CalendarComponent {
  meetings: InputSignal<MeetingsInterface> = input.required();
  today = signal<DateTime>(DateTime.local());
  firstDayOfActiveMonth: WritableSignal<DateTime> = signal(
    this.today().startOf('month')
  );
  activeDay: WritableSignal<DateTime | null> = signal(null);
  weekDays = signal<string[]>(Info.weekdays('short'));
  daysOfMonth = computed(() =>
    Interval.fromDateTimes(
      this.firstDayOfActiveMonth().startOf('week'),
      this.firstDayOfActiveMonth().endOf('month').endOf('week')
    )
      .splitBy({ day: 1 })
      .map((d) => {
        if (d.start) return d.start;
        throw new Error('Wrong Dates');
      })
  );
  activeDayMeetings: Signal<string[]> = computed(() => {
    const activeDay = this.activeDay();
    if (!activeDay) {
      return [];
    } else {
      const activeDayISO = activeDay.toISODate();
      if (!activeDayISO) return [];
      const activeDateMeetings = this.meetings()[activeDayISO];
      return activeDateMeetings || [];
    }
  });
  DATE_MED = DateTime.DATE_MED;

  goToPreviousMonth(): void {
    this.firstDayOfActiveMonth.update((prevFirstDay) =>
      prevFirstDay.minus({ month: 1 })
    );
  }

  goToToday(): void {
    this.firstDayOfActiveMonth.set(this.today().startOf('month'));
  }

  goToNextMonth(): void {
    this.firstDayOfActiveMonth.update((prevFirstDay) =>
      prevFirstDay.plus({ month: 1 })
    );
  }
}
