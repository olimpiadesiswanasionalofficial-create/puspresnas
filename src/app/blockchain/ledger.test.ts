import test from 'node:test';
import assert from 'node:assert/strict';
import { sha256 } from './crypto';
import {
  verifyCertificateIntegrity,
  computeMerkleRoot,
  OFFICIAL_CERTIFICATES,
} from './ledger';

test('sha256 matches known NIST test vector', () => {
  // Empty string SHA-256
  assert.equal(
    sha256(''),
    'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
  );

  // "abc" NIST vector
  assert.equal(
    sha256('abc'),
    'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'
  );
});

test('official certificates are verified and valid against blockchain canonical hash', () => {
  const cert = OFFICIAL_CERTIFICATES[0];
  const result = verifyCertificateIntegrity(cert);

  assert.equal(result.isValid, true);
  assert.equal(result.hashMatch, true);
  assert.equal(result.computedHash, cert.canonicalHash);
});

test('blockchain tamper detection triggers when certificate data is modified', () => {
  const originalCert = OFFICIAL_CERTIFICATES[0];
  
  // Tampered clone: someone altered the name
  const tamperedCert = {
    ...originalCert,
    recipientName: 'BUDI SANTOSO PALSU',
  };

  const result = verifyCertificateIntegrity(tamperedCert);

  assert.equal(result.isValid, false);
  assert.equal(result.hashMatch, false);
  assert.notEqual(result.computedHash, originalCert.canonicalHash);
  assert.ok(result.tamperMessage?.includes('PERINGATAN KEAMANAN BLOCKCHAIN'));
});

test('blockchain tamper detection triggers when score is altered', () => {
  const originalCert = OFFICIAL_CERTIFICATES[0];
  
  // Tampered clone: someone boosted their score from 98.75 to 100.00
  const tamperedScoreCert = {
    ...originalCert,
    gradeScore: 100.0,
  };

  const result = verifyCertificateIntegrity(tamperedScoreCert);

  assert.equal(result.isValid, false);
  assert.equal(result.hashMatch, false);
});

test('Merkle root computation yields deterministic root hash', () => {
  const hashes = [
    sha256('leaf1'),
    sha256('leaf2'),
    sha256('leaf3'),
    sha256('leaf4'),
  ];
  const root = computeMerkleRoot(hashes);
  assert.equal(typeof root, 'string');
  assert.equal(root.length, 64);

  // Same inputs must yield exact same root
  const rootRepeat = computeMerkleRoot([...hashes]);
  assert.equal(root, rootRepeat);
});
