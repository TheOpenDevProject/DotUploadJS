"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MVCUploader = (function () {
    function MVCUploader(_ref) {
        var uploadDlgSelector = _ref.uploadDlgSelector;
        var postURL = _ref.postURL;
        var downloadURL = _ref.downloadURL;
        var deleteURL = _ref.deleteURL;
        var _ref$successCallback = _ref.successCallback;
        var successCallback = _ref$successCallback === undefined ? function () {
            throw "NotImplementedException";
        } : _ref$successCallback;
        var _ref$errorCallback = _ref.errorCallback;
        var errorCallback = _ref$errorCallback === undefined ? function () {
            throw "NotImplementedException";
        } : _ref$errorCallback;

        _classCallCheck(this, MVCUploader);

        ///<summary>Provides a reusable uploader that is compatible with Microsoft MVC4</summary>
        ///<param name="uploadDlgSelector" type="DOMNode">The HTML File Upload Element</param>
        ///<param name="postURL" type="String">Endpoint to send the data to</param>
        ///<param name="successCallback" type="function">The function to run when the server returns 200 OK</param>
        ///<param name="errorCallback" type="function">The function to run when the server returns an error</param>
        if (jQuery) {
            this._totalFiles = document.getElementById(uploadDlgSelector).files.length;
            this._uploadFrm = uploadDlgSelector;
            this._formData = new FormData();
            this._postAddress = postURL;
            this._successCallback = successCallback;
            this._errorCallback = errorCallback;
            this._downloadURL = downloadURL;
            this._deleteURL = deleteURL;
            //Setup the uploader

            // //Loop through files
            for (var i = 0; i < this._totalFiles; i++) {
                var file = document.getElementById(this._uploadFrm).file[i];
                var fileName = file.name;
                this._formData.append(fileName, file);
            }
        } else {
            throw "jQuery is required";
        }
    }

    _createClass(MVCUploader, [{
        key: "insertParameter",
        value: function insertParameter(name, value) {
            ///<summary>Inserts a new <key,value> parameter to be received by the server. This is normally meta data about your uploads</summary>
            ///<param name="name" type="string">The name of the parameter</param>
            ///<param name="value" type="string">The value of the parameter</param>
            this._formData.append(name, value);
        }
    }, {
        key: "upload",
        value: function upload() {

            $.ajax({
                type: "POST",
                url: this._postAddress,
                data: this._formData,
                contentType: false,
                processData: false
            }).done(this._successCallback).fail(this._errorCallback);
        }
    }, {
        key: "remove",
        value: function remove(attachmentID) {
            var postData = { AttachmentID: attachmentID };
            $.ajax({
                type: "POST",
                url: this._deleteURL,
                data: postData,
                contentType: false,
                processData: false
            }).done(this._successCallback).fail(this._errorCallback);
        }
    }]);

    return MVCUploader;
})();
