// we cannot use async methods, they do not work correctly when running 'npm run build',
// async methods works when running 'npm run watch'
export function getContext(...args: any) {

  /* get parameters */
  const params = args
  const functionName = params[0].name

  var _spPageContextInfo = (window as any)._spPageContextInfo;
  delete _spPageContextInfo['dataSyncClient'];

  window.postMessage(JSON.stringify({
    function: functionName,
    success: true,
    result: JSON.stringify({ _spPageContextInfo }),
    errorMessage: '',
    source: 'chrome-sp-editor',
  }), '*')

}
