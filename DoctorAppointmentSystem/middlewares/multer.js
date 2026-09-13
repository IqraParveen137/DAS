import multer from 'multer';
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fieldNameSize: 100,
    fieldSize: 10 * 1024 * 1024, // Increase text field limit to 10MB
    fileSize: 5 * 1024 * 1024, // Limit actual file size to 5MB
  },
});
export default upload;
