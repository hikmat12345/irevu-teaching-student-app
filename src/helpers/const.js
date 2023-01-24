const Const = {
  BASE_URL: 'https://api.irevu.org/',
  FILE_UPLOAD_URL: 'https://api.irevu.org/upload-files',
  FILE_LIST_URL: 'https://api.irevu.org/upload-files?action=fileUpload',

  // BASE_URL: 'http://localhost:8000/',
  // FILE_UPLOAD_URL: 'http://localhost:8000/upload-files',
  // FILE_LIST_URL: 'http://localhost:8000/upload-files?action=fileUpload',

  // BASE_URL : ( process.env.NODE_ENV == 'development' ) ? 'http://localhost/irevu/irevu-apis/' : 'https://api.irevu.org/',
  // FILE_UPLOAD_URL : ( process.env.NODE_ENV == 'development' ) ? 'http://localhost/irevu/irevu-apis/upload-files' : 'https://api.irevu.org/upload-files',
  // FILE_LIST_URL : ( process.env.NODE_ENV == 'development' ) ? 'http://localhost/irevu/irevu-apis/upload-files?action=fileUpload' : 'https://api.irevu.org/upload-files?action=fileUpload',

  EDITOR_CONFIG: {
    minHeight: '400',
    toolbarButtonSize: 'small',
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
    uploader: {
      url:
        process.env.NODE_ENV == 'development'
          ? 'http://localhost/irevu/irevu-apis/upload-files?action=fileUpload'
          : 'https://api.irevu.org/upload-files?action=fileUpload',
      headers: {
        Authorization: localStorage.userToken,
      },
    },
    // filebrowser: {
    //     ajax: {
    //         url: Const.FILE_UPLOAD_URL
    //     }
    // }
    // "autofocus": true,
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
  },
};

export default Const;
