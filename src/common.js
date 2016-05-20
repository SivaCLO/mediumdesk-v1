'use strict';
class Common {

}
Common.ELECTRON = "Electron";
Common.DEBUG_MODE = false;
Common.WINDOW_SIZE = {width: 1050, height: 700};
Common.USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) " +
    "Chrome/41.0.2227.1 Safari/537.36";

Common.MEDIUM_HOME = "https://medium.com/";
Common.GITHUB = "https://github.com/sivragav/mediumdesk";
Common.GITHUB_RELEASES = "https://github.com/sivragav/mediumdesk/releases";
Common.GITHUB_ISSUES = "https://github.com/sivragav/mediumdesk/issues";
Common.GITHUB_API_HOST = "api.github.com";
Common.GITHUB_API_RELEASE_LATEST_PATH = "/repos/sivragav/mediumdesk/releases/latest";

Common.UPDATE_ERROR_ELECTRON = "Failed to get the local version. If you are using debug mode(by `npm start`), " +
    "this error would happen. Use packed app instead or manually check for updates.\n\n" + Common.GITHUB_RELEASES;
Common.UPDATE_ERROR_EMPTY_RESPONSE = "Failed to fetch release info.";
Common.UPDATE_ERROR_UNKNOWN = "Something went wrong.";
Common.UPDATE_NA_TITLE = "No Update Available";
Common.UPDATE_ERROR_NETWORK = "Connection hang up unexpectedly. Check your network settings.";
Common.UPDATE_ERROR_LATEST = (version)=> {
  return `You are using the latest version(${version}).`
};

module.exports = Common;
