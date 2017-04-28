declare var describe: Mocha.IContextDefinition;

import { expect } from 'chai';
import {Path} from './path';

describe('Path', function(){

    const obj = { some   : {prop:{}}
                , another: {'fancy.path': {}}
                , array_prop: ['', {nested: {prop: {}}}, ''] as any[]
                };
    const path = Path(obj);

    it('simple test: some.prop', (testDone) => {
        expect(path.some.prop).to.eql(['some', 'prop']);
        testDone();
    });

    it('simple test: another[\'fancy.path\']', (testDone) => {
        expect(path.another['fancy.path']).to.eql(['another', 'fancy.path']);
        testDone();
    });

    it('simple test: array_prop[0]', (testDone) => {
        expect(path.array_prop[0]).to.eql(['array_prop', '0']);
        testDone();
    });

    it('simple test: array_prop[1].nested.prop', (testDone) => {
        expect(path.array_prop[1].nested.prop).to.eql(['array_prop', '1', 'nested', 'prop']);
        testDone();
    });
});
