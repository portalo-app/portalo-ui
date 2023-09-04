const mockProfile = {
  profileAlias: 'testprofile',
  exists: true,
  cryptoAddresses: [
    {
      name: 'Social wallet',
      entity: 'Polygon',
      portaloAddress: '0x1234',
    },
  ],
  fiatAddresses: [
    {
      name: 'Cuenta sueldo',
      entity: 'Santander',
      portaloAddress: '1234',
    },
  ],
};

const PortaloContract = artifacts.require('PortaloContract');

contract('PortaloContract', (accounts) => {
  it('should add a profile', async () => {
    const portaloInstance = await PortaloContract.deployed();

    // mockProfile.owner = accounts[0];
    // await portaloInstance.addProfile(mockProfile, {
    //   from: accounts[0],
    // });

    const savedProfile = await portaloInstance.getProfile(
      mockProfile.profileAlias,
      { from: accounts[0] }
    );

    assert.equal(
      savedProfile.profileAlias,
      mockProfile.profileAlias,
      "The saved alias and the mocked aren't equal"
    );
  });
});
