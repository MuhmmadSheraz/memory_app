import { memories } from './../../model/memory';
import  { Request, Response } from 'express';
export const getAllMemories = async (req: Request, res: Response) => {
  let data: any;
  try {
    // finds all the docs.
    data = await memories.find();

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
      length: data?.length,
      data
    });
  } catch (error: any) {
    res.send({
      status: 500,
      message: error?.message
    });
  }
};
