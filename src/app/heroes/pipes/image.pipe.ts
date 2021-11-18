import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/heroes.interface';

@Pipe({
  name: 'image',
})
export class ImagePipe implements PipeTransform {
  transform(hero: Hero, ...args: unknown[]): string {
    return `assets/heroes/${hero.id}.jpg`;
  }
}
