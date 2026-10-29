import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CertificateService } from '../../services/certificate.service';
import { sha256 } from '../../blockchain/crypto';

@Component({
  selector: 'app-tamper-simulator',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <section id="uji-integritas" class="py-14 bg-slate-50 border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Header -->
        <div class="text-center max-w-3xl mx-auto mb-10">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-rose-50 border border-rose-200 text-rose-900 text-xs font-semibold mb-3">
            <mat-icon class="!text-sm !w-4 !h-4 text-rose-600">security_update_warning</mat-icon>
            <span>DEMONSTRASI SISTEM ANTI-PEMALSUAN BLOCKCHAIN</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Uji Simulasi Keamanan: Mengapa Data Tidak Dapat Dipalsukan?
          </h2>
          <p class="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
            Teknologi kriptografi SHA-256 dan konsorsium blockchain menjamin bahwa jika ada pihak yang mencoba merekayasa nilai, mengganti nama siswa, atau memodifikasi tanggal, sistem verifikasi akan langsung menolak dokumen tersebut secara otomatis.
          </p>
        </div>

        <!-- Simulation Interactive Card -->
        <div class="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-md max-w-4xl mx-auto">
          
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <h3 class="text-base font-bold text-slate-900 flex items-center gap-2">
                <mat-icon class="!text-lg !w-5 !h-5 text-blue-900">science</mat-icon>
                <span>Simulator Manipulasi Data Sertifikat</span>
              </h3>
              <p class="text-xs text-slate-500 mt-0.5">
                Coba ubah isian sertifikat di bawah untuk membuktikan deteksi pemalsuan blockchain secara real-time.
              </p>
            </div>

            <!-- Toggle Simulation Buttons -->
            <div class="flex items-center gap-2">
              @if (!certService.isTamperedMode()) {
                <button
                  (click)="certService.toggleTamperSimulation(true)"
                  class="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-300 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <mat-icon class="!text-sm !w-4 !h-4">edit_note</mat-icon>
                  <span>Simulasikan Pemalsuan</span>
                </button>
              } @else {
                <button
                  (click)="certService.toggleTamperSimulation(false)"
                  class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <mat-icon class="!text-sm !w-4 !h-4">restore</mat-icon>
                  <span>Kembalikan Data Asli Sah</span>
                </button>
              }
            </div>
          </div>

          <!-- Interactive Form Controls for Simulation -->
          <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
            
            <!-- Recipient Name Input -->
            <div>
              <label for="tamper-name" class="block text-xs font-semibold text-slate-700 mb-1.5">
                Nama Penerima Sertifikat
              </label>
              <input
                id="tamper-name"
                type="text"
                [disabled]="!certService.isTamperedMode()"
                [value]="certService.currentCertificate().recipientName"
                (input)="onNameChange($event)"
                class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-900 disabled:opacity-75 disabled:bg-slate-100"
              />
              <span class="text-[10px] text-slate-400 mt-1 block">
                {{ certService.isTamperedMode() ? 'Edit teks di atas untuk melihat hash langsung berubah.' : 'Aktifkan simulasi di atas untuk mengedit.' }}
              </span>
            </div>

            <!-- Score Input -->
            <div>
              <label for="tamper-score" class="block text-xs font-semibold text-slate-700 mb-1.5">
                Nilai / Skor Akhir
              </label>
              <input
                id="tamper-score"
                type="number"
                step="0.1"
                min="0"
                max="100"
                [disabled]="!certService.isTamperedMode()"
                [value]="certService.currentCertificate().gradeScore"
                (input)="onScoreChange($event)"
                class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-900 disabled:opacity-75 disabled:bg-slate-100 font-code"
              />
              <span class="text-[10px] text-slate-400 mt-1 block">
                Ubah nilai untuk melihat kegagalan konsensus kriptografi.
              </span>
            </div>

          </div>

          <!-- Comparison Box: Expected vs Computed Hash -->
          <div class="mt-6 p-4 rounded-xl border" [class]="certService.verificationResult().isValid ? 'bg-emerald-50/70 border-emerald-300' : 'bg-rose-50/80 border-rose-300'">
            
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5" [class]="certService.verificationResult().isValid ? 'text-emerald-800' : 'text-rose-800'">
                <mat-icon class="!text-base !w-4 !h-4">
                  {{ certService.verificationResult().isValid ? 'check_circle' : 'cancel' }}
                </mat-icon>
                <span>
                  {{ certService.verificationResult().isValid ? 'Status: 100% Cocok Dengan Ledger Blockchain' : 'Status: Data Tidak Cocok! Pemalsuan Terdeteksi' }}
                </span>
              </span>
              <span class="text-[11px] font-bold" [class]="certService.verificationResult().isValid ? 'text-emerald-700' : 'text-rose-700'">
                {{ certService.verificationResult().isValid ? 'RESMI & SAH' : 'ILEGAL / REKAYASA' }}
              </span>
            </div>

            <div class="space-y-3 text-xs font-code">
              <div>
                <span class="text-[10px] text-slate-500 font-sans font-bold block mb-0.5">Hash Resmi di Blockchain (Tercatat Abadi):</span>
                <p class="text-slate-800 bg-white p-2.5 rounded-lg border border-slate-200 break-all select-all">
                  {{ certService.verificationResult().expectedHash }}
                </p>
              </div>

              <div>
                <span class="text-[10px] text-slate-500 font-sans font-bold block mb-0.5">Hash Yang Dihitung Dari Data Saat Ini:</span>
                <p class="p-2.5 rounded-lg border break-all select-all" [class]="certService.verificationResult().isValid ? 'bg-white text-emerald-800 border-emerald-200' : 'bg-rose-100 text-rose-900 border-rose-300 font-bold'">
                  {{ certService.verificationResult().computedHash }}
                </p>
              </div>
            </div>

            @if (!certService.verificationResult().isValid) {
              <div class="mt-4 p-3 bg-rose-200/60 rounded-lg text-rose-950 text-xs flex items-start gap-2">
                <mat-icon class="!text-base !w-4 !h-4 text-rose-700 shrink-0 mt-0.5">warning</mat-icon>
                <span>
                  <strong>Mengapa gagal?</strong> Algoritma SHA-256 memiliki efek avalanche (longsoran salju kriptografis). Mengubah 1 spasi atau 1 angka saja menghasilkan nilai hash 64-karakter yang sepenuhnya berbeda, sehingga dokumen palsu tidak akan pernah lolos verifikasi.
                </span>
              </div>
            }

          </div>

          <!-- Standalone Custom Text Hash Playground -->
          <div class="mt-8 pt-6 border-t border-slate-200">
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
              <mat-icon class="!text-sm !w-4 !h-4 text-blue-900">calculate</mat-icon>
              <span>Kalkulator Hash Kriptografis SHA-256 Mandiri</span>
            </h4>
            <p class="text-xs text-slate-500 mb-3">
              Ketikkan teks apa pun untuk melihat perhitungan instan fungsi hash satu arah SHA-256:
            </p>

            <div class="space-y-2">
              <input
                type="text"
                [value]="customInput()"
                (input)="onCustomInputChange($event)"
                placeholder="Ketik teks uji coba di sini..."
                class="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-900 font-medium"
              />
              <div class="bg-slate-900 text-amber-300 p-2.5 rounded-lg font-code text-xs break-all border border-slate-800 flex items-center justify-between gap-2">
                <span class="truncate">{{ computedCustomHash() }}</span>
                <button
                  (click)="certService.copyToClipboard(computedCustomHash(), 'Hash Kustom')"
                  class="text-blue-400 hover:text-blue-300 text-[10px] font-sans shrink-0 cursor-pointer"
                >
                  Salin
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  `,
})
export class TamperSimulatorComponent {
  certService = inject(CertificateService);
  customInput = signal<string>('SERTIFIKAT RESMI LKP PRESTASI NUSANTARA');
  computedCustomHash = signal<string>(sha256('SERTIFIKAT RESMI LKP PRESTASI NUSANTARA'));

  onNameChange(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.certService.modifyTamperedField('name', val);
  }

  onScoreChange(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.certService.modifyTamperedField('score', parseFloat(val) || 0);
  }

  onCustomInputChange(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.customInput.set(val);
    this.computedCustomHash.set(sha256(val));
  }
}
