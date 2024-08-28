export const handleError = (error, errorPlace, res) => {
  console.log(`Error occurs inside ${errorPlace}: ${error}`);
  res.status(500).json({
    message: `Someting went wrong while ${errorPlace}`,
    success: false,
    error: `${error}`,
  });
};
