import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { CryptoService } from './services/crypto.service';

export const authGuard: CanActivateFn = () => {

  const router = inject(Router);
  const cryptoService = inject(CryptoService);

  const encryptedUser = localStorage.getItem('connectedUser');

  if (!encryptedUser) {
    console.log('❌ Accès refusé : utilisateur non connecté');
    alert('⚠️ Vous devez être connecté pour accéder à cette page.');
    router.navigate(['/']);
    return false;
  }

  try {
    const user = cryptoService.decrypt(encryptedUser);
    const userData = JSON.parse(user);
    console.log('🔐 Utilisateur déchiffré:', userData);

    if (userData.roles.find((role: string) => role === 'USER')) {
      console.log('✅ Accès autorisé pour user:', userData.email);
      return true;
    } else {
      console.log('❌ Accès refusé : utilisateur non user');
      alert('⚠️ Accès réservé aux utilisateurs.');
      router.navigate(['/']);
      return false;
    }
  } catch (error) {
    console.error('❌ Erreur de déchiffrement:', error);
    localStorage.removeItem('connectedUser');
    router.navigate(['/']);
    return false;
  }
};
