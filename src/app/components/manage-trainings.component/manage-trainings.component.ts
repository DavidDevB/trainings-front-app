import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { CryptoService } from '../../services/crypto.service';
import { ThemeService } from '../../services/theme.service';
import { MatAnchor } from "@angular/material/button";

@Component({
  selector: 'app-manage-trainings',
  imports: [FormsModule, MatAnchor],
  templateUrl: './manage-trainings.component.html',
  styleUrl: './manage-trainings.component.css',
})
export class ManageTrainings {

  selectedTraining: any = null;
  trainings: any[] = [];
  newTrainingName: string = '';
  newTrainingCategory: string = '';
  newTrainingDescription: string = '';
  newTrainingPrice: number | null = null;

  constructor(private apiService: ApiService, private cryptoService: CryptoService, private themeService: ThemeService) { }

  ngOnInit() {
    this.fetchTrainings();
  }

  get theme() {
    return this.themeService.theme();
  }

  fetchTrainings() {
    this.apiService.getTrainings().subscribe((data: any[]) => {
      this.trainings = data;
    });
  }

  deleteTraining(training: string) {

    const encryptedUser = localStorage.getItem('connectedUser');
    if (!encryptedUser) {
      alert('Vous devez être connecté pour supprimer une formation.');
      return;
    }
     try {
        const user = this.cryptoService.decrypt(encryptedUser);
        const userData = JSON.parse(user);
        if (!userData.roles.find((role: string) => role === 'ADMIN')) {
          alert('Accès réservé aux administrateurs pour supprimer une formation.');
          return;
        }

    this.apiService.getOneTraining(training).subscribe((data: any) => {
      if (confirm(`Êtes-vous sûr de vouloir supprimer la formation "${data.name}" ?`)) {
        this.apiService.deleteTraining(training).subscribe(() => {
          alert('Formation supprimée avec succès.');
          this.fetchTrainings();
        });
      }
    });
  } catch (error) {
    console.error('Erreur de déchiffrement:', error);
    alert('Erreur lors de la vérification des droits d\'administrateur.');
    return;
  }
  }

  addTraining() {

    const encryptedUser = localStorage.getItem('connectedUser');
    if (!encryptedUser) {
      alert('Vous devez être connecté pour supprimer une formation.');
      return;
    }
     try {
        const user = this.cryptoService.decrypt(encryptedUser);
        const userData = JSON.parse(user);
        if (!userData.roles.find((role: string) => role === 'ADMIN')) {
          alert('Accès réservé aux administrateurs pour ajouter une formation.');
          return;
        }
      } catch (error) {
        console.error('Erreur de déchiffrement:', error);
        alert('Erreur lors de la vérification des droits d\'administrateur.');
        return;
      }

    if (!this.newTrainingName || !this.newTrainingCategory || !this.newTrainingDescription || this.newTrainingPrice === null) {
      alert('Veuillez remplir tous les champs pour ajouter une formation.');
      return;
    } else if (this.newTrainingPrice < 0) {
      alert('Le prix ne peut pas être négatif.');
      return;
    } else if (this.trainings.some(t => t.name === this.newTrainingName)) {
      alert('Une formation avec ce nom existe déjà. Veuillez choisir un nom différent.');
      return;
    }

    const newId = this.trainings.length > 0 ? Math.max(...this.trainings.map(t => parseInt(t.id))) + 1 : 1;

    const newTraining = {
      id: newId.toString(),
      name: this.newTrainingName,
      category: this.newTrainingCategory,
      description: this.newTrainingDescription,
      price: this.newTrainingPrice,
      quantity: 1
    };

    this.apiService.addTraining(newTraining).subscribe(() => {
      alert('Formation ajoutée avec succès.');
      this.newTrainingName = '';
      this.newTrainingCategory = '';
      this.newTrainingDescription = '';
      this.newTrainingPrice = null;
      this.fetchTrainings();
    });
  }

}
