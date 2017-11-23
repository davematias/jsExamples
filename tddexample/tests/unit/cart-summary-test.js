// tests/part1/cart-summary-test.js
var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var sinon = require('sinon');
var tax = require('../../lib/tax');
var CartSummary = require('../../lib/cart-summary');

describe('CartSummary', function () {
    it('getSubtotal() should return 0 if no items are passed in', function () {
        var cartSummary = new CartSummary([]);
        expect(cartSummary.getSubtotal()).to.equal(0);
    });

    it('getSubtotal() should return the sum of the price * quantity for all items', function () {
        var cartSummary = new CartSummary([{
            id: 1,
            quantity: 4,
            price: 50
        }, {
            id: 2,
            quantity: 2,
            price: 30
        }, {
            id: 3,
            quantity: 1,
            price: 40
        }]);

        expect(cartSummary.getSubtotal()).to.equal(300);
    });
});

describe('getTax()', function () {
    beforeEach(function () {
        sinon.stub(tax, 'calculate').callsFake(function (subtotal, state, done) {
            setTimeout(function () {
                done({
                    amount: 30
                });
            }, 0);
        });
    });

    afterEach(function () {
        tax.calculate.restore();
    });

    it('get Tax() should execute the callback function with the tax amount', function (done) {
        var cartSummary = new CartSummary([{
            id: 1,
            quantity: 4,
            price: 50
        }, {
            id: 2,
            quantity: 2,
            price: 30
        }, {
            id: 3,
            quantity: 1,
            price: 40
        }]);

        cartSummary.getTax('NY', function (taxAmount) {
            expect(taxAmount).to.equal(30);
            expect(tax.calculate.getCall(0).args[0]).to.equal(300);
            expect(tax.calculate.getCall(0).args[1]).to.equal('NY');
            done();
        });
    });
});