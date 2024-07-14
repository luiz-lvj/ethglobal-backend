import crypto from 'crypto';
import { Request, Response } from 'express';

const algorithm = 'aes-256-gcm';
const salt = crypto.randomBytes(16);
const iterations = 100000;
const keylen = 32;
const digest = 'sha256';

function encryptData(data: string, password: string): { encryptedData: string, iv: string, authTag: string } {
    const key = crypto.pbkdf2Sync(password, salt, iterations, keylen, digest);
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv(algorithm, key, iv);

    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const authTag = cipher.getAuthTag().toString('hex');

    return {
        encryptedData: encrypted,
        iv: iv.toString('hex'),
        authTag: authTag
    };
}

function decryptData(encryptedData: string, iv: string, authTag: string, password: string): string {
    const key = crypto.pbkdf2Sync(password, salt, iterations, keylen, digest);
    const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(iv, 'hex'));
    decipher.setAuthTag(Buffer.from(authTag, 'hex'));

    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
}




export async function testEncrypt(req: Request, res: Response){
    try{

        // Usage example
        const password = 'myStrongPassword';
        const data = 'Hello, World!';
        const encrypted = encryptData(data, password);
        console.log("Encrypted Data:", encrypted);

        const decrypted = decryptData(encrypted.encryptedData, encrypted.iv, encrypted.authTag, password);
        console.log("Decrypted Data:", decrypted);

        return res.status(200).send("Success");



    } catch(err){
        console.error(err)
        return res.status(500).send("Internal Server Error")
    }
}