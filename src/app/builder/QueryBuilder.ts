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


}