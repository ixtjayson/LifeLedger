import { UserData } from '../types';
import { INITIAL_USER_DATA } from '../constants';

// This file simulates a backend authentication service using localStorage as a mock database.

const DB_KEY = 'lifeLedger_usersDB';

// Simulate a User model from a database
interface StoredUser extends UserData {
  passwordHash: string; // In a real app, never store plain text passwords
}

const getDb = (): StoredUser[] => {
  try {
    const db = localStorage.getItem(DB_KEY);
    return db ? JSON.parse(db) : [];
  } catch (error) {
    return [];
  }
};

const saveDb = (db: StoredUser[]) => {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
};

// Simple mock hashing function. In a real app, use bcrypt.
const mockHash = (password: string) => `hashed_${password}`;
const mockCompare = (password: string, hash: string) => mockHash(password) === hash;


export const signup = (name: string, email: string, password: string): Promise<UserData> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const db = getDb();
      const existingUser = db.find(user => user.email.toLowerCase() === email.toLowerCase());

      if (existingUser) {
        return reject(new Error('An account with this email already exists.'));
      }
      
      if (password.length < 6) {
        return reject(new Error('Password must be at least 6 characters long.'));
      }

      const newUser: StoredUser = {
        user_id: new Date().getTime().toString(),
        name,
        email,
        avatarUrl: `https://api.dicebear.com/8.x/bottts-neutral/svg?seed=${name}`, // Generate a unique avatar
        passwordHash: mockHash(password),
        ...INITIAL_USER_DATA,
      };

      db.push(newUser);
      saveDb(db);

      const { passwordHash, ...userDataToReturn } = newUser;
      resolve(userDataToReturn);
    }, 500); // Simulate network delay
  });
};

export const login = (email: string, password: string): Promise<UserData> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const db = getDb();
      const user = db.find(u => u.email.toLowerCase() === email.toLowerCase());

      if (!user || !mockCompare(password, user.passwordHash)) {
        return reject(new Error('Invalid email or password.'));
      }

      const { passwordHash, ...userDataToReturn } = user;
      resolve(userDataToReturn);
    }, 500); // Simulate network delay
  });
};
