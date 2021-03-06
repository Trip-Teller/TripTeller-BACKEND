const env = process.env.NODE_ENV;

const { Storage } = require('@google-cloud/storage');

if (env !== 'ci') {
  if (!process.env.STORAGE_USERCONTENTS_HOST) throw new Error('STORAGE_USERCONTENTS 환경변수가 설정되어 있지 않습니다.');
}
const userContentsBucketName = 'usercontents';

const storage = new Storage();

const storageUploadUserProfileImage = (fileData) => new Promise((resolve, reject) => {
  storage.bucket(userContentsBucketName).upload(`${fileData.path}`, {
    destination: `/profile/${fileData.filename}`,
  }, (err, data) => {
    if (err) reject(err);
    else resolve(data);
  });
});

const storageUploadBackgroundImage = (fileData) => new Promise((resolve, reject) => {
  storage.bucket(userContentsBucketName).upload(`${fileData.path}`, {
    destination: `/background/${fileData.filename}`,
  }, (err, data) => {
    if (err) reject(err);
    else resolve(data);
  });
});

module.exports = {
  storageUploadUserProfileImage,
  storageUploadBackgroundImage,
};
