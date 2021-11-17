import cors from 'cors';
import multer from 'multer';
import methodOverride from 'method-override';
import {v4 as uuid4} from "uuid";
import express from 'express';
import { get } from 'http';
import dayjs from 'dayjs';
//
const server = express();
let port = process.env.PORT || 3000;

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({extended:true}))

const multerConfig= multer.diskStorage({
  destination:function(req,file,cb){
      cb(null,"./bucket")
  },
  filename:function(req,file,cb){
      cb(null,file.originalname);
      let idImage = uuid4().split("-")[0];
      let day = dayjs().format('DD-MM-YYYY');
      cb(null, `${day}.${idImage}.${file.originalname}`);
  },
});

const multerMiddle = multer({storage:multerConfig})

server.post("/upload",multerMiddle.single("imagefile"),(req,res)=>{
  if(req.file){
    res.send("imagen guardada");
  }else{
    res.send("Error al cargar la imagen")
}});

server.listen(3000, ()=>{
  console.log("start");
}).on("error", ()=>{
  console.log("error");
});
