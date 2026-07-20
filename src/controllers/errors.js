// Import any needed model functions (none are needed for the error pages, so this is empty)

const testErrorPage = (req, res, next) => {
    const err = new Error('This is a test error');
    err.status = 500;
    next(err);
};

export { testErrorPage };