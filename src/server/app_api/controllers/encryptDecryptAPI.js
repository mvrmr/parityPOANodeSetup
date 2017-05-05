var labUtils = require('../../../tools/labutils');

import crypto2 from 'crypto2';

module.exports.testEncryptDecrypt = function (req, res) {
    var output = {};
    output.inputText = req.params.inputText;

    var key = "supersecretkey";
    var text = output.inputText; //"123|a123123123123123";
    console.log("Original Text: " + text);

    var encryptedText = labUtils.encrypt(key, text);
    console.log("Encrypted Text: " + encryptedText);
    var decryptedText = labUtils.decrypt(key, encryptedText);
    console.log("Decrypted Text: " + decryptedText);
    output.encryptedText1 = encryptedText;
    output.dncryptedText1 = decryptedText;
    console.log("\nAnd again...\n");

    console.log("Original Text: " + text);
    encryptedText = labUtils.encrypt(key, text);
    console.log("Encrypted Text: " + encryptedText);
    decryptedText = labUtils.decrypt(key, encryptedText);
    console.log("Decrypted Text: " + decryptedText);
    output.encryptedText2 = encryptedText;
    output.dncryptedText2 = decryptedText;

    text = "this is another text";
    key = "this is another key";

    console.log("\nNew text: & key: " + text);

    encryptedText = labUtils.encrypt(key, text);
    console.log("Encrypted Text: " + encryptedText);
    decryptedText = labUtils.decrypt(key, encryptedText);
    console.log("Decrypted Text: " + decryptedText);
    output.encryptedText3 = encryptedText;
    output.dncryptedText3 = decryptedText;
    output.doubleHashOfdncryptedText3 = labUtils.hashString(decryptedText, 4);

    console.log("output: " + JSON.stringify(output));

    encryptedText = labUtils.encrypt(key, JSON.stringify(output));
    console.log("Encrypted Text: " + encryptedText);
    decryptedText = labUtils.decrypt(key, encryptedText);
    console.log("Decrypted Text: " + decryptedText);
    output.encryptedText4 = encryptedText;
    output.dncryptedText4 = decryptedText;


    labUtils.sendJsonResponse(res, 200, output);
};

module.exports.testEncryptDecryptWithAssymtricKeys = function (req, res) {
    var output = {};
    crypto2.createKeyPair((err, privateKey, publicKey) => {
        if (!err) {
            console.log("privateKey, publicKey: " + privateKey + "\n" + publicKey);
            output.privateKey = privateKey;
            output.publicKey = publicKey;
            output.inputText = req.params.inputText;

            output.privateKeySSedUp = privateKey + "   ssed up";
            //privateKey = output.privateKeySSedUp;
            crypto2.encrypt.rsa(output.inputText, publicKey, (err, encrypted) => {
                if (!err) {
                    output.encrypted = encrypted;

                    crypto2.decrypt.rsa(encrypted, privateKey, (err, decrypted) => {
                        if (!err) {
                            output.decrypted = decrypted;
                        }
                        else {
                            console.log("error during decryption " + err);
                            output.err = "error during decryption " + err;
                        }
                    });
                }
                else {
                    console.log("error during encryption " + err);
                    output.err = "error during encryption " + err;
                }
            });


            labUtils.sendJsonResponse(res, 200, output);

        }
        else {
            console.log("error with Keypair generation: " + err);
            output.err = "error with Keypair generation: " + err;
            labUtils.sendJsonResponse(res, 400, err);
        }

    });
};