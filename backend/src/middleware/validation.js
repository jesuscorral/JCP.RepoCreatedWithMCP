/**
 * Request validation middleware
 * Validates incoming requests before processing
 */

const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    
    if (error) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: error.details.map(detail => ({
          field: detail.path[0],
          message: detail.message
        }))
      });
    }
    
    next();
  };
};

const validateTodo = (req, res, next) => {
  const { title } = req.body;
  
  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Title is required and must be a non-empty string'
    });
  }
  
  // Sanitize title
  req.body.title = title.trim();
  
  next();
};

module.exports = {
  validateRequest,
  validateTodo
};