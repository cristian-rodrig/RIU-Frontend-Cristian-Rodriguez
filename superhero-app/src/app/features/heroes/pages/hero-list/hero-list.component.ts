import { Component, OnInit, inject, Signal, computed, signal, effect, ViewChild, AfterViewInit, Injector } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Hero } from '../../../../core/models/heroe.model';
import { HeroService } from '../../../../core/services/hero.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HeroCardComponent } from '../../components/hero-card/hero-card.component';


@Component({
  selector: 'app-hero-list',
  standalone: true,
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.scss',
  imports: [
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatPaginatorModule,
    MatDialogModule],
})
export class HeroListComponent implements OnInit, AfterViewInit{

  private heroService = inject(HeroService);
  private router = inject(Router);
  private injector = inject(Injector);

  heroes: Signal<Hero[]> = this.heroService.getHeroes();
  searchTerm = signal<string>('');

  dataSource = new MatTableDataSource<Hero>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private heroesEffect = effect(() => {
    this.dataSource.data = this.heroes();
  }, { injector: this.injector });

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.heroService.fetchHeroes();  
  }

  ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
  }

  openHeroCard(hero: Hero) {
    console.log(hero)
    this.dialog.open(HeroCardComponent, {
      data: { hero },
      width: '300px',
    });
  }

  filteredHeroes: Signal<Hero[]> = computed(() =>
    this.heroes().filter(hero =>
      hero.name.toLowerCase().includes(this.searchTerm().toLowerCase())
    )
  );

  displayedColumns: string[] = ['name','image', 'powerstats', 'appearance', 'biography', 'actions'];

  filterHeroes(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.set(value);
    this.dataSource.filter = value.trim().toLowerCase();
  }

  editHero(id: string | number) {
    this.router.navigate([`/heroes/edit/${id}`]);
  }

  deleteHero(id: string | number) {
    this.heroService.deleteHero(id);
  }

  createHero() {
    this.router.navigate(['/heroes/new']);
  }
  


}
