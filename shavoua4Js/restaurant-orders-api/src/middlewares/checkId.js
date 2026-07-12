export function checkId(req, res, next){
    const id = Number(req.params.id)

    if (!Number.isInteger(id) || id <= 0 )
        return next({
            status : 400,
            message : "Invalid Id "
    })  
    next()
}