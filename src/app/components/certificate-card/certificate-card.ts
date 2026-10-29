import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CertificateService } from '../../services/certificate.service';

@Component({
  selector: 'app-certificate-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <section id="hasil-verifikasi" class="py-12 lg:py-16 bg-slate-100/70 border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Section Header -->
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-900 mb-1">
              <mat-icon class="!text-base !w-4 !h-4 text-emerald-600">verified</mat-icon>
              <span>Hasil Verifikasi Dokumen Kriptografis</span>
            </div>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Sertifikat Resmi & Sah
            </h2>
            <p class="text-sm text-slate-600 mt-1">
              Data sertifikat di bawah ini telah terverifikasi secara matematis terhadap catatan abadi pada blockchain.
            </p>
          </div>

          <!-- Document Action Toolbar -->
          <div class="flex items-center gap-2.5 shrink-0 no-print">
            <button
              (click)="certService.printCertificate()"
              class="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-2xs transition-colors cursor-pointer"
              title="Cetak atau Unduh sebagai PDF"
            >
              <mat-icon class="!text-lg !w-4.5 !h-4.5 text-slate-600">print</mat-icon>
              <span>Cetak / Simpan PDF</span>
            </button>

            <button
              (click)="copyVerificationLink()"
              class="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg shadow-2xs transition-colors cursor-pointer"
            >
              <mat-icon class="!text-lg !w-4.5 !h-4.5 text-blue-800">share</mat-icon>
              <span>Bagikan Tautan</span>
            </button>
          </div>
        </div>

        <!-- Notification Toast when copied -->
        @if (certService.copyNotification()) {
          <div class="mb-6 p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs sm:text-sm rounded-xl flex items-center justify-between shadow-xs transition-all">
            <div class="flex items-center gap-2">
              <mat-icon class="!text-lg !w-5 !h-5 text-emerald-600">check_circle</mat-icon>
              <span class="font-medium">{{ certService.copyNotification() }}</span>
            </div>
          </div>
        }

        <!-- Status Alert Banner -->
        @if (certService.verificationResult().isValid) {
          <div class="mb-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div class="flex items-center gap-3.5">
              <div class="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0 border border-white/30">
                <mat-icon class="!text-3xl !w-8 !h-8 text-white">verified</mat-icon>
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <span class="px-2 py-0.5 rounded text-[11px] font-extrabold uppercase bg-emerald-800/80 text-emerald-200 tracking-wider">
                    Status Resmi 100%
                  </span>
                  <span class="text-xs text-emerald-100">Blok #{{ certService.currentCertificate().blockchainProof.blockNumber }}</span>
                </div>
                <h3 class="text-lg sm:text-xl font-bold text-white mt-0.5">
                  SERTIFIKAT TELAH BERHASIL DIVERIFIKASI &amp; DINYATAKAN RESMI
                </h3>
                <p class="text-xs text-emerald-100">
                  Tanda tangan digital dan stempel sah terverifikasi. Tidak ada manipulasi data yang terdeteksi.
                </p>
              </div>
            </div>
            <div class="flex items-center gap-2 shrink-0 self-end sm:self-center">
              <a
                href="#bukti-blockchain"
                class="px-4 py-2 bg-white text-emerald-900 font-bold text-xs rounded-lg shadow-sm hover:bg-emerald-50 transition-colors inline-flex items-center gap-1.5"
              >
                <mat-icon class="!text-sm !w-4 !h-4">memory</mat-icon>
                <span>Lihat Ledger Blockchain</span>
              </a>
            </div>
          </div>
        } @else {
          <!-- Tampered / Invalid Alert Banner -->
          <div class="mb-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-rose-600 to-red-700 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-shake">
            <div class="flex items-center gap-3.5">
              <div class="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0 border border-white/30">
                <mat-icon class="!text-3xl !w-8 !h-8 text-white">gpp_bad</mat-icon>
              </div>
              <div>
                <span class="px-2 py-0.5 rounded text-[11px] font-extrabold uppercase bg-red-900 text-rose-200 tracking-wider">
                  PERINGATAN PEMALSUAN DOKUMEN
                </span>
                <h3 class="text-lg sm:text-xl font-bold text-white mt-0.5">
                  SERTIFIKAT TIDAK VALID / DATA TELAH DIUBAH SECARA ILEGAL
                </h3>
                <p class="text-xs text-rose-100">
                  {{ certService.verificationResult().tamperMessage }}
                </p>
              </div>
            </div>
            <button
              (click)="certService.toggleTamperSimulation(false)"
              class="px-4 py-2 bg-white text-rose-900 font-bold text-xs rounded-lg shadow-sm hover:bg-rose-50 transition-colors inline-flex items-center gap-1.5 self-end sm:self-center cursor-pointer"
            >
              <mat-icon class="!text-sm !w-4 !h-4">restore</mat-icon>
              <span>Pulihkan Data Resmi</span>
            </button>
          </div>
        }

        <!-- ======================================================== -->
        <!-- THE AUTHENTIC PHYSICAL/DIGITAL CERTIFICATE VIEWPORT -->
        <!-- ======================================================== -->
        <div
          id="printable-certificate"
          class="relative bg-white text-slate-900 rounded-2xl p-6 sm:p-10 lg:p-14 shadow-xl border-4 border-amber-600/60 overflow-hidden"
          style="background-image: radial-gradient(#d4af37 0.6px, transparent 0.6px), radial-gradient(#1e3a8a 0.6px, #ffffff 0.6px); background-size: 24px 24px; background-position: 0 0, 12px 12px;"
        >
          <!-- Certificate Inner Gold Double Border Frame -->
          <div class="relative p-6 sm:p-8 lg:p-10 border-4 border-double border-amber-700/80 bg-white/95 backdrop-blur-xs rounded-xl shadow-xs">
            
            <!-- Corner Decorative Filigree Elements -->
            <div class="absolute top-2 left-2 text-amber-700 font-serif text-2xl select-none opacity-80">❖</div>
            <div class="absolute top-2 right-2 text-amber-700 font-serif text-2xl select-none opacity-80">❖</div>
            <div class="absolute bottom-2 left-2 text-amber-700 font-serif text-2xl select-none opacity-80">❖</div>
            <div class="absolute bottom-2 right-2 text-amber-700 font-serif text-2xl select-none opacity-80">❖</div>

            <!-- Certificate Header: Official Logos & Consortium -->
            <div class="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b-2 border-amber-700/40">
              
              <!-- Left Logos: Kemendikbud & Puspresnas -->
              <div class="flex items-center gap-4">
                <img
                  src="/assets/aistudio/images_557237bb.png"
                  alt="Tut Wuri Handayani Kemendikbud"
                  referrerpolicy="no-referrer"
                  class="h-14 sm:h-16 w-auto object-contain filter drop-shadow-xs"
                />
                <img
                  src="/assets/aistudio/image_e5dcd704.png"
                  alt="Pusat Prestasi Nasional"
                  referrerpolicy="no-referrer"
                  class="h-10 sm:h-12 w-auto object-contain"
                />
              </div>

              <!-- Center Institutional Seal Text -->
              <div class="text-center px-2">
                <p class="text-[11px] sm:text-xs font-bold tracking-widest text-slate-500 uppercase">
                  REPUBLIK INDONESIA
                </p>
                <h3 class="text-base sm:text-xl font-extrabold text-blue-950 uppercase tracking-tight">
                  LEMBAGA KURSUS DAN PELATIHAN PRESTASI NUSANTARA
                </h3>
                <p class="text-xs sm:text-sm font-semibold text-amber-800 uppercase tracking-wider mt-0.5">
                  OLIMPIADE SISWA NASIONAL (OSN) &middot; RUMAH PENDIDIKAN
                </p>
                <p class="text-[10px] text-slate-400 mt-0.5">
                  Nomor Izin Operasional: SK.DIR-LKP/OSN-VERIF/X-2024/091 &middot; Terakreditasi Nasional
                </p>
              </div>

              <!-- Right Logos: Rumah Pendidikan & LKP Crest -->
              <div class="flex items-center gap-4">
                <img
                  src="/assets/aistudio/rumah-pendidikan_4654675c.png"
                  alt="Rumah Pendidikan"
                  referrerpolicy="no-referrer"
                  class="h-9 sm:h-11 w-auto object-contain"
                />
                <img
                  src="/assets/aistudio/LKP_logo_transparent_v3_548fda2d.png"
                  alt="LKP Prestasi Nusantara"
                  referrerpolicy="no-referrer"
                  class="h-14 sm:h-16 w-auto object-contain filter drop-shadow-xs"
                />
              </div>

            </div>

            <!-- Certificate Body -->
            <div class="py-8 text-center">
              
              <!-- Certificate Title -->
              <div class="mb-4">
                <span class="inline-block px-3 py-1 bg-amber-100 text-amber-900 border border-amber-300 rounded text-xs font-bold uppercase tracking-widest mb-3">
                  PIAGAM PENGHARGAAN &amp; SERTIFIKASI KOMPETENSI RESMI
                </span>
                <h1 class="text-2xl sm:text-4xl font-serif-display font-extrabold text-slate-900 tracking-tight">
                  SERTIFIKAT PRESTASI NASIONAL
                </h1>
                <p class="text-xs sm:text-sm font-code text-slate-500 mt-1 font-semibold">
                  Nomor Registrasi: <span class="text-blue-950 underline decoration-amber-500 decoration-2">{{ certService.currentCertificate().certificateNumber }}</span>
                </p>
              </div>

              <p class="text-xs sm:text-sm italic text-slate-600 my-4 font-serif">
                Dewan Juri dan Panitia Pelaksana dengan ini menyatakan bahwa:
              </p>

              <!-- Recipient Name -->
              <div class="my-5 py-2 border-y border-amber-700/30 max-w-2xl mx-auto bg-amber-50/40">
                <h2 class="text-2xl sm:text-4xl font-extrabold text-blue-950 font-serif-display uppercase tracking-wide">
                  {{ certService.currentCertificate().recipientName }}
                </h2>
                <div class="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-600 mt-1.5 font-medium">
                  <span>NISN: <strong class="text-slate-900">{{ certService.currentCertificate().nisn }}</strong></span>
                  <span aria-hidden="true">&middot;</span>
                  <span>Asal Sekolah: <strong class="text-slate-900">{{ certService.currentCertificate().institution }}</strong></span>
                </div>
              </div>

              <!-- Award Citation -->
              <div class="max-w-3xl mx-auto my-6 text-slate-700 text-sm sm:text-base leading-relaxed">
                <p>
                  Telah berhasil menyelesaikan dan meraih prestasi tertinggi dalam ajang kompetisi
                  <strong class="text-blue-950">{{ certService.currentCertificate().program }}</strong>
                  pada bidang keahlian:
                </p>
                <p class="text-base sm:text-lg font-bold text-slate-900 mt-1">
                  "{{ certService.currentCertificate().category }}"
                </p>

                <!-- Award Predicate Highlight -->
                <div class="mt-4 inline-flex flex-col sm:flex-row items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500/15 via-amber-400/25 to-amber-500/15 border-2 border-amber-600/50 shadow-xs">
                  <img
                    src="/assets/aistudio/LOGO_OSN_2_40a5bbae.jpeg"
                    alt="OSN Gold Trophy Medallion"
                    referrerpolicy="no-referrer"
                    class="h-10 w-10 rounded-full object-cover shadow-xs border border-amber-500"
                  />
                  <div class="text-center sm:text-left">
                    <span class="text-xs uppercase font-bold text-amber-900 tracking-wider">Capaian Prestasi:</span>
                    <p class="text-base sm:text-lg font-extrabold text-amber-950 tracking-tight">
                      {{ certService.currentCertificate().award }}
                    </p>
                  </div>
                  <div class="sm:border-l sm:border-amber-700/30 sm:pl-4 text-center sm:text-left">
                    <span class="text-[11px] text-slate-500 uppercase font-semibold">Skor Akhir</span>
                    <p class="text-lg font-black text-blue-950 font-code tabular-nums">
                      {{ certService.currentCertificate().gradeScore }} / 100
                    </p>
                  </div>
                </div>

              </div>

              <!-- Certificate Footer: Signatures, Seal & Blockchain QR Verification -->
              <div class="mt-10 pt-6 border-t-2 border-amber-700/40 grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                
                <!-- Left: Blockchain QR Code & Hash Verification -->
                <div class="flex flex-col items-center md:items-start text-left">
                  <div class="flex items-center gap-3 p-2 bg-slate-50 border border-slate-200 rounded-xl">
                    <!-- SVG QR Code Representation -->
                    <div class="w-20 h-20 bg-white p-1 rounded border border-slate-300 flex items-center justify-center shrink-0 shadow-2xs">
                      <svg viewBox="0 0 100 100" class="w-full h-full text-slate-900 fill-current">
                        <!-- Simulated high-density QR pattern -->
                        <rect x="5" y="5" width="25" height="25" fill="#1e3a8a"/>
                        <rect x="10" y="10" width="15" height="15" fill="#ffffff"/>
                        <rect x="13" y="13" width="9" height="9" fill="#1e3a8a"/>
                        
                        <rect x="70" y="5" width="25" height="25" fill="#1e3a8a"/>
                        <rect x="75" y="10" width="15" height="15" fill="#ffffff"/>
                        <rect x="78" y="13" width="9" height="9" fill="#1e3a8a"/>

                        <rect x="5" y="70" width="25" height="25" fill="#1e3a8a"/>
                        <rect x="10" y="75" width="15" height="15" fill="#ffffff"/>
                        <rect x="13" y="78" width="9" height="9" fill="#1e3a8a"/>

                        <rect x="35" y="10" width="8" height="8" fill="#1e3a8a"/>
                        <rect x="47" y="10" width="8" height="8" fill="#1e3a8a"/>
                        <rect x="35" y="22" width="8" height="8" fill="#1e3a8a"/>
                        <rect x="47" y="22" width="8" height="8" fill="#1e3a8a"/>

                        <rect x="35" y="35" width="30" height="30" fill="#d97706"/>
                        <rect x="40" y="40" width="20" height="20" fill="#ffffff"/>
                        <circle cx="50" cy="50" r="6" fill="#1e3a8a"/>

                        <rect x="10" y="40" width="6" height="6" fill="#1e3a8a"/>
                        <rect x="20" y="45" width="6" height="6" fill="#1e3a8a"/>
                        <rect x="75" y="40" width="6" height="6" fill="#1e3a8a"/>
                        <rect x="85" y="45" width="6" height="6" fill="#1e3a8a"/>

                        <rect x="35" y="75" width="8" height="8" fill="#1e3a8a"/>
                        <rect x="50" y="75" width="8" height="8" fill="#1e3a8a"/>
                        <rect x="65" y="75" width="8" height="8" fill="#1e3a8a"/>
                        <rect x="80" y="75" width="8" height="8" fill="#1e3a8a"/>
                      </svg>
                    </div>
                    <div class="text-[11px] leading-tight text-slate-600">
                      <p class="font-bold text-slate-900 uppercase">Pindai QR Verifikasi</p>
                      <p class="text-[10px] text-slate-500">Tervalidasi Smart Contract</p>
                      <span class="inline-flex items-center gap-1 font-code text-[9px] text-blue-900 mt-1 font-semibold">
                        <mat-icon class="!text-[12px] !w-3 !h-3">lock</mat-icon>
                        SHA-256 Protected
                      </span>
                    </div>
                  </div>
                  <p class="text-[10px] text-slate-400 mt-1.5 font-code truncate max-w-[200px]">
                    ID: {{ certService.currentCertificate().id }}
                  </p>
                </div>

                <!-- Center: Official Hologram & National Insignia -->
                <div class="flex flex-col items-center justify-center">
                  <div class="relative w-20 h-20 rounded-full border-2 border-amber-500/80 p-1 flex items-center justify-center bg-gradient-to-tr from-amber-200 via-yellow-100 to-amber-300 shadow-md">
                    <img
                      src="/assets/aistudio/LOGO_OSN_24b95408.jpeg"
                      alt="National Student Olympiade OSN"
                      referrerpolicy="no-referrer"
                      class="w-full h-full object-cover rounded-full"
                    />
                    <!-- Holographic sheen overlay -->
                    <div class="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none"></div>
                  </div>
                  <span class="text-[10px] font-bold uppercase tracking-wider text-amber-900 mt-2">
                    SEGEL KEASLIAN RESMI
                  </span>
                  <span class="text-[9px] text-slate-400">Anti-Duplikasi Holografis</span>
                </div>

                <!-- Right: Signatory & Authentic Official Blue Stamp Overlay -->
                <div class="flex flex-col items-center md:items-end text-center md:text-right">
                  <p class="text-xs text-slate-600">
                    Diterbitkan di Jakarta, <strong class="text-slate-900">{{ certService.currentCertificate().issueDate }}</strong>
                  </p>
                  
                  <!-- Signature Area with authentic official stamp overlay -->
                  <div class="relative my-2 w-56 h-24 flex items-center justify-center">
                    
                    <!-- Authentic LKP Prestasi Nusantara Blue Stamp Asset (User provided transparent PNG) -->
                    <img
                      src="/assets/aistudio/LKP_stempel_transparent_v3_d80e4841.png"
                      alt="Stempel Resmi LKP Prestasi Nusantara"
                      referrerpolicy="no-referrer"
                      class="absolute -left-2 top-0 h-24 w-24 object-contain opacity-90 rotate-[-8deg] filter drop-shadow-xs pointer-events-none z-10"
                    />

                    <!-- Digital Stylized Signature Vector -->
                    <svg viewBox="0 0 200 60" class="w-40 h-16 text-blue-950 stroke-current fill-none stroke-[2] z-0">
                      <path d="M10,40 Q40,10 70,35 T110,25 T140,45 Q160,20 180,30 Q190,35 170,45 Q130,55 90,50 Q60,45 120,40" />
                    </svg>
                  </div>

                  <p class="text-sm font-bold text-slate-900 underline decoration-slate-400">
                    {{ certService.currentCertificate().signatory.name }}
                  </p>
                  <p class="text-[11px] font-medium text-slate-600">
                    {{ certService.currentCertificate().signatory.title }}
                  </p>
                  <p class="text-[10px] text-slate-400 font-code">
                    {{ certService.currentCertificate().signatory.skNumber }}
                  </p>
                </div>

              </div>

            </div>

            <!-- Bottom Hash Fingerprint Ribbon on Certificate -->
            <div class="mt-4 pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-slate-500 font-code bg-slate-50/70 p-2.5 rounded-lg">
              <div class="flex items-center gap-1.5 truncate max-w-full">
                <span class="font-bold text-slate-700 uppercase">Fingerprint SHA-256:</span>
                <span class="text-blue-900 font-semibold truncate">{{ certService.currentCertificate().canonicalHash }}</span>
              </div>
              <button
                (click)="copyHash(certService.currentCertificate().canonicalHash)"
                class="inline-flex items-center gap-1 px-2 py-0.5 bg-white hover:bg-slate-100 border border-slate-200 rounded text-slate-700 font-medium shrink-0 cursor-pointer"
              >
                <mat-icon class="!text-[12px] !w-3 !h-3">content_copy</mat-icon>
                <span>Salin Hash</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  `,
})
export class CertificateCardComponent {
  certService = inject(CertificateService);

  copyHash(hash: string) {
    this.certService.copyToClipboard(hash, 'Hash Kriptografis SHA-256');
  }

  copyVerificationLink() {
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}/?cert=${this.certService.currentCertificate().id}`;
      this.certService.copyToClipboard(url, 'Tautan Verifikasi Resmi');
    }
  }
}
