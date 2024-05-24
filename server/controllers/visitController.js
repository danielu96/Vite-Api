import Visit from "../models/VisitModel";


export const getCalendar = async (req,res)=> {
    const { year, month } = req.params;   
    const appointments = await Visit(year, month);
        res.status(StatusCodes.OK).json({appointments});  
  };