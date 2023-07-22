/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { MgtBaseComponent } from '../components/baseComponent';
import { Graph } from '../Graph';
import { MockProvider } from './MockProvider';
/**
 * MockGraph Instance
 *
 * @export
 * @class MockGraph
 * @extends {Graph}
 */
export declare class MockGraph extends Graph {
    /**
     * Creates a new MockGraph instance. Use this static method instead of the constructor.
     *
     * @static
     * @param {MockProvider} provider
     * @return {*}  {Promise<MockGraph>}
     * @memberof MockGraph
     */
    static create(provider: MockProvider): Promise<MockGraph>;
    /**
     * Returns an instance of the Graph in the context of the provided component.
     *
     * @param {MgtBaseComponent} component
     * @returns
     * @memberof Graph
     */
    forComponent(component: MgtBaseComponent): MockGraph;
}
//# sourceMappingURL=MockGraph.d.ts.map