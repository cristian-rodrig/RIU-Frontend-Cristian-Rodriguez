import { Component, inject, Signal, computed, signal, OnInit, effect } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Hero } from '../../../../core/models/heroe.model';
import { HeroService } from '../../../../core/services/hero.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HeroCardComponent } from '../../components/hero-card/hero-card.component';
import { SwalService } from '../../../../core/services/swal.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-hero-list',
  standalone: true,
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.scss',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule,
  ],
})
export class HeroListComponent implements OnInit {
  private heroService = inject(HeroService);
  private router = inject(Router);
  private swalService = inject(SwalService);
  private dialog = inject(MatDialog);

  heroes: Signal<Hero[]> = this.heroService.getHeroes();
  searchTerm = signal<string>('');
  pageSize = signal<number>(20);
  currentPage = signal<number>(0);

  displayedColumns: string[] = ['name', 'image', 'powerstats', 'appearance', 'biography', 'actions'];

  totalHeroes = computed(() => this.filteredHeroes().length);

  filteredHeroes = computed(() =>
    this.heroes().length > 0
      ? this.heroes().filter(hero =>
          hero.name.toLowerCase().includes(this.searchTerm().toLowerCase())
        )
      : []
  );

  paginatedHeroes = computed(() => {
    const start = this.currentPage() * this.pageSize();
    return this.filteredHeroes().slice(start, start + this.pageSize());
  });
  

  ngOnInit() {
    if (this.heroService.getHeroes()().length === 0) {
      this.heroService.fetchHeroes();
    }
  }

  filterHeroes(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.searchTerm.set(inputValue);
    this.currentPage.set(0);
  }

  onPageChange(event: any) {
    this.currentPage.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }  
  
  editHero(id: string | number) {
    this.router.navigate([`/heroes/edit/${id}`]);
  }

  async deleteHero(id: string | number) {
    const confirm = await this.swalService.confirmDelete();
    if (confirm) {
      this.heroService.deleteHero(id);
    }
  }

  createHero() {
    this.router.navigate(['/heroes/new']);
  }

  openHeroCard(hero: Hero) {
    this.dialog.open(HeroCardComponent, {
      data: { hero },
      width: '300px',
    });
  }
  
  
}
