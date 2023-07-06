import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'sam-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    TranslateModule,
    MatIconModule,
    MatMenuModule,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Output() navToggled = new EventEmitter<void>()

  selectedLanguage = 'English';

  translateService = inject(TranslateService);

  changeLanguage(lang: string): void {
    if (lang === 'de') {
      this.selectedLanguage = 'Deutsch';
    } else if (lang === 'en') {
      this.selectedLanguage = 'English';
    }
    this.translateService.use(lang);
  }
}
