import { Injectable, signal, computed } from '@angular/core';
import {
  OfficialCertificate,
  OFFICIAL_CERTIFICATES,
  verifyCertificateIntegrity,
} from '../blockchain/ledger';

@Injectable({
  providedIn: 'root',
})
export class CertificateService {
  readonly allCertificates = signal<OfficialCertificate[]>(OFFICIAL_CERTIFICATES);
  readonly selectedCertificate = signal<OfficialCertificate>(OFFICIAL_CERTIFICATES[0]);
  
  // Verification states
  readonly isVerifying = signal<boolean>(false);
  readonly verificationAttemptCount = signal<number>(1);
  readonly copyNotification = signal<string | null>(null);

  // Tamper simulation state
  readonly isTamperedMode = signal<boolean>(false);
  readonly tamperedCertificate = signal<OfficialCertificate | null>(null);

  // Computed active certificate (either authentic or tampered simulation)
  readonly currentCertificate = computed(() => {
    if (this.isTamperedMode() && this.tamperedCertificate()) {
      return this.tamperedCertificate()!;
    }
    return this.selectedCertificate();
  });

  // Verification result computed reactively
  readonly verificationResult = computed(() => {
    const cert = this.currentCertificate();
    return verifyCertificateIntegrity(cert);
  });

  selectCertificateById(id: string): boolean {
    const found = this.allCertificates().find(
      (c) => c.id.toLowerCase() === id.trim().toLowerCase() ||
             c.certificateNumber.toLowerCase() === id.trim().toLowerCase() ||
             c.nisn === id.trim()
    );

    if (found) {
      this.isVerifying.set(true);
      this.isTamperedMode.set(false);
      this.tamperedCertificate.set(null);
      
      setTimeout(() => {
        this.selectedCertificate.set(found);
        this.isVerifying.set(false);
        this.verificationAttemptCount.update((c) => c + 1);
      }, 400);
      return true;
    }
    return false;
  }

  searchCertificates(query: string): OfficialCertificate[] {
    const q = query.trim().toLowerCase();
    if (!q) return this.allCertificates();
    return this.allCertificates().filter(
      (c) =>
        c.recipientName.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q) ||
        c.certificateNumber.toLowerCase().includes(q) ||
        c.institution.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
    );
  }

  toggleTamperSimulation(simulateTamper: boolean) {
    if (simulateTamper) {
      const original = this.selectedCertificate();
      // Create a copy with unauthorized modification
      const tampered: OfficialCertificate = {
        ...original,
        recipientName: 'PEMALSU_DATA_TIDAK_TERDAFTAR',
        award: 'MEDALI EMAS PALSU (DATA TELAH DIUBAH)',
        gradeScore: 99.99,
        status: 'TAMPERED',
      };
      this.tamperedCertificate.set(tampered);
      this.isTamperedMode.set(true);
    } else {
      this.isTamperedMode.set(false);
      this.tamperedCertificate.set(null);
    }
  }

  modifyTamperedField(field: 'name' | 'score' | 'award', value: string | number) {
    const current = this.tamperedCertificate() || { ...this.selectedCertificate(), status: 'TAMPERED' };
    const updated = { ...current };

    if (field === 'name') updated.recipientName = String(value);
    if (field === 'score') updated.gradeScore = Number(value) || 0;
    if (field === 'award') updated.award = String(value);

    this.tamperedCertificate.set(updated);
    this.isTamperedMode.set(true);
  }

  copyToClipboard(text: string, label = 'Teks') {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        this.copyNotification.set(`${label} berhasil disalin ke clipboard!`);
        setTimeout(() => this.copyNotification.set(null), 2500);
      });
    }
  }

  printCertificate() {
    if (typeof window !== 'undefined') {
      window.print();
    }
  }
}
