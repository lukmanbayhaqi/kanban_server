module.exports = (err, req, res, next) => {
  let status  = 500
  let message = 'Internal Server Error'

  console.log(err, '<========ERROR=======>')
  if(err.name === 'SequelizeUniqueConstraintError') {
    let error = []
    
    err.errors.forEach(el => {
      error.push(el.message)
    });
    status = 400
    error.includes('email must be unique')? message = 'Email already in use' : message = 'Group name already in use'
  } else if (err.status) {
    sttaus = err.status
    message = err.message
  } else if(err.name === 'SequelizeValidationError') {
    let error = []
    
    err.errors.forEach(el => {
      error.push(el.message)
    });
    status = 400
    message = error[0]
  }

  res.status(status).json({
    message
  })
}