import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CertificateService } from '../../services/certificate.service';

@Component({
  selector: 'app-blockchain-explorer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <section id="bukti-blockchain" class="py-14 bg-slate-900 text-white border-b border-slate-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Header -->
        <div class="max-w-3xl mb-10">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-400/20 text-blue-400 text-xs font-semibold mb-3">
            <mat-icon class="!text-sm !w-4 !h-4">enhanced_encryption</mat-icon>
            <span>LEDGER BLOCKCHAIN TERDESENTRALISASI &middot; ANTI-PEMALSUAN</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Audit Bukti Kriptografi Blockchain
          </h2>
          <p class="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
            Setiap sertifikat resmi diterbitkan dan dicatat secara permanen ke dalam blok data terdistribusi. Karakteristik <em>immutable</em> (abadi) menjamin keaslian 100% dan mencegah segala bentuk pemalsuan gelar, nilai, maupun nama penerima.
          </p>
        </div>

        <!-- Main Explorer Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <!-- Column 1 & 2: Block Details & Cryptographic Data -->
          <div class="lg:col-span-2 space-y-6">
            
            <!-- Block Card -->
            <div class="bg-slate-800/80 rounded-2xl border border-slate-700 p-6 shadow-xl backdrop-blur-xs">
              <div class="flex items-center justify-between pb-4 border-b border-slate-700/80 mb-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    <mat-icon class="!text-2xl !w-6 !h-6">token</mat-icon>
                  </div>
                  <div>
                    <h3 class="text-base font-bold text-white">
                      Blok #{{ certService.currentCertificate().blockchainProof.blockNumber }}
                    </h3>
                    <p class="text-xs text-slate-400">
                      Jaringan: {{ certService.currentCertificate().blockchainProof.network }}
                    </p>
                  </div>
                </div>
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                  <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                  FINALIZED &amp; CONFIRMED
                </span>
              </div>

              <!-- Technical Fields -->
              <div class="space-y-4 text-xs font-code">
                
                <!-- Block Hash -->
                <div class="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                  <div class="flex items-center justify-between mb-1">
                    <span class="text-slate-400 uppercase font-sans text-[11px] font-bold flex items-center gap-1.5">
                      <mat-icon class="!text-sm !w-4 !h-4 text-amber-400">fingerprint</mat-icon>
                      Current Block Hash
                    </span>
                    <button
                      (click)="certService.copyToClipboard(certService.currentCertificate().blockchainProof.blockHash, 'Block Hash')"
                      class="text-blue-400 hover:text-blue-300 text-[11px] font-sans flex items-center gap-1 cursor-pointer"
                    >
                      <mat-icon class="!text-xs !w-3.5 !h-3.5">content_copy</mat-icon>
                      Salin
                    </button>
                  </div>
                  <div class="text-amber-300 break-all select-all font-mono leading-relaxed">
                    {{ certService.currentCertificate().blockchainProof.blockHash }}
                  </div>
                </div>

                <!-- Previous Hash -->
                <div class="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                  <div class="flex items-center justify-between mb-1">
                    <span class="text-slate-400 uppercase font-sans text-[11px] font-bold flex items-center gap-1.5">
                      <mat-icon class="!text-sm !w-4 !h-4 text-slate-400">link</mat-icon>
                      Previous Block Hash (Parent)
                    </span>
                    <button
                      (click)="certService.copyToClipboard(certService.currentCertificate().blockchainProof.previousBlockHash, 'Previous Hash')"
                      class="text-blue-400 hover:text-blue-300 text-[11px] font-sans flex items-center gap-1 cursor-pointer"
                    >
                      <mat-icon class="!text-xs !w-3.5 !h-3.5">content_copy</mat-icon>
                      Salin
                    </button>
                  </div>
                  <div class="text-slate-300 break-all select-all font-mono">
                    {{ certService.currentCertificate().blockchainProof.previousBlockHash }}
                  </div>
                </div>

                <!-- Merkle Root -->
                <div class="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                  <div class="flex items-center justify-between mb-1">
                    <span class="text-slate-400 uppercase font-sans text-[11px] font-bold flex items-center gap-1.5">
                      <mat-icon class="!text-sm !w-4 !h-4 text-emerald-400">account_tree</mat-icon>
                      Merkle Root Tree
                    </span>
                    <button
                      (click)="certService.copyToClipboard(certService.currentCertificate().blockchainProof.merkleRoot, 'Merkle Root')"
                      class="text-blue-400 hover:text-blue-300 text-[11px] font-sans flex items-center gap-1 cursor-pointer"
                    >
                      <mat-icon class="!text-xs !w-3.5 !h-3.5">content_copy</mat-icon>
                      Salin
                    </button>
                  </div>
                  <div class="text-emerald-400 break-all select-all font-mono">
                    {{ certService.currentCertificate().blockchainProof.merkleRoot }}
                  </div>
                </div>

                <!-- Smart Contract & Transaction Hash -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div class="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                    <span class="text-slate-400 uppercase font-sans text-[11px] font-bold block mb-1">Smart Contract</span>
                    <span class="text-sky-300 break-all font-mono">
                      {{ certService.currentCertificate().blockchainProof.smartContractAddress }}
                    </span>
                  </div>

                  <div class="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                    <span class="text-slate-400 uppercase font-sans text-[11px] font-bold block mb-1">Transaction Hash (TxID)</span>
                    <span class="text-sky-300 break-all font-mono truncate block">
                      {{ certService.currentCertificate().blockchainProof.transactionHash }}
                    </span>
                  </div>
                </div>

                <!-- Digital ECDSA / Keccak Signature -->
                <div class="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                  <span class="text-slate-400 uppercase font-sans text-[11px] font-bold block mb-1">
                    Cryptographic Signature (LKP Authority Seal)
                  </span>
                  <p class="text-slate-400 break-all text-[11px] font-mono leading-relaxed">
                    {{ certService.currentCertificate().blockchainProof.cryptographicSignature }}
                  </p>
                </div>

              </div>

            </div>

            <!-- Merkle Tree Visual Representation -->
            <div class="bg-slate-800/80 rounded-2xl border border-slate-700 p-6 shadow-xl backdrop-blur-xs">
              <h4 class="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <mat-icon class="!text-base !w-4 !h-4 text-emerald-400">account_tree</mat-icon>
                <span>Struktur Pohon Merkle (Cryptographic Merkle Proof)</span>
              </h4>

              <div class="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs font-code space-y-3">
                <div class="flex items-center gap-2 text-emerald-400 font-bold">
                  <span class="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-[10px]">ROOT</span>
                  <span class="truncate">Block Merkle Root [0x7b80...1920]</span>
                </div>
                <div class="pl-4 border-l-2 border-emerald-500/40 space-y-2">
                  <div class="flex items-center gap-2 text-sky-300">
                    <span class="px-2 py-0.5 rounded bg-sky-950 border border-sky-800 text-[10px]">BRANCH #1</span>
                    <span class="truncate">Node Hash LKP Registry [0x41a8...99e1]</span>
                  </div>
                  <div class="pl-4 border-l-2 border-sky-500/40 space-y-2">
                    <div class="flex items-center gap-2 text-amber-300 bg-amber-950/40 p-2 rounded border border-amber-800/50">
                      <span class="px-2 py-0.5 rounded bg-amber-900 text-amber-200 text-[10px] font-bold">LEAF</span>
                      <div class="truncate">
                        <span class="text-slate-400 block text-[10px]">Sertifikat Aktif (ID: {{ certService.currentCertificate().id }}):</span>
                        <span class="font-bold text-amber-200">{{ certService.currentCertificate().canonicalHash }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p class="text-xs text-slate-400 mt-3">
                Keaslian terbukti secara matematis: jika satu huruf saja pada nama siswa atau nilai diubah, nilai Leaf Hash akan berubah drastis, sehingga tidak akan pernah cocok dengan Merkle Root di dalam blok blockchain.
              </p>
            </div>

          </div>

          <!-- Column 3: Consensus Nodes & Security Guarantees -->
          <div class="space-y-6">
            
            <!-- Consensus Nodes Card -->
            <div class="bg-slate-800/80 rounded-2xl border border-slate-700 p-6 shadow-xl backdrop-blur-xs">
              <h3 class="text-base font-bold text-white mb-2 flex items-center gap-2">
                <mat-icon class="!text-lg !w-5 !h-5 text-emerald-400">dns</mat-icon>
                <span>Node Konsorsium Validasi</span>
              </h3>
              <p class="text-xs text-slate-400 mb-4">
                Sertifikat diverifikasi serentak oleh 4 entitas otoritas independen:
              </p>

              <div class="space-y-2.5">
                @for (node of certService.currentCertificate().blockchainProof.validatorNodes; track $index) {
                  <div class="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-start gap-2.5">
                    <mat-icon class="!text-base !w-4 !h-4 text-emerald-400 mt-0.5 shrink-0">check_circle</mat-icon>
                    <div>
                      <p class="text-xs font-semibold text-slate-200">{{ node }}</p>
                      <p class="text-[10px] text-emerald-400">Status: Sinkron & Validasi Sah</p>
                    </div>
                  </div>
                }
              </div>
            </div>

            <!-- Guarantee Features -->
            <div class="bg-gradient-to-br from-blue-950 to-slate-900 rounded-2xl border border-blue-800/50 p-6 shadow-xl">
              <h3 class="text-base font-bold text-white mb-4 flex items-center gap-2">
                <mat-icon class="!text-lg !w-5 !h-5 text-amber-400">security</mat-icon>
                <span>Jaminan Bebas Pemalsuan</span>
              </h3>

              <ul class="space-y-3 text-xs text-slate-300">
                <li class="flex items-start gap-2">
                  <mat-icon class="!text-sm !w-4 !h-4 text-amber-400 mt-0.5 shrink-0">verified</mat-icon>
                  <span><strong>Kekal (Immutable):</strong> Sekali tercatat, data sertifikat tidak dapat dihapus, diganti, atau direkayasa.</span>
                </li>
                <li class="flex items-start gap-2">
                  <mat-icon class="!text-sm !w-4 !h-4 text-amber-400 mt-0.5 shrink-0">verified</mat-icon>
                  <span><strong>Verifikasi Instan:</strong> Sekolah, universitas luar negeri, atau instansi kedinasan dapat memverifikasi dalam waktu kurang dari 1 detik.</span>
                </li>
                <li class="flex items-start gap-2">
                  <mat-icon class="!text-sm !w-4 !h-4 text-amber-400 mt-0.5 shrink-0">verified</mat-icon>
                  <span><strong>Diakui Secara Hukum:</strong> Memenuhi standar tanda tangan elektronik dan sertifikasi digital terpercaya UU ITE.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </section>
  `,
})
export class BlockchainExplorerComponent {
  certService = inject(CertificateService);
}
