import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SwalService {
  
  confirmDelete(): Promise<boolean> {
    return Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => result.isConfirmed);
  }

  success(message: string) {
    Swal.fire({
      title: message,
      icon: 'success',
      confirmButtonText: 'OK',
      timer: 4000,
      showConfirmButton: false,
    });
  }
}
