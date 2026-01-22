// Sepolia RPC Provider
const provider = new ethers.JsonRpcProvider(
  "https://sepolia.drpc.org"
);

// Connect Wallet Function
window.connectWallet = async function () {
  try {
    if (!window.ethereum) {
      alert("MetaMask is not installed!");
      return;
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts"
    });

    const userAddress = accounts[0];

    document.getElementById("address").value = userAddress;
    document.getElementById("addressDisplay").innerText =
      userAddress.slice(0, 6) + "..." + userAddress.slice(-4);

    explore();

  } catch (error) {
    console.error(error);
    alert("Wallet connection failed!");
  }
};

// Explore Wallet Function
window.explore = async function () {
  try {
    const address = document.getElementById("address").value;

    if (!ethers.isAddress(address)) {
      alert("Invalid Ethereum address");
      return;
    }

    document.getElementById("addressDisplay").innerText =
      address.slice(0, 6) + "..." + address.slice(-4);

    const balanceWei = await provider.getBalance(address);
    const balanceEth = ethers.formatEther(balanceWei);

    const txCount = await provider.getTransactionCount(address);

    const code = await provider.getCode(address);
    const accountType = code === "0x" ? "EOA (Wallet)" : "Smart Contract";

    document.getElementById("type").innerText = accountType;
    document.getElementById("balance").innerText = balanceEth + " SepETH";
    document.getElementById("txCount").innerText = txCount;

  } catch (err) {
    console.error(err);
    alert("Error fetching Sepolia data. Check console.");
  }
};

// Detect Account Change in MetaMask
if (window.ethereum) {
  window.ethereum.on("accountsChanged", function (accounts) {
    if (accounts.length > 0) {
      document.getElementById("address").value = accounts[0];
      document.getElementById("addressDisplay").innerText =
        accounts[0].slice(0, 6) + "..." + accounts[0].slice(-4);
      explore();
    }
  });
}
