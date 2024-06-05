"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    constructor(modelsQuery, query) {
        this.modelsQuery = modelsQuery;
        this.query = query;
    }
    search(searchablefeild) {
        const searchinfo = this === null || this === void 0 ? void 0 : this.query.searchinfo;
        if (searchinfo) {
            this.modelsQuery = this.modelsQuery.find({
                $or: searchablefeild.map((feild) => ({
                    [feild]: { $regex: searchinfo, $options: 'i' }
                }))
            });
        }
        return this;
    }
    filter() {
        const queryObject = Object.assign({}, this.query);
        const removeFeildfromQuery = ['searchinfo', 'sort', 'limit', 'page', 'skip', 'fields'];
        removeFeildfromQuery.forEach((el) => delete queryObject[el]);
        this.modelsQuery = this.modelsQuery.find(queryObject);
        return this;
    }
    sort() {
        const sort = this.query.sort || '-createdAt';
        this.modelsQuery = this.modelsQuery.sort(sort);
        return this;
    }
    paginate() {
        var _a, _b;
        const limit = Number((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.limit) || 10;
        const page = Number((_b = this === null || this === void 0 ? void 0 : this.query) === null || _b === void 0 ? void 0 : _b.page) || 1;
        const skip = (page - 1) * limit;
        this.modelsQuery = this.modelsQuery.skip(skip).limit(limit);
    }
    fields() {
        var _a, _b, _c;
        const fields = ((_c = (_b = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.fields) === null || _b === void 0 ? void 0 : _b.split(',')) === null || _c === void 0 ? void 0 : _c.join(' ')) || '-__v';
        this.modelsQuery = this.modelsQuery.select(fields);
        return this;
    }
}
exports.default = QueryBuilder;
