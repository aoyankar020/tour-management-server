import { Request, Response } from "express";
import { handler } from "../../utils/asyncUtils";
import { sendResponse } from "../../utils/responseUtil";
import { TourService } from "./service.tour";

const createTour = handler.handleAsynce(async (req: Request, res: Response) => {
  const result = await TourService.createTour(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Tour created successfully",
    data: result,
  });
});

const getAllTours = handler.handleAsynce(
  async (req: Request, res: Response) => {
    const query = req.query;

    const result = await TourService.getAllTours(
      query as Record<string, string>
    );
    // query as Record<string, string>
    sendResponse(res, {
      // meta: result.meta,
      statusCode: 200,
      success: true,
      message: "Tours retrieved successfully",
      data: result,
    });
  }
);

const updateTour = handler.handleAsynce(async (req: Request, res: Response) => {
  const result = await TourService.updateTour(req.params.id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Tour updated successfully",
    data: result,
  });
});

const deleteTour = handler.handleAsynce(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await TourService.deleteTour(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Tour deleted successfully",
    data: result,
  });
});
const getAllTourTypes = handler.handleAsynce(
  async (req: Request, res: Response) => {
    const result = await TourService.getAllTourTypes();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Tour types retrieved successfully",
      data: result,
    });
  }
);

const createTourType = handler.handleAsynce(
  async (req: Request, res: Response) => {
    const data = req.body;

    const result = await TourService.createTourType(data);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Tour type created successfully",
      data: result,
    });
  }
);

const updateTourType = handler.handleAsynce(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;
    const result = await TourService.updateTourType(id, name);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Tour type updated successfully",
      data: result,
    });
  }
);
const deleteTourType = handler.handleAsynce(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await TourService.deleteTourType(id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Tour type deleted successfully",
      data: result,
    });
  }
);

export const TourController = {
  createTour,
  createTourType,
  getAllTourTypes,
  deleteTourType,
  updateTourType,
  getAllTours,
  updateTour,
  deleteTour,
};
