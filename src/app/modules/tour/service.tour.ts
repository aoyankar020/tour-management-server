import { Query } from "mongoose";
import { excludeField } from "../../global.constant";
import { serchFields } from "./constant.tour";
import { ITour, ITourType } from "./interface.tour";
import { Tour, TourType } from "./model.tour";
import { any } from "zod";
import { QueryBuilder } from "../../utils/QueryBuilder";

const createTour = async (payload: ITour) => {
  const existingTour = await Tour.findOne({ title: payload.title });
  if (existingTour) {
    throw new Error("A tour with this title already exists.");
  }

  const tour = await Tour.create(payload);

  return tour;
};

const getAllTours = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Tour.find(), query);
  const tours = await queryBuilder
    .search(serchFields)
    .filter()
    .sort()
    // .fields()
    .pagination();

  const [data, meta] = await Promise.all([
    tours.build(),
    queryBuilder.getMeta(),
  ]);

  return {
    data,
    meta,
  };
  //   const queryBuilder = new QueryBuilder(Tour.find(), query);
};
// const getAllTours = async (query: Record<string, string>) => {
//   const filter = query;
//   const search = query.search || "";
//   const sort = query.sort || "-createdAt";
//   const field = query.fields?.split(",").join(" ") || "";
//   const page = Number(query.page) || 1;

//   const limit = Number(query.limit) || 10;
//   const skip = (page - 1) * limit;
//   console.log(filter);
//   const searchQuryFilter = {
//     $or: serchFields.map((field) => ({
//       [field]: { $regex: search, $options: "i" },
//     })),
//   };

//   for (const item of excludeField) {
//     delete filter[item];
//   }
//   const allTours = await Tour.find(searchQuryFilter)
//     .find(filter)
//     .sort(sort)
//     .select(field)
//     .limit(limit)
//     .skip(skip);
//   const total = await Tour.countDocuments();
//   const meta = {
//     pageNumber: page,
//     totalPage: Math.ceil(total / limit),
//     limit: limit,
//   };
//   return {
//     data: allTours,
//     meta: meta,
//   };
//   //   const queryBuilder = new QueryBuilder(Tour.find(), query);
// };

const updateTour = async (id: string, payload: Partial<ITour>) => {
  const existingTour = await Tour.findById(id);

  if (!existingTour) {
    throw new Error("Tour not found.");
  }

  // if (payload.title) {
  //     const baseSlug = payload.title.toLowerCase().split(" ").join("-")
  //     let slug = `${baseSlug}`

  //     let counter = 0;
  //     while (await Tour.exists({ slug })) {
  //         slug = `${slug}-${counter++}` // dhaka-division-2
  //     }

  //     payload.slug = slug
  // }

  const updatedTour = await Tour.findByIdAndUpdate(id, payload, { new: true });

  return updatedTour;
};

const deleteTour = async (id: string) => {
  return await Tour.findByIdAndDelete(id);
};

const createTourType = async (payload: ITourType) => {
  const existingTourType = await TourType.findOne({ name: payload.name });
  console.log("Existing Tour type:", existingTourType);

  if (existingTourType) {
    throw new Error("Tour type already exists.");
  }
  const { name } = payload;
  return await TourType.create({ name: name });
};
const getAllTourTypes = async () => {
  return await TourType.find();
};
const updateTourType = async (id: string, payload: ITourType) => {
  const existingTourType = await TourType.findById(id);
  if (!existingTourType) {
    throw new Error("Tour type not found.");
  }

  const updatedTourType = await TourType.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return updatedTourType;
};
const deleteTourType = async (id: string) => {
  const existingTourType = await TourType.findById(id);
  if (!existingTourType) {
    throw new Error("Tour type not found.");
  }

  return await TourType.findByIdAndDelete(id);
};

export const TourService = {
  createTour,
  createTourType,
  deleteTourType,
  updateTourType,
  getAllTourTypes,
  getAllTours,
  updateTour,
  deleteTour,
};
