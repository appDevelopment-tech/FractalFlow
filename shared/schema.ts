import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const gameProfiles = pgTable("game_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  level: integer("level").notNull().default(1),
  totalScore: integer("total_score").notNull().default(0),
  totalDiscoveries: integer("total_discoveries").notNull().default(0),
  flowStreak: integer("flow_streak").notNull().default(0),
  discoveredSymbols: jsonb("discovered_symbols").notNull().default([]),
  sessionData: jsonb("session_data").notNull().default({}),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const discoveries = pgTable("discoveries", {
  id: serial("id").primaryKey(),
  profileId: integer("profile_id"),
  symbolResult: text("symbol_result").notNull(),
  combination: jsonb("combination").notNull(),
  points: integer("points").notNull(),
  discoveredAt: timestamp("discovered_at").defaultNow(),
});

export const sessions = pgTable("sessions", {
  id: serial("id").primaryKey(),
  profileId: integer("profile_id"),
  startTime: timestamp("start_time").defaultNow(),
  endTime: timestamp("end_time"),
  duration: integer("duration"), // in seconds
  discoveryCount: integer("discovery_count").notNull().default(0),
  finalScore: integer("final_score").notNull().default(0),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertGameProfileSchema = createInsertSchema(gameProfiles).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertDiscoverySchema = createInsertSchema(discoveries).omit({
  id: true,
  discoveredAt: true,
});

export const insertSessionSchema = createInsertSchema(sessions).omit({
  id: true,
  startTime: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertGameProfile = z.infer<typeof insertGameProfileSchema>;
export type GameProfile = typeof gameProfiles.$inferSelect;
export type InsertDiscovery = z.infer<typeof insertDiscoverySchema>;
export type Discovery = typeof discoveries.$inferSelect;
export type InsertSession = z.infer<typeof insertSessionSchema>;
export type Session = typeof sessions.$inferSelect;
