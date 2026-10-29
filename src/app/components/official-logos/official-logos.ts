import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

interface OfficialLogoItem {
  name: string;
  category: string;
  description: string;
  imagePath: string;
  badge: string;
}

@Component({
  selector: 'app-official-logos',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <section id="afiliasi-logo" class="py-14 bg-white border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto mb-12">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold mb-3">
            <mat-icon class="!text-sm !w-4 !h-4 text-amber-600">verified</mat-icon>
            <span>ENTITAS PENGESAH &amp; AFILIASI RESMI TERDAFTAR</span>
          </div>
          <h2 class="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Semua Logo Resmi &amp; Cap Stempel Terverifikasi
          </h2>
          <p class="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Seluruh dokumen dan sertifikat yang diterbitkan mencantumkan logo serta cap stempel resmi berikut sebagai bukti otentikasi sah dari lembaga penyelenggara dan otoritas pendidikan.
          </p>
        </div>

        <!-- 9 Logos Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (logo of logos; track logo.name) {
            <div class="group bg-slate-50 hover:bg-white rounded-2xl p-6 border border-slate-200 hover:border-amber-400 hover:shadow-lg transition-all flex flex-col justify-between">
              
              <div>
                <!-- Top Badge -->
                <div class="flex items-center justify-between mb-4">
                  <span class="text-[11px] font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                    {{ logo.category }}
                  </span>
                  <span class="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-semibold">
                    <mat-icon class="!text-sm !w-3.5 !h-3.5 text-emerald-600">verified</mat-icon>
                    {{ logo.badge }}
                  </span>
                </div>

                <!-- Logo Display Frame -->
                <div class="h-36 w-full flex items-center justify-center p-4 bg-white rounded-xl border border-slate-200/80 group-hover:border-slate-300 transition-colors shadow-2xs mb-4">
                  <img
                    [src]="logo.imagePath"
                    [alt]="logo.name"
                    referrerpolicy="no-referrer"
                    class="max-h-28 max-w-full object-contain filter group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <!-- Title & Description -->
                <h3 class="text-base font-bold text-slate-900 group-hover:text-blue-950 transition-colors">
                  {{ logo.name }}
                </h3>
                <p class="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  {{ logo.description }}
                </p>
              </div>

              <div class="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                <span class="font-code text-[10px]">Asset ID: {{ logo.imagePath.split('/').pop() }}</span>
                <span class="text-emerald-700 font-semibold flex items-center gap-0.5">
                  <mat-icon class="!text-xs !w-3 !h-3">done_all</mat-icon>
                  Otentik
                </span>
              </div>

            </div>
          }
        </div>

      </div>
    </section>
  `,
})
export class OfficialLogosComponent {
  readonly logos: OfficialLogoItem[] = [
    {
      name: 'Tut Wuri Handayani',
      category: 'Kementerian Pendidikan',
      description: 'Lambang resmi pendidikan nasional Republik Indonesia yang melandasi standar kompetensi dan kurikulum prestasi siswa.',
      imagePath: '/assets/aistudio/images_557237bb.png',
      badge: 'Regulasi Resmi',
    },
    {
      name: 'Pusat Prestasi Nasional (Puspresnas)',
      category: 'Puspresnas Kemendikbud',
      description: 'Unit kerja resmi pemerintah yang menaungi talenta, perlombaan, dan olimpiade berjenjang di seluruh Indonesia.',
      imagePath: '/assets/aistudio/image_e5dcd704.png',
      badge: 'Pembina Prestasi',
    },
    {
      name: 'Rumah Pendidikan',
      category: 'Platform Pendidikan',
      description: 'Ekosistem digital terpadu penyelenggaraan pelatihan, modul kompetisi sains, serta pangkalan data terakreditasi.',
      imagePath: '/assets/aistudio/rumah-pendidikan_4654675c.png',
      badge: 'Mitra Edukasi',
    },
    {
      name: 'LKP Prestasi Nusantara (Lambang Emas Transparan)',
      category: 'Lembaga Pelatihan',
      description: 'Lambang perisai emas resmi LKP Prestasi Nusantara yang tercantum di pojok kanan atas sertifikat tanda kelulusan.',
      imagePath: '/assets/aistudio/LKP_logo_transparent_v3_548fda2d.png',
      badge: 'Penerbit Utama',
    },
    {
      name: 'Stempel Resmi LKP Prestasi Nusantara (Transparan)',
      category: 'Stempel Sah',
      description: 'Cap stempel basah digital transparan bersertifikat kriptografis yang dibubuhkan langsung di atas tanda tangan direktur.',
      imagePath: '/assets/aistudio/LKP_stempel_transparent_v3_d80e4841.png',
      badge: 'Segel Sah',
    },
    {
      name: 'Stempel Resmi LKP Prestasi Nusantara (Lingkaran)',
      category: 'Stempel Legalitas',
      description: 'Cap segel resmi lembaga kursus dan pelatihan terdaftar untuk legalisir piagam dan transkrip prestasi siswa nasional.',
      imagePath: '/assets/aistudio/STEMPEL_LKP_474ebc1b.jpeg',
      badge: 'Legalisir Resmi',
    },
    {
      name: 'Olimpiade OSN (Online Olympiade Platform)',
      category: 'Ajang Kompetisi',
      description: 'Medali emas dan lencana maskot olimpiade siswa resmi dalam penyelenggaraan olimpiade daring berskala nasional.',
      imagePath: '/assets/aistudio/LOGO_OSN_2_40a5bbae.jpeg',
      badge: 'Piagam Medali',
    },
    {
      name: 'National Student Olympiade OSN',
      category: 'Lencana Kehormatan',
      description: 'Lencana resmi kejuaraan siswa berprestasi tingkat nasional untuk verifikasi predikat pemenang dan finalis.',
      imagePath: '/assets/aistudio/LOGO_OSN_24b95408.jpeg',
      badge: 'Lencana Juara',
    },
    {
      name: 'LKP Prestasi Nusantara (Insignia Perisai Biru Emas)',
      category: 'Insignia Kelembagaan',
      description: 'Logo lambang perisai kehormatan lembaga penyelenggara pelatihan dan sertifikasi kompetensi keahlian terpadu.',
      imagePath: '/assets/aistudio/LOGO_LKP_2_0fa60fd3.jpeg',
      badge: 'Akreditasi',
    },
  ];
}
