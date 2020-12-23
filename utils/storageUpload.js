const env = process.env.NODE_ENV;

const { Storage } = require('@google-cloud/storage');

if (env !== 'ci') {
  if (!process.env.STORAGE_USERCONTENTS_HOST) throw new Error('STORAGE_USERCONTENTS 환경변수가 설정되어 있지 않습니다.');
}
const bucketName = process.env.STORAGE_USERCONTENTS_HOST;

const storage = new Storage();

const storageUploadUserProfileImage = (fileName) => new Promise((resolve, reject) => {
  storage.bucket(bucketName).upload(`/tmp/profileImage/${fileName}`, {
    destination: `/profile/${fileName}`,
  }, (err, data) => {
    if (err) reject(err);
    else resolve(data);
  });
});
module.exports = {
  storageUploadUserProfileImage,
};
