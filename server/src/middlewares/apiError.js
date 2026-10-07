function apiError(error, req, res, next) {
  console.error(`[24CS037] ${error.name}: ${error.message}`);

  if (error.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      studentId: "24CS037",
      message: "Invalid task data",
      fields: Object.values(error.errors).map(item => ({
        field: item.path,
        message: item.message
      }))
    });
  }

  res.status(500).json({
    success: false,
    studentId: "24CS037",
    message: "Unexpected server error"
  });
}

module.exports = apiError;
