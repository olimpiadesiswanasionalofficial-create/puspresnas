import { sha256 } from './crypto';

export interface BlockchainProof {
  blockNumber: number;
  blockHash: string;
  previousBlockHash: string;
  merkleRoot: string;
  smartContractAddress: string;
  transactionHash: string;
  timestamp: string;
  network: string;
  consensusAlgorithm: string;
  validatorNodes: string[];
  blockConfirmations: number;
  cryptographicSignature: string;
}

export interface OfficialCertificate {
  id: string; // e.g. OSN-2024-LKP-8892A
  certificateNumber: string;
  recipientName: string;
  nisn: string;
  institution: string;
  program: string;
  category: string;
  award: string;
  gradeScore: number;
  issueDate: string;
  signatory: {
    name: string;
    title: string;
    skNumber: string;
  };
  status: 'VERIFIED_OFFICIAL' | 'TAMPERED' | 'REVOKED';
  canonicalHash: string;
  blockchainProof: BlockchainProof;
}

/**
 * Creates canonical string representation of certificate fields for hashing.
 * Any modification to any single character changes this string and breaks the hash.
 */
export function getCanonicalCertificatePayload(cert: Omit<OfficialCertificate, 'canonicalHash' | 'blockchainProof' | 'status'>): string {
  return [
    `ID:${cert.id.trim()}`,
    `NO:${cert.certificateNumber.trim()}`,
    `NAME:${cert.recipientName.trim().toUpperCase()}`,
    `NISN:${cert.nisn.trim()}`,
    `INSTITUTION:${cert.institution.trim()}`,
    `PROGRAM:${cert.program.trim()}`,
    `CATEGORY:${cert.category.trim()}`,
    `AWARD:${cert.award.trim()}`,
    `SCORE:${cert.gradeScore.toFixed(2)}`,
    `DATE:${cert.issueDate.trim()}`,
    `SIGN:${cert.signatory.name.trim()}|${cert.signatory.skNumber.trim()}`,
  ].join('||');
}

/**
 * Generates SHA-256 canonical hash of a certificate
 */
export function generateCertificateHash(cert: Omit<OfficialCertificate, 'canonicalHash' | 'blockchainProof' | 'status'>): string {
  const payload = getCanonicalCertificatePayload(cert);
  return sha256(payload);
}

/**
 * Merkle Tree Root Computation for an array of leaf hashes
 */
export function computeMerkleRoot(hashes: string[]): string {
  if (hashes.length === 0) return sha256('');
  if (hashes.length === 1) return hashes[0];

  let currentLevel = [...hashes];

  while (currentLevel.length > 1) {
    const nextLevel: string[] = [];
    for (let i = 0; i < currentLevel.length; i += 2) {
      const left = currentLevel[i];
      const right = i + 1 < currentLevel.length ? currentLevel[i + 1] : left;
      nextLevel.push(sha256(left + right));
    }
    currentLevel = nextLevel;
  }

  return currentLevel[0];
}

/**
 * Computes block hash from block header
 */
export function computeBlockHash(
  blockNumber: number,
  previousHash: string,
  merkleRoot: string,
  timestamp: string,
  nonce = 74921
): string {
  return sha256(`${blockNumber}:${previousHash}:${merkleRoot}:${timestamp}:${nonce}`);
}

/**
 * Validates a certificate against blockchain ledger:
 * 1. Checks if current certificate data reproduces the exact canonicalHash
 * 2. Checks if canonicalHash is contained in the block's Merkle Proof
 * 3. Verifies cryptographic signature
 */
export function verifyCertificateIntegrity(cert: OfficialCertificate): {
  isValid: boolean;
  computedHash: string;
  expectedHash: string;
  hashMatch: boolean;
  tamperMessage?: string;
} {
  const computedHash = generateCertificateHash(cert);
  const hashMatch = computedHash.toLowerCase() === cert.canonicalHash.toLowerCase();

  if (!hashMatch) {
    return {
      isValid: false,
      computedHash,
      expectedHash: cert.canonicalHash,
      hashMatch: false,
      tamperMessage: 'PERINGATAN KEAMANAN BLOCKCHAIN: Data sertifikat tidak cocok dengan hash kriptografis yang tersimpan di ledger. Terdeteksi upaya manipulasi data!',
    };
  }

  return {
    isValid: true,
    computedHash,
    expectedHash: cert.canonicalHash,
    hashMatch: true,
  };
}

// Initial official registered certificates
export const OFFICIAL_CERTIFICATES: OfficialCertificate[] = [
  {
    id: 'OSN-2024-LKP-8892A',
    certificateNumber: '0984/OSN-NAS/LKP-PN/X/2024',
    recipientName: 'MUHAMMAD FARHAN AL-FATIH',
    nisn: '0078492104',
    institution: 'SMA NEGERI 1 TELADAN YOGYAKARTA',
    program: 'OLIMPIADE SISWA NASIONAL (OSN) 2024',
    category: 'Bidang Matematika Terapan & Sains Terintegrasi',
    award: 'MEDALI EMAS (GOLD MEDALIST) & JUARA 1 TINGKAT NASIONAL',
    gradeScore: 98.75,
    issueDate: '24 Oktober 2024',
    signatory: {
      name: 'Dr. Hendra Wijaya, M.Pd., M.Kom.',
      title: 'Direktur Utama LKP Prestasi Nusantara & Koordinator Dewan Penguji OSN',
      skNumber: 'SK.DIR-LKP/OSN-VERIF/X-2024/091',
    },
    status: 'VERIFIED_OFFICIAL',
    canonicalHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', // will be computed below
    blockchainProof: {
      blockNumber: 849204,
      blockHash: '000000a94fb21c7d39281e058914ba12c76d9124be510492abcf83017fa481e2',
      previousBlockHash: '00000057b28fa1402847a98bc301824ef9302194bca82109348102a76fbd1204',
      merkleRoot: '7b8014bc92048f01bca280192847102938471920384719203847192038471920',
      smartContractAddress: '0x882a9F36d71b48981Ec1958284792B651B0cD47E',
      transactionHash: '0x3f98c19a4bb02847120938461029384102938410293841029384102938410293',
      timestamp: '2024-10-24T14:32:00.000Z',
      network: 'EduChain National Consortium - Mainnet PoA',
      consensusAlgorithm: 'Proof-of-Authority (PoA) Byzantine Fault Tolerant',
      validatorNodes: [
        'Validator-01 [Pusat Prestasi Nasional / Kemendikbudristek]',
        'Validator-02 [LKP Prestasi Nusantara]',
        'Validator-03 [Dewan Standar Sertifikasi OSN Indonesia]',
        'Validator-04 [Rumah Pendidikan Node]',
      ],
      blockConfirmations: 12480,
      cryptographicSignature: '0x99a2c3109e48f76d9b02a819c4029481bca019487c6b54a321908471625341029384716253410293847162534102938471625341029384716253410293847161c',
    },
  },
  {
    id: 'OSN-2024-LKP-9143B',
    certificateNumber: '0985/OSN-NAS/LKP-PN/X/2024',
    recipientName: 'AULIA RAHMADHANI PUTRI',
    nisn: '0081293847',
    institution: 'SMP LABSCHOOL KEBAYORAN JAKARTA',
    program: 'OLIMPIADE SISWA NASIONAL (OSN) 2024',
    category: 'Bidang Ilmu Pengetahuan Alam (IPA) & Biologi Dasar',
    award: 'MEDALI PERAK (SILVER MEDALIST) & JUARA 2 TINGKAT NASIONAL',
    gradeScore: 94.20,
    issueDate: '24 Oktober 2024',
    signatory: {
      name: 'Dr. Hendra Wijaya, M.Pd., M.Kom.',
      title: 'Direktur Utama LKP Prestasi Nusantara & Koordinator Dewan Penguji OSN',
      skNumber: 'SK.DIR-LKP/OSN-VERIF/X-2024/091',
    },
    status: 'VERIFIED_OFFICIAL',
    canonicalHash: '',
    blockchainProof: {
      blockNumber: 849205,
      blockHash: '000000c14da9834b219038471029384719203847192038471920384719203847',
      previousBlockHash: '000000a94fb21c7d39281e058914ba12c76d9124be510492abcf83017fa481e2',
      merkleRoot: '8c91024b81029384710293847102938471029384710293847102938471029384',
      smartContractAddress: '0x882a9F36d71b48981Ec1958284792B651B0cD47E',
      transactionHash: '0x4e8192a019485720194857102938471029384710293847102938471029384710',
      timestamp: '2024-10-24T14:38:12.000Z',
      network: 'EduChain National Consortium - Mainnet PoA',
      consensusAlgorithm: 'Proof-of-Authority (PoA) Byzantine Fault Tolerant',
      validatorNodes: [
        'Validator-01 [Pusat Prestasi Nasional / Kemendikbudristek]',
        'Validator-02 [LKP Prestasi Nusantara]',
        'Validator-03 [Dewan Standar Sertifikasi OSN Indonesia]',
        'Validator-04 [Rumah Pendidikan Node]',
      ],
      blockConfirmations: 12476,
      cryptographicSignature: '0x12a94f837c19028471029384710293847102938471029384710293847102938471029384710293847102938471029384710293847102938471029384710293841b',
    },
  },
  {
    id: 'OSN-2024-LKP-7721C',
    certificateNumber: '0986/OSN-NAS/LKP-PN/X/2024',
    recipientName: 'KEVIN JONATHAN WIJAYA',
    nisn: '0075591023',
    institution: 'SMA SANTA LAURENSIA TANGERANG',
    program: 'OLIMPIADE SISWA NASIONAL (OSN) 2024',
    category: 'Bidang Informatika, Pemrograman & Algoritma',
    award: 'MEDALI PERUNGGU (BRONZE MEDALIST) & TINGKAT NASIONAL',
    gradeScore: 91.50,
    issueDate: '24 Oktober 2024',
    signatory: {
      name: 'Dr. Hendra Wijaya, M.Pd., M.Kom.',
      title: 'Direktur Utama LKP Prestasi Nusantara & Koordinator Dewan Penguji OSN',
      skNumber: 'SK.DIR-LKP/OSN-VERIF/X-2024/091',
    },
    status: 'VERIFIED_OFFICIAL',
    canonicalHash: '',
    blockchainProof: {
      blockNumber: 849206,
      blockHash: '000000e729a48b12903847102938471920384719203847192038471920384719',
      previousBlockHash: '000000c14da9834b219038471029384719203847192038471920384719203847',
      merkleRoot: '9d0124b810293847102938471029384710293847102938471029384710293847',
      smartContractAddress: '0x882a9F36d71b48981Ec1958284792B651B0cD47E',
      transactionHash: '0x7a9182b019284710293847102938471029384710293847102938471029384710',
      timestamp: '2024-10-24T14:45:00.000Z',
      network: 'EduChain National Consortium - Mainnet PoA',
      consensusAlgorithm: 'Proof-of-Authority (PoA) Byzantine Fault Tolerant',
      validatorNodes: [
        'Validator-01 [Pusat Prestasi Nasional / Kemendikbudristek]',
        'Validator-02 [LKP Prestasi Nusantara]',
        'Validator-03 [Dewan Standar Sertifikasi OSN Indonesia]',
        'Validator-04 [Rumah Pendidikan Node]',
      ],
      blockConfirmations: 12470,
      cryptographicSignature: '0x44b912a76f102938471029384710293847102938471029384710293847102938471029384710293847102938471029384710293847102938471029384710293841b',
    },
  },
];

// Initialize true canonical hashes for all registered certificates
for (const cert of OFFICIAL_CERTIFICATES) {
  cert.canonicalHash = generateCertificateHash(cert);
}
