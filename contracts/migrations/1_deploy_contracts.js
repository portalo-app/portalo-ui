const Profile = artifacts.require('PortaloContract');

module.exports = function (deployer) {
  deployer.deploy(Profile);
};
