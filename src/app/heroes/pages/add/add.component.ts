import { Component, OnInit } from '@angular/core';
import { Hero, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: [
    `
      img {
        width: 100%;
        border-radius: 5px;
      }
    `,
  ],
})
export class AddComponent implements OnInit {
  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics',
    },

    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics',
    },
  ];

  hero: Hero = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',
  };

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) {
      return;
    }

    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroesService.getHeroById(id)))
      .subscribe((hero) => (this.hero = hero));
  }

  public save(): void {
    if (this.hero.superhero.trim().length === 0) {
      return;
    }

    if (this.hero.id) {
      // Update
      this.heroesService
        .updateHero(this.hero)
        .subscribe((hero) => console.log('Updating hero...', hero));
    } else {
      // Create
      this.heroesService
        .addHero(this.hero)
        .subscribe((hero) => this.router.navigate(['/heroes/edit', hero.id]));
    }
  }

  public delete(): void {
    this.heroesService
      .deleteHero(this.hero.id!)
      .subscribe(() => this.router.navigate(['/heroes']));
  }
}
