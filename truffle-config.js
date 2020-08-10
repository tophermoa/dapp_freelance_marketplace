module.exports = {
  migrations_directory: "./migrations",
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
  },
  contracts_directory: './contracts/',
  contracts_build_directory: './src/abi/',
  compilers: {
    solc: { 
      optimizer: {
        enabled: true,
        runs: 200
      },
      evmVersion: "petersburg"
    }
  }
};
