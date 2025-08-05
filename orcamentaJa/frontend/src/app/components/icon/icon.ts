import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { take } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span *ngIf="isSvg" [innerHTML]="svgIcon"></span>

    <img *ngIf="!isSvg" [src]="imagePath" [alt]="name" class="w-full h-full" />
  `,
  styles: [
    ':host { display: inline-flex; justify-content: center; align-items: center;}',
  ],
})
export class IconComponent implements OnChanges {
  @Input({ required: true }) name!: string;

  protected isSvg: boolean = false;
  protected imagePath: string = '';
  protected svgIcon: SafeHtml = '';

  private httpClient = inject(HttpClient);
  private sanitizer = inject(DomSanitizer);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['name'] && this.name) {
      if (this.name.endsWith('.svg')) {
        this.isSvg = true;
        this.loadSvgIcon();
      } else {
        this.isSvg = false;
        this.imagePath = `./assets/${this.name}.png`;
      }
    }
  }

  private loadSvgIcon(): void {
    this.httpClient
      .get(`./assets/icons/${this.name}`, { responseType: 'text' })
      .pipe(take(1))
      .subscribe((svg) => {
        this.svgIcon = this.sanitizer.bypassSecurityTrustHtml(svg);
      });
  }
}
