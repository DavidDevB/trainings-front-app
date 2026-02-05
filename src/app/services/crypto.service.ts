import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  
  private password: string = 'your-secret-password';

  encrypt(data: string): string {
    return CryptoJS.AES.encrypt(data, this.password).toString();
  }

  decrypt(data: string): string {
    const bytes = CryptoJS.AES.decrypt(data, this.password);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
