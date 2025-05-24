import { users, gameProfiles, discoveries, sessions, type User, type InsertUser, type GameProfile, type InsertGameProfile, type Discovery, type InsertDiscovery, type Session, type InsertSession } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getGameProfile(id: number): Promise<GameProfile | undefined>;
  getGameProfileByUserId(userId: number): Promise<GameProfile | undefined>;
  createGameProfile(profile: InsertGameProfile): Promise<GameProfile>;
  updateGameProfile(id: number, profile: Partial<GameProfile>): Promise<GameProfile | undefined>;
  
  createDiscovery(discovery: InsertDiscovery): Promise<Discovery>;
  getDiscoveriesByProfile(profileId: number, limit?: number): Promise<Discovery[]>;
  
  createSession(session: InsertSession): Promise<Session>;
  updateSession(id: number, session: Partial<Session>): Promise<Session | undefined>;
  getSessionsByProfile(profileId: number): Promise<Session[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private gameProfiles: Map<number, GameProfile>;
  private discoveries: Map<number, Discovery>;
  private sessions: Map<number, Session>;
  private currentUserId: number;
  private currentProfileId: number;
  private currentDiscoveryId: number;
  private currentSessionId: number;

  constructor() {
    this.users = new Map();
    this.gameProfiles = new Map();
    this.discoveries = new Map();
    this.sessions = new Map();
    this.currentUserId = 1;
    this.currentProfileId = 1;
    this.currentDiscoveryId = 1;
    this.currentSessionId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getGameProfile(id: number): Promise<GameProfile | undefined> {
    return this.gameProfiles.get(id);
  }

  async getGameProfileByUserId(userId: number): Promise<GameProfile | undefined> {
    return Array.from(this.gameProfiles.values()).find(
      (profile) => profile.userId === userId,
    );
  }

  async createGameProfile(insertProfile: InsertGameProfile): Promise<GameProfile> {
    const id = this.currentProfileId++;
    const now = new Date();
    const profile: GameProfile = {
      ...insertProfile,
      id,
      createdAt: now,
      updatedAt: now,
    };
    this.gameProfiles.set(id, profile);
    return profile;
  }

  async updateGameProfile(id: number, updateData: Partial<GameProfile>): Promise<GameProfile | undefined> {
    const existing = this.gameProfiles.get(id);
    if (!existing) return undefined;

    const updated: GameProfile = {
      ...existing,
      ...updateData,
      updatedAt: new Date(),
    };
    this.gameProfiles.set(id, updated);
    return updated;
  }

  async createDiscovery(insertDiscovery: InsertDiscovery): Promise<Discovery> {
    const id = this.currentDiscoveryId++;
    const discovery: Discovery = {
      ...insertDiscovery,
      id,
      discoveredAt: new Date(),
    };
    this.discoveries.set(id, discovery);
    return discovery;
  }

  async getDiscoveriesByProfile(profileId: number, limit?: number): Promise<Discovery[]> {
    const profileDiscoveries = Array.from(this.discoveries.values())
      .filter((discovery) => discovery.profileId === profileId)
      .sort((a, b) => (b.discoveredAt?.getTime() || 0) - (a.discoveredAt?.getTime() || 0));
    
    return limit ? profileDiscoveries.slice(0, limit) : profileDiscoveries;
  }

  async createSession(insertSession: InsertSession): Promise<Session> {
    const id = this.currentSessionId++;
    const session: Session = {
      ...insertSession,
      id,
      startTime: new Date(),
    };
    this.sessions.set(id, session);
    return session;
  }

  async updateSession(id: number, updateData: Partial<Session>): Promise<Session | undefined> {
    const existing = this.sessions.get(id);
    if (!existing) return undefined;

    const updated: Session = {
      ...existing,
      ...updateData,
    };
    this.sessions.set(id, updated);
    return updated;
  }

  async getSessionsByProfile(profileId: number): Promise<Session[]> {
    return Array.from(this.sessions.values())
      .filter((session) => session.profileId === profileId)
      .sort((a, b) => (b.startTime?.getTime() || 0) - (a.startTime?.getTime() || 0));
  }
}

export const storage = new MemStorage();
