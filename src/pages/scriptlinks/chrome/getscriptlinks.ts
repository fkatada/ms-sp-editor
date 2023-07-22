import * as SP from '@pnp/sp/presets/all'
import * as Logging from '@pnp/logging'
import * as Queryable from '@pnp/queryable'

// we cannot use async methods, they do not work correctly when running 'npm run build',
// async methods works when running 'npm run watch'
export function getCustomActions(...args: any) {

  /* get parameters */
  const params = args
  const functionName = params[0].name;

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
      }, true));

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

    const postMessage = (actions: any[]) => {
      window.postMessage(JSON.stringify({
        function: functionName,
        success: true,
        result: actions,
        errorMessage: '',
        source: 'chrome-sp-editor',
      }), '*')
    }

    // get site custom actions
    sp.site.userCustomActions
      .filter("Location ne 'ClientSideExtension.ApplicationCustomizer'")
      .select('Sequence, Name, ScriptSrc, ScriptBlock, Scope, Id, Title').orderBy('Sequence', true)()
      .then(siteactions => {
        // get web custom actions
        sp.web.userCustomActions
          .filter("Location ne 'ClientSideExtension.ApplicationCustomizer'")
          .select('Sequence, Name, ScriptSrc, ScriptBlock, Scope, Id, Title').orderBy('Sequence', true)()
          .then(webactions => {
            // join customactions
            // TODO: add order ??
            const actions = siteactions.concat(webactions).sort((a, b) => a.Sequence - b.Sequence)
            // post results back to extension
            postMessage(actions)
          })
      })
  })

}
