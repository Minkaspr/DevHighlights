import { Component, computed, HostListener, inject, Input, signal } from '@angular/core';
import { LanguageService } from '../../services/languague/language.service';
import { Project } from '../../models/project';
import { ApiProject } from '../../models/api-project';
import { CardComponent } from "../../components/card/card.component";
import { ProjectDataService } from '../../services/api/project-data.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { FailedToLoadIconComponent } from "../../icons/failed-to-load-icon/failed-to-load-icon.component";
import { ThemeService } from '../../services/theme/theme.service';

@Component({
  selector: 'app-projects',
  imports: [CardComponent, FailedToLoadIconComponent],
  animations:[
    trigger('fadeInT', [
      transition(':enter', [
        style({ opacity: 0.5, transform: 'translateY(10px)' }),
        animate('490ms ease-in-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
    trigger('fadeOut', [
      transition(':leave', [
        animate('500ms ease-in-out', style({ opacity: 0 }))
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('510ms ease-in-out', style({ opacity: 1 }))
      ])
    ])
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent{

  @Input() sectionId: string = '';

  //private apiService = inject(ApiService);
  //public projectsResponse = this.apiService.projectsResponse;
  private languageService = inject(LanguageService);
  private themeService = inject(ThemeService);
  private projectDataService = inject(ProjectDataService);

  public translations = this.languageService.translations;
  public darkTheme = this.themeService.isDarkTheme;
  public language = this.languageService.currentLanguage;
  
  loading = this.projectDataService.loading;
  projectsResponse = this.projectDataService.getAllProjects(this.language);
  /* allProjectsHttpRs = this.projectDataService.getAllProjectsHttpRs(this.language);
  allProjectsRs = this.projectDataService.getAllProjectsRs(this.language);
  allProjectsRx = this.projectDataService.getAllProjectsRx(this.language); */
  
  public rowsToShow = signal(2);
  public columns = signal(1);
  public skeletonCount = signal(2);
  skeletons = computed(() => Array.from({ length: this.skeletonCount() }, (_, i) => i));

/*   constructor() {
    effect(() => {
      //this.projectsResponse.set(this.allProjectsRes());
      //console.log("projectsResponse of ProjectDataService (Effect): ", JSON.stringify(this.allProjectsRes(), null, 2));
      //console.log("projectsHttpRs of ProjectDataService (Effect): ", JSON.stringify(this.allProjectsHttpRs(), null, 2));
      //console.log("projectsRx of ProjectDataService (Effect):", JSON.stringify(this.allProjectsRs(), null, 2));
      //console.log("projectsRs of ProjectDataService (Effect):", JSON.stringify(this.allProjectsRx(), null, 2));
    });
  } */
  constructor(){
    this.updateLayout();
  }

  @HostListener('window:resize', [])
  onResize(): void {
    this.updateLayout();
  }

  public allProjects = computed(() => {
    return this.projectsResponse()?.data || [];
  });

  public displayedProjects = computed(() => {
    const totalProjectsToShow = this.rowsToShow() * this.columns();
    return this.allProjects()?.slice(0, totalProjectsToShow) || [];
  });

  public errorMessage = computed(() => {
    return this.projectsResponse()?.status === 'error'
      ? this.projectsResponse()?.message
      : this.translations().projects.noProjects;
  });

  private updateLayout(): void {
    const width = window.innerWidth;
    this.columns.set(width >= 1536 ? 3 : width >= 768 ? 2 : 1);
    this.skeletonCount.set(width >= 1536 ? 3 : width >= 768 ? 2 : 1);
  }

  public mapProject(apiProject: ApiProject): Project {
    return {
      id: apiProject.id,
      projectCode: apiProject.projectCode,
      title: apiProject.texts.title,
      description: apiProject.texts.description,
      imageUrl: apiProject.imageUrl,
      technologies: apiProject.technologies,
      detailsUrl: apiProject.detailsUrl
    };
  }

  public loadMore(): void {
    this.rowsToShow.set(this.rowsToShow() + 2); 
  }
}
