import crypto from 'crypto';

// Creates a mapped version of the common questions schema particular to the
export const questionSchemaToMongooseModel = (questions) => {
    const obj = {};
    questions.forEach(({ id, required, type }) => {
        obj[id] = {
            required, type,
        };
    });

    return obj;
};

export const parseError = (err) => {
    if (err.isJoi) return err.details[0];
    return JSON.stringify(err, Object.getOwnPropertyNames(err));
};

export const sessionizeUser = (user) => ({ userId: user.id, role: user.role, school: user.school });

const { ENCRYPTION_KEY } = process.env; // Must be 256 bits (32 characters)
const IV_LENGTH = 16; // For AES, this is always 16

export const encrypt = (text) => {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(text);

    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
};

export const decrypt = (text) => {
    const textParts = text.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let decrypted = decipher.update(encryptedText);

    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
};

export const isEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
