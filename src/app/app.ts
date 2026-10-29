import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { VerificationResultComponent } from './components/verification-result/verification-result';
import { CertificateService } from './services/certificate.service';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [VerificationResultComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private certService = inject(CertificateService);

  ngOnInit() {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const certParam = params.get('cert') || params.get('id') || params.get('no');
      if (certParam) {
        this.certService.selectCertificateById(certParam);
      }
    }
  }
}
