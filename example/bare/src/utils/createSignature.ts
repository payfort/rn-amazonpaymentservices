// @ts-ignore
import sha256 from 'crypto-js/sha256';

const createSignature = (requestObject: any, requestShaPhrase: string) => {
  let signatureString = requestShaPhrase;

  Object.keys(requestObject)
    .sort()
    .forEach((v) => {
      signatureString += v;
      signatureString += '=';
      signatureString += requestObject[v];
    });

  signatureString += requestShaPhrase;

  return sha256(signatureString).toString();
};

export default createSignature;
