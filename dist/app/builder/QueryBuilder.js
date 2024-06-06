"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    search(searchablefeild) {
        var _a;
        const searchinfo = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.searchinfo;
        if (searchinfo) {
            this.modelQuery = this.modelQuery.find({
                $or: searchablefeild.map((feild) => ({
                    [feild]: { $regex: searchinfo, $options: 'i' }
                }))
            });
        }
        return this;
    }
    filter() {
        const queryObject = Object.assign({}, this === null || this === void 0 ? void 0 : this.query);
        const removeFeildfromQuery = ['searchinfo', 'sort', 'limit', 'page', 'skip', 'fields'];
        removeFeildfromQuery.forEach((el) => delete queryObject[el]);
        this.modelQuery = this.modelQuery.find(queryObject);
        return this;
    }
    sort() {
        var _a;
        const sort = ((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.sort) || '-createdAt';
        this.modelQuery = this.modelQuery.sort(sort);
        return this;
    }
    paginate() {
        var _a, _b;
        const limit = Number((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.limit) || 10;
        const page = Number((_b = this === null || this === void 0 ? void 0 : this.query) === null || _b === void 0 ? void 0 : _b.page) || 1;
        const skip = (page - 1) * limit;
        this.modelQuery = this.modelQuery.skip(skip).limit(limit);
        return this;
    }
    fields() {
        var _a, _b, _c;
        const fields = ((_c = (_b = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.fields) === null || _b === void 0 ? void 0 : _b.split(',')) === null || _c === void 0 ? void 0 : _c.join(' ')) || '-__v';
        this.modelQuery = this.modelQuery.select(fields);
        return this;
    }
}
exports.default = QueryBuilder;
