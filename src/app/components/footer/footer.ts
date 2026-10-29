import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <footer class="bg-slate-950 text-slate-400 py-12 border-t border-slate-800 text-xs">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          
          <!-- Column 1: Brand Info -->
          <div class="md:col-span-2 space-y-4">
            <div class="flex items-center gap-3">
              <img
                src="/assets/aistudio/LKP_logo_transparent_v3_548fda2d.png"
                alt="LKP Prestasi Nusantara"
                referrerpolicy="no-referrer"
                class="h-10 w-auto object-contain"
              />
              <span class="text-sm font-bold text-white uppercase tracking-tight">
                Konsorsium Sertifikasi Blockchain Nasional
              </span>
            </div>
            <p class="text-slate-400 leading-relaxed max-w-md">
              Pusat validasi resmi sertifikat kelulusan, piagam penghargaan, dan rekam jejak prestasi siswa di bawah koordinasi LKP Prestasi Nusantara, Pusat Prestasi Nasional (Puspresnas), dan Olimpiade Siswa Nasional (OSN).
            </p>
            <div class="flex items-center gap-2 text-slate-300">
              <mat-icon class="!text-sm !w-4 !h-4 text-amber-400">email</mat-icon>
              <span>Email Resmi:</span>
              <a href="mailto:olimpiadesiswanasionalofficial@gmail.com" class="text-amber-400 hover:underline">
                olimpiadesiswanasionalofficial&#64;gmail.com
              </a>
            </div>
          </div>

          <!-- Column 2: Navigation -->
          <div>
            <h4 class="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Layanan Verifikasi
            </h4>
            <ul class="space-y-2">
              <li><a href="#beranda" class="hover:text-white transition-colors">Cek Status Sertifikat</a></li>
              <li><a href="#hasil-verifikasi" class="hover:text-white transition-colors">Hasil Validasi Resmi</a></li>
              <li><a href="#bukti-blockchain" class="hover:text-white transition-colors">Ledger Audit Trail</a></li>
              <li><a href="#afiliasi-logo" class="hover:text-white transition-colors">Galeri Logo &amp; Stempel</a></li>
              <li><a href="#uji-integritas" class="hover:text-white transition-colors">Simulator Anti-Pemalsuan</a></li>
            </ul>
          </div>

          <!-- Column 3: Legal & Standards -->
          <div>
            <h4 class="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Standar Regulasi
            </h4>
            <ul class="space-y-2 text-slate-400">
              <li>SK.DIR-LKP/OSN-VERIF/X-2024</li>
              <li>UU ITE No. 11/2008 &amp; PP 71/2019</li>
              <li>Standar Enkripsi SHA-256 FIPS 180-4</li>
              <li>Konsensus Proof-of-Authority (PoA)</li>
              <li>Akreditasi Lembaga Pelatihan Mandiri</li>
            </ul>
          </div>

        </div>

        <!-- Bottom Copyright -->
        <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>
            &copy; 2024–2026 LKP Prestasi Nusantara, Puspresnas &amp; Olimpiade Siswa Nasional (OSN). Seluruh Hak Cipta Dilindungi Undang-Undang.
          </p>
          <div class="flex items-center gap-4">
            <span class="inline-flex items-center gap-1 text-emerald-400 font-medium">
              <mat-icon class="!text-[12px] !w-3 !h-3 text-emerald-400">shield</mat-icon>
              Data Terenkripsi &amp; Terdesentralisasi
            </span>
          </div>
        </div>

      </div>
    </footer>
  `,
})
export class FooterComponent {}
