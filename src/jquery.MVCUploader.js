/*
DO NOT INCLUDE.
THIS IS ES6 CODE AND WILL NOT RUN IN ALL BROWSERS.
INSTEAD INCLUDE THE TRANSPILED VERSION
*/

class MVCUploader{
    constructor({uploadDlgSelector,postURL,downloadURL,deleteURL,successCallback = () => { throw "NotImplementedException"; },errorCallback = () => { throw "NotImplementedException"; } }){
        ///<summary>Provides a reusable uploader that is compatible with Microsoft MVC4</summary>
        ///<param name="uploadDlgSelector" type="DOMNode">The HTML File Upload Element</param>
        ///<param name="postURL" type="String">Endpoint to send the data to</param>
        ///<param name="successCallback" type="function">The function to run when the server returns 200 OK</param>
        ///<param name="errorCallback" type="function">The function to run when the server returns an error</param>
        if(jQuery){
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
        for(var i = 0; i < this._totalFiles; i++){
            const file = document.getElementById(this._uploadFrm).file[i];
            const fileName = file.name;
            this._formData.append(fileName,file);
        }
    }else{
      throw "jQuery is required";
    }
    }

insertParameter(name, value){
        ///<summary>Inserts a new <key,value> parameter to be received by the server. This is normally meta data about your uploads</summary>
        ///<param name="name" type="string">The name of the parameter</param>
        ///<param name="value" type="string">The value of the parameter</param>
        this._formData.append(name,value);
    }

    upload(){

        $.ajax({
            type: "POST",
            url: this._postAddress,
            data: this._formData,
            contentType: false,
            processData: false
        }).done(this._successCallback)
            .fail(this._errorCallback);

    }

    remove(attachmentID){


    }

}
