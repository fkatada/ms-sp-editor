import * as SP from '@pnp/sp/presets/all'
import * as Logging from '@pnp/logging'
import * as Queryable from '@pnp/queryable'

// we cannot use async methods, they do not work correctly when running 'npm run build',
// async methods works when running 'npm run watch'
export function updateSubscription(...args: any) {

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
