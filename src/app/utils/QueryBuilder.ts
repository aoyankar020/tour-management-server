import { Query } from "mongoose";
import { excludeField } from "../global.constant";
import th from "zod/v4/locales/th.cjs";

export class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public readonly query: Record<string, string>;
  constructor(modelQuery: Query<T[], T>, query: Record<string, string>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  filter(): any {
    const filter = { ...this.query };
    for (const item of excludeField) {
      delete filter[item];
    }
    this.modelQuery = this.modelQuery.find(filter);
    return this;
  }
  search(searchableField: string[]): this {
    const search = this.query.search || "";
    const searchQury = {
      $or: searchableField.map((field) => ({
        [field]: { $regex: search, $options: "i" },
      })),
    };
    this.modelQuery = this.modelQuery.find(searchQury);
    return this;
  }
  sort(): this {
    const sort = this.query.sort || "-createdAt";
    this.modelQuery = this.modelQuery.sort(sort);
    return this;
  }
  fields(): this {
    const field = this.query.fields?.split(",").join(" ") || "";
    this.modelQuery = this.modelQuery.sort(field);
    return this;
  }
  pagination(): this {
    const page = Number(this.query.page) || 1;
    const limit = Number(this.query.limit) || 10;
    const skip = (page - 1) * limit;
    const fields = this.query.fields?.split(",").join(" ") || "";
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }
  async getMeta() {
    const totalDocuments = await this.modelQuery.model.countDocuments();
    const page = Number(this.query.page) || 1;
    const limit = Number(this.query.limit) || 10;
    const totalPAge = Math.ceil(totalDocuments / limit);
    return {
      totalDocuments,
      page,
      totalPAge,
      limit,
    };
  }
  build() {
    return this.modelQuery;
  }
}
