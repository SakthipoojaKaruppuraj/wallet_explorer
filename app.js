const provider = new ethers.JsonRpcProvider(
  "https://sepolia.drpc.org"
);

window.explore = async function () {
  try {
    console.log("Button clicked");

    const address = document.getElementById("address").value;

    if (!ethers.isAddress(address)) {
      alert("Invalid Ethereum address");
      return;
    }

    const balanceWei = await provider.getBalance(address);
    const balanceEth = ethers.formatEther(balanceWei);

    const txCount = await provider.getTransactionCount(address);

    const code = await provider.getCode(address);
    const accountType = code === "0x" ? "EOA (Wallet)" : "Smart Contract";

    document.getElementById("type").innerText =
      "Account Type: " + accountType;

    document.getElementById("balance").innerText =
      "Balance: " + balanceEth + " SepoliaETH";

    document.getElementById("txCount").innerText =
      "Transaction Count (Nonce): " + txCount;

  } catch (err) {
    console.error(err);
    alert("Error fetching Sepolia data. Check console.");
  }
};
