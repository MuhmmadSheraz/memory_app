import { memories } from './../model/memory';
export const validPagination=async(skipPage:number)=>{
    const total=await memories.countDocuments()
    if(total>=skipPage) return false
}
