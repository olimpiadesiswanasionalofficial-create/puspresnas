import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-verification-result',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <div class="min-h-screen bg-slate-100 py-4 sm:py-8 px-3 sm:px-6 flex flex-col items-center justify-center font-sans antialiased">
      
      <!-- Kartu Verifikasi Utama (Mobile-First & Fully Responsive) -->
      <div class="w-full max-w-xl bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden">
        
        <!-- 1. Pita Otoritas Resmi & Logo Mitra Penyelenggara -->
        <div class="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 text-white p-4 sm:p-5 border-b border-blue-900/40">
          <div class="text-center mb-3">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[11px] font-bold tracking-wider uppercase">
              <mat-icon class="!text-sm !w-4 !h-4 text-emerald-400">verified</mat-icon>
              HASIL PEMINDAIAN BARCODE / QR RESMI
            </span>
            <p class="text-[11px] text-slate-300 mt-1 font-medium">
              Sistem Validasi Resmi Sertifikat Prestasi Nasional 2026
            </p>
          </div>

          <!-- 5 Logo Otoritas Teratas -->
          <div class="grid grid-cols-5 gap-1.5 sm:gap-3 items-center justify-center bg-white p-2.5 sm:p-3 rounded-2xl shadow-inner">
            <!-- 1. Tut Wuri Handayani -->
            <div class="flex items-center justify-center p-1 h-11 sm:h-12">
              <img
                src="/assets/aistudio/images_557237bb.png"
                alt="Tut Wuri Handayani Kemendikbud"
                referrerpolicy="no-referrer"
                class="max-h-9 sm:max-h-10 max-w-full object-contain"
              />
            </div>
            <!-- 2. Puspresnas -->
            <div class="flex items-center justify-center p-1 h-11 sm:h-12">
              <img
                src="/assets/aistudio/image_e5dcd704.png"
                alt="Pusat Prestasi Nasional (Puspresnas)"
                referrerpolicy="no-referrer"
                class="max-h-8 sm:max-h-9 max-w-full object-contain"
              />
            </div>
            <!-- 3. Rumah Pendidikan -->
            <div class="flex items-center justify-center p-1 h-11 sm:h-12">
              <img
                src="/assets/aistudio/rumah-pendidikan_4654675c.png"
                alt="Rumah Pendidikan"
                referrerpolicy="no-referrer"
                class="max-h-7 sm:max-h-8 max-w-full object-contain"
              />
            </div>
            <!-- 4. LKP Prestasi Nusantara Logo Crest Emas -->
            <div class="flex items-center justify-center p-1 h-11 sm:h-12">
              <img
                src="/assets/aistudio/LKP_logo_transparent_v3_548fda2d.png"
                alt="LKP Prestasi Nusantara"
                referrerpolicy="no-referrer"
                class="max-h-9 sm:max-h-10 max-w-full object-contain"
              />
            </div>
            <!-- 5. Olympiade OSN Gold Trophy -->
            <div class="flex items-center justify-center p-1 h-11 sm:h-12">
              <img
                src="/assets/aistudio/LOGO_OSN_2_40a5bbae.jpeg"
                alt="Olympiade OSN Platform for Indonesia"
                referrerpolicy="no-referrer"
                class="max-h-9 sm:max-h-10 max-w-full object-contain rounded"
              />
            </div>
          </div>
        </div>

        <!-- 2. Banner Pernyataan Status Resmi -->
        <div class="bg-gradient-to-b from-emerald-600 via-emerald-700 to-teal-800 text-white p-6 sm:p-8 text-center relative overflow-hidden">
          <div class="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
          <div class="absolute -left-6 -top-6 w-32 h-32 bg-emerald-400/20 rounded-full blur-xl pointer-events-none"></div>

          <!-- Centang Hijau Verifikasi Besar -->
          <div class="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full bg-white text-emerald-600 flex items-center justify-center shadow-xl mb-4 ring-8 ring-emerald-400/30">
            <mat-icon class="!text-5xl sm:!text-6xl !w-14 sm:!w-16 !h-14 sm:!h-16">check_circle</mat-icon>
          </div>

          <span class="inline-block px-3 py-1 rounded-full bg-emerald-950/60 text-emerald-200 text-[11px] sm:text-xs font-black tracking-widest uppercase mb-3 border border-emerald-400/30">
            STATUS: 100% ASLI &amp; SAH
          </span>

          <!-- JUDUL UTAMA RESMI -->
          <h1 class="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase leading-snug drop-shadow-sm max-w-md mx-auto">
            SERTIFIKAT TELAH BERHASIL DIVERIFIKASI DAN DINYATAKAN RESMI
          </h1>

          <p class="text-xs sm:text-sm text-emerald-100 max-w-sm mx-auto mt-3 font-normal leading-relaxed">
            Dokumen piagam penghargaan dan sertifikat kompetisi ini telah terverifikasi secara sah dalam pangkalan data resmi nasional Tahun 2026.
          </p>
        </div>

        <!-- 3. Informasi Program Tahun 2026 -->
        <div class="p-5 sm:p-6 space-y-5">
          
          <div class="bg-amber-50/70 border border-amber-200/90 rounded-2xl p-4 sm:p-5 text-center relative overflow-hidden">
            <span class="inline-block px-3 py-1 bg-amber-200/70 text-amber-900 border border-amber-300 rounded-md text-[11px] font-extrabold uppercase tracking-widest mb-2">
              TAHUN 2026
            </span>
            <h2 class="text-lg sm:text-xl font-black text-blue-950 uppercase tracking-tight">
              OLIMPIADE SISWA NASIONAL (OSN) 2026
            </h2>
            <p class="text-xs sm:text-sm font-semibold text-amber-900 mt-1 uppercase tracking-wide">
              Lembaga Kursus dan Pelatihan Prestasi Nusantara
            </p>
            <p class="text-[11px] text-slate-500 mt-1">
              Pusat Prestasi Nasional (Puspresnas) &middot; Rumah Pendidikan &middot; Tut Wuri Handayani
            </p>
          </div>

          <!-- 4. Cap Stempel Sah & Lambang Penyelenggara Resmi (Semua Logo yang Dilampirkan) -->
          <div class="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5">
            <h3 class="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 text-center flex items-center justify-center gap-1.5">
              <mat-icon class="!text-sm !w-4 !h-4 text-blue-900">verified_user</mat-icon>
              <span>Cap Stempel Sah &amp; Lambang Pengesahan Resmi</span>
            </h3>

            <!-- 4 Cap & Lencana Otoritas -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 items-center text-center">
              
              <!-- 6. Cap Stempel Transparan Resmi LKP -->
              <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs flex flex-col items-center justify-center">
                <img
                  src="/assets/aistudio/LKP_stempel_transparent_v3_d80e4841.png"
                  alt="Stempel Resmi LKP Prestasi Nusantara Transparan"
                  referrerpolicy="no-referrer"
                  class="h-16 w-16 object-contain"
                />
                <span class="text-[10px] font-bold text-slate-800 mt-1.5 uppercase leading-tight">Cap Stempel Resmi</span>
                <span class="text-[9px] text-emerald-700 font-semibold">LKP Prestasi Nusantara</span>
              </div>

              <!-- 7. Cap Stempel Lingkaran Legalisir LKP -->
              <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs flex flex-col items-center justify-center">
                <img
                  src="/assets/aistudio/STEMPEL_LKP_474ebc1b.jpeg"
                  alt="Stempel Resmi Legalisir LKP"
                  referrerpolicy="no-referrer"
                  class="h-16 w-16 object-contain"
                />
                <span class="text-[10px] font-bold text-slate-800 mt-1.5 uppercase leading-tight">Cap Legalisir Sah</span>
                <span class="text-[9px] text-emerald-700 font-semibold">Dewan Penguji</span>
              </div>

              <!-- 8. Lencana OSN National Student -->
              <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs flex flex-col items-center justify-center">
                <img
                  src="/assets/aistudio/LOGO_OSN_24b95408.jpeg"
                  alt="National Student Olympiade OSN"
                  referrerpolicy="no-referrer"
                  class="h-16 w-16 object-cover rounded-full"
                />
                <span class="text-[10px] font-bold text-slate-800 mt-1.5 uppercase leading-tight">Lencana OSN 2026</span>
                <span class="text-[9px] text-emerald-700 font-semibold">Tingkat Nasional</span>
              </div>

              <!-- 9. Logo Perisai LKP Prestasi Nusantara -->
              <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs flex flex-col items-center justify-center">
                <img
                  src="/assets/aistudio/LOGO_LKP_2_0fa60fd3.jpeg"
                  alt="Insignia LKP Prestasi Nusantara"
                  referrerpolicy="no-referrer"
                  class="h-16 w-16 object-contain"
                />
                <span class="text-[10px] font-bold text-slate-800 mt-1.5 uppercase leading-tight">Insignia Lembaga</span>
                <span class="text-[9px] text-emerald-700 font-semibold">Terakreditasi</span>
              </div>

            </div>
          </div>

          <!-- 5. Sistem Keamanan Anti-Pemalsuan Dokumen -->
          <div class="p-4 rounded-2xl bg-slate-900 text-white border border-slate-800 flex items-start gap-3">
            <div class="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
              <mat-icon class="!text-xl !w-5 !h-5">shield</mat-icon>
            </div>
            <div class="text-xs">
              <span class="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                Sistem Keamanan Kriptografis Anti-Pemalsuan
              </span>
              <p class="text-slate-300 mt-0.5 leading-relaxed text-[11px]">
                Dokumen resmi dilindungi enkripsi hash satu arah standar nasional. Sistem menjamin keaslian data secara mutlak dan mencegah segala bentuk manipulasi atau pemalsuan fisik maupun digital.
              </p>
            </div>
          </div>

          <!-- Tombol Aksi Simpan Bukti -->
          <div class="pt-2 flex items-center justify-center">
            <button
              (click)="printPage()"
              class="w-full sm:w-auto px-6 py-3 bg-blue-950 hover:bg-blue-900 active:bg-blue-950 text-white font-bold text-xs sm:text-sm rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <mat-icon class="!text-lg !w-5 !h-5">print</mat-icon>
              <span>Simpan / Cetak Bukti Verifikasi Resmi</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  `,
})
export class VerificationResultComponent {
  printPage() {
    if (typeof window !== 'undefined') {
      window.print();
    }
  }
}
