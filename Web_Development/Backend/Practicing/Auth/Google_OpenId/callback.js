const isSuccess = new URLSearchParams(location.search).get("success");
console.log(isSuccess);
console.log(window.opener);
if (isSuccess==="true")
  window.opener.postMessage({ message: 'success' },'*');
else window.opener.postMessage({ message: 'failed' },'*');
  window.close()

