import { Component, signal } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatFormField } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-header',
  imports: [
    MatIconButton,
    MatIcon,
    MatTooltip,
    MatFormField,
    MatSelect,
    MatOption,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public companies = signal([
    {
      id: '2132323-2323232',
      name: 'Company',
    }
  ]);
}
