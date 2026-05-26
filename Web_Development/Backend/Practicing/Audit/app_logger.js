import express from "express";
import logger from "./logger.js";
import { pinoHttp } from "pino-http";



const app = express();
const PORT = 4000;

const httpLogger=pinoHttp({logger,customLogLevel:(req,res,next)=>{
    if(res.statusCode>=500){
        return "error"
    }
    else if(res.statusCode>=400){
        return "warn"
    }else return "info"
}})

app.use(httpLogger)

// app.use((req, res, next) => {
//   req.id = crypto.randomUUID();
//   req.log = logger.child({
//     id: req.id,
//     method: req.method,
//     path: req.url,
//     headers: req.headers,
//   });
//   const startTime = new Date();
//   res.on("finish", () => {
//     const responseTime = +(performance.now() - startTime);
//     const resData = { responseTime, statusCode: res.statusCode };
//     if (res.statusCode > 500) {
//       req.log.error({resData,statusCode:res.statusCode});
//     } else if (res.statusCode > 400) {
//       req.log.warn({resData,statusCode:res.statusCode});
//     } else {
//       req.log.info({resData,statusCode:res.statusCode});
//     }
//   });
//   next();
// });

app.get("/", (req, res, next) => {
//   req.log.info("Get Request on /");
  return res.end("ok");
});

app.post("/posts", async (req, res, next) => {
  try {
    // req.log.info("Request on Post route");
    const response = await fetch("https://dummyjson.com/posts");
    const data = await response.json();
    return res.status(302).json({ data: data });
  } catch (error) {
    next(error);
  }
});

app.post("/failed", async (req, res, next) => {
  try {
    await new Promise((resolve, reject) => {
      //   resolve({ success: true });
      reject({ success: false });
    }).then(({ success }) => {
      if (!success) next("Request Failed");
      else res.end("ok");
    });
  } catch (error) {
    next(error);
  }
});

// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500;
//   if (statusCode > 500) {
//     req.log.error(err);
//   } else if (statusCode > 400) {
//     req.log.warn(err);
//   } else {
//     req.log.info(err);
//   }
//   return res.status(statusCode).json({
//     success: false,
//     message: err.message,
//     request: req.id,
//   });
// });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
