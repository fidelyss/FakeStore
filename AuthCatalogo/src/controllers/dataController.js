// src/controllers/dataController.js
const getProtectedData = (req, res) => {
    // The authenticateToken middleware has already verified the token
    // and attached the user payload to req.user
   
    const user = req.user;

    // You can optionally perform further authorization checks here based on user roles/permissions if needed

    res.json({ 
        message: `Olá, ${user.username}! Estes são dados protegidos de exemplo.`,
        userId: user.userId 
    });
};

module.exports = {
    getProtectedData
};
