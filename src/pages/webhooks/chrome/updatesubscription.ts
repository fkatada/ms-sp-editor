import * as SP from '@pnp/sp/presets/all'
import * as Logging from '@pnp/logging'
import * as Queryable from '@pnp/queryable'

export const updateSubscription = (values: any, extPath: string) => {

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
    
    let clientstate = values.clientState

    if (values.clientState === null || values.clientState === undefined || values.clientState!.length === 0) {
      clientstate = ' '
    }

    return sp.web.lists.getById(values.listId).subscriptions.getById(values.id)
      .update(values.expirationDateTime, values.notificationUrl, clientstate)
      .then(() => {
        return {
          success: true,
          result: [],
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

// we cannot use async methods, they do not work correctly when running 'npm run build',
// async methods works when running 'npm run watch'
export function updateSubscription2(...args: any) {

  /* get parameters */
  const params = args
  const functionName = params[0].name

  const listId = params[1] ?? ''
  const hookUrl = params[2] ?? ''
  let clientstate = params[3]
  const expirationDate = params[4] ?? ''
  const subscriptionId = params[5] ?? '';

  /* import pnp */
  type libTypes = [Promise<typeof SP>, Promise<typeof Logging>, Promise<typeof Queryable>];

  Promise.all<libTypes>([
    (window as any).SystemJS.import((window as any).mod_sp),
    (window as any).SystemJS.import((window as any).mod_logging),
    (window as any).SystemJS.import((window as any).mod_queryable)
  ]).then((modules) => {

    var pnpsp = modules[0]
    var pnplogging = modules[1]
    var pnpqueryable = modules[2]

    const sp = pnpsp.spfi().using(pnpsp.SPBrowser({ baseUrl: (window as any)._spPageContextInfo.webAbsoluteUrl }))
      .using(pnpqueryable.InjectHeaders({
        "Accept": "application/json; odata=verbose",
        "Cache-Control": "no-cache",
        "X-ClientService-ClientTag": "SPEDITOR"
      }));

    /*** clear previous log listeners ***/
    pnplogging.Logger.clearSubscribers()
    /*** setup log listener ***/
    const listener = pnplogging.FunctionListener((entry) => {
      entry.data.response.clone().json().then((error: any) => {
        window.postMessage(JSON.stringify({
          function: functionName,
          success: false,
          result: null,
          errorMessage: error.error.message.value,
          source: 'chrome-sp-editor',
        }), '*')
      })
    })
    pnplogging.Logger.subscribe(listener)
    /* *** */

    const postMessage = () => {
      window.postMessage(JSON.stringify({
        function: functionName,
        success: true,
        result: [],
        errorMessage: '',
        source: 'chrome-sp-editor',
      }), '*')
    }

    if (clientstate === null || clientstate === undefined || clientstate!.length === 0) {
      clientstate = ' '
    }

    sp.web.lists.getById(listId).subscriptions.getById(subscriptionId)
      .update(expirationDate, hookUrl, clientstate)
      .then(postMessage)

  })
}
