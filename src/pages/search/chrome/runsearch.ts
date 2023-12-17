import * as SP from '@pnp/sp/presets/all';
import * as Logging from '@pnp/logging';
import * as Queryable from '@pnp/queryable';

export const runsearch = (payload: any, extPath: string) => {
  return moduleLoader(extPath).then((modules) => {
    /*** map modules ***/
    var pnpsp = modules[0];
    var pnplogging = modules[1];
    var pnpqueryable = modules[2];

    // if we are in a modern page we need to get the _spPageContextInfo from the module loader
    if (!(window as any)._spPageContextInfo && (window as any).moduleLoaderPromise) {
      (window as any).moduleLoaderPromise.then((e: any) => {
        (window as any)._spPageContextInfo = e.context._pageContext._legacyPageContext;
      });
    }

    /***  init pnpjs ***/
    const sp = pnpsp
      .spfi()
      .using(
        pnpsp.SPBrowser({
          baseUrl: (window as any)._spPageContextInfo.webAbsoluteUrl,
        })
      )
      .using(
        pnpqueryable.InjectHeaders(
          {
            Accept: 'application/json; odata=verbose',
            'Cache-Control': 'no-cache',
            'X-ClientService-ClientTag': 'SPEDITOR',
          },
          true
        )
      );

    /*** clear previous log listeners ***/
    pnplogging.Logger.clearSubscribers();

    /*** setup log listener ***/
    const listener = pnplogging.FunctionListener((entry) => {
      entry.data.response
        .clone()
        .json()
        .then((error) => {
          return {
            success: false,
            result: null,
            errorMessage: error.error.message.value,
            source: 'chrome-sp-editor',
          };
        });
    });

    pnplogging.Logger.subscribe(listener);

    return sp
      .search(payload)
      .then((r) => {
        var result = {
          ElapsedTime: r.ElapsedTime,
          PrimarySearchResults: r.PrimarySearchResults,
          RawSearchResults: r.RawSearchResults,
          RowCount: r.RowCount,
          TotalRows: r.TotalRows,
          TotalRowsIncludingDuplicates: r.TotalRowsIncludingDuplicates,
        };
        return result;
      })
      .catch((error) => {
        var errorMessage = error.message;
        if (error !== null && error !== void 0 && error.isHttpRequestError) {
          // we can read the json from the response
          return error.response.json().then((json) => {
            // if we have a value property we can show it
            errorMessage = typeof json['odata.error'] === 'object' ? json['odata.error'].message.value : error.message;
            return {
              errorMessage: errorMessage,
            };
          });
        } else
          return {
            errorMessage: errorMessage,
          };
      });
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
          (window as any).SystemJS.import(extPath + 'bundles/queryable.es5.umd.bundle.js'),
        ]).then((modules) => {
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
};
