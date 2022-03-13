"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllMemories = void 0;
var memory_1 = require("./../../model/memory");
var getAllMemories = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, memory_1.memories.find({ isPublic: { $ne: false } })
                    // Filter Methods
                    // ---- 1
                    // data = await memories.find({
                    //     title: req.query.title
                    //     // can add rest of the filter options
                    // })
                    // ----2
                    // This is an shorthand method 1
                    // data = await memories.find(req.query)
                    // ---3 mongooose method
                    // data=await memories.find().where("title").equals("Good Memory")
                    // ************** Exculde Query
                    // const queryObj={...req.query} //Shallow copy of req.query
                    // const excludeFields=["sort","page","limit"] //  these are the query fields which I don't want to add in request
                    // excludeFields.forEach((exQ:string)=>delete queryObj[exQ])
                    // console.log(queryObj)
                    // data=await memories.find(queryObj)
                    // ************** Advance Filter (Greater than or Less than)
                    // Find Memory having morethan 5 likes
                    // let queryObj=JSON.stringify({...req.query})
                    // queryObj=queryObj.replace(/\b(gte|gt)\b/g ,match=> `$${match}`) //gte=greaterthanequalto || gt=greaterthan
                    // console.log(queryObj)
                    // data=await memories.find(JSON.parse(queryObj))
                    // ************** Sort By Date
                    // if (req.query.sort) {
                    //   data = await memories.find().sort(req.query.sort);
                    // } else {
                    //   data = await memories.find();
                    // }
                    // ******* Send Limited Fields||Data
                    // if(req.query.fields){
                    //     const fields:string=JSON.stringify(req?.query?.fields)
                    //     const requiredFields=fields.split(",").join(" ")
                    //     // data=await memories.find().select(JSON.parse(requiredFields))
                    //     data=await memories.find().select("-createdAt") // - sign for explicitly exclude fields here the all fields will return except createdAt
                    // }
                    // else{
                    //     data = await memories.find();
                    // }
                    // ************ Pagination
                    // if (req.query.page) {
                    //   const page = Number(req.query.page);
                    //   const limit =Number(req.query.limit)||1
                    //   const skipPage = page * limit
                    //   const notValidPagination = await validPagination(skipPage);
                    //   if (notValidPagination) {
                    //     throw new Error('This Page Does Not Exists');
                    //   }
                    //   data = await memories.find().skip(skipPage).limit(1);
                    // }
                ];
            case 1:
                // finds all the docs.
                data = _a.sent();
                // Filter Methods
                // ---- 1
                // data = await memories.find({
                //     title: req.query.title
                //     // can add rest of the filter options
                // })
                // ----2
                // This is an shorthand method 1
                // data = await memories.find(req.query)
                // ---3 mongooose method
                // data=await memories.find().where("title").equals("Good Memory")
                // ************** Exculde Query
                // const queryObj={...req.query} //Shallow copy of req.query
                // const excludeFields=["sort","page","limit"] //  these are the query fields which I don't want to add in request
                // excludeFields.forEach((exQ:string)=>delete queryObj[exQ])
                // console.log(queryObj)
                // data=await memories.find(queryObj)
                // ************** Advance Filter (Greater than or Less than)
                // Find Memory having morethan 5 likes
                // let queryObj=JSON.stringify({...req.query})
                // queryObj=queryObj.replace(/\b(gte|gt)\b/g ,match=> `$${match}`) //gte=greaterthanequalto || gt=greaterthan
                // console.log(queryObj)
                // data=await memories.find(JSON.parse(queryObj))
                // ************** Sort By Date
                // if (req.query.sort) {
                //   data = await memories.find().sort(req.query.sort);
                // } else {
                //   data = await memories.find();
                // }
                // ******* Send Limited Fields||Data
                // if(req.query.fields){
                //     const fields:string=JSON.stringify(req?.query?.fields)
                //     const requiredFields=fields.split(",").join(" ")
                //     // data=await memories.find().select(JSON.parse(requiredFields))
                //     data=await memories.find().select("-createdAt") // - sign for explicitly exclude fields here the all fields will return except createdAt
                // }
                // else{
                //     data = await memories.find();
                // }
                // ************ Pagination
                // if (req.query.page) {
                //   const page = Number(req.query.page);
                //   const limit =Number(req.query.limit)||1
                //   const skipPage = page * limit
                //   const notValidPagination = await validPagination(skipPage);
                //   if (notValidPagination) {
                //     throw new Error('This Page Does Not Exists');
                //   }
                //   data = await memories.find().skip(skipPage).limit(1);
                // }
                console.log(req.query.tags);
                res.send({
                    status: 'success',
                    length: data === null || data === void 0 ? void 0 : data.length,
                    data: data,
                });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.send({
                    status: 500,
                    message: error_1 === null || error_1 === void 0 ? void 0 : error_1.message,
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllMemories = getAllMemories;
