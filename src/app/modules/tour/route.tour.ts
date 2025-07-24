import express from "express";
import { checkAuthentication } from "../../middleware/checkAuth";
import { ROLE } from "../user/interface.user";
import { validateRequest } from "../../middleware/validateRequest";
import { TourController } from "./controller.tour";
import {
  createTourTypeZodSchema,
  createTourZodSchema,
  updateTourZodSchema,
} from "./validation.tour";

const router = express.Router();

/* ------------------ TOUR TYPE ROUTES -------------------- */
router.get("/tour-types", TourController.getAllTourTypes);

router.post(
  "/create-tour-type",
  // checkAuthentication(ROLE.ADMIN, ROLE.SUPER_ADMIN),
  validateRequest(createTourTypeZodSchema),
  TourController.createTourType
);

router.patch(
  "/tour-types/:id",
  checkAuthentication(ROLE.ADMIN, ROLE.SUPER_ADMIN),
  validateRequest(createTourTypeZodSchema),
  TourController.updateTourType
);

router.delete(
  "/tour-types/:id",
  checkAuthentication(ROLE.ADMIN, ROLE.SUPER_ADMIN),
  TourController.deleteTourType
);

/* --------------------- TOUR ROUTES ---------------------- */
// router.get("/", TourController.getAllTours);

router.post(
  "/create",
  checkAuthentication(ROLE.ADMIN, ROLE.SUPER_ADMIN),
  validateRequest(createTourZodSchema),
  TourController.createTour
);

router.patch(
  "/:id",
  checkAuthentication(ROLE.ADMIN, ROLE.SUPER_ADMIN),
  validateRequest(updateTourZodSchema),
  TourController.updateTour
);

router.delete(
  "/:id",
  checkAuthentication(ROLE.ADMIN, ROLE.SUPER_ADMIN),
  TourController.deleteTour
);
router.get(
  "/",

  TourController.getAllTours
);

export const TourRoutes = router;
