import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CertificateService } from '../../services/certificate.service';

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <section id="beranda" class="relative bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white py-14 lg:py-20 overflow-hidden border-b border-blue-900/40">
      
      <!-- Subtle Background Grid/Pattern -->
      <div class="absolute inset-0 opacity-10 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
      <div class="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>
      <div class="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none"></div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Institutional Logos Ribbon / Konsorsium Lembaga Resmi -->
        <div class="mb-10 pb-8 border-b border-white/10">
          <p class="text-xs uppercase tracking-widest text-slate-400 font-semibold text-center mb-6">
            Lembaga Penyelenggara & Afiliasi Resmi Sertifikasi Nasional
          </p>
          
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-8 items-center justify-center">
            
            <!-- 1. Tut Wuri Handayani -->
            <div class="flex items-center justify-center p-3 bg-white rounded-xl border border-slate-200 shadow-sm hover:scale-105 transition-all h-20">
              <img
                src="/assets/aistudio/images_557237bb.png"
                alt="Tut Wuri Handayani - Kemendikbud"
                referrerpolicy="no-referrer"
                class="max-h-14 max-w-full object-contain filter drop-shadow-xs"
              />
            </div>

            <!-- 2. Puspresnas (Pusat Prestasi Nasional) -->
            <div class="flex items-center justify-center p-3 bg-white rounded-xl border border-slate-200 shadow-sm hover:scale-105 transition-all h-20">
              <img
                src="/assets/aistudio/image_e5dcd704.png"
                alt="Puspresnas - Pusat Prestasi Nasional"
                referrerpolicy="no-referrer"
                class="max-h-12 max-w-full object-contain"
              />
            </div>

            <!-- 3. Rumah Pendidikan -->
            <div class="flex items-center justify-center p-3 bg-white rounded-xl border border-slate-200 shadow-sm hover:scale-105 transition-all h-20">
              <img
                src="/assets/aistudio/rumah-pendidikan_4654675c.png"
                alt="Rumah Pendidikan"
                referrerpolicy="no-referrer"
                class="max-h-11 max-w-full object-contain"
              />
            </div>

            <!-- 4. LKP Prestasi Nusantara Logo Crest -->
            <div class="flex items-center justify-center p-3 bg-white rounded-xl border border-slate-200 shadow-sm hover:scale-105 transition-all h-20">
              <img
                src="/assets/aistudio/LKP_logo_transparent_v3_548fda2d.png"
                alt="LKP Prestasi Nusantara"
                referrerpolicy="no-referrer"
                class="max-h-14 max-w-full object-contain filter drop-shadow-xs"
              />
            </div>

            <!-- 5. Olympiade OSN Gold Trophy -->
            <div class="flex items-center justify-center p-3 bg-white rounded-xl border border-slate-200 shadow-sm hover:scale-105 transition-all h-20 col-span-2 sm:col-span-1">
              <img
                src="/assets/aistudio/LOGO_OSN_2_40a5bbae.jpeg"
                alt="Olympiade OSN Platform for Indonesia"
                referrerpolicy="no-referrer"
                class="max-h-14 max-w-full object-contain rounded-md"
              />
            </div>

          </div>
        </div>

        <!-- Main Headline & Verification Status Banner -->
        <div class="text-center max-w-4xl mx-auto">
          
          <!-- Official Verification Badge -->
          <div class="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-500/15 border border-emerald-400/40 text-emerald-300 text-xs sm:text-sm font-semibold mb-6 shadow-sm">
            <mat-icon class="!text-lg !w-5 !h-5 text-emerald-400">verified</mat-icon>
            <span>BLOCKCHAIN IMMUTABLE LEDGER &middot; KEASLIAN TERVERIFIKASI 100% RESMI</span>
          </div>

          <h1 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 text-balance leading-tight">
            Sertifikat Telah <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400">Berhasil Diverifikasi</span> & Dinyatakan <span class="text-emerald-400 underline decoration-emerald-400/50 decoration-wavy">Resmi</span>
          </h1>

          <p class="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
            Dokumen kelulusan dan piagam prestasi kompetisi nasional ini telah tersertifikasi secara sah oleh
            <strong>LKP Prestasi Nusantara</strong> dan <strong>Olimpiade Siswa Nasional (OSN)</strong>, dengan enkripsi SHA-256 pada jaringan konsorsium blockchain terdesentralisasi agar <em>data tidak dapat dipalsukan atau diubah oleh pihak mana pun</em>.
          </p>

          <!-- Search & Instant Lookup Section -->
          <div id="search-section" class="max-w-2xl mx-auto bg-white/10 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-white/20 shadow-2xl">
            <div class="flex flex-col sm:flex-row gap-2">
              <div class="relative flex-1">
                <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <mat-icon class="!text-xl !w-5 !h-5">search</mat-icon>
                </div>
                <input
                  type="text"
                  [value]="searchInput()"
                  (input)="onInputChange($event)"
                  (keydown.enter)="handleSearch()"
                  placeholder="Masukkan Nomor Registrasi / ID Sertifikat..."
                  class="w-full pl-11 pr-4 py-3 bg-white text-slate-900 placeholder-slate-400 text-sm font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-inner"
                />
              </div>
              <button
                (click)="handleSearch()"
                class="px-6 py-3 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
              >
                <mat-icon class="!text-lg !w-5 !h-5">security</mat-icon>
                <span>Verifikasi Sekarang</span>
              </button>
            </div>

            <!-- Error message if search not found -->
            @if (searchError()) {
              <div class="mt-3 text-xs text-rose-300 flex items-center gap-1.5 justify-center">
                <mat-icon class="!text-sm !w-4 !h-4 text-rose-400">error_outline</mat-icon>
                <span>{{ searchError() }}</span>
              </div>
            }

            <!-- Quick Preset Chips -->
            <div class="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-center gap-2 text-xs">
              <span class="text-slate-400 font-medium mr-1">Contoh Sertifikat Terdaftar:</span>
              @for (cert of certService.allCertificates(); track cert.id) {
                <button
                  (click)="selectPreset(cert.id)"
                  [class]="cert.id === certService.selectedCertificate().id ? 'bg-amber-400 text-slate-950 font-bold shadow-xs' : 'bg-white/10 hover:bg-white/20 text-slate-200'"
                  class="px-2.5 py-1 rounded-md transition-colors cursor-pointer whitespace-nowrap"
                >
                  {{ cert.id }} ({{ cert.recipientName.split(' ')[0] }})
                </button>
              }
            </div>

          </div>

          <!-- Quick Trust Metrics Strip -->
          <div class="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            
            <div class="bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-xs">
              <div class="flex items-center gap-2 text-amber-400 mb-1">
                <mat-icon class="!text-lg !w-5 !h-5">lock</mat-icon>
                <span class="text-xs uppercase font-bold tracking-wider">Keamanan</span>
              </div>
              <p class="text-sm font-semibold text-white">SHA-256 Immutable</p>
              <p class="text-[11px] text-slate-400">Anti-manipulasi tamper-proof</p>
            </div>

            <div class="bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-xs">
              <div class="flex items-center gap-2 text-emerald-400 mb-1">
                <mat-icon class="!text-lg !w-5 !h-5">hub</mat-icon>
                <span class="text-xs uppercase font-bold tracking-wider">Konsorsium PoA</span>
              </div>
              <p class="text-sm font-semibold text-white">4 Node Validator</p>
              <p class="text-[11px] text-slate-400">Kemendikbud & LKP Node</p>
            </div>

            <div class="bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-xs">
              <div class="flex items-center gap-2 text-sky-400 mb-1">
                <mat-icon class="!text-lg !w-5 !h-5">gavel</mat-icon>
                <span class="text-xs uppercase font-bold tracking-wider">SK Legalitas</span>
              </div>
              <p class="text-sm font-semibold text-white">Resmi Terdaftar</p>
              <p class="text-[11px] text-slate-400">SK.DIR-LKP/OSN-VERIF/2024</p>
            </div>

            <div class="bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-xs">
              <div class="flex items-center gap-2 text-purple-400 mb-1">
                <mat-icon class="!text-lg !w-5 !h-5">history</mat-icon>
                <span class="text-xs uppercase font-bold tracking-wider">Blok Ledger</span>
              </div>
              <p class="text-sm font-semibold text-white">#849,204 Terkonfirmasi</p>
              <p class="text-[11px] text-slate-400">12,480+ Validasi Konsensus</p>
            </div>

          </div>

        </div>

      </div>
    </section>
  `,
})
export class HeroComponent {
  certService = inject(CertificateService);
  searchInput = signal<string>('OSN-2024-LKP-8892A');
  searchError = signal<string | null>(null);

  onInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchInput.set(target.value);
    this.searchError.set(null);
  }

  handleSearch() {
    const val = this.searchInput();
    if (!val.trim()) {
      this.searchError.set('Mohon masukkan ID atau nomor sertifikat.');
      return;
    }
    const success = this.certService.selectCertificateById(val);
    if (!success) {
      this.searchError.set(`Sertifikat "${val}" tidak ditemukan pada database ledger blockchain.`);
    } else {
      this.searchError.set(null);
      const el = document.getElementById('hasil-verifikasi');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  selectPreset(id: string) {
    this.searchInput.set(id);
    this.certService.selectCertificateById(id);
    const el = document.getElementById('hasil-verifikasi');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
}
