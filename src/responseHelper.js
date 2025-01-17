module.exports = {
    success: (res, message, data = null) => {
        res.status(200).json({
            type: 'success',
            message,
            data,
        });
    },
    error: (res, message, status = 500) => {
        res.status(status).json({
            type: 'error',
            message,
        });
    },
};
