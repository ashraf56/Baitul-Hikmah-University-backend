import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {

    public modelsQuery: Query<T[], T>
    public query: Record<string, unknown>

    constructor(modelsQuery: Query<T[], T>, query: Record<string, unknown>) {

        this.modelsQuery = modelsQuery;
        this.query = query
    }

    search(searchablefeild: string[]) {
        const searchinfo = this?.query.searchinfo
        if (searchinfo) {
            this.modelsQuery = this.modelsQuery.find({
                $or: searchablefeild.map((feild) =>
                    ({

                        [feild]: { $regex: searchinfo, $options: 'i' }
                    }) as FilterQuery<T>)

            })
        }
        return this
    }

    filter() {

        const queryObject = { ...this.query }
        const removeFeildfromQuery = ['searchinfo', 'sort', 'limit', 'page', 'skip', 'fields']
        removeFeildfromQuery.forEach((el) => delete queryObject[el])

        this.modelsQuery = this.modelsQuery.find(queryObject as FilterQuery<T>)

        return this
    }


    sort() {
        const sort = this.query.sort || '-createdAt'

        this.modelsQuery = this.modelsQuery.sort(sort as string)

        return this
    }


    paginate() {

        const limit = Number(this?.query?.limit) || 10;
        const page = Number(this?.query?.page) || 1;
        const skip = (page - 1) * limit

        this.modelsQuery = this.modelsQuery.skip(skip).limit(limit)
    }

    fields() {
        const fields = (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';

        this.modelsQuery = this.modelsQuery.select(fields);
        return this;
    }




}


export default QueryBuilder