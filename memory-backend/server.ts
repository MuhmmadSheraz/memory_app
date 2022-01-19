import http from "http";
 const PORT=3001

const app=http.createServer((req,res)=>{
    res.end("Hello From Node And Typescript")
})
app.listen(3001)