import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {

    public modelQuery: Query<T[], T>;
    public query: Record<string, unknown>;

    constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {

        this.modelQuery = modelQuery;
        this.query = query
    }

    search(searchablefeild: string[]) {
        const searchinfo = this?.query?.searchinfo
        if (searchinfo) {
            this.modelQuery = this.modelQuery.find({
                $or: searchablefeild.map((feild) =>
                    ({

                        [feild]: { $regex: searchinfo, $options: 'i' }
                    }) as FilterQuery<T>)

            })
        }
        return this
    }

    filter() {

        const queryObject = { ...this?.query }
        const removeFeildfromQuery = ['searchinfo', 'sort', 'limit', 'page', 'skip', 'fields']
        removeFeildfromQuery.forEach((el) => delete queryObject[el])

        this.modelQuery = this.modelQuery.find(queryObject as FilterQuery<T>)

        return this
    }


    sort() {
        const sort = this?.query?.sort || 'createdAt'

        this.modelQuery = this.modelQuery.sort(sort as string)

        return this
    }


    paginate() {

        const limit = Number(this?.query?.limit) || 10;
        const page = Number(this?.query?.page) || 1;
        const skip = (page - 1) * limit

        this.modelQuery = this.modelQuery.skip(skip).limit(limit)
        return this
    }

    fields(): this {
        const fields = (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';

        this.modelQuery = this.modelQuery.select(fields);

        return this;
    }

async metaCount(){
const totalQuries= this.modelQuery.getFilter()
const total = await this.modelQuery.model.countDocuments(totalQuries)
const page  = Number(this?.query?.page) || 1;
const limit  = Number(this?.query?.limit) || 10;
const TotalPage = Math.ceil(total/limit)

return {
    total,page,limit,TotalPage
}

}



}


export default QueryBuilder