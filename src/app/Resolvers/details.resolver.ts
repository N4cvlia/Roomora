import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { ApiService } from '../Services/api.service';


export const detailsResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const id = route.paramMap.get('id');
  return inject(ApiService).GetRoomById(Number(id));
};
