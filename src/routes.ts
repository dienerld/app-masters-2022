import { Router } from "express";
import { donationController } from "./controllers/donation.controller";

export const routes = Router();

routes.get("/", (req, res) => res.json({alive: true}));
routes.use("/donation", donationController);
