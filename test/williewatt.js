contract('WillieWatt', function (accounts) {
  it("should have 0 decimals", function () {
    var ww = WillieWatt.deployed();

    return ww.decimals().then(function (decimals) {
      assert.equal(decimals.valueOf(), 0, "decimals doe snot equal 0");
    });
  });
  it("first account should initially have 0 willie watts", function () {
    var ww = WillieWatt.deployed();

    return ww.balanceOf(accounts[0]).then(function (balance) {
      assert.equal(balance.valueOf(), 0, "0 wasn't in the first account");
    });
  });
  it("account should have supply of 0", function () {
    var ww = WillieWatt.deployed();

    return ww.totalSupply().then(function (totalSupply) {
      assert.equal(totalSupply.valueOf(), 0, "decimals doe snot equal 0");
    });
  });
  it("Should have 100 willie watts after send .1 ether", function (done) {
    var ww = WillieWatt.deployed();
    var currentBlock = web3.eth.blockNumber;

    return web3.eth.sendTransaction(
      { from: web3.eth.accounts[0], to: WillieWatt.deployed().address, value: web3.toWei(.1, "ether") },
      (err, res) => {
        var transfers = ww.Transfer({}, { fromBlock: web3.eth.blockNumber, to: 'latest' })
        return transfers.watch((err, res) => {
          return ww.balanceOf(accounts[0]).then(function (balance) {
            assert.equal(balance.valueOf(), 100, "100 wasn't in the first account");
            transfers.stopWatching();
            done();
          });
        })
      }
    )
  });
  it("Should have 1100 willie watts after send 1 ether", function (done) {
    var ww = WillieWatt.deployed();
    var currentBlock = web3.eth.blockNumber;

    return web3.eth.sendTransaction(
      { from: web3.eth.accounts[0], to: WillieWatt.deployed().address, value: web3.toWei(1, "ether") },
      (err, res) => {
        var transfers = ww.Transfer({}, { fromBlock: web3.eth.blockNumber, to: 'latest' })
        return transfers.watch((err, res) => {
          return ww.balanceOf(accounts[0]).then(function (balance) {
            assert.equal(balance.valueOf(), 1100, "1100 wasn't in the first account");
            transfers.stopWatching();
            done();
          });
        })
      }
    )
  });

  it("Token Supply should be 1100", function () {
    var ww = WillieWatt.deployed();

    return ww.totalSupply().then(function (res) {
      assert.equal(res.valueOf(), 1100, "total supply is not 1100")
    })
  });

  it("Balance should be 500 after refunding 600", function () {
    var ww = WillieWatt.deployed();

    return ww.refund(600, accounts[0]).then(function () {
      return ww.balanceOf(accounts[0]).then(function (balance) {
        assert.equal(balance.valueOf(), 500, "1100 wasn't in the first account");
      });
    }
    )
  });


  it("Token Supply should be 500", function () {
    var ww = WillieWatt.deployed();

    return ww.totalSupply().then(function (res) {
      assert.equal(res.valueOf(), 500, "total supply is not 1100")
    })
  });

  it("Balance should be 0 after refunding everything", function () {
    var ww = WillieWatt.deployed();

    return ww.refund(500, accounts[0]).then(function () {
      return ww.balanceOf(accounts[0]).then(function (balance) {
        assert.equal(balance.valueOf(), 0, "1100 wasn't in the first account");
      });
    }
    )
  });

  it("Should not be able to withdraw more than user has", function () {
    var ww = WillieWatt.deployed();
    //not sure how to assert throw?
    return assert.throws(ww.refund(1000, accounts[0])
    .then(function () {
      return ww.totalSupply().then(function (res) {
        assert.equal(res, Error("VM Exception while processing transaction: invalid JUMP"), "total supply is not 1100");
        return ww.balanceOf(accounts[0]).then(function (balance) {
          assert.equal(balance.valueOf(), 0, "1100 wasn't in the first account");
        });
      })
    })
    .catch(function () {
      return ww.totalSupply().then(function (res) {
        assert.equal(res.toString(), Error("VM Exception while processing transaction: invalid JUMP").toString(), "total supply is not 1100");
        return ww.balanceOf(accounts[0]).then(function (balance) {
          assert.equal(balance.valueOf(), 0, "1100 wasn't in the first account");
        });
      })
    })
  });

});
