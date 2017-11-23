var nock = require('nock');
var tax = require('../../lib/tax');
var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai

it('calculate() should resolve with an object containing the tax details', function (done) {
    nock('https://some-tax-service.com')
        .post('/request')
        .reply(200, function (uri, requestBody) {
            return {
                amount: requestBody.subtotal * 0.10
            };
        });

    tax.calculate(100, 'CA', function (taxDetails) {
        expect(taxDetails).to.eql({ amount: 10 });
        done();
    });
});