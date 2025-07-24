import { Router } from "express";
import { checkAuthentication } from "../../middleware/checkAuth";
import { ROLE } from "../user/interface.user";
import { DivisionController } from "./constroller.division";
import { validateRequest } from "../../middleware/validateRequest";
import {
  createDivisionSchema,
  updateDivisionSchema,
} from "./validation.division";

export const divisionRouter = Router();

divisionRouter.post(
  "/create",
  checkAuthentication(ROLE.ADMIN, ROLE.SUPER_ADMIN),
  validateRequest(createDivisionSchema),
  DivisionController.createDivision
);
divisionRouter.get("/", DivisionController.getAllDivisions);
divisionRouter.get("/:slug", DivisionController.getSingleDivision);
divisionRouter.patch(
  "/:id",
  checkAuthentication(ROLE.ADMIN, ROLE.SUPER_ADMIN),
  validateRequest(updateDivisionSchema),
  DivisionController.updateDivision
);
divisionRouter.delete(
  "/:id",
  checkAuthentication(ROLE.ADMIN, ROLE.SUPER_ADMIN),
  DivisionController.deleteDivision
);
