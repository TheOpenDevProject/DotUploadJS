# DotUploadJS
DotUploadJS is a Javascript class that will simplify uploading of files to DotNet MVC ASP

DotUploadJS requires jQuery to work.


Example Client Side
```javascript
var uploader = new MVCUploader({
    uploadDlgSelector: "AttachmentUploadDlg",
    successCallback: function() {
        //Do Stuff that lets them know it worked
    },
    errorCallback: function() {
      alert('Failure');
    },
    //Expects an endpoint that accepts POST values. Consider using @Html from Razer.
    postURL: '/uploads/upload'
});

uploader.insertParameter("ExampleParam_1", $("#" + htmlConstructor.GetUUID()).val());
uploader.insertParameter("ExampleParam_2","");
uploader.insertParameter("ExampleParam_3", "");
uploader.upload();
```
### Please NOTE: This code will not compile by just copy and pasting it as it has been cut down from an original source.
```c#
var ExampleParam_1 = Convert.ToInt32(Request.Form.Get("ExampleParam_1"));
var ExampleParam_2 = Convert.ToInt32(Request.Form.Get("ExampleParam_2"));
var ExampleParam_3 = Convert.ToInt32(Request.Form.Get("ExampleParam_3"));

foreach (string ActiveFile in Request.Files) {
          var FileContents = Request.Files[ActiveFile];
          if (FileContents != null && FileContents.ContentLength > 0) {
              var fstream = FileContents.InputStream;
              string directoryPath = Settings.Default.AttachmentPath;
              if (!Directory.Exists(directoryPath)) {
                  // Creates a Directory if a path doesn't exist
                  Directory.CreateDirectory(directoryPath);
              }

              string SaveFilePath = Path.Combine(directoryPath, AttachmentToTrack.FileName);
              using (Stream ostream = System.IO.File.Create(SaveFilePath)) {
                  fstream.CopyTo(ostream);
                  ostream.Flush();
              }
          }
      }
```
