import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-security-features',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <section id="fitur-keamanan" class="py-14 bg-white border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="text-center max-w-3xl mx-auto mb-12">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 border border-blue-200 text-blue-900 text-xs font-semibold mb-3">
            <mat-icon class="!text-sm !w-4 !h-4 text-blue-700">security</mat-icon>
            <span>STANDAR KEAMANAN TINGKAT TINGGI</span>
          </div>
          <h2 class="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            5 Pilar Keamanan Blockchain Anti-Pemalsuan
          </h2>
          <p class="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
            Menjamin sertifikat kelulusan dan piagam penghargaan memiliki derajat kepercayaan tertinggi tanpa kemungkinan direkayasa.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <!-- Pillar 1 -->
          <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-900 transition-colors">
            <div class="w-12 h-12 rounded-xl bg-blue-900 text-white flex items-center justify-center mb-4 shadow-sm">
              <mat-icon class="!text-2xl !w-6 !h-6">lock_clock</mat-icon>
            </div>
            <h3 class="text-base font-bold text-slate-900 mb-2">
              1. Catatan Abadi (Immutability)
            </h3>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Setelah blok divalidasi oleh konsorsium, data sertifikat disimpan secara permanen. Tidak ada entitas atau administrator tunggal yang dapat menghapus atau merevisi data riwayat.
            </p>
          </div>

          <!-- Pillar 2 -->
          <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-900 transition-colors">
            <div class="w-12 h-12 rounded-xl bg-amber-600 text-white flex items-center justify-center mb-4 shadow-sm">
              <mat-icon class="!text-2xl !w-6 !h-6">fingerprint</mat-icon>
            </div>
            <h3 class="text-base font-bold text-slate-900 mb-2">
              2. Kriptografi Standar SHA-256
            </h3>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Setiap komponen sertifikat dikomputasi ke dalam 256-bit hash unik. Perubahan terkecil sekalipun akan membatalkan fingerprint sertifikat seketika.
            </p>
          </div>

          <!-- Pillar 3 -->
          <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-900 transition-colors">
            <div class="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-4 shadow-sm">
              <mat-icon class="!text-2xl !w-6 !h-6">hub</mat-icon>
            </div>
            <h3 class="text-base font-bold text-slate-900 mb-2">
              3. Konsorsium Multi-Node Validator
            </h3>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Integritas sertifikat diverifikasi bersama oleh node Puspresnas, LKP Prestasi Nusantara, Rumah Pendidikan, dan Dewan OSN dengan mekanisme konsensus Proof-of-Authority.
            </p>
          </div>

          <!-- Pillar 4 -->
          <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-900 transition-colors">
            <div class="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center mb-4 shadow-sm">
              <mat-icon class="!text-2xl !w-6 !h-6">qr_code_2</mat-icon>
            </div>
            <h3 class="text-base font-bold text-slate-900 mb-2">
              4. QR Code & Stempel Kriptografis
            </h3>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Fisik sertifikat memuat QR code verifikasi instan dan cap stempel digital transparan LKP Prestasi Nusantara yang terenkripsi dan terhubung langsung ke smart contract.
            </p>
          </div>

          <!-- Pillar 5 -->
          <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-900 transition-colors">
            <div class="w-12 h-12 rounded-xl bg-rose-600 text-white flex items-center justify-center mb-4 shadow-sm">
              <mat-icon class="!text-2xl !w-6 !h-6">gavel</mat-icon>
            </div>
            <h3 class="text-base font-bold text-slate-900 mb-2">
              5. Legalitas UU ITE Terpenuhi
            </h3>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Sesuai dengan ketentuan Undang-Undang Informasi dan Transaksi Elektronik (UU ITE) Pasal 11 mengenai keabsahan pembuktian dokumen dan tanda tangan elektronik tersertifikasi.
            </p>
          </div>

          <!-- Pillar 6 -->
          <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-900 transition-colors">
            <div class="w-12 h-12 rounded-xl bg-cyan-700 text-white flex items-center justify-center mb-4 shadow-sm">
              <mat-icon class="!text-2xl !w-6 !h-6">verified_user</mat-icon>
            </div>
            <h3 class="text-base font-bold text-slate-900 mb-2">
              6. Bebas Biaya Verifikasi Instansi
            </h3>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Sekolah, perguruan tinggi negeri maupun swasta, dan panitia beasiswa dapat melakukan pengecekan keaslian secara gratis, cepat, dan transparan kapan saja selama 24 jam.
            </p>
          </div>

        </div>

      </div>
    </section>
  `,
})
export class SecurityFeaturesComponent {}
