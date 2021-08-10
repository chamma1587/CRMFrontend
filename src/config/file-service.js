export const fileService = {

    downloadFile(data, fileType, extension, fileName){        
      
        const blob = new Blob([data], { type: fileType });
  
        // IE doesn't allow using a blob object directly as link href
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob);
            return;
        }
  
        const file = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = file;
  
        // change the file name according to the payroll name and the selected employee
        link.download = fileName + '.' + extension;         
        link.click();
        setTimeout(function () {
            window.URL.revokeObjectURL(file);
        }, 100);
        
      }

} 