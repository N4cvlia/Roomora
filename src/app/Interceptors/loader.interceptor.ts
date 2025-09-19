import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SubjectsService } from '../Services/subjects.service';
import { finalize } from 'rxjs';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  let loader = inject(SubjectsService);

  loader.startLoading();
  return next(req).pipe(
    finalize(() => {
      loader.stopLoading();
    })
  );
};
