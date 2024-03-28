import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatHours',
  standalone: true
})
export class FormatHoursPipe implements PipeTransform {

  transform(value?: string): string {
    return (!value) ? '' : this.convertToHours(Number.parseInt(value));
  }
  convertToHours(value: number): string{
    let hours = Math.trunc(value/60);
    let minutes = value % 60;
    return hours +"h "+ minutes + "min";
  }

}
