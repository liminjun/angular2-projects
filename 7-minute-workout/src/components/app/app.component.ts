import {Component} from '@angular/core';

@Component({
    selector: 'trainer-app',
    template: `<div>
        <workout-runner></workout-runner> 
      </div>`
})
export class TrainerAppComponent {
    name: string = 'World';
}
