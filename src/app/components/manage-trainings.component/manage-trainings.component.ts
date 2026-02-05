import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-manage-trainings',
  imports: [FormsModule],
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

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.fetchTrainings();
  }

  fetchTrainings() {
    this.apiService.getTrainings().subscribe((data: any[]) => {
      this.trainings = data;
    });
  }

  deleteTraining(training: string) {
    this.apiService.getOneTraining(training).subscribe((data: any) => {
      if (confirm(`Êtes-vous sûr de vouloir supprimer la formation "${data.name}" ?`)) {
        this.apiService.deleteTraining(training).subscribe(() => {
          alert('✅ Formation supprimée avec succès.');
          this.fetchTrainings();
        });
      }
    });
  }

  addTraining() {
    if (!this.newTrainingName || !this.newTrainingCategory || !this.newTrainingDescription || this.newTrainingPrice === null) {
      alert('⚠️ Veuillez remplir tous les champs pour ajouter une formation.');
      return;
    } else if (this.newTrainingPrice < 0) {
      alert('⚠️ Le prix ne peut pas être négatif.');
      return;
    } else if (this.trainings.some(t => t.name === this.newTrainingName)) {
      alert('⚠️ Une formation avec ce nom existe déjà. Veuillez choisir un nom différent.');
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
      alert('✅ Formation ajoutée avec succès.');
      this.newTrainingName = '';
      this.newTrainingCategory = '';
      this.newTrainingDescription = '';
      this.newTrainingPrice = null;
      this.fetchTrainings();
    });
  }

}
