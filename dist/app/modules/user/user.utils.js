"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genarateSudentID = void 0;
const genarateSudentID = (id) => {
    const currentID = (0).toString();
    let incrementedID = (Number(currentID) + 1).toString().padStart(4, '0');
    incrementedID = `${id.year}${id.code}${incrementedID}`;
    return incrementedID;
};
exports.genarateSudentID = genarateSudentID;
