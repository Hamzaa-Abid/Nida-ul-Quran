success = (res, data) => {
    return res.status(200).json({
        data: data
    });
}

getSuccess = (res, data) => {
    return res.status(200).json({
        lenght: data.length,
        data: data
    });
}

authSuccess = (res, data, token) => {
    return res.status(200).json({
        status: true,
        token: token,
        data: data
    });
}

notFound = (res) => {
    return res.status(200).json({
        status: false,
        message: 'no record found'
    });
}

error = (res,status,message) => {
    return res.status(status).json({
        status: false,
        message: message
    });
}

module.exports = {
    success,
    getSuccess,
    authSuccess,
    notFound,
    error
}