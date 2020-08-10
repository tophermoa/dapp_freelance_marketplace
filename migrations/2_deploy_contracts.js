const Pembayaran = artifacts.require("Pembayaran");
const BuatProject = artifacts.require("BuatProject");
const Penawaran = artifacts.require("Penawaran");
const Kontrak = artifacts.require("Kontrak");

module.exports = function(deployer) {
  /* Deploy your contract here with the following command */
  // deployer.deploy(YourContract);
  deployer.deploy(Pembayaran);
  deployer.deploy(BuatProject);
  deployer.deploy(Penawaran);
  deployer.deploy(Kontrak);
};
