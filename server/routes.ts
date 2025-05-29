import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertGameProfileSchema, insertDiscoverySchema, insertSessionSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get or create anonymous game profile
  app.get("/api/game/profile", async (req, res) => {
    try {
      // For MVP, we'll create a default anonymous profile
      let profile = await storage.getGameProfile(1);
      
      if (!profile) {
        profile = await storage.createGameProfile({
          userId: null,
          level: 1,
          totalScore: 0,
          totalDiscoveries: 0,
          flowStreak: 0,
          discoveredSymbols: [],
          sessionData: {}
        });
      }
      
      res.json(profile);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Update game profile
  app.patch("/api/game/profile/:id", async (req, res) => {
    try {
      const profileId = parseInt(req.params.id);
      const updateData = req.body;
      
      const profile = await storage.updateGameProfile(profileId, updateData);
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      
      res.json(profile);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Create new discovery
  app.post("/api/game/discovery", async (req, res) => {
    try {
      const validatedData = insertDiscoverySchema.parse(req.body);
      const discovery = await storage.createDiscovery(validatedData);
      
      // Update profile stats
      const profile = await storage.getGameProfile(validatedData.profileId!);
      if (profile) {
        const discoveredSymbols = Array.isArray(profile.discoveredSymbols) 
          ? profile.discoveredSymbols 
          : [];
        
        if (!discoveredSymbols.includes(discovery.symbolResult)) {
          discoveredSymbols.push(discovery.symbolResult);
        }
        
        await storage.updateGameProfile(validatedData.profileId!, {
          totalScore: profile.totalScore + discovery.points,
          totalDiscoveries: profile.totalDiscoveries + 1,
          discoveredSymbols,
          flowStreak: profile.flowStreak + 1,
        });
      }
      
      res.json(discovery);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Get recent discoveries (default profile)
  app.get("/api/game/discoveries", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      
      // Use default profile ID 1 for anonymous play
      const discoveries = await storage.getDiscoveriesByProfile(1, limit);
      res.json(discoveries);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Get recent discoveries by profile ID
  app.get("/api/game/discoveries/:profileId", async (req, res) => {
    try {
      const profileId = parseInt(req.params.profileId);
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      
      const discoveries = await storage.getDiscoveriesByProfile(profileId, limit);
      res.json(discoveries);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Start new session
  app.post("/api/game/session", async (req, res) => {
    try {
      const validatedData = insertSessionSchema.parse(req.body);
      const session = await storage.createSession(validatedData);
      res.json(session);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Update session
  app.patch("/api/game/session/:id", async (req, res) => {
    try {
      const sessionId = parseInt(req.params.id);
      const updateData = req.body;
      
      const session = await storage.updateSession(sessionId, updateData);
      if (!session) {
        return res.status(404).json({ message: "Session not found" });
      }
      
      res.json(session);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
