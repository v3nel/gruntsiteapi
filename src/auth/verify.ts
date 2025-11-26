import argon2 from "argon2";

export async function verifyHash(hash: string, password: string): Promise<boolean> {
    try {
        const isValid = await argon2.verify(hash, password);
        return isValid
    } catch (err) {
        throw new Error("The hash verification failed")
    }
};