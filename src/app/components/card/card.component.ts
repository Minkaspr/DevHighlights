import { Component, inject, Input } from '@angular/core';
import { Project } from '../../models/project';
import { LanguageService } from '../../services/languague/language.service';
import { ThemeService } from '../../services/theme/theme.service';
import { ArrowUpRightIconComponent } from "../../icons/arrow-up-right-icon/arrow-up-right-icon.component";
import { CommonModule } from '@angular/common';
import { JavaIconComponent } from '../../icons/java-icon/java-icon.component';
import { AngularIconComponent } from '../../icons/angular-icon/angular-icon.component';
import { AndroidIconComponent } from '../../icons/android-icon/android-icon.component';
import { BootstrapIconComponent } from '../../icons/bootstrap-icon/bootstrap-icon.component';
import { MysqlIconComponent } from '../../icons/mysql-icon/mysql-icon.component';
import { NodejsIconComponent } from '../../icons/nodejs-icon/nodejs-icon.component';
import { PhpIconComponent } from '../../icons/php-icon/php-icon.component';
import { PostgresqlIconComponent } from '../../icons/postgresql-icon/postgresql-icon.component';
import { SqliteIconComponent } from '../../icons/sqlite-icon/sqlite-icon.component';
import { TailwindcssIconComponent } from '../../icons/tailwindcss-icon/tailwindcss-icon.component';

@Component({
  selector: 'app-card',
  imports: [
    ArrowUpRightIconComponent,
    CommonModule
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() project!: Project;
  imageError = false;

  private themeService = inject(ThemeService);
  private languageService = inject(LanguageService);

  public darkTheme = this.themeService.isDarkTheme;
  public translations = this.languageService.translations;

  ICONS_CONFIG: Record<string, { component: any; class: string }> = {
    java: { component: JavaIconComponent, class: "size-[22px]" },
    android: { component: AndroidIconComponent, class: "size-5" },
    sqlite: { component: SqliteIconComponent, class: "size-4" },
    tailwindcss: { component: TailwindcssIconComponent, class: "size-5" },
    angular: { component: AngularIconComponent, class: "size-5" },
    mysql: { component: MysqlIconComponent, class: "size-5" },
    nodejs: { component: NodejsIconComponent, class: "size-5" },
    bootstrap: { component: BootstrapIconComponent, class: "size-6" },
    php: { component: PhpIconComponent, class: "size-5" },
    postgresql: { component: PostgresqlIconComponent, class: "size-5" }
  };

  getIconComponent(tech: string) {
    return this.ICONS_CONFIG[tech.toLowerCase()] || null;
  }

  onImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'https://i.pinimg.com/originals/0e/f9/8b/0ef98b4746ed5be2798fd59aa7596a36.gif'; 
  }
}
