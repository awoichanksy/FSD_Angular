import {Component, OnInit} from '@angular/core';
import {TranslationService} from './translation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  creator: string;
  creatorValue: string;
  email: string;
  emailValue: string;


  constructor(private translationService: TranslationService) {
  }

  async ngOnInit() {
    await this.translationService.loadTranslations();
    this.creator = this.translationService.getTranslation('footer.creator');
    this.creatorValue = this.translationService.getTranslation('footer.creator.value');
    this.email = this.translationService.getTranslation('footer.email');
    this.emailValue = this.translationService.getTranslation('footer.email.value');
  }
}
