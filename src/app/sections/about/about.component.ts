import { Component, inject } from '@angular/core';
import { LanguageService } from '../../services/languague/language.service';
import { ThemeService } from '../../services/theme/theme.service';
import { UserIconComponent } from "../../icons/user-icon/user-icon.component";
import { WorldIconComponent } from "../../icons/world-icon/world-icon.component";
import { DeviceLaptopIconComponent } from "../../icons/device-laptop-icon/device-laptop-icon.component";
import { StarIconComponent } from "../../icons/star-icon/star-icon.component";
import { AtIconComponent } from "../../icons/at-icon/at-icon.component";
import { AffiliateIconComponent } from "../../icons/affiliate-icon/affiliate-icon.component";
import { CardSkillComponent } from "../../components/card-skill/card-skill.component";
import { CodeIconComponent } from "../../icons/code-icon/code-icon.component";
import { FrameworkIconComponent } from "../../icons/framework-icon/framework-icon.component";
import { DatabaseIconComponent } from "../../icons/database-icon/database-icon.component";
import { DevToolsIconComponent } from "../../icons/dev-tools-icon/dev-tools-icon.component";
import { ProjectManagementIconComponent } from "../../icons/project-management-icon/project-management-icon.component";
import { PrototypingIconComponent } from "../../icons/prototyping-icon/prototyping-icon.component";
import { WorkToolsIconComponent } from "../../icons/work-tools-icon/work-tools-icon.component";
import { FishIconComponent } from "../../icons/fish-icon/fish-icon.component";
import { BoneIconComponent } from "../../icons/bone-icon/bone-icon.component";

@Component({
  selector: 'app-about',
  imports: [UserIconComponent, WorldIconComponent, DeviceLaptopIconComponent, StarIconComponent, AtIconComponent, AffiliateIconComponent, CardSkillComponent, CodeIconComponent, FrameworkIconComponent, DatabaseIconComponent, DevToolsIconComponent, ProjectManagementIconComponent, PrototypingIconComponent, WorkToolsIconComponent, FishIconComponent, BoneIconComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  private languageService = inject(LanguageService);

  public translations = this.languageService.translations;
}
