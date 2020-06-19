import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {TranslationEntry} from './unified-table/TranslationEntry';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(
    private http: HttpClient) {
    this.translationUrl = environment.api_endpoint + 'translation';
  }

  static translations = new Map<string, string>();
  private readonly translationUrl;

  async loadTranslations() {
    if (TranslationService.translations.size === 0) {
      await this.http.get<TranslationEntry[]>(this.translationUrl).toPromise()
        .then((list: TranslationEntry[]) => {
          list.forEach(entry => TranslationService.translations.set(entry.key, entry.value));
        });
    }
  }


  getTranslation(key: string): string {
    return TranslationService.translations.get(key);

  }
}
