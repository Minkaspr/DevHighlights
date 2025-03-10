import { Component, computed, HostListener, inject, Input, signal } from '@angular/core';
import { LanguageService } from '../../services/languague/language.service';
import { Project } from '../../models/project';
import { ApiProject } from '../../models/api-project';
import { ApiService } from '../../services/api/api.service';
import { CardComponent } from "../../components/card/card.component";

@Component({
  selector: 'app-projects',
  imports: [CardComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  @Input() sectionId: string = '';

  private apiService = inject(ApiService);
  private languageService = inject(LanguageService);

  public translations = this.languageService.translations;
  public projectsResponse = this.apiService.projectsResponse;
  public allProjects = computed(() => {
    return this.projectsResponse()?.data || [];
  });
  public errorMessage = computed(() => {
    return this.projectsResponse()?.status === 'error'
      ? this.projectsResponse()?.message
      : this.translations().projects.noProjects;
  });

  public rowsToShow = signal(2);
  public columns = signal(1);

  public displayedProjects = computed(() => {
    const totalProjectsToShow = this.rowsToShow() * this.columns();
    return this.allProjects()?.slice(0, totalProjectsToShow) || [];
  });

  constructor() {}

  ngOnInit(): void {
    this.updateColumns();
  }

  @HostListener('window:resize', [])
  onResize(): void {
    this.updateColumns();
  }

  private updateColumns(): void {
    const width = window.innerWidth;
    this.columns.set(width >= 1536 ? 3 : width >= 768 ? 2 : 1);
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
