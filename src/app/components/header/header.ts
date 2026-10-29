import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CertificateService } from '../../services/certificate.service';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <!-- Top Government & Institutional Endorsement Strip -->
    <div class="bg-slate-900 text-white text-xs border-b border-slate-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col md:flex-row items-center justify-between gap-2">
        <div class="flex items-center gap-3">
          <span class="inline-flex items-center gap-1.5 font-medium text-amber-400">
            <mat-icon class="!text-sm !w-3.5 !h-3.5">verified_user</mat-icon>
            PORTAL RESMI REPUBLIK INDONESIA
          </span>
          <span class="text-slate-500 hidden sm:inline" aria-hidden="true">·</span>
          <span class="text-slate-300 hidden sm:inline">Pusat Verifikasi Terdesentralisasi Sertifikat Prestasi Nasional</span>
        </div>
        <div class="flex items-center gap-4 text-slate-300">
          <span class="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Ledger Blockchain Aktif (Blok #849,204)
          </span>
          <span class="text-slate-600 hidden sm:inline">|</span>
          <span class="text-[11px] text-slate-400 hidden sm:inline">Standar Enkripsi SHA-256</span>
        </div>
      </div>
    </div>

    <!-- Main Navigation Header -->
    <header class="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between gap-8 h-20">
          
          <!-- Zone 1: Brand Wordmark -->
          <a href="#beranda" class="flex items-center gap-3 shrink-0 group">
            <img
              src="/assets/aistudio/LKP_logo_transparent_v3_548fda2d.png"
              alt="Logo LKP Prestasi Nusantara"
              referrerpolicy="no-referrer"
              class="h-12 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <div class="flex flex-col">
              <span class="text-base sm:text-lg font-bold tracking-tight text-slate-900 uppercase">
                Verifikasi Sertifikat Nasional
              </span>
              <span class="text-[11px] tracking-wider text-slate-500 uppercase font-medium">
                LKP Prestasi Nusantara &middot; Puspresnas &middot; OSN
              </span>
            </div>
          </a>

          <!-- Zone 2: Navigation Links -->
          <nav class="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-700">
            <a href="#hasil-verifikasi" class="hover:text-blue-900 transition-colors whitespace-nowrap shrink-0">
              Hasil Verifikasi
            </a>
            <a href="#bukti-blockchain" class="hover:text-blue-900 transition-colors whitespace-nowrap shrink-0">
              Bukti Blockchain
            </a>
            <a href="#afiliasi-logo" class="hover:text-blue-900 transition-colors whitespace-nowrap shrink-0">
              Afiliasi Resmi
            </a>
            <a href="#fitur-keamanan" class="hover:text-blue-900 transition-colors whitespace-nowrap shrink-0">
              Sistem Anti-Pemalsuan
            </a>
            <a href="#uji-integritas" class="hover:text-blue-900 transition-colors whitespace-nowrap shrink-0">
              Uji Integritas Hash
            </a>
          </nav>

          <!-- Zone 3: Primary Action -->
          <div class="flex items-center gap-3 shrink-0">
            <button
              (click)="scrollToSearch()"
              class="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-900 hover:bg-blue-800 active:bg-blue-950 rounded-lg shadow-sm transition-all whitespace-nowrap cursor-pointer"
            >
              <mat-icon class="!text-base !w-4 !h-4">qr_code_scanner</mat-icon>
              <span>Periksa Sertifikat</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  `,
})
export class HeaderComponent {
  certService = inject(CertificateService);

  scrollToSearch() {
    const el = document.getElementById('search-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
