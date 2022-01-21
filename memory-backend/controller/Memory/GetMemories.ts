import { memories } from './../../model/memory';
import { Request, Response } from "express"
export const getAllMemories = async (req: Request, res: Response,) => {
    let data;
    try {
        // finds all the docs.
        //  data=await memories.find() 

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
            const queryObj={...req.query} //Shallow copy of req.query

            const excludeFields=["sort","page","limit"] //  these are the query fields which I don't want to add in request
            excludeFields.forEach((exQ:string)=>delete queryObj[exQ])
            console.log(queryObj)
            data=await memories.find(queryObj)

        res.send({
            status: 'success',
            length: data?.length,
            data
        });
    } catch (error: any) {
        res.send({
            status: 500,
            message: error?.message
        })
    }

}