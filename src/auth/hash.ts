import argon2 from "argon2";

export async function hashPassword(password: string): Promise<string> {
    try {
        const hash = await argon2.hash(password);
        return hash;
    } catch (err) {
        throw new Error(`Failed to hash the password: ${err instanceof Error ? err.message : String(err)}`);
    }
};