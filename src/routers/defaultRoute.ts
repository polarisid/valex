import { Router } from "express";
const defaultRouter = Router();
import {validationSchema} from "../Middlewares/validationSchema.js";
import * as card from "../controllers/cardController.js";
import cardSchema from "../schemas/cardSchema.js";
defaultRouter.get("/", (req, res) => {
    res.send("Hello from default route");});
defaultRouter.post("/card/create",validationSchema(cardSchema),card.createCard)

export default defaultRouter;



