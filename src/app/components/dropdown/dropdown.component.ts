import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ClickOutSideDirective } from '../../directives/click-out-side/click-out-side.directive';
import { TranslateIconComponent } from "../../icons/translate-icon/translate-icon.component";

@Component({
  selector: 'app-dropdown',
  imports: [ClickOutSideDirective, TranslateIconComponent],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css'
})
export class DropdownComponent implements OnChanges{
  @Input() options: { value: string, label: string }[] = [];
  @Input() selectedLanguage: string = '';
  @Output() optionSelected = new EventEmitter<string>();

  public isDropdownOpen: boolean = false;
  public selectedOption: string = 'Seleccionar';
  public selectedValue: string | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options'] || changes['selectedLanguage']) {
      this.updateSelectedOption();
    }
  }

  private updateSelectedOption(): void {
    const selected = this.options.find(option => option.value === this.selectedLanguage);
    this.selectedOption = selected ? selected.label : 'Seleccionar';
  }

  public toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  public closeDropdown(): void {
    this.isDropdownOpen = false;
  }

  public selectOption(option: { value: string, label: string }): void {
    this.selectedOption = option.label;
    this.selectedValue = option.value;
    this.optionSelected.emit(option.value);
    this.closeDropdown();
  }
}
