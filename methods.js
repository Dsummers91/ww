web3.eth.sendTransaction({from: web3.eth.accounts[0],to: WillieWatt.deployed().address, value: web3.toWei(.1, "ether")})

WillieWatt.deployed().balanceOf.call(web3.eth.accounts[0])

web3.eth.getBalance(web3.eth.accounts[0])
web3.eth.getBalance(web3.eth.accounts[0])


WillieWatt.deployed().refund(1000, web3.eth.accounts[0])
