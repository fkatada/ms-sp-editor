import * as SP from '@pnp/sp/presets/all'
import * as Logging from '@pnp/logging'
import * as Queryable from '@pnp/queryable'

export const getListProperties = (listId: string, extPath: string) => {

  return moduleLoader(extPath).then((modules) => {

     /*** map modules ***/
     var pnpsp = modules[0];
     var pnplogging = modules[1];
     var pnpqueryable = modules[2];
 
 
     /***  init pnpjs ***/
     const sp = pnpsp.spfi().using(pnpsp.SPBrowser({ baseUrl: (window as any)._spPageContextInfo.webAbsoluteUrl }))
       .using(pnpqueryable.InjectHeaders({
         "Accept": "application/json; odata=verbose",
         "Cache-Control": "no-cache",
         "X-ClientService-ClientTag": "SPEDITOR"
       }));
 
     /*** clear previous log listeners ***/
     pnplogging.Logger.clearSubscribers();
 
     /*** setup log listener ***/
     const listener = pnplogging.FunctionListener(entry => {
       entry.data.response.clone().json().then((error: any) => {
         return {
           success: false,
           result: null,
           errorMessage: error.error.message.value,
           source: 'chrome-sp-editor'
         }
       });
     });
     pnplogging.Logger.subscribe(listener);

     return sp.web.lists.getById(listId).expand('RootFolder/Properties')
     .select('RootFolder/Properties')().then(function (result: any) {
       const compare = (a: any, b: any) => {
         return (a.key.toLowerCase() < b.key.toLowerCase()) ? -1
           : (a.key.toLowerCase() > b.key.toLowerCase()) ? 1
             : 0
       }

       const allProps = []
       for (let key in result.RootFolder.Properties) {
         if (key && key !== '__metadata' && key !== 'odata.editLink' && key !== 'odata.id' && key !== 'odata.type') {

           const re = /_x.*?_/g
           const found = key.match(re)
           const origKey = key

           if (found !== null)
             for (const g in found) {
               if (g) {
                 const unesc = found[g].replace('_x', '%u').replace('_', '')
                 key = key.replace(found[g], unescape(unesc))
               }
             }
           allProps.push({ key: key.replace(/OData_/g, ''), value: result.RootFolder.Properties[origKey], listId })
         }
       }

       allProps.sort(compare)
       return {
        success: true,
        result: allProps,
        errorMessage: '',
        source: 'chrome-sp-editor',
      }
     })


  });

  function moduleLoader(extPath: string) {

    type libTypes = [typeof SP, typeof Logging, typeof Queryable];
    /*** load systemjs ***/
    return new Promise<libTypes>((resolve) => {
      const s = document.createElement('script');
      s.src = extPath + 'bundles/system.js';
      (document.head || document.documentElement).appendChild(s);
      s.onload = () =>
        /*** load pnpjs modules ***/
        Promise.all<libTypes>([
          (window as any).SystemJS.import(extPath + 'bundles/sp.es5.umd.bundle.js'),
          (window as any).SystemJS.import(extPath + 'bundles/logging.es5.umd.bundle.js'),
          (window as any).SystemJS.import(extPath + 'bundles/queryable.es5.umd.bundle.js')])
          .then((modules) => {
            // if we are in a modern page we need to get the _spPageContextInfo from the module loader
            if (!(window as any)._spPageContextInfo && (window as any).moduleLoaderPromise) {
              (window as any).moduleLoaderPromise.then((e: any) => {
                (window as any)._spPageContextInfo = e.context._pageContext._legacyPageContext;
                resolve(modules);
              });
            } else {
              resolve(modules);
            }
          });
    });
  }

}