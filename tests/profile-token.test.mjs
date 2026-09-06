import test from 'node:test'
import assert from 'node:assert/strict'
import crypto from 'node:crypto'
import {encodeUid,decodeToken} from '../api/_token.js'
test('missing, short and public fallback secrets fail closed only on use',()=>{
 for(const secret of ['', 'short', 'dino-dominion-profile-fallback-key']) {
  process.env.PROFILE_TOKEN_SECRET=secret
  assert.throws(()=>encodeUid('test-character'),/profile_configuration_unavailable/)
  assert.throws(()=>decodeToken('x'),/profile_configuration_unavailable/)
 }
})
test('suitable existing secret keeps old deterministic links valid',()=>{
 process.env.PROFILE_TOKEN_SECRET='test-only-secret-at-least-thirty-two-characters'
 const key=crypto.createHash('sha256').update(process.env.PROFILE_TOKEN_SECRET).digest()
 const uid='test-character-g2',iv=crypto.createHmac('sha256',key).update(uid).digest().subarray(0,12)
 const cipher=crypto.createCipheriv('aes-256-gcm',key,iv)
 const body=Buffer.concat([cipher.update(uid),cipher.final()])
 const old=Buffer.concat([iv,cipher.getAuthTag(),body]).toString('base64url')
 assert.equal(encodeUid(uid),old)
 assert.equal(decodeToken(old),uid)
 const corrupt=Buffer.from(old,'base64url');corrupt[15]^=1
 assert.equal(decodeToken(corrupt.toString('base64url')),null)
})
