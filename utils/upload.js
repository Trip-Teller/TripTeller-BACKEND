/* eslint-disable no-console */
const fs = require('fs');
const { promisify } = require('util');

const bytes = require('bytes');
const multer = require('multer');

const unlink = promisify(fs.unlink);

const unlinkFile = (file) => {
  const { path } = file;
  if (path) {
    unlink(path)
      .catch((e) => {
        console.error(e);
      });
  }
};

const clearFiles = (files) => {
  if (Array.isArray(files)) {
    for (let i = 0; i < files.length; i += 1) {
      unlinkFile(files[i]);
    }
  } else {
    unlinkFile(files);
  }
};

const uploadUserProfileImage = multer({
  dest: '/tmp/profile',
  limits: {
    fileSize: bytes('5mb'),
    files: 1,
  },
}).single('profileImage');

const uploadBackgroundImage = multer({
  dest: 'tmp/backgroundImage',
  limits: {
    fileSize: bytes('10'),
    files: 1,
  },
}).single('backgroundImage');

module.exports = {
  clearFiles,
  uploadUserProfileImage,
  uploadBackgroundImage,
};
