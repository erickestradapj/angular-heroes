import { Component, OnInit } from '@angular/core';

import { Hero, Publisher } from '../../interfaces/heroes.interface';

import { HeroesService } from '../../services/heroes.service';

import { ActivatedRoute, Router } from '@angular/router';

import { switchMap } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmComponent } from '../../components/confirm/confirm.component';

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
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
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
        .subscribe(() => this.showMessage('Registry has been updated'));
    } else {
      // Create
      this.heroesService.addHero(this.hero).subscribe((hero) => {
        this.router.navigate(['/heroes/edit', hero.id]);
        this.showMessage('Registry has been created');
      });
    }
  }

  public delete(): void {
    this.dialog
      .open(ConfirmComponent, {
        width: '250px',
        data: this.hero, // TODO: data
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.heroesService
            .deleteHero(this.hero.id!)
            .subscribe(() => this.router.navigate(['/heroes']));
        }
      });
  }

  public showMessage(msg: string): void {
    this.snackBar.open(msg, 'Ok!', {
      duration: 2500,
    });
  }
}
