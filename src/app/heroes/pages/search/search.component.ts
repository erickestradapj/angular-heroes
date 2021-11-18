import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Hero } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [],
})
export class SearchComponent implements OnInit {
  term: string = '';
  heroes: Hero[] = [];
  heroSelected!: Hero;

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {}

  public searching() {
    this.heroesService
      .suggestions(this.term)
      .subscribe((heroes) => (this.heroes = heroes));
    console.log('searching()', this.term);
  }

  public optionSelected(event: MatAutocompleteSelectedEvent) {
    const hero: Hero = event.option.value;
    this.term = hero.superhero;
    console.log('optionSelected()', this.term);

    this.heroesService
      .getHeroById(hero.id!)
      .subscribe((hero) => (this.heroSelected = hero));
  }
}
