import { Component, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { CryptoService } from '../../services/crypto.service';
declare var bootstrap: any;

@Component({
  selector: 'app-connection',
  imports: [FormsModule],
  templateUrl: './connection.component.html',
  styleUrl: './connection.component.css',
})
export class ConnectionComponent {

  @Output() isConnected = new EventEmitter<boolean>();
  @Output() dropDownVisible = new EventEmitter<boolean>();
  allUsers: any[] = [];
  listUsers : any[] = [];
  email: string = '';
  password: string = '';
  encryptedUser: string = '';
  decryptedUser: any = null;
  @Output() isAdmin = new EventEmitter<string>();
  isLoading: boolean = false;
  errorMessage: string = '';
  private modalInstance: any;

  constructor(private apiService: ApiService,  private cryptoService: CryptoService) {}

  ngOnInit() {
    this.initModal();
  }

  // ✅ Initialiser la modale Bootstrap
  initModal() {
    setTimeout(() => {
      const modalElement = document.getElementById('connectionModal');
      if (modalElement) {
        this.modalInstance = bootstrap.Modal.getOrCreateInstance(modalElement);
      }
    }, 100);
  }

  fetchUsers = () => {
    return this.apiService.getUsers(); 
  }

  connect = () => {

    this.errorMessage = '';

    this.isLoading = true;

    if (!this.listUsers.length) {
      this.fetchUsers().subscribe({
      next : (data) => {
        this.allUsers = data;
        this.listUsers = [...this.allUsers];
        this.verifyUser();
      },
      error : (err) => console.error('Erreur lors de la récupération des utilisateurs : ', err),
      complete : () => console.log('Récupération des utilisateurs terminée.')
    });
    }
    else {
      this.verifyUser();
    }
  }

  verifyUser = () => {

      if (!this.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        alert('❌ Format d\'email invalide.');
        this.isLoading = false;
        return;
      }

    const user = this.listUsers.find(u => 
      u.email === this.email && u.password === this.password
    );

    if (user) {
      this.encryptedUser = this.cryptoService.encrypt(JSON.stringify(user));
      localStorage.setItem('connectedUser', this.encryptedUser);
      console.log('✅ Connexion réussie pour:', user.email);
      // ✅ Émettre vers App
      this.isConnected.emit(true);
      this.dropDownVisible.emit(false);
      const isAdmin = user.roles.includes('ADMIN');
      this.isAdmin.emit(isAdmin);
      // ✅ Fermer la modal
      const modalElement = document.getElementById('connectionModal');
      const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
      modal?.hide();

      // ✅ Réinitialiser le formulaire
      this.email = '';
      this.password = '';
    } else {
      console.log('❌ Identifiants invalides');
      
      this.focusEmailField();

      setTimeout(() => {
        const emailInput = document.getElementById('emailInput') as HTMLInputElement;
        if (emailInput) {
          emailInput.select();
        }
      }, 100);
    }
  }

  focusEmailField() {
    setTimeout(() => {
      const emailInput = document.getElementById('emailInput') as HTMLInputElement;
      if (emailInput) {
        emailInput.focus();
      }
    }, 100);
  }
}
