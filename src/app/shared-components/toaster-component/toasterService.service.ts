import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root",
})
export class ToasterService {
  constructor(private toastr: ToastrService) {}

  showSuccess(msg: string) {
    this.toastr.success(msg);
  }
  showFailure(msg: string) {
    this.toastr.error(msg);
  }
  showWarning(msg: string) {
    this.toastr.warning(msg);
  }
  showCatchErr(msg: any) {
    this.toastr.error(msg);
  }
}
